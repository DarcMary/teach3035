package arena;

import arena.jogo.EstadoPartida;
import arena.loja.Loja;
import arena.personagem.Guerreiro;

public class TestesLoja {
    public static void main(String[] args) {
        SuporteTestes.Console console = new SuporteTestes.Console("1\n9\n1\n0\n");
        Loja loja = new Loja(console.entrada, console.saida);
        EstadoPartida estado = new EstadoPartida(new Guerreiro("Ana"));
        assert !loja.comprarAtaque(estado) && estado.getJogador().getAtaque() == 22;
        estado.registrarVitoria();
        assert loja.abrir(estado);
        assert estado.getJogador().getAtaque() == 25 && estado.getMoedas() == 0;
        assert console.texto().contains("Moedas insuficientes");
        assert !loja.comprarAtaque(estado);
        estado = new EstadoPartida(new Guerreiro("Ana"));
        estado.getJogador().tomarDano(38);
        estado.registrarVitoria();
        assert loja.comprarVida(estado);
        assert estado.getJogador().getVida() == 85 && estado.getJogador().getVidaMaxima() == 115;
        assert estado.getMoedas() == 0 && estado.getJogador().getPocoes() == 3;
        assert !loja.comprarVida(estado) && estado.getJogador().getVidaMaxima() == 115;
        console = new SuporteTestes.Console("");
        assert !new Loja(console.entrada, console.saida).abrir(estado);
        console = new SuporteTestes.Console("2\n2\n0\n");
        estado.registrarVitoria();
        estado.registrarVitoria();
        assert new Loja(console.entrada, console.saida).abrir(estado);
        assert estado.getMoedas() == 0 && estado.getJogador().getVidaMaxima() == 145;
        System.out.println("OK: TestesLoja");
    }
}
