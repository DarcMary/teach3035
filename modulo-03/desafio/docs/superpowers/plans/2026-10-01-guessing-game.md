# Guessing Game Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir um jogo de adivinhação em Java, executado no console, que cumpra integralmente os requisitos obrigatórios do desafio e permaneça simples o suficiente para demonstrar Java básico.

**Architecture:** `Main` será apenas o ponto de entrada. `GuessingGame` controlará menu, entrada, dificuldades, partida, dicas de proximidade, regras e pontuação. `ScoreHistory` manterá as 10 pontuações mais recentes em arrays de tamanho fixo e as exibirá em ordem cronológica.

**Tech Stack:** Java padrão, `javac`, `java`, `Scanner`, `Random`, `PrintStream` e testes executáveis com `java -ea`, sem Maven, Gradle ou bibliotecas externas.

## Global Constraints

- Manter todo o código no pacote padrão para simplificar a compilação didática.
- Usar arrays para configurações de dificuldade e histórico, conforme exigido pelo PDF.
- Usar loops no menu, na partida e na exibição do histórico.
- Usar estruturas de seleção para validar entradas e produzir mensagens baseadas na distância do palpite.
- Exibir todos os textos da aplicação em português.
- Não implementar os desafios bônus antes da entrega obrigatória estar concluída e validada.
- Executar os testes antes de cada commit.
- Manter commits pequenos, autocontidos e escritos em inglês no padrão Conventional Commits.

## Decisions Not Defined by the PDF

- Desconto por tentativa usada: 10 pontos.
- Bônus por conclusão rápida: 50 pontos por tentativa não utilizada.
- Fórmula da vitória: `max(0, base - 10 * tentativasUsadas + 50 * tentativasRestantes)`.
- Derrota: 0 pontos.
- Toda partida concluída entra no histórico, inclusive derrotas com 0 pontos.
- Proximidade relativa ao limite: até 10% = `muito perto`; até 25% = `perto`; acima de 25% = `longe`.
- O histórico usa buffer circular: ao registrar o 11º resultado, o mais antigo deixa de ser exibido.

## Target File Structure

```text
desafio/
├── docs/superpowers/plans/2026-10-01-guessing-game.md
├── src/
│   ├── Main.java
│   ├── GuessingGame.java
│   └── ScoreHistory.java
├── test/
│   ├── GuessingGameTest.java
│   ├── ScoreHistoryTest.java
│   └── GameFlowTest.java
├── .gitignore
└── README.md
```

---

### Task 1: Initial Project Structure - Completed

**Files:**
- Created: `.gitignore`
- Created: `README.md`
- Created: `src/.gitkeep`

**Result:** Branch `codex/modulo-03-desafio` created from `main` and initial structure committed.

**Commit:** `36d345c chore: initialize Java project`

---

### Task 2: Main Menu and Application Lifecycle

**Files:**
- Create: `src/Main.java`
- Create: `src/GuessingGame.java`
- Create: `test/GameFlowTest.java`
- Delete: `src/.gitkeep`

**Interfaces:**
- `Main.main(String[] args)` creates and starts the game.
- `GuessingGame(Scanner input, Random random, PrintStream output)` receives the dependencies needed at this stage.
- `void run()` keeps the menu active until option 4 is selected.

- [ ] Write `GameFlowTest` using `ByteArrayInputStream` and `ByteArrayOutputStream` to verify that input `4` displays the four menu options and the exit message.
- [ ] Compile with `javac -d out src/*.java test/GameFlowTest.java` and confirm failure because the production classes do not exist.
- [ ] Create `Main` and the minimal `GuessingGame` main loop with options `1. Iniciar novo jogo`, `2. Ver regras`, `3. Ver histórico de pontuações`, and `4. Sair`.
- [ ] For options 1-3, print exactly `Funcionalidade disponível em uma próxima etapa.` and return to the menu; later feature commits replace each branch atomically.
- [ ] Run `java -ea -cp out GameFlowTest` and confirm `GameFlowTest: PASS`.
- [ ] Manually run `printf '4\n' | java -cp out Main` and confirm clean termination.
- [ ] Commit with `feat(menu): add main application loop`.

---

### Task 3: Difficulty Configuration with Arrays

**Files:**
- Modify: `src/GuessingGame.java`
- Create: `test/GuessingGameTest.java`

