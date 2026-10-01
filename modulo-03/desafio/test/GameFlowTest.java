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
        showsEmptyScoreHistory();
        displaysCompleteRules();
        System.out.println("GameFlowTest: PASS");
    }

    private static void displaysCompleteRules() {
        String output = runGame("2\n4\n");
        assertContains(output, "Fácil: 1 a 50, 10 tentativas, 100 pontos de base");
        assertContains(output, "Médio: 1 a 100, 7 tentativas, 200 pontos de base");
        assertContains(output, "Difícil: 1 a 200, 5 tentativas, 300 pontos de base");
        assertContains(output, "10 pontos por tentativa usada");
        assertContains(output, "50 pontos por tentativa não utilizada");
        assertContains(output, "maior ou menor e sua proximidade");
        assertContains(output, "10 últimas pontuações");
    }

    private static void showsEmptyScoreHistory() {
        String output = runGame("3\n4\n");
        assertContains(output, "=== Histórico de Pontuações ===");
        assertContains(output, "Nenhuma partida registrada.");
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
        GuessingGame game = new GuessingGame(
                new Scanner(input), new Random(0), new PrintStream(output), new ScoreHistory());
        game.run();
        return output.toString(StandardCharsets.UTF_8);
    }

    private static void assertContains(String actual, String expected) {
        if (!actual.contains(expected)) {
            throw new AssertionError("Esperava encontrar: " + expected + "\nSaída:\n" + actual);
        }
    }
}
