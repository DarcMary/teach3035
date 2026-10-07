package arena.batalha;

import arena.jogo.EstadoPartida;
import arena.personagem.Inimigo;
import arena.personagem.Personagem;
import arena.utilitarios.EntradaConsole;
import java.io.PrintStream;
import java.util.Objects;
import java.util.OptionalInt;
import java.util.Random;

public class Batalha {
    private final EntradaConsole entrada;
    private final PrintStream saida;
    private final Random random;

    public Batalha(EntradaConsole entrada, PrintStream saida, Random random) {
        this.entrada = Objects.requireNonNull(entrada);
        this.saida = Objects.requireNonNull(saida);
        this.random = Objects.requireNonNull(random);
    }

    public ResultadoBatalha executar(EstadoPartida estado, Inimigo inimigo) {
        Personagem jogador = estado.getJogador();
        estado.registrarBatalhaIniciada();
        saida.println("\nInimigo encontrado: " + inimigo.getNome());
        int turno = 1;
        while (jogador.estaVivo() && inimigo.estaVivo()) {
            jogador.iniciarTurno();
            exibirStatus(estado, inimigo, turno);
            if (!turnoDoJogador(jogador, inimigo)) return ResultadoBatalha.INTERROMPIDA;
            estado.registrarTurnoJogador();
            // Um golpe fatal encerra a batalha antes da resposta inimiga.
            if (!inimigo.estaVivo()) return ResultadoBatalha.VITORIA;
            inimigo.iniciarTurno();
            turnoDoInimigo(inimigo, jogador);
            if (!jogador.estaVivo()) return ResultadoBatalha.DERROTA;
            turno++;
        }
        return jogador.estaVivo() ? ResultadoBatalha.VITORIA : ResultadoBatalha.DERROTA;
    }

    private void exibirStatus(EstadoPartida estado, Inimigo inimigo, int turno) {
        Personagem jogador = estado.getJogador();
        saida.printf("%nBatalha %d/5 | Turno %d%n", estado.getBatalhasIniciadas(), turno);
        saida.printf("%s: %d/%d de vida | %s: %d/%d de vida%n", jogador.getNome(),
                jogador.getVida(), jogador.getVidaMaxima(), inimigo.getNome(),
                inimigo.getVida(), inimigo.getVidaMaxima());
        saida.println("1 - Atacar\n2 - Defender");
        saida.printf("3 - Usar poção (%d restantes)%n", jogador.getPocoes());
    }

    private boolean turnoDoJogador(Personagem jogador, Inimigo inimigo) {
        while (true) {
            OptionalInt opcao = entrada.lerOpcao("Escolha sua ação: ", 1, 3);
            if (opcao.isEmpty()) return false;
            switch (opcao.getAsInt()) {
                case 1 -> {
                    saida.printf("%s atacou e causou %d de dano!%n", jogador.getNome(), jogador.atacar(inimigo));
                    return true;
                }
                case 2 -> {
                    jogador.defender();
                    saida.println(jogador.getNome() + " está defendendo.");
                    return true;
                }
                case 3 -> {
                    int antes = jogador.getVida();
                    if (jogador.usarPocao()) {
                        saida.printf("Poção usada: recuperou %d de vida.%n", jogador.getVida() - antes);
                        return true;
                    }
                    // A recusa não consome turno, estoque nem uma ação inimiga.
                    saida.println(jogador.getPocoes() == 0
                            ? "Sem poções restantes. Escolha outra ação."
                            : "Sua vida já está cheia. Escolha outra ação.");
                }
                default -> throw new IllegalStateException("Opção não validada.");
            }
        }
    }

    private void turnoDoInimigo(Inimigo inimigo, Personagem jogador) {
        if (random.nextInt(100) < 80) {
            saida.printf("%s atacou e causou %d de dano!%n", inimigo.getNome(), inimigo.atacar(jogador));
        } else {
            inimigo.defender();
            saida.println(inimigo.getNome() + " está defendendo.");
        }
    }
}
