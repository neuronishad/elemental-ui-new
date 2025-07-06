## Basic Components

The following components are implemented under the `/components` directory. Each
is distributed as an ES module that registers a custom element on import.

Button – Basic button with variant styles (raised, flat, icon) and built-in theming hooks.

Text Input – Standard single-line input with label support, validation states, and icons.

Select/Dropdown – A material-styled select element with keyboard navigation and search capabilities.

Checkbox and Radio – Form controls for boolean or single-choice selections.

Switch/Toggle – Material-style toggle switch for on/off states.

Dialog/Modal – Overlay dialogs with backdrop, focus-trapping, and accessible labeling.

Snackbar/Toast – Temporary messages for user feedback.

Tabs – Navigation tabs with optional icons.

Card – Container component with header, content, and footer slots.

Tooltip – Hover/focus tooltips with theming and smart positioning.

Progress Indicator – Linear and circular progress components.

Slider – Range input for numeric values.

## Component Variations

The Material design specification defines multiple styles for common widgets. The
current implementations aim to provide a subset of these patterns:

- **Button** – Supports `variant="text"`, `variant="outlined"`, and `variant="icon"`
  in addition to the default filled style.
- **Text Input** – Accepts `variant="filled"` or `variant="outlined"` to switch
  between Material field styles.
- **Select** – Includes an optional label slot and basic styling for form
  controls.
- **Progress** – Can be used in an indeterminate state via the `indeterminate`
  attribute.

These variations follow the general look and feel of Material components but are
implemented in a simplified form compared to the official guidelines.
