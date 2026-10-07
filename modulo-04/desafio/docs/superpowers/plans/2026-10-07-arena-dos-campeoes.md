# Arena dos Campeões - Plano de implementação

> **Para execução por agentes:** usar a habilidade `executing-plans` para implementar este plano tarefa por tarefa. Os passos usam caixas de seleção para acompanhar o progresso.

**Objetivo:** construir um RPG de terminal em Java que cumpra todos os requisitos do enunciado, incluindo os cinco bônus da seção de desafio opcional.

**Arquitetura:** personagens encapsulam atributos e regras de combate; a batalha controla os turnos; o jogo coordena seleção, campanha, loja e ranking. Entrada e saída ficam separadas das regras, e a aleatoriedade é recebida por construtor para permitir testes reproduzíveis.

**Tecnologias propostas:** JDK 17, biblioteca padrão Java, `Scanner`, `Random`, coleções e testes executáveis com `assert`, sem dependências externas.

## 1. Fonte, escopo e contexto

Fonte: [enunciado Arena dos Campeões](</Users/darcmary/Downloads/950Desafio módulo POO - Arena Campeões893.pdf>), nove páginas. Os requisitos de programação estão nas páginas 3 a 6, os bônus na página 7 e a entrega na página 8.

Este documento planeja a implementação; não constitui a implementação do jogo. Os números e comportamentos identificados como decisões propostas abaixo complementam pontos que o PDF deixa em aberto. O exemplo de execução da página 8 ilustra a interface, sem estabelecer valores obrigatórios para todos os personagens.

A pasta `modulo-04/desafio` estava vazia na inspeção inicial. O repositório Git está na pasta superior `teach3035`; criar todos os arquivos deste projeto dentro de `modulo-04/desafio`. Na inspeção inicial, `java -version` não encontrou um runtime Java utilizável. Antes de executar o plano, disponibilizar um JDK com `java` e `javac`; a escolha de versão 17 é deste plano, não uma exigência do PDF.

### Restrições globais extraídas do enunciado

- Aplicação Java executada e jogável no terminal.
- Combate por turnos, orientação a objetos, controle de estado e modularização.
- Escolha de nome e classe pelo jogador.
- Classe `Personagem` com `nome` (`String`), `vida`, `ataque`, `defesa` (`int`) e inventário por lista ou contagem simples.
- Métodos `atacar(Personagem alvo)`, `defender()`, `tomarDano(int dano)` e `estaVivo(): boolean`.
- Subclasses `Guerreiro`, `Mago` e `Arqueiro`, com atributos e/ou métodos específicos.
- Ações atacar, defender e usar poção; poção restaura 20 de vida, com 3 por partida.
- Uso de `Scanner`, informações de vida e ações em cada turno e IA simples do inimigo.
- Inimigos aleatórios com nomes e atributos variados.
- Encerramento por morte do jogador ou derrota de todos os oponentes, com mensagem correspondente.
- Controle de batalhas, vida e itens usados; validação das entradas sem crashes por opções inválidas.
- Código organizado, comentários explicativos e arquivo `README.txt` com instruções de execução.
- Incluir neste projeto todos os bônus: pontuação, ranking com `Map<String, Integer>`, loja, seleção com descrição e pacotes.

## 2. Abordagem recomendada

Usar Java puro, pacotes pequenos e compilação com `javac`. Isso mantém a implementação próxima do conteúdo de Java básico e POO pedido pelo desafio.

Alternativas avaliadas: Maven com JUnit facilitaria a automação dos testes, mas acrescentaria ferramentas e dependências; um único arquivo simplificaria o início, mas prejudicaria a modularização e o bônus de pacotes. A estrutura abaixo permite testar o domínio sem adicionar ferramentas de build.

## 3. Decisões propostas e regras precisas

### Personagens e combate

| Classe | Vida inicial/máxima | Ataque | Defesa | Descrição na seleção |
|---|---:|---:|---:|---|
| Guerreiro | 100 | 22 | 8 | Resistente, com maior vida e defesa. |
| Mago | 80 | 28 | 4 | Maior ataque, com menor resistência. |
| Arqueiro | 90 | 25 | 6 | Equilíbrio entre ataque e resistência. |

