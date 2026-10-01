import java.io.PrintStream;

public class ScoreHistory {
    static final int CAPACITY = 10;

    private final String[] difficulties = new String[CAPACITY];
    private final int[] scores = new int[CAPACITY];
    private int nextIndex;
    private int count;

    void add(String difficulty, int score) {
        difficulties[nextIndex] = difficulty;
        scores[nextIndex] = score;
        nextIndex = (nextIndex + 1) % CAPACITY;

        if (count < CAPACITY) {
            count++;
        }
    }

    void printTo(PrintStream output) {
        output.println("\n=== Histórico de Pontuações ===");
        if (count == 0) {
            output.println("Nenhuma partida registrada.");
            return;
        }

        int oldestIndex = (nextIndex - count + CAPACITY) % CAPACITY;
        for (int position = 0; position < count; position++) {
            int index = (oldestIndex + position) % CAPACITY;
            output.printf("%d. %s - %d pontos%n", position + 1, difficulties[index], scores[index]);
        }
    }

    int size() {
        return count;
    }
}
