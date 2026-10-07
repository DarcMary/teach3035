package arena.ranking;

import java.io.PrintStream;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

public class Ranking {
    private final Map<String, Integer> pontuacoes = new HashMap<>();

    public void registrar(String nome, int pontos) {
        if (nome == null || nome.trim().isEmpty() || pontos < 0) {
            throw new IllegalArgumentException("Nome e pontuação inválidos.");
        }
        pontuacoes.merge(nome.trim(), pontos, Math::max);
    }

    public Map<String, Integer> getPontuacoes() { return new HashMap<>(pontuacoes); }

    public void exibir(PrintStream saida) {
        saida.println("\n=== Ranking da sessão ===");
        if (pontuacoes.isEmpty()) {
            saida.println("Nenhuma partida registrada.");
            return;
        }
        // A ordem do Map não define a classificação: pontos, depois nome.
        pontuacoes.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue(Comparator.reverseOrder())
                        .thenComparing(Map.Entry.comparingByKey()))
                .forEach(item -> saida.printf("%s: %d pontos%n", item.getKey(), item.getValue()));
    }
}
