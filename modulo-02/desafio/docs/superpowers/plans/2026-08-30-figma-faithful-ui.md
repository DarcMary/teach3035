# Figma-faithful UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework all application states to closely reproduce the supplied Wtech Figma reference while retaining GitHub API behavior and accessibility.

**Architecture:** Create reusable Wtech branding and profile-shell components. Compose them in search, error, loading, profile, repository cards, and details dialog. Preserve the existing API client and types; route fetch failures to the search shell through navigation state.

**Tech Stack:** React 19, TypeScript, React Router 7, CSS Modules, Vitest, React Testing Library.

## Global Constraints

- Preserve the existing GitHub API endpoints and domain types.
- Use CSS Modules and the existing global color tokens; add no UI dependency.
- Preserve accessible repository buttons and all modal focus behavior.
- Use the visible Figma labels: `Entrar`, `Carregando...`, `Informações do Perfil`, `Repositórios`, and `Especificações`.
- Each UI behavior starts with a failing test.

---

### Task 1: Add reusable Wtech branding and profile shell

**Files:**
- Create: `src/components/WtechLogo/WtechLogo.tsx`
- Create: `src/components/WtechLogo/WtechLogo.module.css`
- Create: `src/components/WtechLogo/WtechLogo.test.tsx`
- Create: `src/components/ProfileShell/ProfileShell.tsx`
- Create: `src/components/ProfileShell/ProfileShell.module.css`

**Interfaces:** `WtechLogo({ tone: 'light' | 'dark' })` renders the reference wordmark variant. `ProfileShell({ children })` renders the white navigation strip and pale-gray page background.

- [ ] Write a failing `WtechLogo` test that asserts the accessible `Wtech` label, the `wtech` word, and the requested tone.
- [ ] Run `npm test -- src/components/WtechLogo/WtechLogo.test.tsx`; expect a module-not-found failure.
- [ ] Implement the CSS-drawn amber symbol, tone variants, and shared profile shell using semantic `header` markup.
- [ ] Re-run the focused test; expect PASS.
- [ ] Commit with `git commit -m "feat: add Wtech application shell"`.

### Task 2: Rebuild the Figma search and error state

**Files:**
- Modify: `src/pages/SearchPage/SearchPage.tsx`
- Modify: `src/pages/SearchPage/SearchPage.module.css`
- Modify: `src/components/SearchForm/SearchForm.tsx`
- Modify: `src/components/SearchForm/SearchForm.module.css`
- Modify: `src/pages/SearchPage/SearchPage.test.tsx`
- Modify: `src/pages/ProfilePage/ProfilePage.tsx`

**Interfaces:** `SearchPage` reads optional `location.state.errorMessage`. `ProfilePage` navigates failed requests to `/` with `{ state: { errorMessage } }`. `SearchForm` retains `onSearch(username)`.

- [ ] Add a failing test that renders `/` with `errorMessage` state and expects `Entrar` plus a `role="alert"` notification.
- [ ] Run `npm test -- src/pages/SearchPage/SearchPage.test.tsx`; expect failure because these elements are absent.
- [ ] Implement the split blue/white login shell, light Wtech logo, Figma text, compact form, and amber error notification. Redirect profile-fetch errors into this shell.
- [ ] Re-run `npm test -- src/pages/SearchPage/SearchPage.test.tsx src/pages/ProfilePage/ProfilePage.test.tsx`; expect PASS.
- [ ] Commit with `git commit -m "style: align search states with Figma"`.

### Task 3: Align loading and successful profile grouping

**Files:**
- Modify: `src/components/LoadingState/LoadingState.tsx`
- Modify: `src/components/LoadingState/LoadingState.module.css`
- Modify: `src/pages/ProfilePage/ProfilePage.tsx`
- Modify: `src/pages/ProfilePage/ProfilePage.module.css`
- Modify: `src/components/ProfileHeader/ProfileHeader.tsx`
- Modify: `src/components/ProfileHeader/ProfileHeader.module.css`
- Modify: `src/components/RepositoryList/RepositoryList.module.css`
- Modify: `src/pages/ProfilePage/ProfilePage.test.tsx`

**Interfaces:** Both loading and success states consume `ProfileShell`. The successful screen exposes a `section` labeled `Conteúdo do perfil` containing profile and repositories.

- [ ] Add a failing test expecting a `banner` and `Carregando...` status in loading state.
- [ ] Run `npm test -- src/pages/ProfilePage/ProfilePage.test.tsx`; expect failure because loading currently has no shared shell.
- [ ] Implement the top bar, centered white main card, CSS circular loader, `Informações do Perfil` heading, and grouped repository layout.
- [ ] Re-run the focused profile tests; expect PASS.
- [ ] Commit with `git commit -m "style: match Figma profile and loading layout"`.

### Task 4: Refine repository details dialog

**Files:**
- Modify: `src/components/RepositoryModal/RepositoryModal.tsx`
- Modify: `src/components/RepositoryModal/RepositoryModal.module.css`
- Modify: `src/components/RepositoryModal/RepositoryModal.test.tsx`

**Interfaces:** `RepositoryModal` retains `repository` and `onClose`; it presents `Especificações`, `Visibilidade`, `Link do projeto`, `Linguagem`, and `Descrição`.

- [ ] Add a failing test that expects `Especificações` and `Link do projeto` when a repository is supplied.
- [ ] Run `npm test -- src/components/RepositoryModal/RepositoryModal.test.tsx`; expect failure because these labels are absent.
- [ ] Implement the Figma-style modal fields and visual hierarchy, preserving Escape close, backdrop close, focus trapping, restoration, and safe external link behavior.
- [ ] Re-run the modal test; expect PASS.
- [ ] Commit with `git commit -m "style: align repository dialog with Figma"`.

### Task 5: Verify visual states and project integrity

**Files:** Modify source styles only when a visual inspection finds a concrete mismatch.

- [ ] Run `npm run lint && npm test && npm run build`; expect all commands to exit 0.
- [ ] Start `npm run dev -- --host 127.0.0.1` and inspect search, failed username, loading, profile, and modal at desktop and 768px widths against the Figma reference.
- [ ] Correct only observed layout mismatches, repeat static verification, and commit any final adjustment with `git commit -m "style: refine Figma visual fidelity"`.
