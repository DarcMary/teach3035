# Optional Challenges Implementation Plan

**Objetivo:** Implementar os três bônus do PDF com Java básico, arrays, testes determinísticos e commits em inglês.

## Decisões de implementação

- Preservar as opções 1 a 4. Adicionar 5 para sequência e 6 para recordes.
- Sequência: sortear um `int[3]`, permitir repetições e adivinhar cada posição em ordem. Cada posição tem o limite de tentativas da dificuldade. A vitória soma as três pontuações; a derrota registra zero para a partida inteira e revela a sequência. Registrar apenas um resultado no histórico, identificando o modo.
- Dicas: digitar `d` no campo de palpite abre um menu com cancelamento. Paridade custa 10 pontos; metade superior/inferior custa 20; quente/frio custa 15. Quente significa distância de até 25% do limite e frio significa acima desse valor, com base no último palpite válido.
- Uma dica de cada tipo por número. Dicas e cancelamento não usam tentativas. Proximidade exige um palpite anterior. Subtrair o custo antes de limitar a pontuação a zero; recusar compras se não houver saldo na projeção atual. Reiniciar dicas entre posições da sequência.
- Recordes em arrays, durante a sessão, por dificuldade e por modo. Atualizar apenas em vitória com pontuação superior; primeira vitória de zero pontos também é um resultado válido. Recordes sobrevivem à remoção de resultados antigos do histórico. Sem persistência em disco.

## Etapa 1 — Sequência

- [ ] Testar três acertos, repetição de números, derrota na segunda posição, limites e um único resultado no histórico.
- [ ] Implementar `playSequence(int difficultyIndex)` e integrar opção 5 ao menu.
- [ ] Reexecutar testes da versão obrigatória.
- [ ] Commit: `feat(sequence): add three-number game mode`.

## Etapa 2 — Dicas

- [ ] Testar custos exatos, cancelamento, dicas repetidas, proximidade antes do primeiro palpite, saldo insuficiente, validade da informação e desconto antes do limite zero.
- [ ] Implementar menu de dicas nos dois modos usando arrays de custos e estados de compra.
- [ ] Verificar que entradas inválidas e dicas não consomem tentativas; redefinir o estado por número.
- [ ] Commit: `feat(hints): add point-cost hint system`.

## Etapa 3 — Recordes

- [ ] Testar recordes vazios, primeira vitória, empate, resultado inferior, derrota, modos/dificuldades independentes e retenção após 11 partidas.
- [ ] Implementar `HighScores` e integrar registro de vitórias e opção 6.
- [ ] Commit: `feat(records): track high scores by difficulty`.

## Etapa 4 — Documentação e validação

- [ ] Atualizar regras e README com comandos, custos, sequência, pontuação e duração dos dados.
- [ ] Compilar com JDK 17 compatível: `javac --release 17 -Xlint:all -Werror -d out src/*.java test/*.java`.
- [ ] Executar todas as classes `*Test` e verificar o fluxo pelo console.
- [ ] Revisar diff e arquivos incluídos em cada commit.
- [ ] Commit: `docs: document optional game challenges`.