- Cada herói começa com exatamente 3 poções; inimigos começam com 0.
- Personagens guardam `vidaMaxima` além dos atributos exigidos, para limitar a cura.
- Ataque básico: `max(1, ataqueDoAtacante - defesaDoAlvo)`.
- Defesa ativa reduz esse resultado à metade, arredondando para cima: `(dano + 1) / 2`.
- A defesa expira após um ataque recebido ou no início do próximo turno de quem defendeu, o que acontecer primeiro. O bônus não acumula.
- `tomarDano` recebe o ataque bruto e aplica a defesa do alvo; `atacar` não subtrai a defesa novamente. Ambos retornam o dano efetivamente retirado da vida, útil para as mensagens.
- Vida permanece entre 0 e `vidaMaxima`; um personagem morto não ataca nem usa poção.
- Uma poção cura `min(20, vidaMaxima - vida)`, consome uma unidade e aumenta o contador de itens usados. Com vida cheia ou estoque zero, mostrar o motivo e pedir outra ação sem consumir turno.
- Entrada inválida não altera atributos, inventário ou turno e não permite ação do inimigo.
- O jogador age primeiro. Após uma ação válida, conferir a vida do inimigo antes da resposta: um inimigo derrotado não age.
- Conferir a vida do jogador imediatamente após a ação inimiga. Nenhuma ação, loja ou próxima batalha ocorre depois da derrota.

### Campanha e inimigos

- A campanha tem 5 batalhas sequenciais. Mostrar o progresso, por exemplo `Batalha 2/5`.
- Sortear um nome entre `Zargor, o Orc Brutal`, `Nyx, a Sombra`, `Grom, o Troll`, `Skarn, o Saqueador` e `Vex, o Goblin`. Repetição é permitida.
- Para batalha `n`, de 1 a 5: vida `35 + random.nextInt(11) + 5 * (n - 1)`; ataque `10 + random.nextInt(4) + 2 * (n - 1)`; defesa `2 + random.nextInt(3) + (n - 1)`.
- IA: `random.nextInt(100) < 80` significa atacar; valores de 80 a 99 significam defender. Não implementar poções para inimigos.
- Vida, melhorias e poções do jogador persistem entre batalhas. Não restaurar vida automaticamente nem repor poções ao gerar outro inimigo.
- Uma nova partida cria outro herói com atributos iniciais, 3 poções e contadores zerados.

### Bônus incluídos

- Cada inimigo derrotado rende 10 pontos e 20 moedas, exatamente uma vez. Vitória completa soma 50 pontos; derrotas parciais preservam os pontos já conquistados.
- A loja abre depois das vitórias nas batalhas 1 a 4. Não abre após derrota nem após a vitória final.
- Comprar `+3 de ataque` custa 20 moedas. Comprar `+15 de vida máxima` custa 20 moedas e também recupera 15 de vida, limitado ao novo máximo.
- O jogador pode comprar enquanto tiver saldo ou escolher continuar. Saldo insuficiente não altera moedas nem atributos.
- A loja não vende poções, preservando o limite de 3 por partida. Melhorias duram somente a partida atual.
- Ranking em memória com `Map<String, Integer>`: registrar ao terminar por vitória ou derrota, mantendo a maior pontuação para cada nome com `merge(nome, pontos, Math::max)`.
- Nomes são aparados com `trim()` e não podem estar vazios. Nomes iguais após esse tratamento representam a mesma entrada; diferenças entre maiúsculas/minúsculas permanecem distintas.
- Exibir ranking por pontos decrescentes e nome crescente nos empates. Exibir uma mensagem quando estiver vazio.
- Menu principal: `1 - Jogar`, `2 - Ranking`, `0 - Sair`. Voltar ao menu após uma partida permite acumular ranking na mesma execução.
- O ranking não persiste ao fechar o programa; persistência em arquivo não é pedida pelo PDF.
- Fim da entrada, inclusive durante seleção, batalha ou loja, encerra a execução de forma limpa com `Entrada encerrada. Jogo finalizado.`. Não tratar essa interrupção como vitória ou derrota e não registrar a partida interrompida no ranking.

## 4. Estrutura de arquivos e responsabilidades

Todos os caminhos a seguir são relativos à pasta `/Users/darcmary/Development/teach3035/modulo-04/desafio`.

