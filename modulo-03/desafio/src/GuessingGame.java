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
            String option = input.nextLine().trim();

            switch (option) {
                case "1" -> {
                    int difficulty = selectDifficulty();
                    output.println("Dificuldade selecionada: " + DIFFICULTY_NAMES[difficulty]);
                }
                case "2", "3" -> output.println("Funcionalidade disponível em uma próxima etapa.");
                case "4" -> {
                    output.println("Até a próxima!");
                    running = false;
                }
                default -> output.println("Opção inválida.");
            }
        }
    }

    int selectDifficulty() {
        output.println("\nEscolha a dificuldade:");
        for (int index = 0; index < DIFFICULTY_NAMES.length; index++) {
            output.printf("%d. %s%n", index + 1, DIFFICULTY_NAMES[index]);
        }
        output.print("Opção: ");
        return Integer.parseInt(input.nextLine().trim()) - 1;
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
