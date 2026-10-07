package arena;

import arena.utilitarios.EntradaConsole;
import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.util.Scanner;

public class TestesEntradaConsole {
    public static void main(String[] args) {
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        EntradaConsole entrada = new EntradaConsole(new Scanner("abc\n0\n9\n2147483648\n1.5\n 2 \n\n  \n Ana \n"), new PrintStream(buffer));
        assert entrada.lerOpcao("Classe: ", 1, 3).orElseThrow() == 2;
        assert entrada.lerTextoNaoVazio("Nome: ").orElseThrow().equals("Ana");
        assert entrada.lerOpcao("Classe: ", 1, 3).isEmpty();
        assert entrada.lerTextoNaoVazio("Nome: ").isEmpty();
        assert buffer.toString().contains("Opção inválida");
        assert buffer.toString().contains("não pode ficar vazio");
        EntradaConsole zero = new EntradaConsole(new Scanner("0\n"), new PrintStream(new ByteArrayOutputStream()));
        assert zero.lerOpcao("Menu: ", 0, 2).orElseThrow() == 0;
        System.out.println("OK: TestesEntradaConsole");
    }
}
