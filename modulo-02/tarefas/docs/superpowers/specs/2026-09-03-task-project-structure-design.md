# Task Project Structure Design

## Goal

Prepare this repository for six independent tasks while keeping their contents and tooling decoupled until each task's requirements are known.

## Structure

The repository root will contain the following directories:

- `tarefa-01/`
- `tarefa-02/`
- `tarefa-03/`
- `tarefa-04/`
- `tarefa-05/`
- `tarefa-06/`

Each directory is the exclusive home for one task and can later contain its implementation, dependencies, tests, and task-specific documentation. No shared template, build system, or runtime configuration will be added in this setup.

## Repository Documentation

The root `README.md` will explain the six-directory layout and define the commit convention.

## Commit Convention

Commits must use Conventional Commits and English descriptions. Task-specific changes use the task directory as the scope, for example:

```text
feat(task-01): add initial solution
fix(task-02): handle empty input
chore: initialize task directories
```

## Verification

Verify that all six directories and the root README exist, and inspect the initial commit message to confirm it follows the agreed convention.
