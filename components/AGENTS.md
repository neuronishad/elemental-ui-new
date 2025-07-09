# AGENTS

This directory contains the source for each Elemental UI component. Every JavaScript file defines a custom element and registers it when imported.

## Guidelines

- Components must remain framework-agnostic and depend only on standard web APIs.
- Styles rely on CSS custom properties for theming. Keep implementations lightweight.
- Update `index.js` whenever a new component file is added.
- Test changes manually using the root `index.html` or by running the React demo in `app/`.
- Mirror updates in `app/components` so the demo stays in sync.

There are currently no automated checks for this directory.
