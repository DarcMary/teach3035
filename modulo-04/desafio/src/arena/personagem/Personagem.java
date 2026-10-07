package arena.personagem;

import java.util.Objects;

/** Atributos e regras compartilhados por heróis e inimigos. */
public class Personagem {
    private final String nome;
    private int vida;
    private int vidaMaxima;
    private int ataque;
    private final int defesa;
    private int pocoes;
    private int pocoesUsadas;
    private boolean defendendo;

    public Personagem(String nome, int vida, int ataque, int defesa, int pocoes) {
        if (nome == null || nome.trim().isEmpty() || vida <= 0 || ataque <= 0 || defesa < 0 || pocoes < 0) {
            throw new IllegalArgumentException("Nome e atributos do personagem inválidos.");
        }
        this.nome = nome.trim();
        this.vida = vida;
        this.vidaMaxima = vida;
        this.ataque = ataque;
        this.defesa = defesa;
        this.pocoes = pocoes;
    }

    public int atacar(Personagem alvo) {
        Objects.requireNonNull(alvo, "Alvo obrigatório.");
        return estaVivo() ? alvo.tomarDano(ataque) : 0;
    }

    public void defender() {
        if (estaVivo()) defendendo = true;
    }

    public int tomarDano(int dano) {
        if (dano <= 0 || !estaVivo()) return 0;
        // A defesa base é descontada uma única vez, sempre no alvo.
        int recebido = Math.max(1, dano - defesa);
        if (defendendo) recebido = recebido / 2 + recebido % 2;
        defendendo = false;
        int efetivo = Math.min(vida, recebido);
        vida -= efetivo;
        return efetivo;
    }

    public boolean estaVivo() { return vida > 0; }

    public void iniciarTurno() {
        // Uma defesa não atingida também expira no próximo turno do defensor.
        defendendo = false;
    }

    public boolean usarPocao() {
        if (!estaVivo() || pocoes == 0 || vida == vidaMaxima) return false;
        // Cura parcial nunca ultrapassa a vida máxima nem repõe o inventário.
        vida += Math.min(20, vidaMaxima - vida);
        pocoes--;
        pocoesUsadas++;
        return true;
    }

    public void melhorarAtaque(int bonus) {
        validarBonus(bonus);
        ataque = Math.addExact(ataque, bonus);
    }

    public void melhorarVida(int bonus) {
        validarBonus(bonus);
        int novoMaximo = Math.addExact(vidaMaxima, bonus);
        vida = Math.addExact(vida, bonus);
        vidaMaxima = novoMaximo;
    }

    private void validarBonus(int bonus) {
        if (bonus <= 0) throw new IllegalArgumentException("O bônus deve ser positivo.");
    }

    public String getDescricao() { return "Combatente da arena."; }
    public String getNome() { return nome; }
    public int getVida() { return vida; }
    public int getVidaMaxima() { return vidaMaxima; }
    public int getAtaque() { return ataque; }
    public int getDefesa() { return defesa; }
    public int getPocoes() { return pocoes; }
    public int getPocoesUsadas() { return pocoesUsadas; }
}
