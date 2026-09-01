# Figma-faithful UI Design

## Goal

Adapt the GitHub profile search application so its search, error, loading, profile, repository list, and repository-detail screens reproduce the supplied Wtech Figma reference as closely as possible while preserving the existing GitHub API behavior and accessibility support.

## Visual Direction

- Use the values inspected directly from Figma rather than approximations: brand blue `#05478A`, amber `#FC8621`, dark navy text `#202E49`, charcoal headings `#303030`/`#333333`, muted text `#6A6F73`, input placeholder `#B5B5B5`, pale surfaces `#F7F7F7`/`#ECEFF5`, and white `#FFFFFF`. Retain secondary Figma colors where their source state uses them: `#7847BE`, `#C24914`, `#FFB629`, and `#0070E0`.
- Load Montserrat for all interface text (Regular 400, Medium 500, Bold 700). Use Montserrat Alternates Bold only where the reference does: the repository title in the specifications dialog.
- Reuse the exported Figma mark and icons instead of constructing equivalent shapes in CSS. The reference contains Wtech vector logo variants at approximately 245×63, 211×54, and 105×27, plus the envelope, close and pagination vectors.
- Apply the reference's 10–11px card/control rounding, with its 0 4px 21px drop shadow on elevated cards. Do not substitute the previous generic tokens or Inter font.
- Use the Figma copy in the visible UI, including `Entrar`, `Carregando...`, `Informações do Perfil`, `Repositórios`, and `Especificações`.
- Preserve responsive behavior from desktop through tablet, with a single-column fallback below the existing tablet breakpoint.

## Screen Structure

### Search and Error

The search route remains a split layout: a navy brand panel on the left and a white login panel on the right. It uses the large Wtech logo, Montserrat Bold 40px `Entrar` heading, 15px form labels, 318px controls, a 43px CTA, and the reference hierarchy. A failed search retains this shell and presents the reference-style `Ops!` notification near the form rather than replacing the page with a separate alert screen.

### Loading

The loading state retains the profile page shell: an 88px white top navigation strip with the small navy logo, a pale gray background, and a centered white content card. The card displays the reference's circular loading indicator and Montserrat Bold 30px `Carregando...` below it.

### Profile and Repositories

The successful profile route renders the same top navigation and a single white main card on the pale-gray page background. It contains Montserrat Bold 30px `Informações do Perfil` and `Repositórios` headings, the 125×126 profile image treatment, and three-column 365×293 repository cards at desktop widths. Repository cards retain keyboard accessibility and collapse to one column at smaller widths.

### Repository Details

Clicking a repository opens a centered 686×548 white modal over a dimmed pale-gray backdrop. The heading is `Especificações`; its title is Montserrat Alternates Bold 15px and it presents URL, visibility, language, and description in 56px labeled fields (164px for description). Existing Escape, focus trapping, focus restoration, close button, and safe external link behavior remain intact.

## Data and Error Handling

No API endpoint or TypeScript data type changes are required. The existing profile and repository fetches continue to provide the dynamic values. The only error-handling change is presentation: the error text is displayed inside the search screen's notification component.

## Tests

- Add a search-page test that verifies an error notification can be rendered in the page shell.
- Update profile and modal tests for the Figma labels and shared layout landmarks.
- Keep coverage for disabled empty search, loading, successful profile content, failed lookup, modal content, Escape close, and focus restoration.

## Visual Verification

- Validate each state at its desktop dimensions against Figma node `827:6`: login/error (1440×863), profile content (1299px card), and modal (686×548).
- Capture the local app at the same viewport sizes and correct only observed deltas in typography, asset usage, spacing, surfaces, radii, or shadow.
- Preserve responsive and accessible behavior when the fixed Figma composition cannot fit a smaller viewport.
