import java.io.PrintStream;
import java.util.Arrays;

public class HighScores {
    static final int CLASSIC = 0;
    static final int SEQUENCE = 1;
    private static final String[] MODE_NAMES = {"Clássico", "Sequência"};
    private final int[][] scores = new int[MODE_NAMES.length][GuessingGame.DIFFICULTY_NAMES.length];

    HighScores() {
        for (int[] modeScores : scores) {
            Arrays.fill(modeScores, -1);
        }
    }

    void record(int mode, int difficultyIndex, int score) {
        if (score > scores[mode][difficultyIndex]) {
            scores[mode][difficultyIndex] = score;
        }
    }

    int best(int mode, int difficultyIndex) {
        return scores[mode][difficultyIndex];
    }

    void printTo(PrintStream output) {
        output.println("\n=== Recordes por Dificuldade ===");
        for (int mode = 0; mode < MODE_NAMES.length; mode++) {
            output.println(MODE_NAMES[mode] + ":");
            for (int difficulty = 0; difficulty < scores[mode].length; difficulty++) {
                int score = scores[mode][difficulty];
                output.printf("- %s: %s%n", GuessingGame.DIFFICULTY_NAMES[difficulty],
                        score < 0 ? "Sem recorde" : score + " pontos");
            }
        }
    }
}
