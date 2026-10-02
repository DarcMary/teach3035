import java.io.PrintStream;
import java.util.Random;
import java.util.Scanner;

public class GuessingGame {
    static final String[] DIFFICULTY_NAMES = {"Fácil", "Médio", "Difícil"};
    static final int[] MAX_NUMBERS = {50, 100, 200};
    static final int[] MAX_ATTEMPTS = {10, 7, 5};
    static final int[] BASE_SCORES = {100, 200, 300};
    private static final int PERCENT_SCALE = 100;
    private static final int VERY_CLOSE_PERCENT = 10;
    private static final int CLOSE_PERCENT = 25;
    private static final int POINTS_PER_USED_ATTEMPT = 10;
    private static final int BONUS_PER_UNUSED_ATTEMPT = 50;
    private static final int[] HINT_COSTS = {10, 20, 15};

    private final Scanner input;
    private final Random random;
    private final PrintStream output;
    private final ScoreHistory history;

    GuessingGame(Scanner input, Random random, PrintStream output, ScoreHistory history) {
        this.input = input;
        this.random = random;
        this.output = output;
        this.history = history;
    }

    void run() {
        boolean running = true;

        while (running) {
            printMainMenu();
            int option = readIntInRange("", 1, 5);

            switch (option) {
                case 1 -> {
                    int difficulty = selectDifficulty();
                    playRound(difficulty);
                }
                case 2 -> printRules();
                case 3 -> history.printTo(output);
                case 4 -> {
                    output.println("Até a próxima!");
                    running = false;
                }
                case 5 -> playSequence(selectDifficulty());
            }
        }
    }

    int selectDifficulty() {
        output.println("\nEscolha a dificuldade:");
        for (int index = 0; index < DIFFICULTY_NAMES.length; index++) {
            output.printf("%d. %s%n", index + 1, DIFFICULTY_NAMES[index]);
        }
        return readIntInRange("Opção: ", 1, DIFFICULTY_NAMES.length) - 1;
    }

    int readIntInRange(String prompt, int minimum, int maximum) {
        while (true) {
            output.print(prompt);
            String value = input.nextLine().trim();

            try {
                int number = Integer.parseInt(value);
                if (number >= minimum && number <= maximum) {
                    return number;
                }
            } catch (NumberFormatException ignored) {
                // A mensagem abaixo também atende entradas que não são números inteiros.
            }

            output.printf("Digite um número inteiro entre %d e %d.%n", minimum, maximum);
        }
    }

    void playRound(int difficultyIndex) {
        int maximum = MAX_NUMBERS[difficultyIndex];
        int target = generateTarget(maximum);

        output.printf("%nDificuldade %s: adivinhe um número entre 1 e %d.%n",
                DIFFICULTY_NAMES[difficultyIndex], maximum);
        int score = guessNumber(difficultyIndex, target);
        recordScore(difficultyIndex, Math.max(0, score));
    }

    void playSequence(int difficultyIndex) {
        int[] targets = new int[3];
        for (int index = 0; index < targets.length; index++) {
            targets[index] = generateTarget(MAX_NUMBERS[difficultyIndex]);
        }

        int totalScore = 0;
        for (int index = 0; index < targets.length; index++) {
            output.printf("%nNúmero %d de %d: intervalo de 1 a %d.%n",
                    index + 1, targets.length, MAX_NUMBERS[difficultyIndex]);
            int score = guessNumber(difficultyIndex, targets[index]);
            if (score < 0) {
                output.println("Sequência: " + java.util.Arrays.toString(targets));
                recordSequenceScore(difficultyIndex, 0);
                return;
            }
            totalScore += score;
        }
        output.println("Sequência concluída!");
        recordSequenceScore(difficultyIndex, totalScore);
    }

    // -1 indica derrota; uma vitória pode valer zero pontos.
    private int guessNumber(int difficultyIndex, int target) {
        int maximum = MAX_NUMBERS[difficultyIndex];
        int attemptLimit = MAX_ATTEMPTS[difficultyIndex];
        boolean[] purchasedHints = new boolean[HINT_COSTS.length];
        int hintCost = 0;
        int lastGuess = 0;

        for (int attempt = 1; attempt <= attemptLimit; attempt++) {
            int guess;
            while (true) {
                guess = readGuessOrHint(attempt, attemptLimit, maximum);
                if (guess != 0) {
                    break;
                }
                int availablePoints = Math.max(0,
                        rawScore(BASE_SCORES[difficultyIndex], attemptLimit, attempt) - hintCost);
                hintCost += purchaseHint(target, maximum, lastGuess, purchasedHints, availablePoints);
            }

            if (guess == target) {
                int score = Math.max(0,
                        rawScore(BASE_SCORES[difficultyIndex], attemptLimit, attempt) - hintCost);
                output.printf("Acertou em %d tentativa(s)!%n", attempt);
                return score;
            }

            output.println(buildGuessFeedback(guess, target, maximum));
            lastGuess = guess;
        }

        output.printf("Suas tentativas acabaram. O número era %d.%n", target);
        return -1;
    }

