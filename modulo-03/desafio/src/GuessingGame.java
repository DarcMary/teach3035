import java.io.PrintStream;
import java.util.Random;
import java.util.Scanner;

public class GuessingGame {
    static final String[] DIFFICULTY_NAMES = {"Fácil", "Médio", "Difícil"};
    static final int[] MAX_NUMBERS = {50, 100, 200};
    static final int[] MAX_ATTEMPTS = {10, 7, 5};
    static final int[] BASE_SCORES = {100, 200, 300};

    private final Scanner input;
    private final Random random;
    private final PrintStream output;

    GuessingGame(Scanner input, Random random, PrintStream output) {
        this.input = input;
        this.random = random;
        this.output = output;
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
                case 2, 3 -> output.println("Funcionalidade disponível em uma próxima etapa.");
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
                output.printf("Acertou em %d tentativa(s)!%n", attempt);
                return;
            }

            output.println(buildGuessFeedback(guess, target, maximum));
        }

        output.printf("Suas tentativas acabaram. O número era %d.%n", target);
    }

    int generateTarget(int maximum) {
        return random.nextInt(maximum) + 1;
    }

    String buildGuessFeedback(int guess, int target, int maximum) {
        int distance = Math.abs(target - guess);
        String direction = target > guess ? "maior" : "menor";
        String proximity;

        if (distance * 100 <= maximum * 10) {
            proximity = "muito perto";
        } else if (distance * 100 <= maximum * 25) {
            proximity = "perto";
        } else {
            proximity = "longe";
        }

        return String.format("Tente um número %s; você está %s.", direction, proximity);
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
