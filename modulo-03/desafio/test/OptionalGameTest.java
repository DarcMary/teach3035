import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import java.util.Random;
import java.util.Scanner;

public class OptionalGameTest {
    public static void main(String[] args) {
        sequenceWinsAndRecordsOnlyOneResult();
        sequenceLossRecordsZero();
        System.out.println("OptionalGameTest: PASS");
    }

    private static void sequenceWinsAndRecordsOnlyOneResult() {
        Fixture fixture = new Fixture("5\n8\n2\n", 5, 8, 2);
        fixture.game.playSequence(0);
        contains(fixture.output(), "Sequência concluída!");
        contains(fixture.output(), "Pontuação: 1620");
        equals(1, fixture.history.size());
        contains(fixture.historyOutput(), "Fácil (Sequência) - 1620 pontos");
        Fixture repeated = new Fixture("5\n5\n5\n", 5, 5, 5);
        repeated.game.playSequence(0);
        contains(repeated.output(), "Sequência concluída!");
    }

    private static void sequenceLossRecordsZero() {
        Fixture fixture = new Fixture("5\n" + "1\n".repeat(10), 5, 8, 2);
        fixture.game.playSequence(0);
        contains(fixture.output(), "Sequência: [5, 8, 2]");
        contains(fixture.output(), "Pontuação: 0");
        equals(1, fixture.history.size());
    }

    static void contains(String actual, String expected) {
        if (!actual.contains(expected)) {
            throw new AssertionError("Esperava: " + expected + "\nSaída:\n" + actual);
        }
    }

    static void equals(int expected, int actual) {
        if (expected != actual) {
            throw new AssertionError("Esperava " + expected + ", recebeu " + actual);
        }
    }

    static class Fixture {
        final ByteArrayOutputStream output = new ByteArrayOutputStream();
        final ScoreHistory history = new ScoreHistory();
        final GuessingGame game;

        Fixture(String input, int... targets) {
            game = new GuessingGame(new Scanner(input), new TargetRandom(targets),
                    new PrintStream(output, true, StandardCharsets.UTF_8), history);
        }

        String output() {
            return output.toString(StandardCharsets.UTF_8);
        }

        String historyOutput() {
            ByteArrayOutputStream text = new ByteArrayOutputStream();
            history.printTo(new PrintStream(text, true, StandardCharsets.UTF_8));
            return text.toString(StandardCharsets.UTF_8);
        }
    }

    private static class TargetRandom extends Random {
        private static final long serialVersionUID = 1L;
        private final int[] targets;
        private int index;

        TargetRandom(int[] targets) {
            this.targets = targets;
        }

        @Override
        public int nextInt(int bound) {
            int value = targets[index++] - 1;
            if (value < 0 || value >= bound) {
                throw new AssertionError("Alvo fora do intervalo");
            }
            return value;
        }
    }
}
