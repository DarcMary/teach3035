# Figma-faithful UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every app state a direct, accessible implementation of the Wtech Figma reference while retaining live GitHub data.

**Architecture:** Define extracted Figma values in global CSS variables, render exported Figma artwork through a small logo component, and keep the existing pages/components as the presentation boundaries. Search, profile shell, loading, cards and dialog share typography and surfaces but preserve their independent behavior.

**Tech Stack:** React 19, TypeScript, React Router 7, CSS Modules, Vitest, React Testing Library, Vite.

## Global Constraints

- Preserve the GitHub API calls and existing public component props.
- Use Montserrat 400/500/700 globally; use Montserrat Alternates Bold only for the dialog repository title.
- Use Figma colors `#05478A`, `#FC8621`, `#202E49`, `#303030`, `#333333`, `#6A6F73`, `#B5B5B5`, `#F7F7F7`, `#ECEFF5`, `#FFFFFF`.
- Use 10–11px control/card rounding and the 0/4/21 elevated-card shadow extracted from Figma.
- Reuse Figma-derived artwork from `figma/assets/`; do not recreate the logo or close glyph in text/CSS.
- Preserve keyboard behavior, dialog focus trap/restoration, Escape/backdrop close, and responsive fallbacks.
- Each behavior change begins with a failing test.

---

### Task 1: Establish Figma tokens and artwork

**Files:**
- Modify: `src/index.css`
- Create: `src/components/WtechLogo/WtechLogo.tsx`
- Create: `src/components/WtechLogo/WtechLogo.module.css`
- Create: `src/components/WtechLogo/WtechLogo.test.tsx`
- Create: `src/assets/wtech-logo-light.svg`
- Create: `src/assets/wtech-logo-dark.svg`

**Interfaces:** `WtechLogo({ tone, size })` renders an exported vector with `alt="Wtech"`; `tone` is `'light' | 'dark'`, `size` is `'large' | 'small'`.

- [ ] **Step 1: Write the failing test.**

```tsx
render(<WtechLogo tone="light" size="large" />)
expect(screen.getByRole('img', { name: 'Wtech' })).toHaveAttribute('src', expect.stringContaining('wtech-logo-light'))
```

- [ ] **Step 2: Verify red.** Run `npm test -- src/components/WtechLogo/WtechLogo.test.tsx`; expect a module-not-found failure.

- [ ] **Step 3: Export vectors `827:10` and `827:70` from Figma as SVGs and implement the component.**

```tsx
export function WtechLogo({ tone, size }: WtechLogoProps) {
  return <img className={styles[size]} src={tone === 'light' ? lightLogo : darkLogo} alt="Wtech" />
}
```

- [ ] **Step 4: Replace generic root tokens with Figma values and add Montserrat font loading.** Set `--color-brand: #05478A`, `--color-accent: #FC8621`, and the inspected card shadow.
- [ ] **Step 5: Verify green.** Run `npm test -- src/components/WtechLogo/WtechLogo.test.tsx`; expect PASS.

### Task 2: Rebuild the search/error composition

**Files:**
- Modify: `src/pages/SearchPage/SearchPage.tsx`
- Modify: `src/pages/SearchPage/SearchPage.module.css`
- Modify: `src/components/SearchForm/SearchForm.tsx`
- Modify: `src/components/SearchForm/SearchForm.module.css`
- Modify: `src/pages/SearchPage/SearchPage.test.tsx`
- Modify: `src/pages/ProfilePage/ProfilePage.tsx`

**Interfaces:** `SearchPage` reads optional location state `{ errorMessage?: string }`; `SearchForm` retains `onSearch(username)`.

- [ ] **Step 1: Write a failing error-shell test.**

```tsx
renderAtRoute('/', { state: { errorMessage: 'Usuário não encontrado' } })
expect(screen.getByRole('heading', { name: 'Entrar' })).toBeVisible()
expect(screen.getByRole('alert')).toHaveTextContent('Usuário não encontrado')
```

- [ ] **Step 2: Verify red.** Run `npm test -- src/pages/SearchPage/SearchPage.test.tsx`; expect missing `Entrar` and alert.
- [ ] **Step 3: Implement the 1440×863 split shell.** Use the 885px blue panel, light large vector logo, 40px title, 318px input, 43px CTA and Figma labels (`Entrar`, `Usuário`, `Digite aqui seu usuário do Github`).
- [ ] **Step 4: Route profile-fetch failures back to `/` using navigation state.**

```tsx
navigate('/', { replace: true, state: { errorMessage: message } })
```

