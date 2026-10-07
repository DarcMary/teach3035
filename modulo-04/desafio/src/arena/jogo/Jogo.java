package arena.jogo;

import arena.batalha.Batalha;
import arena.batalha.ResultadoBatalha;
import arena.loja.Loja;
import arena.personagem.Arqueiro;
import arena.personagem.FabricaInimigos;
import arena.personagem.Guerreiro;
import arena.personagem.Mago;
import arena.personagem.Personagem;
import arena.ranking.Ranking;
import arena.utilitarios.EntradaConsole;
import java.io.PrintStream;
import java.util.Objects;
import java.util.Optional;
import java.util.OptionalInt;

public class Jogo {
    private static final int TOTAL_BATALHAS = 5;
    private final EntradaConsole entrada;
    private final PrintStream saida;
    private final FabricaInimigos fabrica;
    private final Batalha batalha;
    private final Loja loja;
    private final Ranking ranking;

    public Jogo(EntradaConsole entrada, PrintStream saida, FabricaInimigos fabrica,
                Batalha batalha, Loja loja, Ranking ranking) {
        this.entrada = Objects.requireNonNull(entrada);
        this.saida = Objects.requireNonNull(saida);
        this.fabrica = Objects.requireNonNull(fabrica);
        this.batalha = Objects.requireNonNull(batalha);
        this.loja = Objects.requireNonNull(loja);
        this.ranking = Objects.requireNonNull(ranking);
    }

    public void iniciarJogo() {
        saida.println("Bem-vindo à Arena dos Campeões!");
        while (true) {
            saida.println("\n1 - Jogar\n2 - Ranking\n0 - Sair");
            OptionalInt opcao = entrada.lerOpcao("Escolha uma opção: ", 0, 2);
            if (opcao.isEmpty()) break;
            switch (opcao.getAsInt()) {
                case 0 -> {
                    saida.println("Até a próxima, campeão!");
                    return;
                }
                case 2 -> ranking.exibir(saida);
                case 1 -> {
                    Optional<Personagem> jogador = selecionarPersonagem();
                    if (jogador.isEmpty() || !jogarPartida(jogador.get())) {
                        encerrarEntrada();
                        return;
                    }
                }
                default -> throw new IllegalStateException("Opção não validada.");
            }
        }
        encerrarEntrada();
    }

    private Optional<Personagem> selecionarPersonagem() {
        Optional<String> nome = entrada.lerTextoNaoVazio("Digite seu nome: ");
        if (nome.isEmpty()) return Optional.empty();
        Personagem[] classes = {new Guerreiro(nome.get()), new Mago(nome.get()), new Arqueiro(nome.get())};
        String[] nomes = {"Guerreiro", "Mago", "Arqueiro"};
        saida.println("\nEscolha sua classe:");
        for (int i = 0; i < classes.length; i++) {
            Personagem personagem = classes[i];
            saida.printf("%d - %s: %s Vida: %d | Ataque: %d | Defesa: %d%n", i + 1, nomes[i],
                    personagem.getDescricao(), personagem.getVida(), personagem.getAtaque(), personagem.getDefesa());
        }
        OptionalInt escolha = entrada.lerOpcao("Classe: ", 1, 3);
        if (escolha.isEmpty()) return Optional.empty();
        saida.println("Você escolheu: " + nomes[escolha.getAsInt() - 1]);
        return Optional.of(classes[escolha.getAsInt() - 1]);
    }

    private boolean jogarPartida(Personagem jogador) {
        // Cada campanha usa outro estado; o ranking pertence à sessão inteira.
        EstadoPartida estado = new EstadoPartida(jogador);
        for (int numero = 1; numero <= TOTAL_BATALHAS; numero++) {
            ResultadoBatalha resultado = batalha.executar(estado, fabrica.criar(numero));
            if (resultado == ResultadoBatalha.INTERROMPIDA) return false;
            if (resultado == ResultadoBatalha.DERROTA) {
                fimDeJogo(estado, false);
                return true;
            }
            // Só este controlador concede os pontos e moedas da vitória.
            estado.registrarVitoria();
            saida.println("Inimigo derrotado! +10 pontos e +20 moedas.");
            if (numero < TOTAL_BATALHAS && !loja.abrir(estado)) return false;
        }
        fimDeJogo(estado, true);
        return true;
    }

    private void fimDeJogo(EstadoPartida estado, boolean venceu) {
        saida.println(venceu ? "\nParabéns, campeão da arena!" : "\nDerrota! Seu herói caiu na arena.");
        Personagem jogador = estado.getJogador();
        saida.printf("Batalhas iniciadas: %d%nInimigos derrotados: %d/%d%nTurnos: %d%n",
                estado.getBatalhasIniciadas(), estado.getInimigosDerrotados(), TOTAL_BATALHAS, estado.getTurnosJogador());
        saida.printf("Vida: %d/%d%nPoções usadas: %d | Restantes: %d%nPontos: %d | Moedas: %d%n",
                jogador.getVida(), jogador.getVidaMaxima(), jogador.getPocoesUsadas(), jogador.getPocoes(),
                estado.getPontos(), estado.getMoedas());
        ranking.registrar(jogador.getNome(), estado.getPontos());
    }

    private void encerrarEntrada() {
        // Interrupções não são vitória/derrota e não entram no ranking.
        saida.println("\nEntrada encerrada. Jogo finalizado.");
    }
}