```text
src/arena/
  Main.java                         # Cria Scanner, saída, Random e Jogo.
  jogo/Jogo.java                    # Menu, seleção, campanha e encerramento.
  jogo/EstadoPartida.java           # Herói, progresso, pontos e moedas.
  personagem/Personagem.java        # Atributos privados e operações de combate.
  personagem/Guerreiro.java         # Valores e descrição do guerreiro.
  personagem/Mago.java              # Valores e descrição do mago.
  personagem/Arqueiro.java           # Valores e descrição do arqueiro.
  personagem/Inimigo.java           # Personagem sem poções.
  personagem/FabricaInimigos.java   # Sorteio de nomes e atributos.
  batalha/Batalha.java              # Status, rodadas e alternância dos turnos.
  batalha/ResultadoBatalha.java     # VITORIA, DERROTA, INTERROMPIDA.
  loja/Loja.java                    # Compras, custos e menu entre batalhas.
  ranking/Ranking.java              # Map, melhor pontuação e exibição ordenada.
  utilitarios/EntradaConsole.java  # Leitura e validação usando Scanner.
tests/arena/
  TestesPersonagem.java
  TestesEntradaConsole.java
  TestesFabricaInimigos.java
  TestesBatalha.java
  TestesEstadoPartida.java
  TestesLoja.java
  TestesRanking.java
  TestesJogo.java
README.txt                          # Compilação, execução, regras e bônus.
.gitignore                          # Ignora out/, fontes.txt e fontes-testes.txt.
docs/superpowers/plans/
  2026-10-07-arena-dos-campeoes.md   # Este plano.
```

### Contratos entre os componentes

- `Personagem(String nome, int vida, int ataque, int defesa, int pocoes)`; vida inicial também define a máxima. Validar nome não vazio, vida/ataque positivos, defesa e poções não negativos.
- `Personagem`: `int atacar(Personagem alvo)`, `void defender()`, `int tomarDano(int dano)`, `boolean estaVivo()`, `void iniciarTurno()`, `boolean usarPocao()`, `void melhorarAtaque(int bonus)`, `void melhorarVida(int bonus)` e `String getDescricao()`.
- Getters de `Personagem`: `getNome()`, `getVida()`, `getVidaMaxima()`, `getAtaque()`, `getDefesa()`, `getPocoes()` e `getPocoesUsadas()`. Não oferecer setters de vida ou inventário que contornem as regras.
- Subclasses de heróis: construtor `(String nome)`, valores definidos na tabela e sobrescrita de `getDescricao()`. `Inimigo(String nome, int vida, int ataque, int defesa)` sempre passa 0 poções à superclasse.
- `EntradaConsole(Scanner scanner, PrintStream saida)`: `Optional<String> lerTextoNaoVazio(String mensagem)` e `OptionalInt lerOpcao(String mensagem, int minimo, int maximo)`. Vazio significa fim da entrada, não opção inválida.
- `FabricaInimigos(Random random)`: `Inimigo criar(int numeroBatalha)`; aceitar somente números de 1 a 5.
- `EstadoPartida(Personagem jogador)`: `registrarBatalhaIniciada()`, `registrarTurnoJogador()`, `registrarVitoria()` e `boolean gastarMoedas(int valor)`; getters `getJogador()`, `getBatalhasIniciadas()`, `getInimigosDerrotados()`, `getTurnosJogador()`, `getPontos()` e `getMoedas()`.
- `Batalha(EntradaConsole entrada, PrintStream saida, Random random)`: `ResultadoBatalha executar(EstadoPartida estado, Inimigo inimigo)`; internamente `exibirStatus`, `turnoDoJogador` e `turnoDoInimigo`.
- `Loja(EntradaConsole entrada, PrintStream saida)`: `boolean abrir(EstadoPartida estado)` retorna `false` no fim da entrada e `true` ao continuar; `boolean comprarAtaque(EstadoPartida estado)` e `boolean comprarVida(EstadoPartida estado)` permitem testar compras sem menus.
- `Ranking()`: `void registrar(String nome, int pontos)`, `Map<String, Integer> getPontuacoes()` retorna uma cópia, e `void exibir(PrintStream saida)`.
- `Jogo(EntradaConsole entrada, PrintStream saida, FabricaInimigos fabrica, Batalha batalha, Loja loja, Ranking ranking)`: `void iniciarJogo()`; métodos internos `selecionarPersonagem`, `jogarPartida` e `fimDeJogo`.
- `Main.main(String[] args)`: monta os componentes e inicia o jogo. Usar somente um `Scanner` para toda a execução.

## 5. Estratégia de implementação e verificação

Implementar primeiro uma batalha simples, depois campanha e bônus, conforme a progressão sugerida no PDF. Cada tarefa deve terminar com uma entrega verificável. Para regras de estado e combate, escrever o teste antes, confirmar a falha, implementar e confirmar a aprovação. Não criar testes que apenas repitam getters; priorizar transições e limites.

