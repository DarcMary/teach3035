import java.util.Random;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        ScoreHistory history = new ScoreHistory();
        GuessingGame game = new GuessingGame(new Scanner(System.in), new Random(), System.out, history);
        game.run();
    }
}
