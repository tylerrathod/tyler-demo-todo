# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Todo behavior

- Use the **Delete** control on a todo row to remove that todo from the currently selected list.
- Lists, todos, and the selected list are saved to `localStorage` after changes and restored on the next load.
- The starter seed data is shown only when no saved data exists or saved data cannot be parsed safely.
- Priority is shown with color-coded badges and matching row accents: low is green, medium is amber, and high is red.
- Completed todos keep their priority color and remain readable while the title is struck through.
- Use the **Filter** control to show all, open, or completed todos in the selected list.
- Use the **Sort** control to keep manual order, sort by due date, or sort by priority.
- Filtering and sorting derive the displayed todo rows without mutating the underlying todo state.
- Manual order is the default sort. In manual order, drag todo rows within the active list to reorder them; due date and priority sorts disable dragging so the sorted view stays clear.
- New lists can be assigned one of the fixed accent colors, and that color is shown in the sidebar. Older saved lists without a color are restored with the default blue accent.
