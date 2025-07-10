# 📆 Elemental UI Component Specification – `<eui-grid>`

---

## 1. Component Overview

**Tag Name**: `<eui-grid>`
**Description**:
A responsive layout container that arranges children using CSS Grid. Supports custom template areas, column and row definitions, and named slot areas. Designed for high control layouts such as dashboards, cards, and complex page scaffolds.

---

## 2. Variants

Not applicable.

---

## 3. States

Not applicable.

---

## 4. Style Tokens

```
--eui-spacing-xs  
--eui-spacing-sm  
--eui-spacing-md  
--eui-spacing-lg  
--eui-spacing-xl
--eui-color-surface
--eui-color-on-surface
```

---

## 5. Structure

### Example Usage

```html
<eui-grid
  columns="1fr 2fr"
  rows="auto 1fr auto"
  areas="\n  'header header' \n  'sidebar main' \n  'footer footer'"
  gap="lg">
  <div slot="header">Header</div>
  <div slot="sidebar">Sidebar</div>
  <div slot="main">Main Content</div>
  <div slot="footer">Footer</div>
</eui-grid>
```

### Internal Shadow DOM

```html
<style>
  :host {
    display: grid;
    grid-template-columns: var(--_columns, 1fr);
    grid-template-rows: var(--_rows, auto);
    grid-template-areas: var(--_areas);
    gap: var(--_gap, 16px);
    padding: var(--_padding, 16px);
    box-sizing: border-box;
  }
  ::slotted([slot]) {
    grid-area: attr(slot);
  }
</style>
<slot></slot>
```

---

## 6. Attributes / Properties

| Attribute | Type   | Default         | Description                                                |
| --------- | ------ | --------------- | ---------------------------------------------------------- |
| `columns` | string | required        | CSS grid-template-columns value, e.g. `"1fr 2fr"`          |
| `rows`    | string | required        | CSS grid-template-rows value, e.g. `"auto 1fr auto"`       |
| `areas`   | string | required        | CSS grid-template-areas as multiline or escaped string     |
| `gap`     | string | `"md"`          | Spacing between cells. Token: `xs`, `sm`, `md`, `lg`, `xl` |
| `padding` | string | *mirrors `gap`* | Optional internal padding. Defaults to same value as `gap` |

---

## 7. Events

None.

---

## 8. Accessibility

* No implicit role or semantics
* Use `aria-label`, `role`, or heading hierarchy where needed

---

## 9. Responsive Behavior

* Grid areas, columns, and rows can be overridden with media queries externally
* Use fractional units and `auto`/`minmax()` for flexible layouts
* Layout adapts to parent container size

---

## 10. Notes

* Padding defaults to `gap` unless set explicitly
* `slot` names are matched with `grid-area` names for automatic placement
* Ideal for dashboards, cards, and modular layouts
