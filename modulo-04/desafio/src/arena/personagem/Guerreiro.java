package arena.personagem;

public class Guerreiro extends Personagem {
    public Guerreiro(String nome) { super(nome, 100, 22, 8, 3); }
    @Override public String getDescricao() { return "Resistente, com maior vida e defesa."; }
}
