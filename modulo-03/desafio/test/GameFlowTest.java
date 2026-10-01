import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import java.util.Random;
import java.util.Scanner;

public class GameFlowTest {
    public static void main(String[] args) {
        exitsFromMainMenu();
        retriesInvalidMainMenuInput();
        System.out.println("GameFlowTest: PASS");
    }

    private static void retriesInvalidMainMenuInput() {
        String output = runGame("texto\n9\n4\n");
        assertContains(output, "Digite um número inteiro entre 1 e 4.");
        assertContains(output, "Até a próxima!");
    }

    private static void exitsFromMainMenu() {
        String output = runGame("4\n");

        assertContains(output, "1. Iniciar novo jogo");
        assertContains(output, "2. Ver regras");
        assertContains(output, "3. Ver histórico de pontuações");
        assertContains(output, "4. Sair");
        assertContains(output, "Até a próxima!");
    }

    private static String runGame(String inputText) {
        ByteArrayInputStream input = new ByteArrayInputStream(inputText.getBytes(StandardCharsets.UTF_8));
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        GuessingGame game = new GuessingGame(new Scanner(input), new Random(0), new PrintStream(output));
        game.run();
        return output.toString(StandardCharsets.UTF_8);
    }

    private static void assertContains(String actual, String expected) {
        if (!actual.contains(expected)) {
            throw new AssertionError("Esperava encontrar: " + expected + "\nSaída:\n" + actual);
        }
    }
}
