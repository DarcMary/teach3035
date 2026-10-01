import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;

public class ScoreHistoryTest {
    public static void main(String[] args) {
        printsEmptyHistory();
        storesOneResult();
        retainsOnlyLatestTenResults();
        System.out.println("ScoreHistoryTest: PASS");
    }

    private static void printsEmptyHistory() {
        ScoreHistory history = new ScoreHistory();
        assertEquals(0, history.size());
        assertContains(render(history), "Nenhuma partida registrada.");
    }

    private static void storesOneResult() {
        ScoreHistory history = new ScoreHistory();
        history.add("Fácil", 540);
        assertEquals(1, history.size());
        assertContains(render(history), "1. Fácil - 540 pontos");
    }

    private static void retainsOnlyLatestTenResults() {
        ScoreHistory history = new ScoreHistory();
        for (int value = 1; value <= 11; value++) {
            history.add("Nível " + value, value * 10);
        }

        String output = render(history);
        assertEquals(10, history.size());
        assertNotContains(output, "Nível 1 -");
        assertContains(output, "1. Nível 2 - 20 pontos");
        assertContains(output, "10. Nível 11 - 110 pontos");
    }

    private static String render(ScoreHistory history) {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        history.printTo(new PrintStream(output));
        return output.toString(StandardCharsets.UTF_8);
    }

    private static void assertEquals(int expected, int actual) {
        if (expected != actual) {
            throw new AssertionError("Esperava " + expected + ", mas recebeu " + actual);
        }
    }

    private static void assertContains(String actual, String expected) {
        if (!actual.contains(expected)) {
            throw new AssertionError("Esperava encontrar: " + expected + "\nSaída:\n" + actual);
        }
    }

    private static void assertNotContains(String actual, String unexpected) {
        if (actual.contains(unexpected)) {
            throw new AssertionError("Não esperava encontrar: " + unexpected + "\nSaída:\n" + actual);
        }
    }
}
