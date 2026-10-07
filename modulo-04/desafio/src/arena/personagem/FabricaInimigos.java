package arena.personagem;

import java.util.Objects;
import java.util.Random;

public class FabricaInimigos {
    private static final String[] NOMES = {
        "Zargor, o Orc Brutal", "Nyx, a Sombra", "Grom, o Troll",
        "Skarn, o Saqueador", "Vex, o Goblin"
    };
    private final Random random;

    public FabricaInimigos(Random random) { this.random = Objects.requireNonNull(random); }

    public Inimigo criar(int numeroBatalha) {
        if (numeroBatalha < 1 || numeroBatalha > 5) {
            throw new IllegalArgumentException("Batalha deve estar entre 1 e 5.");
        }
        int progresso = numeroBatalha - 1;
        return new Inimigo(NOMES[random.nextInt(NOMES.length)],
                35 + random.nextInt(11) + 5 * progresso,
                10 + random.nextInt(4) + 2 * progresso,
                2 + random.nextInt(3) + progresso);
    }
}
