package arena;

import arena.personagem.Personagem;

public class TestesPersonagem {
    public static void main(String[] args) {
        Personagem atacante = new Personagem("Atacante", 100, 22, 8, 3);
        Personagem alvo = new Personagem("Alvo", 100, 22, 8, 3);
        assert atacante.atacar(alvo) == 14;
        assert alvo.getVida() == 86;
        alvo.defender();
        alvo.defender();
        assert atacante.atacar(alvo) == 7;
        assert atacante.atacar(alvo) == 14;
        alvo.defender();
        alvo.iniciarTurno();
        assert atacante.atacar(alvo) == 14;
        assert alvo.getVida() == 51;
        assert alvo.usarPocao();
        assert alvo.getVida() == 71 && alvo.getPocoes() == 2;
        assert alvo.getPocoesUsadas() == 1;
        assert alvo.usarPocao();
        assert alvo.usarPocao();
        assert alvo.getVida() == 100 && !alvo.usarPocao();
        assert alvo.getPocoesUsadas() == 3;
        assert alvo.tomarDano(999) == 100;
        assert alvo.getVida() == 0 && !alvo.estaVivo();
        assert !alvo.usarPocao() && alvo.atacar(atacante) == 0;
        assert alvo.tomarDano(99) == 0;

        Personagem resistente = new Personagem("Resistente", 100, 1, 8, 3);
        assert !resistente.usarPocao() && resistente.getPocoes() == 3;
        assert resistente.tomarDano(-20) == 0 && resistente.getVida() == 100;
        assert resistente.tomarDano(0) == 0;
        assert resistente.atacar(atacante) == 1;
        resistente.defender();
        assert resistente.tomarDano(23) == 8;
        resistente.melhorarVida(15);
        assert resistente.getVidaMaxima() == 115 && resistente.getVida() == 107;
        resistente.melhorarAtaque(3);
        assert resistente.getAtaque() == 4;
        esperarInvalido(() -> new Personagem(" ", 100, 1, 0, 3));
        esperarInvalido(() -> new Personagem(null, 100, 1, 0, 3));
        esperarInvalido(() -> new Personagem("Ana", 0, 1, 0, 3));
        esperarInvalido(() -> new Personagem("Ana", 100, 0, 0, 3));
        esperarInvalido(() -> new Personagem("Ana", 100, 1, -1, 3));
        esperarInvalido(() -> new Personagem("Ana", 100, 1, 0, -1));
        esperarInvalido(() -> resistente.melhorarAtaque(0));
        esperarInvalido(() -> resistente.melhorarVida(-1));
        System.out.println("OK: TestesPersonagem");
    }

    private static void esperarInvalido(Runnable acao) {
        boolean rejeitado = false;
        try { acao.run(); } catch (IllegalArgumentException e) { rejeitado = true; }
        assert rejeitado : "Valor inválido deve ser rejeitado";
    }
}
