# 📆 Elemental UI Component Specification – `<eui-hbox>`

---

## 1. Component Overview

**Tag Name**: `<eui-hbox>`
**Description**:
A horizontal layout container that arranges its children from left to right using Flexbox (`flex-direction: row`). Supports spacing (`gap`), internal padding, wrapping, and alignment. Suitable for toolbars, action rows, chip groups, and inline form layouts.

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
<eui-hbox gap="lg" justify-content="space-between" align-items="center">
  <eui-chip>Left</eui-chip>
  <eui-chip>Right</eui-chip>
</eui-hbox>
```

### Internal Shadow DOM

```html
<style>
  :host {
    display: flex;
    flex-direction: row;
    gap: var(--_gap, 16px);
    padding: var(--_padding, 16px);
    justify-content: var(--_justify, flex-start);
    align-items: var(--_align, stretch);
    flex-wrap: var(--_wrap, nowrap);
  }
</style>
<slot></slot>
```

---

## 6. Attributes / Properties

| Attribute         | Type    | Default         | Description                                                                                                                         |
| ----------------- | ------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `gap`             | string  | `"md"`          | Spacing between children. Values: `xs`, `sm`, `md`, `lg`, `xl`                                                                      |
| `padding`         | string  | *mirrors `gap`* | Optional padding inside the container. Defaults to same value as `gap`                                                              |
| `justify-content` | string  | `"start"`       | Horizontal alignment. Maps to `justify-content`. Options: `start`, `center`, `end`, `space-between`, `space-around`, `space-evenly` |
| `align-items`     | string  | `"stretch"`     | Vertical alignment of children. Maps to `align-items`. Options: `start`, `center`, `end`, `stretch`                                 |
| `wrap`            | boolean | `false`         | Enables wrapping of children (`flex-wrap: wrap`)                                                                                    |

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

* Supports horizontal scroll or wrapping for overflowing content
* Use `wrap="true"` to automatically wrap children
* Responsive spacing and alignment should be applied externally

---

## 10. Notes

* Padding defaults to value of `gap` unless explicitly set
* Use for row-based composition patterns
* Pure layout container with no visual styling beyond spacing
