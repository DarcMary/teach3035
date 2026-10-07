package arena;

import arena.personagem.FabricaInimigos;
import arena.personagem.Inimigo;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

public class TestesFabricaInimigos {
    public static void main(String[] args) {
        FabricaInimigos a = new FabricaInimigos(new Random(42));
        FabricaInimigos b = new FabricaInimigos(new Random(42));
        Set<String> nomes = new HashSet<>();
        Set<String> atributos = new HashSet<>();
        for (int i = 0; i < 100; i++) {
            int n = i % 5 + 1;
            Inimigo x = a.criar(n);
            Inimigo y = b.criar(n);
            assert x != y;
            assert x.getNome().equals(y.getNome());
            assert x.getVida() == y.getVida();
            assert x.getAtaque() == y.getAtaque();
            assert x.getDefesa() == y.getDefesa();
            assert x.getVida() >= 35 + 5 * (n - 1) && x.getVida() <= 45 + 5 * (n - 1);
            assert x.getAtaque() >= 10 + 2 * (n - 1) && x.getAtaque() <= 13 + 2 * (n - 1);
            assert x.getDefesa() >= 2 + n - 1 && x.getDefesa() <= 4 + n - 1;
            assert x.getPocoes() == 0;
            nomes.add(x.getNome());
            atributos.add(x.getVida() + ":" + x.getAtaque() + ":" + x.getDefesa());
        }
        assert nomes.size() > 1 && atributos.size() > 1;
        for (int n : new int[] {0, 6}) {
            boolean rejeitado = false;
            try { a.criar(n); } catch (IllegalArgumentException e) { rejeitado = true; }
            assert rejeitado;
        }
        System.out.println("OK: TestesFabricaInimigos");
    }
}
