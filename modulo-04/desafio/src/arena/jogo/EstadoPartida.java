package arena.jogo;

import arena.personagem.Personagem;
import java.util.Objects;

public class EstadoPartida {
    private final Personagem jogador;
    private int batalhasIniciadas;
    private int inimigosDerrotados;
    private int turnosJogador;
    private int pontos;
    private int moedas;

    public EstadoPartida(Personagem jogador) { this.jogador = Objects.requireNonNull(jogador); }
    public void registrarBatalhaIniciada() { batalhasIniciadas++; }
    public void registrarTurnoJogador() { turnosJogador++; }

    public void registrarVitoria() {
        // A campanha concede esta recompensa uma vez após cada batalha vencida.
        inimigosDerrotados++;
        pontos += 10;
        moedas += 20;
    }

    public boolean gastarMoedas(int valor) {
        if (valor <= 0) throw new IllegalArgumentException("O custo deve ser positivo.");
        if (moedas < valor) return false;
        moedas -= valor;
        return true;
    }

    public Personagem getJogador() { return jogador; }
    public int getBatalhasIniciadas() { return batalhasIniciadas; }
    public int getInimigosDerrotados() { return inimigosDerrotados; }
    public int getTurnosJogador() { return turnosJogador; }
    public int getPontos() { return pontos; }
    public int getMoedas() { return moedas; }
}
