package arena.utilitarios;

import java.io.PrintStream;
import java.util.Objects;
import java.util.Optional;
import java.util.OptionalInt;
import java.util.Scanner;

public class EntradaConsole {
    private final Scanner scanner;
    private final PrintStream saida;

    public EntradaConsole(Scanner scanner, PrintStream saida) {
        this.scanner = Objects.requireNonNull(scanner);
        this.saida = Objects.requireNonNull(saida);
    }

    public Optional<String> lerTextoNaoVazio(String mensagem) {
        while (true) {
            saida.print(mensagem);
            if (!scanner.hasNextLine()) return Optional.empty();
            String texto = scanner.nextLine().trim();
            if (!texto.isEmpty()) return Optional.of(texto);
            saida.println("O nome não pode ficar vazio.");
        }
    }

    public OptionalInt lerOpcao(String mensagem, int minimo, int maximo) {
        if (minimo > maximo) throw new IllegalArgumentException("Intervalo inválido.");
        while (true) {
            saida.print(mensagem);
            // EOF é diferente de erro de digitação: deve chegar ao controlador.
            if (!scanner.hasNextLine()) return OptionalInt.empty();
            try {
                int opcao = Integer.parseInt(scanner.nextLine().trim());
                if (opcao >= minimo && opcao <= maximo) return OptionalInt.of(opcao);
            } catch (NumberFormatException e) {
                // Inclui texto, números decimais e inteiros fora do limite de int.
            }
            saida.printf("Opção inválida. Digite um número de %d a %d.%n", minimo, maximo);
        }
    }
}
