# Jogo de Adivinhação

Jogo de console desenvolvido em Java para praticar lógica de programação, arrays, loops, estruturas de seleção e validação de entradas.

## Funcionalidades

- Menu principal com jogo clássico, regras, histórico, saída, modo sequência e recordes.
- Três níveis de dificuldade configurados com arrays.
- Palpites validados sem encerrar o programa em caso de erro.
- Feedback de direção e proximidade após cada palpite incorreto.
- Pontuação dinâmica de acordo com a dificuldade e as tentativas usadas.
- Histórico em memória das 10 últimas pontuações.
- Modo sequência com três números sorteados.
- Dicas de paridade, intervalo e proximidade com custo de pontos.
- Recordes em memória por dificuldade e modo.

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
            (base - 10 × tentativas usadas + 50 × tentativas não utilizadas - custo das dicas)
```

Exemplos:

- Vitória na primeira tentativa no nível Fácil: `100 - 10 + (9 × 50) = 540` pontos.
- Vitória na última tentativa no nível Fácil: `100 - (10 × 10) = 0` pontos.
- Derrota em qualquer dificuldade: `0` pontos.

O PDF determina o desconto por tentativa, mas não informa seu valor. O desconto de 10 pontos foi adotado como decisão deste projeto. Toda partida concluída entra no histórico, inclusive derrotas.

## Desafios adicionais

No menu, a opção **5** inicia o modo sequência e a opção **6** exibe os recordes. As opções 1 a 4 continuam sendo novo jogo clássico, regras, histórico e saída.

| Opção | Ação |
| ---: | --- |
| 1 | Iniciar jogo clássico |
| 2 | Ver regras |
| 3 | Ver histórico das 10 últimas partidas |
| 4 | Sair |
| 5 | Jogar modo sequência |
| 6 | Consultar recordes |

### Modo sequência

São sorteados três números em um array, dentro do intervalo da dificuldade escolhida; números repetidos são permitidos. O jogador deve acertar cada posição em ordem, com um novo limite de tentativas para cada número. A vitória soma as três pontuações, já descontadas as dicas. Uma vitória de zero pontos em uma posição permite continuar.

Se as tentativas de qualquer posição acabarem, a partida inteira vale zero e a sequência é revelada. Apenas um resultado é registrado no histórico, identificado como `Sequência`.

### Dicas

Digite `d` no campo de palpite para abrir o menu; `0` cancela. Dicas, cancelamentos e entradas inválidas não consomem tentativas.

| Dica | Custo | Informação |
| --- | ---: | --- |
| Paridade | 10 pontos | Número par ou ímpar |
| Intervalo | 20 pontos | Metade inferior ou superior, incluindo os limites |
| Proximidade | 15 pontos | Último palpite quente (distância até 25% do limite) ou frio |

Cada tipo só pode ser comprado uma vez por número. Proximidade exige um palpite válido anterior. As compras exigem saldo na pontuação projetada para uma vitória na tentativa atual. Todos os custos são acumulados e subtraídos antes de aplicar o limite mínimo de zero pontos. Os estados de compra reiniciam em cada número da sequência.

Exemplo: acertar na primeira tentativa no Fácil após comprar paridade e intervalo rende `540 - 10 - 20 = 510` pontos. Acertar os três números na primeira tentativa, sem dicas, rende `3 × 540 = 1620` pontos.

### Recordes

São guardadas as melhores pontuações de vitórias em cada dificuldade, separadamente para Clássico e Sequência. Empates ou resultados menores não substituem o recorde; derrotas não criam recordes. A primeira vitória com zero pontos é um recorde válido.

Os recordes não dependem dos dez resultados do histórico e continuam disponíveis mesmo após a saída de uma partida antiga. Histórico e recordes existem apenas em memória e são reiniciados ao encerrar o programa.

## Feedback dos palpites

Além de informar se o número correto é maior ou menor, o jogo compara a distância do palpite com o limite da dificuldade:

- Até 10% do limite: muito perto.
- Até 25% do limite: perto.
- Acima de 25% do limite: longe.

## Requisitos

- JDK 17 ou superior.

Nenhuma biblioteca externa é necessária.

Para conferir a instalação do Java, execute `java -version` e `javac -version` no terminal.

## Compilar

Na pasta `modulo-03/desafio`, compile o programa e os testes para a pasta ignorada `out/`:

```bash
mkdir -p out
javac --release 17 -d out src/*.java test/*.java
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
java -ea -cp out OptionalGameTest
java -ea -cp out HighScoresTest
```

Cada classe imprime `PASS` quando todos os cenários são concluídos. Os testes cobrem configurações de dificuldade, entradas inválidas, limites do número sorteado, feedback, vitória, derrota, pontuação, dicas, sequência, recordes, regras e limite do histórico.

## Estrutura

```text
desafio/
├── src/
│   ├── Main.java
│   ├── GuessingGame.java
│   ├── ScoreHistory.java
│   └── HighScores.java
├── test/
│   ├── GuessingGameTest.java
│   ├── ScoreHistoryTest.java
│   ├── GameFlowTest.java
│   ├── OptionalGameTest.java
│   └── HighScoresTest.java
├── .gitignore
└── README.md
```

- `Main`: cria as dependências e inicia o programa.
- `GuessingGame`: controla menu, dificuldades, validação, partida, feedback, pontuação e regras.
- `ScoreHistory`: guarda e exibe os 10 resultados mais recentes usando arrays de tamanho fixo.
- `HighScores`: mantém os melhores resultados em arrays por modo e dificuldade.

## Escopo

Esta versão implementa os requisitos obrigatórios e os três desafios bônus do PDF. Tentativas por posição da sequência, soma das pontuações, compras limitadas por número e separação dos recordes por modo são decisões do projeto, pois o enunciado não detalha essas regras.
