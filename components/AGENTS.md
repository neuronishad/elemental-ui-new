# AGENTS

This directory contains the source for each Elemental UI component. Every JavaScript file defines a custom element and registers it when imported.

## Guidelines

- Components must remain framework-agnostic and depend only on standard web APIs.
- Styles rely on CSS custom properties for theming. Keep implementations lightweight.
- Update `index.js` whenever a new component file is added.
- Test changes manually using the root `index.html` or by running the React demo in `app/`.
- Mirror updates in `app/components` so the demo stays in sync.

There are currently no automated checks for this directory.

## Requirements Template

Each component will have it own requirements.md file. Refer to this file to implement or update component. Make sure the given requirements and component code are in sync and fully implemented

# 🧩 Elemental UI Component Specification Template

A standardized template to define each Elemental UI web component in a clear, complete, and developer-friendly way.

---

## 1. Component Overview

**Tag Name**: `<eui-[component]>`  
**Description**:  
_A short summary of what the component is and its general usage._

---

## 2. Variants

List all visual or behavioral variants and their purposes.

| Variant     | Description                                 |
|-------------|---------------------------------------------|
| `default`   | Default appearance                          |
| `outlined`  | Has a visible border                        |
| `contained` | Filled with color and elevation             |

---

## 3. States

Define supported interaction states with visual and behavioral details.

| State     | Description                                         |
|-----------|-----------------------------------------------------|
| `default` | Normal state                                        |
| `hover`   | On mouse hover                                      |
| `focus`   | When focused via keyboard or mouse                  |
| `active`  | On press/click                                      |
| `disabled`| Inactive, non-clickable state                       |

---

## 4. Style Tokens

List relevant CSS custom properties used from the theme:

```
--eui-color-primary-base  
--eui-color-on-primary  
--eui-shadow-1  
--eui-outline-focus  
...
```

---

## 5. Structure

Show the internal layout of the component.

### Example Usage
```html
<eui-button variant="contained" icon="add">Add</eui-button>
```

### Internal DOM (Shadow DOM)
```html
<button>
  <span class="icon leading"></span>
  <span class="label">Add</span>
  <span class="icon trailing"></span>
  <span class="ripple"></span>
</button>
```

---

## 6. Attributes / Properties

| Attribute       | Type     | Default   | Description                      |
|------------------|----------|-----------|----------------------------------|
| `variant`        | string   | `"text"`  | Visual style of the component    |
| `disabled`       | boolean  | `false`   | Disable interaction              |
| `icon`           | string   | `null`    | Name of leading icon (optional)  |
| `trailing-icon`  | string   | `null`    | Name of trailing icon (optional) |
| `label`          | string   | required  | Visible label text               |

---

## 7. Events

List custom DOM events this component may emit:

| Event Name    | Trigger                   | Payload              |
|---------------|---------------------------|----------------------|
| `click`       | On user click             | Native click event   |
| `change`      | When value/state changes  | Depends on component |

---

## 8. Accessibility

Accessibility support checklist:

- [ ] Uses correct ARIA roles
- [ ] Supports keyboard navigation
- [ ] Uses `aria-disabled` or similar
- [ ] Focus ring visible on keyboard focus

---

## 9. Responsive Behavior

Explain how this component adapts to different screen sizes or layouts.

---

## 10. Notes

Optional notes for special cases, design deviations, or implementation warnings.
