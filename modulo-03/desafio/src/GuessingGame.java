import java.io.PrintStream;
import java.util.Random;
import java.util.Scanner;

public class GuessingGame {
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
                case "1", "2", "3" -> output.println("Funcionalidade disponível em uma próxima etapa.");
                case "4" -> {
                    output.println("Até a próxima!");
                    running = false;
                }
                default -> output.println("Opção inválida.");
            }
        }
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