As classes de teste têm `public static void main(String[] args)` e usam `assert`. Executar sempre com `-ea`, pois sem isso as asserções não verificam o comportamento. Cada classe imprime `OK: NomeDaClasse` somente depois de todas as verificações passarem.

Comandos a executar na pasta do desafio, depois de disponibilizar o JDK:

```sh
java -version
javac -version
mkdir -p out
find src tests -name '*.java' > fontes-testes.txt
javac -encoding UTF-8 -d out @fontes-testes.txt
java -ea -cp out arena.TestesPersonagem
```

Compilar somente arquivos já criados em cada etapa. No teste inicial, a falta da classe/método pode aparecer como falha de compilação; depois de criar o contrato, a asserção deve falhar por comportamento ausente. Aceitar o resultado somente quando compilação e teste terminarem com código 0.

### Tarefa 1 - Modelo de personagem, dano, defesa e poções

**Criar:** `src/arena/personagem/Personagem.java`, `tests/arena/TestesPersonagem.java` e `.gitignore`.

**Consome:** nenhum componente anterior. **Produz:** todos os contratos de `Personagem`, utilizados por subclasses, batalha e loja.

- [ ] Criar testes para redução de vida, dano mínimo, vida zero, defesa temporária e limite de cura. Este caso base pode ser copiado integralmente para o teste:

```java
package arena;
import arena.personagem.Personagem;

public class TestesPersonagem {
    public static void main(String[] args) {
        Personagem atacante = new Personagem("Atacante", 100, 22, 8, 3);
        Personagem alvo = new Personagem("Alvo", 100, 22, 8, 3);
        assert atacante.atacar(alvo) == 14;
        assert alvo.getVida() == 86;
        alvo.defender();
        assert atacante.atacar(alvo) == 7;
        assert atacante.atacar(alvo) == 14;
        alvo.defender();
        alvo.iniciarTurno();
        assert atacante.atacar(alvo) == 14;
        assert alvo.getVida() == 51;
        assert alvo.usarPocao();
        assert alvo.getVida() == 71;
        assert alvo.getPocoes() == 2;
        assert alvo.getPocoesUsadas() == 1;
        assert alvo.usarPocao();
        assert alvo.usarPocao();
        assert alvo.getVida() == 100;
        assert !alvo.usarPocao();
        assert alvo.getPocoesUsadas() == 3;
        assert alvo.tomarDano(999) == 100;
        assert alvo.getVida() == 0 && !alvo.estaVivo();
        assert !alvo.usarPocao();
        assert alvo.atacar(atacante) == 0;
        System.out.println("OK: TestesPersonagem");
    }
}
```

- [ ] Compilar e executar `arena.TestesPersonagem`; confirmar falha antes da implementação.
- [ ] Implementar campos privados, construtor e operações. Em `tomarDano`, ignorar dano bruto não positivo e golpes contra personagem morto; calcular `max(1, dano - defesa)`, aplicar defesa ativa, limitar o dano à vida restante e desativar a defesa consumida. `iniciarTurno` desativa defesa remanescente.
- [ ] Implementar cura conforme as regras e melhorias com bônus estritamente positivo. `melhorarVida(15)` aumenta máximo e vida atual em 15; `melhorarAtaque(3)` aumenta ataque em 3. Rejeitar bônus inválidos com `IllegalArgumentException`.
- [ ] Acrescentar cenários separados: ataque 1 contra defesa 8 causa 1; dano negativo não cura; poção em vida cheia não é consumida; dano ímpar 15 defendido causa 8; construções com nome vazio ou atributos inválidos são rejeitadas.
- [ ] Executar os testes; aceitar somente com `OK: TestesPersonagem` e código 0.

### Tarefa 2 - Classes jogáveis e seleção com descrição

**Criar:** `src/arena/personagem/Guerreiro.java`, `Mago.java` e `Arqueiro.java`. **Modificar:** `tests/arena/TestesPersonagem.java`.

**Consome:** construtor e regras de `Personagem`. **Produz:** heróis disponíveis para a seleção, com atributos distintos e descrição polimórfica.

- [ ] Acrescentar teste instanciando cada classe; verificar a tabela de atributos, 3 poções e descrição não vazia. Referenciar as instâncias pelo tipo `Personagem` para verificar o uso da hierarquia.
- [ ] Executar `arena.TestesPersonagem` e confirmar falha antes de implementar as subclasses.
- [ ] Implementar os três construtores com `super(nome, vida, ataque, defesa, 3)` e sobrescrever `getDescricao()` com as descrições da tabela.
- [ ] Executar `arena.TestesPersonagem`; verificar que alterar uma classe não altera os atributos das outras instâncias.

