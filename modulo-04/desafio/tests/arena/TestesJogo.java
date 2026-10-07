package arena;

import arena.batalha.Batalha;
import arena.batalha.ResultadoBatalha;
import arena.jogo.EstadoPartida;
import arena.jogo.Jogo;
import arena.loja.Loja;
import arena.personagem.FabricaInimigos;
import arena.personagem.Inimigo;
import arena.ranking.Ranking;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class TestesJogo {
    private static final String VITORIA = "1\nAna\n1\n1\n0\n1\n0\n1\n0\n1\n0\n1\n";

    private static class Sessao {
        final SuporteTestes.Console console;
        final Ranking ranking = new Ranking();
        final List<EstadoPartida> estados = new ArrayList<>();
        final List<Integer> vidasIniciais = new ArrayList<>();
        final List<Integer> pocoesIniciais = new ArrayList<>();
        final Jogo jogo;

        Sessao(String entradas, FabricaInimigos fabrica) {
            console = new SuporteTestes.Console(entradas);
            Batalha batalha = new Batalha(console.entrada, console.saida, SuporteTestes.decisao(0)) {
                @Override public ResultadoBatalha executar(EstadoPartida estado, Inimigo inimigo) {
                    estados.add(estado);
                    vidasIniciais.add(estado.getJogador().getVida());
                    pocoesIniciais.add(estado.getJogador().getPocoes());
                    return super.executar(estado, inimigo);
                }
            };
            jogo = new Jogo(console.entrada, console.saida, fabrica, batalha,
                    new Loja(console.entrada, console.saida), ranking);
        }
        void executar() { jogo.iniciarJogo(); }
    }

    private static FabricaInimigos facil() {
        return new FabricaInimigos(new Random(0)) {
            @Override public Inimigo criar(int n) { return new Inimigo("Teste " + n, 1, 1, 0); }
        };
    }

    public static void main(String[] args) {
        Sessao sessao = new Sessao(VITORIA + "2\n0\n", facil());
        sessao.executar();
        assert sessao.ranking.getPontuacoes().get("Ana") == 50;
        assert sessao.estados.size() == 5;
        EstadoPartida finalizado = sessao.estados.get(4);
        assert finalizado.getInimigosDerrotados() == 5 && finalizado.getPontos() == 50;
        assert finalizado.getMoedas() == 100 && finalizado.getTurnosJogador() == 5;
        assert SuporteTestes.ocorrencias(sessao.console.texto(), "=== Loja entre batalhas ===") == 4;
        assert SuporteTestes.ocorrencias(sessao.console.texto(), "Parabéns, campeão da arena!") == 1;
        assert sessao.console.texto().contains("Inimigos derrotados: 5/5");
        assert sessao.console.texto().contains("Ana: 50 pontos");

        FabricaInimigos fatal = new FabricaInimigos(new Random(0)) {
            @Override public Inimigo criar(int n) { return new Inimigo("Fatal", 999, 999, 0); }
        };
        sessao = new Sessao("1\nAna\n1\n1\n0\n", fatal);
        sessao.executar();
        assert sessao.ranking.getPontuacoes().get("Ana") == 0;
        assert sessao.estados.size() == 1;
        assert sessao.console.texto().contains("Derrota!");
        assert !sessao.console.texto().contains("=== Loja");

        FabricaInimigos parcial = new FabricaInimigos(new Random(0)) {
            @Override public Inimigo criar(int n) {
                return n == 1 ? new Inimigo("Fraco", 1, 1, 0) : new Inimigo("Fatal", 999, 999, 0);
            }
        };
        sessao = new Sessao("1\nAna\n1\n1\n0\n1\n0\n", parcial);
        sessao.executar();
        assert sessao.ranking.getPontuacoes().get("Ana") == 10;
        assert sessao.estados.size() == 2 && sessao.estados.get(1).getMoedas() == 20;
        assert SuporteTestes.ocorrencias(sessao.console.texto(), "=== Loja entre batalhas ===") == 1;

        for (String entradas : new String[] {"", "1\n", "1\nAna\n", "1\nAna\n1\n", "1\nAna\n1\n1\n"}) {
            sessao = new Sessao(entradas, facil());
            sessao.executar();
            assert sessao.ranking.getPontuacoes().isEmpty();
            assert SuporteTestes.ocorrencias(sessao.console.texto(), "Entrada encerrada. Jogo finalizado.") == 1;
            assert !sessao.console.texto().contains("Parabéns, campeão da arena!");
            assert !sessao.console.texto().contains("Derrota!");
        }

        sessao = new Sessao("2\n0\n", facil());
        sessao.executar();
        assert sessao.console.texto().contains("Nenhuma partida registrada");
        assert sessao.estados.isEmpty();

        for (int classe = 1; classe <= 3; classe++) {
            sessao = new Sessao("abc\n1\n\n  \n Ana \n9\n" + classe + "\n", facil());
            sessao.executar();
            assert sessao.estados.size() == 1;
            assert sessao.estados.get(0).getJogador().getNome().equals("Ana");
            int[] vidas = {100, 80, 90};
            assert sessao.vidasIniciais.get(0) == vidas[classe - 1];
            assert sessao.console.texto().contains("Resistente, com maior vida e defesa.");
            assert sessao.console.texto().contains("Maior ataque, com menor resistência.");
            assert sessao.console.texto().contains("Equilíbrio entre ataque e resistência.");
        }

        FabricaInimigos duasPartidas = new FabricaInimigos(new Random(0)) {
            private int criados;
            @Override public Inimigo criar(int n) {
                return ++criados <= 5 ? new Inimigo("Fraco", 1, 1, 0) : new Inimigo("Fatal", 999, 999, 0);
            }
        };
        sessao = new Sessao(VITORIA + "1\nAna\n2\n1\n0\n", duasPartidas);
        sessao.executar();
        assert sessao.ranking.getPontuacoes().get("Ana") == 50;
        assert sessao.estados.size() == 6 && sessao.estados.get(0) != sessao.estados.get(5);
        assert sessao.vidasIniciais.get(5) == 80 && sessao.pocoesIniciais.get(5) == 3;
        assert sessao.estados.get(5).getPontos() == 0;

        FabricaInimigos desgaste = new FabricaInimigos(new Random(0)) {
            @Override public Inimigo criar(int n) { return new Inimigo("Teste " + n, n <= 2 ? 23 : 1, 10, 0); }
        };
        sessao = new Sessao("1\nAna\n1\n1\n1\n0\n3\n1\n1\n0\n1\n0\n1\n0\n1\n0\n", desgaste);
        sessao.executar();
        assert sessao.ranking.getPontuacoes().get("Ana") == 50;
        assert sessao.vidasIniciais.get(1) == 98;
        assert sessao.vidasIniciais.get(2) == 96 && sessao.pocoesIniciais.get(2) == 2;
        assert sessao.estados.get(4).getJogador().getPocoesUsadas() == 1;

        sessao = new Sessao("1\nAna\n1\n1\n1\n0\n1\n0\n1\n0\n1\n0\n1\n0\n", facil());
        sessao.executar();
        assert sessao.estados.get(4).getJogador().getAtaque() == 25;
        assert sessao.estados.get(4).getMoedas() == 80;
        System.out.println("OK: TestesJogo");
    }
}
