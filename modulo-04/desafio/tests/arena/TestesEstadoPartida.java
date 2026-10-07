package arena;

import arena.jogo.EstadoPartida;
import arena.personagem.Personagem;

public class TestesEstadoPartida {
    public static void main(String[] args) {
        Personagem heroi = new Personagem("Ana", 100, 22, 8, 3);
        EstadoPartida estado = new EstadoPartida(heroi);
        assert estado.getJogador() == heroi;
        assert estado.getBatalhasIniciadas() == 0 && estado.getTurnosJogador() == 0;
        assert estado.getInimigosDerrotados() == 0 && estado.getPontos() == 0 && estado.getMoedas() == 0;
        assert !estado.gastarMoedas(20);
        estado.registrarBatalhaIniciada();
        estado.registrarTurnoJogador();
        estado.registrarVitoria();
        assert estado.getBatalhasIniciadas() == 1 && estado.getTurnosJogador() == 1;
        assert estado.getInimigosDerrotados() == 1 && estado.getPontos() == 10 && estado.getMoedas() == 20;
        assert estado.gastarMoedas(20) && estado.getMoedas() == 0;
        assert !estado.gastarMoedas(20);
        boolean rejeitado = false;
        try { estado.gastarMoedas(0); } catch (IllegalArgumentException e) { rejeitado = true; }
        assert rejeitado;
        EstadoPartida novo = new EstadoPartida(new Personagem("Ana", 100, 22, 8, 3));
        assert novo.getPontos() == 0 && novo.getMoedas() == 0 && novo.getTurnosJogador() == 0;
        System.out.println("OK: TestesEstadoPartida");
    }
}