### Tarefa 3 - Entrada de terminal segura

**Criar:** `src/arena/utilitarios/EntradaConsole.java` e `tests/arena/TestesEntradaConsole.java`.

**Consome:** `Scanner` e `PrintStream`. **Produz:** leitura validada compartilhada por todos os menus.

- [ ] Escrever testes com `new Scanner("abc\n0\n9\n2\n")` e chamar `lerOpcao("Classe: ", 1, 3)`: deve devolver 2, exibindo erro para as três entradas anteriores. Testar texto vazio, espaços, inteiro além do limite de `int`, número decimal e fim da entrada.
- [ ] Executar `arena.TestesEntradaConsole`; confirmar falha inicial.
- [ ] Ler sempre com `hasNextLine()`/`nextLine()` e aplicar `trim()`. Converter a opção usando `Integer.parseInt`, capturar `NumberFormatException` e repetir enquanto estiver fora da faixa. Evitar misturar `nextInt()` com `nextLine()`.
- [ ] Retornar `Optional.empty()`/`OptionalInt.empty()` no fim da entrada. A camada do jogo decide o encerramento; o leitor não encerra o processo nem inventa uma ação.
- [ ] Executar `arena.TestesEntradaConsole`; aceitar sem exceções não tratadas e com retorno vazio no fim da entrada.

### Tarefa 4 - Inimigos aleatórios e IA

**Criar:** `src/arena/personagem/Inimigo.java`, `FabricaInimigos.java` e `tests/arena/TestesFabricaInimigos.java`.

**Consome:** `Personagem` e `Random`. **Produz:** inimigos para as batalhas 1 a 5; a política de decisão será aplicada em `Batalha` na tarefa 6.

- [ ] Criar duas fábricas com `new Random(42)` e gerar a mesma sequência: os nomes e atributos devem coincidir par a par. Verificar faixas de vida, ataque e defesa para todas as cinco batalhas, e ausência de poções.
- [ ] Testar números de batalha 0 e 6, esperando `IllegalArgumentException`.
- [ ] Executar `arena.TestesFabricaInimigos`; confirmar falha inicial.
- [ ] Implementar catálogo e fórmulas da seção 3, usando apenas o `Random` recebido. Cada chamada cria outra instância; nunca reutilizar um inimigo já ferido.
- [ ] Executar `arena.TestesFabricaInimigos`; verificar também que uma sequência longa com semente fixa apresenta mais de um nome e mais de um conjunto de atributos.

### Tarefa 5 - Estado da partida e recompensas

**Criar:** `src/arena/jogo/EstadoPartida.java` e `tests/arena/TestesEstadoPartida.java`.

**Consome:** um `Personagem` selecionado. **Produz:** contadores e saldo compartilhados por batalha, loja e campanha.

- [ ] Escrever teste: novo estado começa com zero batalhas, turnos, vitórias, pontos e moedas. Registrar uma batalha, um turno e uma vitória deve resultar em 1, 1, 1, 10 e 20, respectivamente.
- [ ] Testar `gastarMoedas(20)` com saldo 0 e depois com saldo 20; saldo insuficiente retorna `false` sem alteração, saldo suficiente retorna `true` e zera moedas. Valores não positivos são rejeitados.
- [ ] Executar `arena.TestesEstadoPartida`; confirmar falha inicial.
- [ ] Implementar contadores privados e métodos do contrato. `registrarVitoria()` incrementa derrotados, pontos e moedas juntos. Somente a campanha chama esse método, uma vez por resultado de vitória; a batalha não concede recompensa.
- [ ] Executar `arena.TestesEstadoPartida`; verificar que criar outro estado não reutiliza contadores ou saldo.

### Tarefa 6 - Uma batalha completa por turnos

**Criar:** `src/arena/batalha/Batalha.java`, `ResultadoBatalha.java` e `tests/arena/TestesBatalha.java`.

**Consome:** personagens, entrada validada, `Random` e `EstadoPartida`. **Produz:** resultado da batalha sem registrar pontuação ou abrir loja.

- [ ] Criar testes com entrada e saída em memória. Para controlar a IA, usar este substituto de `Random` nos testes:

```java
Random sempreAtaca = new Random() {
    @Override public int nextInt(int limite) { return 0; }
};
Random sempreDefende = new Random() {
    @Override public int nextInt(int limite) { return limite - 1; }
};
```

