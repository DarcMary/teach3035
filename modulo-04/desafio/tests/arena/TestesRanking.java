package arena;

import arena.ranking.Ranking;

public class TestesRanking {
    public static void main(String[] args) {
        Ranking ranking = new Ranking();
        SuporteTestes.Console console = new SuporteTestes.Console("");
        ranking.exibir(console.saida);
        assert console.texto().contains("Nenhuma partida registrada");
        ranking.registrar(" Ana ", 20);
        ranking.registrar("Bruno", 30);
        ranking.registrar("Ana", 10);
        ranking.registrar("Ana", 40);
        ranking.registrar("Carlos", 30);
        assert ranking.getPontuacoes().get("Ana") == 40;
        assert ranking.getPontuacoes().size() == 3;
        ranking.getPontuacoes().clear();
        assert ranking.getPontuacoes().size() == 3;
        console = new SuporteTestes.Console("");
        ranking.exibir(console.saida);
        assert console.texto().indexOf("Ana") < console.texto().indexOf("Bruno");
        assert console.texto().indexOf("Bruno") < console.texto().indexOf("Carlos");
        ranking.registrar("ana", 0);
        assert ranking.getPontuacoes().size() == 4;
        for (Runnable acao : new Runnable[] {
                () -> ranking.registrar(" ", 10), () -> ranking.registrar("Ana", -1)}) {
            boolean rejeitado = false;
            try { acao.run(); } catch (IllegalArgumentException e) { rejeitado = true; }
            assert rejeitado;
        }
        System.out.println("OK: TestesRanking");
    }
}
