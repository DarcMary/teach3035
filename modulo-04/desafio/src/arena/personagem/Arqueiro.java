package arena.personagem;

public class Arqueiro extends Personagem {
    public Arqueiro(String nome) { super(nome, 90, 25, 6, 3); }
    @Override public String getDescricao() { return "Equilíbrio entre ataque e resistência."; }
}