- [ ] Testar golpe fatal com herói de ataque 100 e inimigo de vida 10: entrada `1\n` retorna `VITORIA` e mantém a vida do herói. Testar inimigo de ataque 999: após um ataque não fatal do jogador, retorna `DERROTA` e vida zero.
- [ ] Testar sequência `texto\n9\n3\n1\n` com herói em vida cheia: texto, opção 9 e poção recusada não geram turno inimigo. Testar fim da entrada antes de uma ação válida: retorna `INTERROMPIDA`.
- [ ] Executar `arena.TestesBatalha`; confirmar falha inicial.
- [ ] Implementar status com rodada, progresso da batalha, nomes, vida atual/máxima e poções restantes; mostrar ações `1 - Atacar`, `2 - Defender`, `3 - Usar poção` em todo turno.
- [ ] Implementar o fluxo abaixo; o contador de turnos aumenta somente quando a ação do jogador é executada:

```text
registrar início da batalha
enquanto jogador e inimigo estiverem vivos:
    iniciar turno do jogador, removendo defesa antiga
    exibir status e menu
    repetir leitura até executar ataque, defesa ou poção válida
    se entrada acabou: retornar INTERROMPIDA
    registrar turno do jogador
    se inimigo morreu: retornar VITORIA
    iniciar turno do inimigo, removendo defesa antiga
    sortear 0..99: abaixo de 80 ataca; caso contrário defende
    exibir ação e dano efetivo, quando houver
    se jogador morreu: retornar DERROTA
```

- [ ] Testar defesa dos dois lados e poção seguida por ação inimiga. Uma recusa de poção apenas repete a leitura: não chama `iniciarTurno` novamente nem altera contadores.
- [ ] Executar `arena.TestesBatalha`; verificar status e mensagens na saída capturada e resultados para os dois ramos de IA. Testar a fronteira 79/80 com `Random` controlado; evitar testes estatísticos instáveis.

### Tarefa 7 - Loja entre batalhas

**Criar:** `src/arena/loja/Loja.java` e `tests/arena/TestesLoja.java`.

**Consome:** `EstadoPartida`, operações de melhoria de `Personagem` e entrada validada. **Produz:** compras consistentes e retorno ao fluxo da campanha.

- [ ] Escrever teste com `new Guerreiro("Ana")`: sem recompensa, comprar ataque retorna `false`; após `registrarVitoria`, retorna `true`, ataque passa de 22 para 25 e moedas ficam em 0.
- [ ] Escrever teste de vida: após dano bruto 38, vida do guerreiro é 70; depois de uma vitória e compra, vida máxima é 115, vida atual 85 e saldo 0. As poções continuam em 3.
- [ ] Executar `arena.TestesLoja`; confirmar falha inicial.
- [ ] Implementar `comprarAtaque` e `comprarVida`: verificar e debitar as 20 moedas antes de aplicar o bônus fixo. Saldo insuficiente retorna `false` sem melhorar o personagem.
- [ ] Implementar menu `1 - +3 ataque (20 moedas)`, `2 - +15 vida máxima (20 moedas)`, `0 - Continuar`, exibindo saldo e atributos. Repetir após compra ou recusa, até continuar ou acabar a entrada.
- [ ] Executar `arena.TestesLoja`; testar compra repetida sem saldo, opção inválida, continuidade e fim da entrada.

### Tarefa 8 - Pontuação e ranking

**Criar:** `src/arena/ranking/Ranking.java` e `tests/arena/TestesRanking.java`.

**Consome:** nome e pontos de partidas concluídas. **Produz:** melhores pontuações por nome e listagem ordenada no menu principal.

- [ ] Escrever teste com registros `Ana=20`, `Bruno=30`, `Ana=10`, `Ana=40`: mapa final deve conter `Ana=40` e `Bruno=30`. Empate `Carlos=30` deve listar Bruno antes de Carlos.
- [ ] Testar ranking vazio e proteção do mapa: modificar a cópia devolvida por `getPontuacoes()` não modifica o ranking interno.
- [ ] Executar `arena.TestesRanking`; confirmar falha inicial.
- [ ] Implementar mapa privado, normalização por `trim()` e `merge(nome, pontos, Math::max)`. Rejeitar nome vazio e pontuação negativa.
- [ ] Ordenar as entradas por valor decrescente e chave crescente para exibição. Não depender da ordem de iteração de um `HashMap`.
- [ ] Executar `arena.TestesRanking`; aceitar mensagens de vazio e ordenação estável nos empates.

### Tarefa 9 - Campanha, menus e integração dos bônus