    // Zero é o comando de dicas; palpites válidos começam em 1.
    private int readGuessOrHint(int attempt, int attemptLimit, int maximum) {
        while (true) {
            output.printf("Tentativa %d de %d (d para dicas): ", attempt, attemptLimit);
            String value = input.nextLine().trim();
            if (value.equalsIgnoreCase("d")) {
                return 0;
            }
            try {
                int guess = Integer.parseInt(value);
                if (guess >= 1 && guess <= maximum) {
                    return guess;
                }
            } catch (NumberFormatException ignored) {
                // Repetir o campo sem consumir uma tentativa.
            }
            output.printf("Digite um número inteiro entre 1 e %d ou d para dicas.%n", maximum);
        }
    }

    private int purchaseHint(int target, int maximum, int lastGuess,
            boolean[] purchased, int availablePoints) {
        output.printf("%nDicas - pontos disponíveis se acertar agora: %d%n", availablePoints);
        output.println("0. Cancelar");
        output.printf("1. Paridade (-%d pontos)%n", HINT_COSTS[0]);
        output.printf("2. Intervalo (-%d pontos)%n", HINT_COSTS[1]);
        output.printf("3. Proximidade (-%d pontos)%n", HINT_COSTS[2]);
        int choice = readIntInRange("Dica: ", 0, HINT_COSTS.length);
        if (choice == 0) {
            return 0;
        }
        int index = choice - 1;
        if (purchased[index]) {
            output.println("Esta dica já foi comprada para este número.");
            return 0;
        }
        if (choice == 3 && lastGuess == 0) {
            output.println("Faça um palpite antes de pedir proximidade.");
            return 0;
        }
        if (availablePoints < HINT_COSTS[index]) {
            output.println("Pontos insuficientes para esta dica.");
            return 0;
        }
        purchased[index] = true;
        switch (choice) {
            case 1 -> output.println("O número é " + (target % 2 == 0 ? "par." : "ímpar."));
            case 2 -> {
                int midpoint = maximum / 2;
                if (target <= midpoint) {
                    output.printf("O número está na metade inferior (1 a %d).%n", midpoint);
                } else {
                    output.printf("O número está na metade superior (%d a %d).%n", midpoint + 1, maximum);
                }
            }
            case 3 -> {
                boolean warm = Math.abs(target - lastGuess) * PERCENT_SCALE <= maximum * CLOSE_PERCENT;
                output.println("Seu último palpite está " + (warm ? "quente." : "frio."));
            }
        }
        return HINT_COSTS[index];
    }

    int generateTarget(int maximum) {
        return random.nextInt(maximum) + 1;
    }

    String buildGuessFeedback(int guess, int target, int maximum) {
        int distance = Math.abs(target - guess);
        String direction = target > guess ? "maior" : "menor";
        String proximity;

        if (distance * PERCENT_SCALE <= maximum * VERY_CLOSE_PERCENT) {
            proximity = "muito perto";
        } else if (distance * PERCENT_SCALE <= maximum * CLOSE_PERCENT) {
            proximity = "perto";
        } else {
            proximity = "longe";
        }

        return String.format("Tente um número %s; você está %s.", direction, proximity);
    }

    int calculateScore(int baseScore, int maximumAttempts, int usedAttempts, boolean won) {
        if (!won) {
            return 0;
        }

        return Math.max(0, rawScore(baseScore, maximumAttempts, usedAttempts));
    }

    private int rawScore(int baseScore, int maximumAttempts, int usedAttempts) {
        int unusedAttempts = maximumAttempts - usedAttempts;
        return baseScore
                - (POINTS_PER_USED_ATTEMPT * usedAttempts)
                + (BONUS_PER_UNUSED_ATTEMPT * unusedAttempts);
    }

    private void recordScore(int difficultyIndex, int score) {
        output.printf("Pontuação: %d%n", score);
        history.add(DIFFICULTY_NAMES[difficultyIndex], score);
    }

    private void recordSequenceScore(int difficultyIndex, int score) {
        output.printf("Pontuação: %d%n", score);
        history.add(DIFFICULTY_NAMES[difficultyIndex] + " (Sequência)", score);
    }

    void printRules() {
        output.println("\n=== Regras ===");
        output.println("Escolha uma dificuldade e tente descobrir o número sorteado:");
        for (int index = 0; index < DIFFICULTY_NAMES.length; index++) {
            output.printf("- %s: 1 a %d, %d tentativas, %d pontos de base%n",
                    DIFFICULTY_NAMES[index], MAX_NUMBERS[index], MAX_ATTEMPTS[index], BASE_SCORES[index]);
        }
        output.printf("A pontuação desconta %d pontos por tentativa usada.%n", POINTS_PER_USED_ATTEMPT);
        output.printf("Você recebe %d pontos por tentativa não utilizada.%n", BONUS_PER_UNUSED_ATTEMPT);
        output.println("Após um erro, o jogo informa se o número é maior ou menor e sua proximidade.");
        output.printf("As %d últimas pontuações ficam disponíveis no histórico.%n", ScoreHistory.CAPACITY);
        output.println("Uma derrota registra 0 pontos.");
    }

    private void printMainMenu() {
        output.println("\n=== Jogo de Adivinhação ===");
        output.println("1. Iniciar novo jogo");
        output.println("2. Ver regras");
        output.println("3. Ver histórico de pontuações");
        output.println("4. Sair");
        output.println("5. Modo sequência");
        output.print("Escolha uma opção: ");
    }
}
