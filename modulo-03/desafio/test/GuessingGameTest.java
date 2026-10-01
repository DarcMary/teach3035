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
        System.out.println("GuessingGameTest: PASS");
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
        ByteArrayInputStream input = new ByteArrayInputStream(text.getBytes(StandardCharsets.UTF_8));
        return new GuessingGame(new Scanner(input), new Random(0), new PrintStream(new ByteArrayOutputStream()));
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
}