**Criar:** `src/arena/jogo/Jogo.java`, `src/arena/Main.java` e `tests/arena/TestesJogo.java`.

**Consome:** todos os componentes anteriores. **Produz:** jogo completo, múltiplas partidas e encerramento coerente.

- [ ] Criar testes de integração com `Scanner` sobre texto, `ByteArrayOutputStream` e fábrica controlada. A fábrica pode ser substituída assim para garantir inimigos derrotados em um golpe:

```java
FabricaInimigos fabricaFacil = new FabricaInimigos(new Random(0)) {
    @Override public Inimigo criar(int numeroBatalha) {
        return new Inimigo("Teste " + numeroBatalha, 1, 1, 0);
    }
};
```

- [ ] Executar uma partida completa com esta entrada: jogar, nome, guerreiro, cinco ataques, quatro saídas da loja, ranking e saída. O teste espera 5 inimigos derrotados, 50 pontos, ranking `Ana=50`, quatro visitas à loja e uma única mensagem de vitória final:

```java
String entradas = "1\nAna\n1\n1\n0\n1\n0\n1\n0\n1\n0\n1\n2\n0\n";
```

- [ ] Acrescentar teste com inimigo de vida 999 e ataque 999: derrota na primeira batalha, nenhuma loja, nenhuma segunda batalha e ranking com zero pontos. Testar também derrota depois de uma vitória: ranking mantém 10 pontos e não concede outra recompensa.
- [ ] Executar `arena.TestesJogo`; confirmar falha inicial.
- [ ] Implementar `iniciarJogo()` com menu iterativo. Em seleção, mostrar nome, descrição e atributos de cada classe; validar opção antes de criar o herói. Criar novo `EstadoPartida` para cada tentativa.
- [ ] Implementar campanha: para batalhas 1 a 5, criar inimigo e executar batalha; em vitória registrar recompensa uma vez e abrir loja somente se houver próxima batalha; em derrota chamar `fimDeJogo` e retornar ao menu; em interrupção encerrar toda a execução.
- [ ] Implementar `fimDeJogo`: vitória ou derrota, batalhas iniciadas, inimigos derrotados, turnos, vida, poções usadas/restantes, pontos e moedas. Registrar ranking uma vez ao terminar por vitória ou derrota.
- [ ] Em `Main`, criar um `Scanner(System.in)` e componentes compartilhados. O mesmo `Ranking` permanece durante todas as partidas; o `Scanner` não é fechado pelas telas.
- [ ] Executar `arena.TestesJogo`; testar duas partidas seguidas, nome vazio, classes inválidas, ranking antes de jogar, fim de entrada na seleção/loja/batalha, preservação de vida e poções entre batalhas e reinicialização em nova partida.
- [ ] Jogar manualmente com cada classe e conferir se a dificuldade permite escolhas úteis de cura e loja. Se ajustar os números propostos, atualizar tabela, descrições e testes juntos, mantendo os valores exigidos de 20 de cura e 3 poções.

### Tarefa 10 - Documentação e entrega final

**Criar:** `README.txt`. **Revisar:** fontes e testes criados nas tarefas anteriores.

**Consome:** jogo integrado. **Produz:** entrega reproduzível conforme a página 8 do PDF.

- [ ] Documentar JDK necessário, árvore de pacotes, comandos abaixo, menu, atributos das classes, ações, duração da defesa, campanha, limite de poções, pontuação, loja e duração do ranking em memória.
- [ ] Incluir comandos de execução dos testes com `-ea` e exemplos de entrada inválida tratados. Explicar que a vida e as poções persistem entre batalhas e que nova partida reinicia os atributos.
- [ ] Acrescentar comentários explicativos nas regras de dano/defesa, duração do efeito, limite da cura, concessão de recompensas e tratamento de fim da entrada. Evitar comentários que apenas repitam instruções triviais.
- [ ] Compilar a aplicação seguindo exatamente as instruções que serão entregues:

```sh
mkdir -p out
find src -name '*.java' > fontes.txt
javac -encoding UTF-8 -d out @fontes.txt
java -cp out arena.Main
```

- [ ] Compilar aplicação e testes e executar todas as verificações:

```sh
find src tests -name '*.java' > fontes-testes.txt
javac -encoding UTF-8 -d out @fontes-testes.txt
java -ea -cp out arena.TestesPersonagem
java -ea -cp out arena.TestesEntradaConsole
java -ea -cp out arena.TestesFabricaInimigos
java -ea -cp out arena.TestesEstadoPartida
java -ea -cp out arena.TestesBatalha
java -ea -cp out arena.TestesLoja
java -ea -cp out arena.TestesRanking
java -ea -cp out arena.TestesJogo
```

