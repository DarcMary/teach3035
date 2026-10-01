# Jogo de Adivinhação

Jogo de console desenvolvido em Java para praticar lógica de programação, arrays, loops, estruturas de seleção e validação de entradas.

## Funcionalidades

- Menu principal com novo jogo, regras, histórico e saída.
- Três níveis de dificuldade configurados com arrays.
- Palpites validados sem encerrar o programa em caso de erro.
- Feedback de direção e proximidade após cada palpite incorreto.
- Pontuação dinâmica de acordo com a dificuldade e as tentativas usadas.
- Histórico em memória das 10 últimas pontuações.

## Dificuldades

| Nível | Intervalo | Tentativas | Pontuação base |
| --- | ---: | ---: | ---: |
| Fácil | 1 a 50 | 10 | 100 |
| Médio | 1 a 100 | 7 | 200 |
| Difícil | 1 a 200 | 5 | 300 |

## Pontuação

Em uma vitória, a pontuação é calculada assim:

```text
pontuação = máximo de 0 e
            (base - 10 × tentativas usadas + 50 × tentativas não utilizadas)
```

Exemplos:

- Vitória na primeira tentativa no nível Fácil: `100 - 10 + (9 × 50) = 540` pontos.
- Vitória na última tentativa no nível Fácil: `100 - (10 × 10) = 0` pontos.
- Derrota em qualquer dificuldade: `0` pontos.

O PDF determina o desconto por tentativa, mas não informa seu valor. O desconto de 10 pontos foi adotado como decisão deste projeto. Toda partida concluída entra no histórico, inclusive derrotas.

## Feedback dos palpites

Além de informar se o número correto é maior ou menor, o jogo compara a distância do palpite com o limite da dificuldade:

- Até 10% do limite: muito perto.
- Até 25% do limite: perto.
- Acima de 25% do limite: longe.

## Requisitos

- JDK 17 ou superior.

Nenhuma biblioteca externa é necessária.

## Compilar

Na pasta `desafio`:

```bash
rm -rf out
mkdir -p out
javac -d out src/*.java test/*.java
```

## Executar

```bash
java -cp out Main
```

## Executar os testes

```bash
java -ea -cp out GuessingGameTest
java -ea -cp out ScoreHistoryTest
java -ea -cp out GameFlowTest
```

Cada classe imprime `PASS` quando todos os cenários são concluídos. Os testes cobrem configurações de dificuldade, entradas inválidas, limites do número sorteado, feedback, vitória, derrota, pontuação, regras e limite do histórico.

## Estrutura

```text
desafio/
├── src/
│   ├── Main.java
│   ├── GuessingGame.java
│   └── ScoreHistory.java
├── test/
│   ├── GuessingGameTest.java
│   ├── ScoreHistoryTest.java
│   └── GameFlowTest.java
├── docs/superpowers/plans/
├── .gitignore
└── README.md
```

- `Main`: cria as dependências e inicia o programa.
- `GuessingGame`: controla menu, dificuldades, validação, partida, feedback, pontuação e regras.
- `ScoreHistory`: guarda e exibe os 10 resultados mais recentes usando arrays de tamanho fixo.

## Escopo

Esta versão implementa todos os requisitos obrigatórios. Modo sequência, sistema de dicas e recordes por dificuldade são desafios bônus e não fazem parte desta entrega.