**Interfaces:**
- `String[] DIFFICULTY_NAMES = {"Fácil", "Médio", "Difícil"}`.
- `int[] MAX_NUMBERS = {50, 100, 200}`.
- `int[] MAX_ATTEMPTS = {10, 7, 5}`.
- `int[] BASE_SCORES = {100, 200, 300}`.
- `int selectDifficulty()` returns an array index from 0 to 2.

- [ ] Add a test that selects each difficulty and verifies the corresponding name, maximum number, attempt limit, and base score.
- [ ] Compile and run `java -ea -cp out GuessingGameTest`; confirm failure because the arrays and selection method are absent.
- [ ] Add the four parallel arrays and a difficulty menu that returns the selected index.
- [ ] Ensure option 1 on the main menu calls `selectDifficulty()` and then returns safely to the main menu until the round is implemented.
- [ ] Run `java -ea -cp out GuessingGameTest` and `java -ea -cp out GameFlowTest`; confirm both pass.
- [ ] Commit with `feat(game): add difficulty configuration`.

---

### Task 4: Input Validation

**Files:**
- Modify: `src/GuessingGame.java`
- Modify: `test/GuessingGameTest.java`
- Modify: `test/GameFlowTest.java`

**Interfaces:**
- `int readIntInRange(String prompt, int minimum, int maximum)` reads a complete line, parses it, validates the range, and retries until valid.

- [ ] Add tests for letters, blank input, decimal input, menu options outside 1-4, invalid difficulty options, and a direct `readIntInRange` call with range 1-50.
- [ ] Run the tests and confirm they fail because invalid values are not retried consistently.
- [ ] Implement validation with `input.nextLine()` and `Integer.parseInt()`, catching `NumberFormatException` without terminating the application.
- [ ] Use `readIntInRange` for the main menu and difficulty selection.
- [ ] Verify that error messages state the accepted numeric range.
- [ ] Run all current tests and confirm they pass.
- [ ] Commit with `feat(input): validate console entries`.

---

### Task 5: Guessing Round and Distance Feedback

**Files:**
- Modify: `src/GuessingGame.java`
- Modify: `test/GuessingGameTest.java`
- Modify: `test/GameFlowTest.java`

**Interfaces:**
- `void playRound(int difficultyIndex)` executes one complete round.
- `int generateTarget(int maximum)` returns a number from 1 through `maximum`, inclusive.
- `String buildGuessFeedback(int guess, int target, int maximum)` returns direction and proximity.

- [ ] Add deterministic tests with a seeded or substituted `Random` for victory on the first attempt, victory on the final attempt, and defeat after all attempts.
- [ ] Add tests verifying `maior` or `menor` plus the relative proximity categories `muito perto`, `perto`, and `longe`.
- [ ] Run the tests and confirm failure because round execution and feedback do not exist.
- [ ] Generate the target with `random.nextInt(maximum) + 1`.
- [ ] Implement the attempt loop using the selected array configuration and `readIntInRange`.
- [ ] After each incorrect guess, show whether the target is greater or smaller and the mandatory proximity message based on absolute distance.
- [ ] On victory, report attempts used; on defeat, reveal the target.
- [ ] Run all tests and manually exercise one victory and one defeat.
- [ ] Commit with `feat(game): implement guessing rounds`.

---

### Task 6: Scoring System

**Files:**
- Modify: `src/GuessingGame.java`
- Modify: `test/GuessingGameTest.java`

**Interfaces:**
- `int calculateScore(int baseScore, int maximumAttempts, int usedAttempts, boolean won)` returns 0 on defeat and never returns a negative number.

- [ ] Add table-driven tests for first-attempt victory, final-attempt victory, medium and hard configurations, defeat, and the zero-point lower bound.
- [ ] Run `GuessingGameTest` and confirm failure because scoring is not implemented.
- [ ] Implement `max(0, base - 10 * used + 50 * (maximum - used))` for victories and 0 for defeats.
- [ ] Display the final score once at the end of every round.
- [ ] Run all tests and confirm they pass.
- [ ] Commit with `feat(score): add round scoring`.

---

### Task 7: Last Ten Scores

**Files:**
- Create: `src/ScoreHistory.java`
- Create: `test/ScoreHistoryTest.java`
- Modify: `src/GuessingGame.java`
- Modify: `test/GameFlowTest.java`

**Interfaces:**
- `void add(String difficulty, int score)` records one completed round.
- `void printTo(PrintStream output)` prints results from oldest to newest.
- `int size()` returns 0 through 10 for tests.
- `GuessingGame(Scanner input, Random random, PrintStream output, ScoreHistory history)` replaces the three-argument constructor, and `Main` creates one shared history instance.
- Internal state uses `String[10] difficulties`, `int[10] scores`, `int nextIndex`, and `int count`.

