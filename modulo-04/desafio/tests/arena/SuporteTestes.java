package arena;

import arena.utilitarios.EntradaConsole;
import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import java.util.Random;
import java.util.Scanner;

final class SuporteTestes {
    static final class Console {
        final ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        final PrintStream saida = new PrintStream(buffer, true, StandardCharsets.UTF_8);
        final EntradaConsole entrada;
        Console(String texto) { entrada = new EntradaConsole(new Scanner(texto), saida); }
        String texto() { return buffer.toString(StandardCharsets.UTF_8); }
    }
    static Random decisao(int valor) {
        return new Random(0) {
            @Override public int nextInt(int limite) { return valor; }
        };
    }
    static int ocorrencias(String texto, String trecho) {
        int total = 0;
        int posicao = 0;
        while ((posicao = texto.indexOf(trecho, posicao)) >= 0) {
            total++;
            posicao += trecho.length();
        }
        return total;
    }
}
