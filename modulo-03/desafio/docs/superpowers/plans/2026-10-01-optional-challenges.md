# Optional Challenges Implementation Plan

**Objetivo:** Implementar os três bônus do PDF com Java básico, arrays, testes determinísticos e commits em inglês.

## Decisões de implementação

- Preservar as opções 1 a 4. Adicionar 5 para sequência e 6 para recordes.
- Sequência: sortear um `int[3]`, permitir repetições e adivinhar cada posição em ordem. Cada posição tem o limite de tentativas da dificuldade. A vitória soma as três pontuações; a derrota registra zero para a partida inteira e revela a sequência. Registrar apenas um resultado no histórico, identificando o modo.
- Dicas: digitar `d` no campo de palpite abre um menu com cancelamento. Paridade custa 10 pontos; metade superior/inferior custa 20; quente/frio custa 15. Quente significa distância de até 25% do limite e frio significa acima desse valor, com base no último palpite válido.
- Uma dica de cada tipo por número. Dicas e cancelamento não usam tentativas. Proximidade exige um palpite anterior. Subtrair o custo antes de limitar a pontuação a zero; recusar compras se não houver saldo na projeção atual. Reiniciar dicas entre posições da sequência.
- Recordes em arrays, durante a sessão, por dificuldade e por modo. Atualizar apenas em vitória com pontuação superior; primeira vitória de zero pontos também é um resultado válido. Recordes sobrevivem à remoção de resultados antigos do histórico. Sem persistência em disco.

## Etapa 1 — Sequência

- [x] Testar três acertos, repetição de números, derrota na segunda posição, limites e um único resultado no histórico.
- [x] Implementar `playSequence(int difficultyIndex)` e integrar opção 5 ao menu.
- [x] Reexecutar testes da versão obrigatória.
- [x] Commit: `feat(sequence): add three-number game mode`.

## Etapa 2 — Dicas

- [x] Testar custos exatos, cancelamento, dicas repetidas, proximidade antes do primeiro palpite, saldo insuficiente, validade da informação e desconto antes do limite zero.
- [x] Implementar menu de dicas nos dois modos usando arrays de custos e estados de compra.
- [x] Verificar que entradas inválidas e dicas não consomem tentativas; redefinir o estado por número.
- [x] Commit: `feat(hints): add point-cost hint system`.

## Etapa 3 — Recordes

- [x] Testar recordes vazios, primeira vitória, empate, resultado inferior, derrota, modos/dificuldades independentes e retenção após 11 partidas.
- [x] Implementar `HighScores` e integrar registro de vitórias e opção 6.
- [x] Commit: `feat(records): track high scores by difficulty`.

## Etapa 4 — Documentação e validação

- [x] Atualizar regras e README com comandos, custos, sequência, pontuação e duração dos dados.
- [x] Compilar com JDK 17 compatível: `javac --release 17 -Xlint:all -Werror -d out src/*.java test/*.java`.
- [x] Executar todas as classes `*Test` e verificar o fluxo pelo console.
- [x] Revisar diff e arquivos incluídos em cada commit.
- [x] Commit: `docs: document optional game challenges`.

## Validação final

As cinco suítes (`GuessingGameTest`, `ScoreHistoryTest`, `GameFlowTest`, `OptionalGameTest` e `HighScoresTest`) passaram com compilação compatível com Java 17 e sem avisos. A revisão independente do código não encontrou divergências com o plano. Os dados de histórico e recordes permanecem em memória durante a sessão.