- [ ] Confirmar código 0 em cada comando e mensagem `OK` em cada classe de teste; conferir manualmente uma vitória completa, uma derrota e um encerramento normal pelo menu.
- [ ] Se desejado, registrar um print ou vídeo da execução. Essa evidência é opcional no PDF e não substitui o código nem o `README.txt`.
- [ ] Revisar o estado do Git, incluir somente arquivos do desafio e criar commits por entregas verificadas. Mensagens sugeridas: `feat: add character combat rules`, `feat: add turn-based battles`, `feat: add campaign and optional challenges`, `docs: add game execution instructions`.

## 6. Matriz de cobertura do enunciado

| Requisito | Página | Tarefas | Evidência de aceitação |
|---|---:|---|---|
| Java jogável no terminal | 3 | 9, 10 | `arena.Main` executa campanha interativa. |
| POO, estado e modularização | 3 | 1, 2, 5, 6, 9 | Responsabilidades separadas e heróis usados como `Personagem`. |
| Nome e classe escolhidos | 3 | 2, 3, 9 | Seleção válida cria a subclasse correta. |
| Atributos e inventário de `Personagem` | 4 | 1 | Campos encapsulados e contagem de poções testada. |
| Quatro métodos exigidos | 4 | 1 | Ataque, defesa, dano e vida testados. |
| Guerreiro, Mago e Arqueiro distintos | 4 | 2 | Tabela de atributos e descrições corresponde às instâncias. |
| Vida e ações disponíveis em cada turno | 5 | 6 | Saída mostra status e menu a cada rodada. |
| IA simples, favorecendo ataque | 5 | 4, 6 | Decisões 79 e 80 exercitam ataque e defesa. |
| Entrada com `Scanner` | 5 | 3, 9 | Leitor compartilhado usa `Scanner` e valida linhas. |
| Atacar, defender e poção de 20; 3 por partida | 5 | 1, 6, 9 | Cura, esgotamento e ausência de reposição testados. |
| Inimigos com nomes e atributos aleatórios | 5 | 4 | Catálogo, faixas, variação e semente testados. |
| Fim por morte ou derrota de todos | 5 | 6, 9 | Derrota imediata e vitória só após cinco inimigos. |
| Mensagens de vitória e derrota | 5 | 9 | Integração verifica mensagem e resultado final. |
| Contagem de batalhas, vida e itens usados | 5 | 1, 5, 6, 9 | Status e resumo final mostram contadores coerentes. |
| Métodos iniciarJogo, exibirStatus, turnos e fimDeJogo | 6 | 6, 9 | Métodos distribuídos entre `Batalha` e `Jogo`. |
| Entrada inválida e opções fora da faixa | 6 | 3, 6, 7, 9 | Sem crash, consumo de recurso ou turno extra. |
| Bônus: pontuação | 7 | 5, 9 | 10 por inimigo; 50 na vitória completa. |
| Bônus: ranking com `Map<String, Integer>` | 7 | 8, 9 | Melhor pontuação, ordenação e várias partidas. |
| Bônus: loja e moedas por vitória | 7 | 5, 7, 9 | Compras corretas e loja apenas entre batalhas. |
| Bônus: seleção com descrição | 7 | 2, 9 | Descrições e atributos visíveis antes de escolher. |
| Bônus: organização em pacotes | 7 | 1 a 9 | Pacotes de personagem, batalha e utilitários, além dos demais. |
| Código-fonte, classes e lógica funcionando | 8 | 1 a 10 | Compilação, testes e execução manual aprovados. |
| Comentários explicativos | 8 | 10 | Regras não triviais explicadas no código. |
| `README.txt` com execução | 8 | 10 | Comandos documentados reproduzem a execução. |
| Print/vídeo opcional | 8 | 10 | Evidência de execução, caso produzida. |

## 7. Critério de conclusão

O projeto poderá ser considerado entregue quando todos os itens obrigatórios e os cinco bônus da matriz tiverem evidência de funcionamento, os testes terminarem sem falhas, as três classes forem jogáveis e os comandos do `README.txt` funcionarem a partir da pasta do desafio. Ajustes de equilíbrio são permitidos nas decisões propostas, mas não podem remover requisitos ou alterar as três poções de cura de 20 previstas no enunciado.

**Estado deste documento:** plano preparado para revisão; implementação e testes Java ainda não executados.
