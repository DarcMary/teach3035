ARENA DOS CAMPEÕES - BATALHAS POR TURNOS
======================================

Aplicação de terminal em Java para o desafio final de orientação a objetos.
Inclui todos os requisitos obrigatórios e os cinco bônus do enunciado.

REQUISITOS
----------
JDK 17 ou superior, com java e javac disponíveis no PATH. Nenhuma biblioteca
externa, Maven ou Gradle é necessária. Os comandos abaixo são para um terminal
macOS/Linux e devem ser executados na pasta modulo-04/desafio.

Confirme o ambiente:
  java -version
  javac -version

COMPILAR E JOGAR
---------------
  mkdir -p out
  find src -name '*.java' > fontes.txt
  javac -encoding UTF-8 -d out @fontes.txt
  java -cp out arena.Main

COMO JOGAR
----------
Menu inicial:
  1 - Jogar: informe um nome e escolha sua classe.
  2 - Ranking: veja as melhores pontuações desta execução.
  0 - Sair.

Classes, todas com 3 poções:
  Guerreiro: vida 100, ataque 22, defesa 8. Maior resistência.
  Mago: vida 80, ataque 28, defesa 4. Maior ataque.
  Arqueiro: vida 90, ataque 25, defesa 6. Equilibrado.

A campanha tem cinco batalhas, com nomes e atributos dos inimigos sorteados.
Os atributos dos inimigos aumentam ao longo da campanha. O jogador age primeiro.
Em cada turno, confira sua vida e a do inimigo e escolha:
  1 - Atacar.
  2 - Defender.
  3 - Usar poção.

Dano: ataque do atacante menos defesa do alvo, com mínimo de 1. Defender reduz
o dano desse golpe à metade, arredondando para cima. A defesa vale até o próximo
ataque recebido ou até o início do próprio turno seguinte e não acumula.
O inimigo ataca em 80% das decisões e defende nas demais.

Uma poção restaura até 20 de vida, sem ultrapassar a vida máxima. Existem
exatamente três por partida. Vida cheia ou estoque vazio recusam a ação sem
consumir turno. Uma poção usada permite a resposta do inimigo.
Vida, poções e melhorias são conservadas entre as batalhas. Não há cura gratuita
nem reposição de poções. Um inimigo derrotado não pode contra-atacar.

A partida termina na morte do jogador ou na derrota dos cinco inimigos.
O resumo mostra batalhas, inimigos derrotados, turnos, vida, poções, pontos e
moedas. Depois, o menu permite iniciar outra partida com os atributos iniciais,
três poções e todos os contadores zerados.

BÔNUS IMPLEMENTADOS
-------------------
1. Pontuação: 10 pontos por inimigo derrotado; vitória completa vale 50 pontos.
2. Ranking: Map<String, Integer> guarda a melhor pontuação por nome. Partidas
   derrotadas preservam os pontos obtidos. Ordenação por pontos decrescentes e
   nome crescente nos empates. Espaços no início/fim do nome são removidos;
   maiúsculas e minúsculas são distintas. O ranking dura até fechar o programa.
3. Loja: cada vitória rende 20 moedas. A loja abre entre batalhas, nunca após
   derrota ou vitória final. +3 ataque custa 20; +15 vida máxima custa 20 e
   recupera 15 de vida. Pode comprar enquanto houver saldo ou escolher 0 para
   continuar. Não vende poções. As melhorias valem pela partida atual.
4. Seleção de classes com descrição e atributos antes da escolha.
5. Organização em pacotes separados por responsabilidade.

ENTRADAS E ENCERRAMENTO
----------------------
Nome vazio é recusado. Texto, números decimais, inteiros muito grandes e opções
fora do menu exibem uma mensagem e permitem tentar novamente. Não alteram
recursos nem dão ao inimigo um turno extra.

O fim da entrada (Ctrl+D no terminal macOS/Linux) encerra o programa com uma
mensagem. Partidas interrompidas não são registradas como vitória ou derrota
no ranking. Para sair normalmente, escolha 0 no menu principal.

TESTES
------
Os testes usam a biblioteca padrão e asserções Java. A opção -ea é obrigatória:
sem ela, as asserções não verificam as regras e algumas ações dos testes não
são executadas.

  mkdir -p out
  find src tests -name '*.java' > fontes-testes.txt
  javac -encoding UTF-8 -Xlint:all -d out @fontes-testes.txt
  java -ea -cp out arena.TestesPersonagem
  java -ea -cp out arena.TestesEntradaConsole
  java -ea -cp out arena.TestesFabricaInimigos
  java -ea -cp out arena.TestesEstadoPartida
  java -ea -cp out arena.TestesBatalha
  java -ea -cp out arena.TestesLoja
  java -ea -cp out arena.TestesRanking
  java -ea -cp out arena.TestesJogo

Cada classe imprime OK somente depois das verificações passarem. Os testes
cobrem cura e inventário, defesa temporária, morte, validação, aleatoriedade
reproduzível, recompensas, compras, ranking, cinco batalhas, novas partidas,
conservação de recursos e interrupção em cada tela.

ESTRUTURA
---------
src/arena/Main.java          Entrada do programa e montagem dos componentes.
src/arena/personagem/       Personagens, subclasses e fábrica de inimigos.
src/arena/batalha/          Status, turnos, IA e resultado da batalha.
src/arena/jogo/             Menu, campanha e estado da partida.
src/arena/loja/             Compras e menu da loja.
src/arena/ranking/          Pontuações e classificação da sessão.
src/arena/utilitarios/     Entrada validada usando um Scanner compartilhado.
tests/arena/                Verificações executáveis, sem dependências externas.

Comentários no código explicam as regras de defesa, cura, recompensas e EOF.
Arquivos compilados e listas temporárias de fontes são ignorados pelo Git.
Print ou vídeo da execução é uma evidência opcional no enunciado.
