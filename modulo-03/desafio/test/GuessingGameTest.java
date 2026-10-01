import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import java.util.Random;
import java.util.Scanner;

public class GuessingGameTest {
    public static void main(String[] args) {
        exposesRequiredDifficultyConfiguration();
        selectsDifficultyByArrayIndex();
        retriesUntilInputIsAnIntegerInRange();
        generatesTargetInsideInclusiveRange();
        buildsDirectionalDistanceFeedback();
        handlesVictoryAndDefeatAttemptLimits();
        calculatesScoresForWinsAndLosses();
        System.out.println("GuessingGameTest: PASS");
    }

    private static void calculatesScoresForWinsAndLosses() {
        GuessingGame game = gameWithInput("");
        assertEquals(540, game.calculateScore(100, 10, 1, true));
        assertEquals(0, game.calculateScore(100, 10, 10, true));
        assertEquals(490, game.calculateScore(200, 7, 1, true));
        assertEquals(490, game.calculateScore(300, 5, 1, true));
        assertEquals(0, game.calculateScore(300, 5, 5, false));
        assertEquals(0, game.calculateScore(0, 1, 1, true));
    }

    private static void generatesTargetInsideInclusiveRange() {
        GuessingGame game = gameWithInputAndRandom("", new FixedRandom(49));
        assertEquals(50, game.generateTarget(50));
    }

    private static void buildsDirectionalDistanceFeedback() {
        GuessingGame game = gameWithInput("");
        assertContains(game.buildGuessFeedback(45, 50, 100), "maior");
        assertContains(game.buildGuessFeedback(45, 50, 100), "muito perto");
        assertContains(game.buildGuessFeedback(70, 50, 100), "menor");
        assertContains(game.buildGuessFeedback(70, 50, 100), "perto");
        assertContains(game.buildGuessFeedback(1, 50, 100), "longe");
    }

    private static void handlesVictoryAndDefeatAttemptLimits() {
        assertContains(runRound("50\n", 49, 0), "Acertou em 1 tentativa(s)!");
        assertContains(runRound("1\n1\n1\n1\n1\n1\n1\n1\n1\n50\n", 49, 0),
                "Acertou em 10 tentativa(s)!");
        assertContains(runRound("1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n", 49, 0),
                "Suas tentativas acabaram. O número era 50.");
    }

    private static void retriesUntilInputIsAnIntegerInRange() {
        GuessingGame game = gameWithInput("texto\n\n2.5\n0\n51\n7\n");
        assertEquals(7, game.readIntInRange("Palpite: ", 1, 50));
    }

    private static void exposesRequiredDifficultyConfiguration() {
        assertArrayEquals(new String[] {"Fácil", "Médio", "Difícil"}, GuessingGame.DIFFICULTY_NAMES);
        assertArrayEquals(new int[] {50, 100, 200}, GuessingGame.MAX_NUMBERS);
        assertArrayEquals(new int[] {10, 7, 5}, GuessingGame.MAX_ATTEMPTS);
        assertArrayEquals(new int[] {100, 200, 300}, GuessingGame.BASE_SCORES);
    }

    private static void selectsDifficultyByArrayIndex() {
        GuessingGame game = gameWithInput("2\n");
        assertEquals(1, game.selectDifficulty());
    }

    private static GuessingGame gameWithInput(String text) {
        return gameWithInputAndRandom(text, new Random(0));
    }

    private static GuessingGame gameWithInputAndRandom(String text, Random random) {
        ByteArrayInputStream input = new ByteArrayInputStream(text.getBytes(StandardCharsets.UTF_8));
        return new GuessingGame(new Scanner(input), random, new PrintStream(new ByteArrayOutputStream()));
    }

    private static String runRound(String text, int nextRandomValue, int difficulty) {
        ByteArrayInputStream input = new ByteArrayInputStream(text.getBytes(StandardCharsets.UTF_8));
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        GuessingGame game = new GuessingGame(
                new Scanner(input), new FixedRandom(nextRandomValue), new PrintStream(output));
        game.playRound(difficulty);
        return output.toString(StandardCharsets.UTF_8);
    }

    private static void assertArrayEquals(int[] expected, int[] actual) {
        if (!java.util.Arrays.equals(expected, actual)) {
            throw new AssertionError("Arrays diferentes");
        }
    }

    private static void assertArrayEquals(String[] expected, String[] actual) {
        if (!java.util.Arrays.equals(expected, actual)) {
            throw new AssertionError("Arrays diferentes");
        }
    }

    private static void assertEquals(int expected, int actual) {
        if (expected != actual) {
            throw new AssertionError("Esperava " + expected + ", mas recebeu " + actual);
        }
    }

    private static void assertContains(String actual, String expected) {
        if (!actual.contains(expected)) {
            throw new AssertionError("Esperava encontrar: " + expected + "\nValor:\n" + actual);
        }
    }

    private static class FixedRandom extends Random {
        private final int value;

        FixedRandom(int value) {
            this.value = value;
        }

        @Override
        public int nextInt(int bound) {
            if (value < 0 || value >= bound) {
                throw new AssertionError("Valor aleatório fora do limite do teste");
            }
            return value;
        }
    }
}
