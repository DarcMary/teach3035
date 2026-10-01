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
            int option = readIntInRange("", 1, 4);

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
        int attemptLimit = MAX_ATTEMPTS[difficultyIndex];
        int target = generateTarget(maximum);

        output.printf("%nDificuldade %s: adivinhe um número entre 1 e %d.%n",
                DIFFICULTY_NAMES[difficultyIndex], maximum);

        for (int attempt = 1; attempt <= attemptLimit; attempt++) {
            int guess = readIntInRange(
                    String.format("Tentativa %d de %d: ", attempt, attemptLimit), 1, maximum);

            if (guess == target) {
                int score = calculateScore(BASE_SCORES[difficultyIndex], attemptLimit, attempt, true);
                output.printf("Acertou em %d tentativa(s)!%n", attempt);
                recordScore(difficultyIndex, score);
                return;
            }

            output.println(buildGuessFeedback(guess, target, maximum));
        }

        output.printf("Suas tentativas acabaram. O número era %d.%n", target);
        recordScore(difficultyIndex, 0);
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

        int unusedAttempts = maximumAttempts - usedAttempts;
        int score = baseScore
                - (POINTS_PER_USED_ATTEMPT * usedAttempts)
                + (BONUS_PER_UNUSED_ATTEMPT * unusedAttempts);
        return Math.max(0, score);
    }

    private void recordScore(int difficultyIndex, int score) {
        output.printf("Pontuação: %d%n", score);
        history.add(DIFFICULTY_NAMES[difficultyIndex], score);
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
        output.print("Escolha uma opção: ");
    }
}
