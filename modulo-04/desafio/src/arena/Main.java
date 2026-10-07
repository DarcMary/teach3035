package arena;

import arena.batalha.Batalha;
import arena.jogo.Jogo;
import arena.loja.Loja;
import arena.personagem.FabricaInimigos;
import arena.ranking.Ranking;
import arena.utilitarios.EntradaConsole;
import java.util.Random;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Um único leitor é compartilhado por todas as telas da sessão.
        try (Scanner scanner = new Scanner(System.in)) {
            EntradaConsole entrada = new EntradaConsole(scanner, System.out);
            Random random = new Random();
            Jogo jogo = new Jogo(entrada, System.out, new FabricaInimigos(random),
                    new Batalha(entrada, System.out, random), new Loja(entrada, System.out), new Ranking());
            jogo.iniciarJogo();
        }
    }
}
