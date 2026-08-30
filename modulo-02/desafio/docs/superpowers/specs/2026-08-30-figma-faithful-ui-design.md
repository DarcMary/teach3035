# Figma-faithful UI Design

## Goal

Adapt the GitHub profile search application so its search, error, loading, profile, repository list, and repository-detail screens reproduce the supplied Wtech Figma reference as closely as possible while preserving the existing GitHub API behavior and accessibility support.

## Visual Direction

- Use the reference's navy blue, white, pale gray, and amber palette.
- Replace the text-made logo with an equivalent reusable Wtech mark assembled in CSS: amber symbol followed by white or navy `wtech` lettering, depending on the surface.
- Use the Figma copy in the visible UI, including `Entrar`, `Carregando...`, `Informações do Perfil`, `Repositórios`, and `Especificações`.
- Preserve responsive behavior from desktop through tablet, with a single-column fallback below the existing tablet breakpoint.

## Screen Structure

### Search and Error

The search route remains a split layout: a navy brand panel on the left and a white login panel on the right. The form uses the Figma hierarchy and copy. A failed search retains this shell and presents the reference-style amber error notification near the form rather than replacing the page with a separate alert screen.

### Loading

The loading state retains the profile page shell: a white top navigation strip with the navy logo, a pale gray background, and a centered white content card. The card displays a circular loading indicator with `Carregando...` below it.

### Profile and Repositories

The successful profile route renders the same top navigation and a single white main card on the pale-gray page background. It contains the profile-information section and repository cards, matching the reference's grouped layout. Repository cards continue to show the GitHub repository name and description and remain keyboard accessible buttons.

### Repository Details

Clicking a repository opens a centered white modal over a dimmed pale-gray backdrop. The heading changes to `Especificações`; the dialog presents visibility, project URL, language, and description in a compact, labeled stack. Existing Escape, focus trapping, focus restoration, close button, and safe external link behavior remain intact.

## Data and Error Handling

No API endpoint or TypeScript data type changes are required. The existing profile and repository fetches continue to provide the dynamic values. The only error-handling change is presentation: the error text is displayed inside the search screen's notification component.

## Tests

- Add a search-page test that verifies an error notification can be rendered in the page shell.
- Update profile and modal tests for the Figma labels and shared layout landmarks.
- Keep coverage for disabled empty search, loading, successful profile content, failed lookup, modal content, Escape close, and focus restoration.