- [ ] **Step 5: Verify green.** Run `npm test -- src/pages/SearchPage/SearchPage.test.tsx src/pages/ProfilePage/ProfilePage.test.tsx`; expect PASS.

### Task 3: Compose the 88px profile shell, loading and profile state

**Files:**
- Create: `src/components/ProfileShell/ProfileShell.tsx`
- Create: `src/components/ProfileShell/ProfileShell.module.css`
- Modify: `src/components/LoadingState/LoadingState.tsx`
- Modify: `src/components/LoadingState/LoadingState.module.css`
- Modify: `src/pages/ProfilePage/ProfilePage.tsx`
- Modify: `src/pages/ProfilePage/ProfilePage.module.css`
- Modify: `src/components/ProfileHeader/ProfileHeader.tsx`
- Modify: `src/components/ProfileHeader/ProfileHeader.module.css`
- Modify: `src/pages/ProfilePage/ProfilePage.test.tsx`

**Interfaces:** `ProfileShell({ children })` renders a `banner`, small dark logo, pale background and white 1299px panel. `LoadingState` uses the shell.

- [ ] **Step 1: Write the failing loading-shell test.**

```tsx
render(<LoadingState />)
expect(screen.getByRole('banner')).toBeVisible()
expect(screen.getByRole('status')).toHaveTextContent('Carregando...')
expect(screen.getByRole('img', { name: 'Wtech' })).toBeVisible()
```

- [ ] **Step 2: Verify red.** Run `npm test -- src/pages/ProfilePage/ProfilePage.test.tsx`; expect no banner/logo/card.
- [ ] **Step 3: Implement the shell and 80px loader.** Use the Figma 88px header, `#F7F7F7` page, white 1299px card and 30px Bold loading copy.
- [ ] **Step 4: Render the success state in the same shell.** Add the 30px `Informações do Perfil` heading, 125×126 avatar and Figma bio/name hierarchy.
- [ ] **Step 5: Verify green.** Run `npm test -- src/pages/ProfilePage/ProfilePage.test.tsx`; expect PASS.

### Task 4: Match repository cards and specifications dialog

**Files:**
- Modify: `src/components/RepositoryList/RepositoryList.module.css`
- Modify: `src/components/RepositoryCard/RepositoryCard.module.css`
- Modify: `src/components/RepositoryModal/RepositoryModal.tsx`
- Modify: `src/components/RepositoryModal/RepositoryModal.module.css`
- Modify: `src/components/RepositoryModal/RepositoryModal.test.tsx`

**Interfaces:** `RepositoryCard` remains an accessible button. `RepositoryModal` retains `{ repository, onClose }` and renders URL, visibility, language and description labels.

- [ ] **Step 1: Write the failing dialog test.**

```tsx
render(<RepositoryModal repository={repository} onClose={onClose} />)
expect(screen.getByRole('heading', { name: 'Especificações' })).toBeVisible()
expect(screen.getByText('Privacidade')).toBeVisible()
expect(screen.getByText('Link')).toBeVisible()
```

- [ ] **Step 2: Verify red.** Run `npm test -- src/components/RepositoryModal/RepositoryModal.test.tsx`; expect missing Figma labels.
- [ ] **Step 3: Implement 365×293 repository cards.** Use 15px bold titles, 12px labels, 14px values, three columns at desktop and one below 768px.
- [ ] **Step 4: Implement the 686×548 dialog.** Render `Especificações`, a Montserrat Alternates 15px title, 56px URL/privacy/language fields and 164px description. Use exported close artwork in a real button while preserving existing focus code.
- [ ] **Step 5: Verify green.** Run `npm test -- src/components/RepositoryModal/RepositoryModal.test.tsx src/pages/ProfilePage/ProfilePage.test.tsx`; expect PASS including Escape and restoration coverage.

### Task 5: Compare visual output and verify project integrity

**Files:** Modify only a listed CSS module when a screenshot comparison shows a concrete delta.

- [ ] **Step 1: Verify all static checks.** Run `npm run lint && npm test && npm run build`; expect all commands to exit 0.
- [ ] **Step 2: Compare local screenshots to Figma node `827:6`.** Start `npm run dev -- --host 127.0.0.1`; inspect search/error at 1440×863, profile/loading at desktop width, and dialog at 686×548. Correct only observed typography, asset, color, spacing, radius and shadow differences.
- [ ] **Step 3: Re-run all static checks.** Run `npm run lint && npm test && npm run build`; expect all commands to exit 0.
