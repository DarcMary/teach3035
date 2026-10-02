import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;

public class HighScoresTest {
    public static void main(String[] args) {
        HighScores records = new HighScores();
        if (records.best(0, 0) != -1) {
            throw new AssertionError("Recorde vazio deve estar ausente");
        }
        records.record(0, 0, 540);
        records.record(0, 0, 480);
        records.record(0, 0, 540);
        OptionalGameTest.equals(540, records.best(0, 0));
        records.record(0, 0, 550);
        OptionalGameTest.equals(550, records.best(0, 0));
        records.record(1, 0, 1620);
        records.record(0, 1, 0);
        OptionalGameTest.equals(1620, records.best(1, 0));
        OptionalGameTest.equals(0, records.best(0, 1));
        OptionalGameTest.equals(-1, records.best(0, 2));
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        records.printTo(new PrintStream(output, true, StandardCharsets.UTF_8));
        OptionalGameTest.contains(output.toString(StandardCharsets.UTF_8), "Sem recorde");
        OptionalGameTest.contains(output.toString(StandardCharsets.UTF_8), "1620 pontos");
        System.out.println("HighScoresTest: PASS");
    }
}
