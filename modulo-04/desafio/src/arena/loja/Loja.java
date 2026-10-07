package arena.loja;

import arena.jogo.EstadoPartida;
import arena.personagem.Personagem;
import arena.utilitarios.EntradaConsole;
import java.io.PrintStream;
import java.util.Objects;
import java.util.OptionalInt;

public class Loja {
    private static final int CUSTO = 20;
    private final EntradaConsole entrada;
    private final PrintStream saida;

    public Loja(EntradaConsole entrada, PrintStream saida) {
        this.entrada = Objects.requireNonNull(entrada);
        this.saida = Objects.requireNonNull(saida);
    }

    public boolean comprarAtaque(EstadoPartida estado) {
        if (!estado.gastarMoedas(CUSTO)) return false;
        estado.getJogador().melhorarAtaque(3);
        return true;
    }

    public boolean comprarVida(EstadoPartida estado) {
        if (!estado.gastarMoedas(CUSTO)) return false;
        estado.getJogador().melhorarVida(15);
        return true;
    }

    public boolean abrir(EstadoPartida estado) {
        saida.println("\n=== Loja entre batalhas ===");
        while (true) {
            Personagem jogador = estado.getJogador();
            saida.printf("Moedas: %d | Ataque: %d | Vida: %d/%d%n", estado.getMoedas(),
                    jogador.getAtaque(), jogador.getVida(), jogador.getVidaMaxima());
            saida.println("1 - +3 ataque (20 moedas)\n2 - +15 vida máxima (20 moedas)\n0 - Continuar");
            OptionalInt opcao = entrada.lerOpcao("Escolha uma melhoria: ", 0, 2);
            if (opcao.isEmpty()) return false;
            if (opcao.getAsInt() == 0) return true;
            boolean comprou = opcao.getAsInt() == 1 ? comprarAtaque(estado) : comprarVida(estado);
            saida.println(comprou ? "Melhoria comprada!" : "Moedas insuficientes.");
        }
    }
}
