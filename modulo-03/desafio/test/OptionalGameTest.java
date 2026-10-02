import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import java.util.Random;
import java.util.Scanner;

public class OptionalGameTest {
    public static void main(String[] args) {
        sequenceWinsAndRecordsOnlyOneResult();
        sequenceLossRecordsZero();
        hintsChargeOnceWithoutUsingAttempts();
        proximityRequiresPreviousGuess();
        hintsRejectInsufficientPoints();
        sequenceResetsHintsBetweenNumbers();
        recordsWinsButNotLossesAndSurvivesHistoryEviction();
        menuSupportsBothModesAndRecords();
        System.out.println("OptionalGameTest: PASS");
    }

    private static void recordsWinsButNotLossesAndSurvivesHistoryEviction() {
        Fixture winner = new Fixture("5\n", 5);
        winner.game.playRound(0);
        equals(540, winner.records.best(HighScores.CLASSIC, 0));
        for (int i = 0; i < 11; i++) {
            winner.history.add("Médio", 0);
        }
        equals(540, winner.records.best(HighScores.CLASSIC, 0));
        Fixture loser = new Fixture("1\n".repeat(10), 5);
        loser.game.playRound(0);
        equals(-1, loser.records.best(HighScores.CLASSIC, 0));
        Fixture lastAttempt = new Fixture("1\n".repeat(9) + "5\n", 5);
        lastAttempt.game.playRound(0);
        equals(0, lastAttempt.records.best(HighScores.CLASSIC, 0));
        Fixture sequence = new Fixture("5\n8\n2\n", 5, 8, 2);
        sequence.game.playSequence(0);
        equals(1620, sequence.records.best(HighScores.SEQUENCE, 0));
        equals(-1, sequence.records.best(HighScores.CLASSIC, 0));
    }

    private static void menuSupportsBothModesAndRecords() {
        Fixture fixture = new Fixture("6\n1\n1\n5\n5\n2\n8\n8\n8\n3\n6\n4\n", 5, 8, 8, 8);
        fixture.game.run();
        contains(fixture.output(), "Sequência concluída!");
        contains(fixture.output(), "Fácil: 540 pontos");
        contains(fixture.output(), "Médio: 1470 pontos");
        contains(fixture.output(), "Até a próxima!");
    }

    private static void hintsChargeOnceWithoutUsingAttempts() {
        Fixture fixture = new Fixture("d\n0\nd\n1\nd\n1\nd\n2\n25\n", 25);
        fixture.game.playRound(0);
        contains(fixture.output(), "O número é ímpar.");
        contains(fixture.output(), "metade inferior (1 a 25)");
        contains(fixture.output(), "Esta dica já foi comprada");
        contains(fixture.output(), "Acertou em 1 tentativa(s)!");
        contains(fixture.output(), "Pontuação: 510");
    }

    private static void proximityRequiresPreviousGuess() {
        Fixture fixture = new Fixture("d\n3\n1\nd\n3\n25\n", 25);
        fixture.game.playRound(0);
        contains(fixture.output(), "Faça um palpite antes");
        contains(fixture.output(), "frio");
        contains(fixture.output(), "Pontuação: 465");
        Fixture warm = new Fixture("20\nd\n3\n25\n", 25);
        warm.game.playRound(0);
        contains(warm.output(), "quente");
        contains(warm.output(), "Pontuação: 465");
    }

    private static void hintsRejectInsufficientPoints() {
        Fixture fixture = new Fixture("1\n".repeat(9) + "d\n1\n25\n", 25);
        fixture.game.playRound(0);
        contains(fixture.output(), "Pontos insuficientes");
        contains(fixture.output(), "Acertou em 10 tentativa(s)!");
        contains(fixture.output(), "Pontuação: 0");
    }

    private static void sequenceResetsHintsBetweenNumbers() {
        Fixture fixture = new Fixture("d\n1\n5\nd\n1\n8\nd\n1\n2\n", 5, 8, 2);
        fixture.game.playSequence(0);
        contains(fixture.output(), "Pontuação: 1590");
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
        final HighScores records = new HighScores();
        final GuessingGame game;

        Fixture(String input, int... targets) {
            game = new GuessingGame(new Scanner(input), new TargetRandom(targets),
                    new PrintStream(output, true, StandardCharsets.UTF_8), history, records);
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