- [ ] Add tests for an empty history, one result, exactly ten results, and eleven results where the first is discarded.
- [ ] Run `ScoreHistoryTest` and confirm failure because the class does not exist.
- [ ] Implement the fixed-size circular buffer using only arrays and integer indexes.
- [ ] Register the result after every completed round, including losses with score 0.
- [ ] Replace main-menu option 3 with `history.printTo(output)` and verify the menu remains active afterward.
- [ ] Run all tests and confirm they pass.
- [ ] Commit with `feat(history): retain the latest ten scores`.

---

### Task 8: Rules Screen

**Files:**
- Modify: `src/GuessingGame.java`
- Modify: `test/GameFlowTest.java`

**Interfaces:**
- `void printRules()` displays required rules and documented project decisions.

- [ ] Add a test asserting that the rules contain all three ranges, attempt limits, base scores, the 10-point deduction, the 50-point unused-attempt bonus, proximity feedback, and history capacity.
- [ ] Run `GameFlowTest` and confirm failure because the complete rules are absent.
- [ ] Implement the rules screen from the same difficulty arrays used by the game so values cannot drift.
- [ ] Replace main-menu option 2 with `printRules()` and return to the menu afterward.
- [ ] Run all tests and confirm they pass.
- [ ] Commit with `feat(rules): add game instructions`.

---

### Task 9: Refactoring Without Behavior Changes

**Files:**
- Modify: `src/GuessingGame.java`
- Modify: `src/ScoreHistory.java`
- Modify tests only if visibility can be reduced without weakening coverage.

**Acceptance Criteria:**
- No duplicate menu or difficulty values.
- Methods have one clear responsibility.
- Constants replace unexplained numeric literals.
- Arrays, loops, and selection structures remain explicit and easy to identify for assessment.

- [ ] Run the complete test suite and record the passing baseline.
- [ ] Extract only duplicated display, feedback, or round-finalization logic.
- [ ] Rename unclear methods and variables without adding frameworks, enums, records, persistence, or unnecessary layers.
- [ ] Re-run the complete suite after each small refactor.
- [ ] Compare console output before and after to confirm behavior remains unchanged.
- [ ] Commit with `refactor(game): improve code organization`.

---

### Task 10: Final Documentation and End-to-End Validation

**Files:**
- Modify: `README.md`
- Modify tests if an uncovered required scenario is discovered.

**README Content:**
- Purpose and requirements.
- Menu and gameplay.
- Exact difficulty table.
- Exact scoring formula with worked examples.
- History behavior, including losses and the 10-entry limit.
- Commands to compile, test, and run.
- Project structure.
- Decisions not specified by the PDF.
- Explicit separation between mandatory and bonus scope.

- [ ] Compile from a clean output directory with `rm -rf out && javac -d out src/*.java test/*.java`.
- [ ] Run `java -ea -cp out GuessingGameTest`, `java -ea -cp out ScoreHistoryTest`, and `java -ea -cp out GameFlowTest`; require zero failures.
- [ ] Manually validate: immediate exit, invalid menu entry, invalid difficulty, out-of-range guess, first-attempt victory, final-attempt victory, defeat, empty history, full history, 11th result eviction, rules display, and return to menu.
- [ ] Verify `git diff --check` and confirm no generated `.class` files are tracked.
- [ ] Update `README.md` with the verified behavior and commands.
- [ ] Repeat compilation and the full automated test suite after the documentation update.
- [ ] Commit with `docs: add project documentation`.

---

## Required Commit Sequence

```text
chore: initialize Java project
feat(menu): add main application loop
feat(game): add difficulty configuration
feat(input): validate console entries
feat(game): implement guessing rounds
feat(score): add round scoring
feat(history): retain the latest ten scores
feat(rules): add game instructions
refactor(game): improve code organization
docs: add project documentation
```

Tests belong in the same commit as the behavior they verify. If validation reveals a genuine defect after a feature commit, use a focused correction such as `fix(score): correct unused-attempt bonus` or `fix(history): preserve the ten-entry limit`.

## Optional Follow-up Plan

Only after Task 10 passes completely, create a separate plan for the PDF bonuses:

1. `feat(sequence): add three-number game mode`
2. `feat(hints): add point-cost hint system`
3. `feat(records): track high scores by difficulty`

Each bonus must include its own tests, acceptance criteria, documentation update, and commit. Bonus work must not change the required game behavior without an explicit decision.
