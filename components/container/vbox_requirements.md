# 📆 Elemental UI Component Specification – `<eui-vbox>`

---

## 1. Component Overview

**Tag Name**: `<eui-vbox>`
**Description**:
A vertical layout container that stacks its children top-to-bottom using Flexbox (`flex-direction: column`). Supports spacing (`gap`), internal padding, and alignment controls. Intended as a building block for vertical UIs like forms, stacks, and cards.

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
<eui-vbox gap="md" justify-content="center" align-items="start">
  <eui-card>Card 1</eui-card>
  <eui-card>Card 2</eui-card>
</eui-vbox>
```

### Internal Shadow DOM

```html
<style>
  :host {
    display: flex;
    flex-direction: column;
    gap: var(--_gap, 16px);
    padding: var(--_padding, 16px);
    justify-content: var(--_justify, flex-start);
    align-items: var(--_align, stretch);
  }
</style>
<slot></slot>
```

---

## 6. Attributes / Properties

| Attribute         | Type    | Default         | Description                                                                                                                                      |
| ----------------- | ------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `gap`             | string  | `"md"`          | Spacing between children. Values: `xs`, `sm`, `md`, `lg`, `xl`                                                                                   |
| `padding`         | string  | *mirrors `gap`* | Optional padding inside the container. Defaults to same value as `gap`                                                                           |
| `justify-content` | string  | `"start"`       | Layout alignment on vertical axis. Maps to `justify-content`. Options: `start`, `center`, `end`, `space-between`, `space-around`, `space-evenly` |
| `align-items`     | string  | `"stretch"`     | Horizontal alignment of children. Maps to `align-items`. Options: `start`, `center`, `end`, `stretch`                                            |
| `wrap`            | boolean | `false`         | Enables `flex-wrap`. Usually `false` in vertical layouts unless explicitly needed                                                                |

**Token Mapping Example:**

```css
--eui-spacing-xs: 4px;
--eui-spacing-sm: 8px;
--eui-spacing-md: 16px;
--eui-spacing-lg: 24px;
--eui-spacing-xl: 32px;
```

---

## 7. Events

None.

---

## 8. Accessibility

* No default role; acts as structural layout
* Developers may add `role="group"` or `aria-label` if semantics are required

---

## 9. Responsive Behavior

* Will stretch to fill parent by default
* Can be made scrollable via `overflow: auto` externally
* Use responsive media queries externally to adjust `gap`, `padding`, or alignment

---

## 10. Notes

* Internal spacing (padding) mirrors `gap` unless explicitly set
* Safe for nested layouts and responsive cards
* Pure layout — no visual theming unless inherited
