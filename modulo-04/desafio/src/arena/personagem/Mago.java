package arena.personagem;

public class Mago extends Personagem {
    public Mago(String nome) { super(nome, 80, 28, 4, 3); }
    @Override public String getDescricao() { return "Maior ataque, com menor resistência."; }
}
