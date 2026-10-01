import java.util.Random;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        GuessingGame game = new GuessingGame(new Scanner(System.in), new Random(), System.out);
        game.run();
    }
}
