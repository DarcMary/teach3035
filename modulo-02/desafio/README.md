# GitHub Profile Search

A responsive React application that searches a GitHub username and displays profile information, repositories, and repository details.

## Features

- GitHub username validation before search.
- Profile page with avatar, name, and bio.
- Repository cards with name and description.
- Accessible repository details modal.
- Loading, not-found, and generic error states.
- Responsive layout for desktop and tablet.

## Tech stack

- React
- TypeScript
- Vite
- React Router
- CSS Modules
- Vitest and React Testing Library

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Installation

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Open the address shown by Vite, usually `http://localhost:5173`.

## Scripts

```bash
npm test
npm run build
npm run lint
```

## Routes

| Route | Description |
| --- | --- |
| `/` | GitHub username search page. |
| `/profile/:username` | User profile and repositories page. |

## GitHub API

The application uses GitHub's public API:

- `GET /users/{username}`
- `GET /users/{username}/repos`

Unauthenticated requests are subject to GitHub API rate limits. If the limit is reached, wait before trying again.
