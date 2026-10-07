package arena;

import arena.batalha.Batalha;
import arena.batalha.ResultadoBatalha;
import arena.jogo.EstadoPartida;
import arena.personagem.Guerreiro;
import arena.personagem.Inimigo;
import arena.personagem.Personagem;

public class TestesBatalha {
    public static void main(String[] args) {
        SuporteTestes.Console console = new SuporteTestes.Console("1\n");
        Personagem heroi = new Personagem("Ana", 100, 100, 8, 3);
        EstadoPartida estado = new EstadoPartida(heroi);
        assert new Batalha(console.entrada, console.saida, SuporteTestes.decisao(0))
                .executar(estado, new Inimigo("Fraco", 10, 999, 0)) == ResultadoBatalha.VITORIA;
        assert heroi.getVida() == 100 && estado.getTurnosJogador() == 1;
        assert estado.getBatalhasIniciadas() == 1 && estado.getPontos() == 0;
        assert console.texto().contains("Batalha 1/5") && console.texto().contains("Turno 1");
        assert console.texto().contains("3 - Usar poção (3 restantes)");
        assert console.texto().contains("causou 10 de dano");

        console = new SuporteTestes.Console("1\n");
        estado = new EstadoPartida(new Guerreiro("Ana"));
        assert new Batalha(console.entrada, console.saida, SuporteTestes.decisao(0))
                .executar(estado, new Inimigo("Forte", 999, 999, 0)) == ResultadoBatalha.DERROTA;
        assert estado.getJogador().getVida() == 0 && estado.getTurnosJogador() == 1;

        console = new SuporteTestes.Console("texto\n9\n3\n1\n");
        estado = new EstadoPartida(new Guerreiro("Ana"));
        assert new Batalha(console.entrada, console.saida, SuporteTestes.decisao(79))
                .executar(estado, new Inimigo("Alvo", 100, 10, 0)) == ResultadoBatalha.INTERROMPIDA;
        assert estado.getJogador().getVida() == 98 && estado.getTurnosJogador() == 1;
        assert estado.getJogador().getPocoes() == 3;
        assert SuporteTestes.ocorrencias(console.texto(), "Alvo atacou") == 1;
        assert console.texto().contains("vida já está cheia");

        console = new SuporteTestes.Console("2\n");
        estado = new EstadoPartida(new Guerreiro("Ana"));
        new Batalha(console.entrada, console.saida, SuporteTestes.decisao(0))
                .executar(estado, new Inimigo("Alvo", 100, 22, 0));
        assert estado.getJogador().getVida() == 93;

        console = new SuporteTestes.Console("1\n1\n");
        estado = new EstadoPartida(new Guerreiro("Ana"));
        Inimigo inimigo = new Inimigo("Alvo", 100, 999, 0);
        new Batalha(console.entrada, console.saida, SuporteTestes.decisao(80)).executar(estado, inimigo);
        assert inimigo.getVida() == 67 && estado.getJogador().getVida() == 100;
        assert SuporteTestes.ocorrencias(console.texto(), "Alvo está defendendo") == 2;

        console = new SuporteTestes.Console("3\n");
        heroi = new Guerreiro("Ana");
        heroi.tomarDano(38);
        estado = new EstadoPartida(heroi);
        new Batalha(console.entrada, console.saida, SuporteTestes.decisao(0))
                .executar(estado, new Inimigo("Alvo", 100, 10, 0));
        assert heroi.getVida() == 88 && heroi.getPocoes() == 2 && heroi.getPocoesUsadas() == 1;
        assert estado.getTurnosJogador() == 1;

        console = new SuporteTestes.Console("3\n");
        heroi = new Guerreiro("Ana");
        heroi.tomarDano(78);
        assert heroi.usarPocao() && heroi.usarPocao() && heroi.usarPocao();
        estado = new EstadoPartida(heroi);
        new Batalha(console.entrada, console.saida, SuporteTestes.decisao(0))
                .executar(estado, new Inimigo("Alvo", 100, 10, 0));
        assert estado.getTurnosJogador() == 0 && heroi.getVida() == 90;
        assert console.texto().contains("Sem poções");

        console = new SuporteTestes.Console("");
        estado = new EstadoPartida(new Guerreiro("Ana"));
        assert new Batalha(console.entrada, console.saida, SuporteTestes.decisao(0))
                .executar(estado, new Inimigo("Alvo", 100, 10, 0)) == ResultadoBatalha.INTERROMPIDA;
        assert estado.getTurnosJogador() == 0 && estado.getJogador().getVida() == 100;
        System.out.println("OK: TestesBatalha");
    }
}
