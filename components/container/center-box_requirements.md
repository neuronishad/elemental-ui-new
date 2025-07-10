# 📆 Elemental UI Component Specification – `<eui-center-box>`

---

## 1. Component Overview

**Tag Name**: `<eui-center-box>`
**Description**:
A layout container that centers its children both horizontally and vertically using Flexbox. Children are stacked vertically (`flex-direction: column`) and placed at the center of the parent. Ideal for splash screens, empty states, or any central alignment use case.

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
<eui-center-box gap="lg">
  <eui-avatar size="lg"></eui-avatar>
  <span>Centered User</span>
</eui-center-box>
```

### Internal Shadow DOM

```html
<style>
  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--_gap, 16px);
    padding: var(--_padding, 16px);
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
</style>
<slot></slot>
```

---

## 6. Attributes / Properties

| Attribute | Type   | Default         | Description                                                                      |
| --------- | ------ | --------------- | -------------------------------------------------------------------------------- |
| `gap`     | string | `"md"`          | Spacing between vertically stacked children. Token: `xs`, `sm`, `md`, `lg`, `xl` |
| `padding` | string | *mirrors `gap`* | Optional padding around content. Defaults to same value as `gap`                 |

---

## 7. Events

None.

---

## 8. Accessibility

* No default role
* Intended for layout only; add `role="group"` or `aria-label` when grouping semantic elements

---

## 9. Responsive Behavior

* Fills 100% of parent container by default
* Responsive scaling of child components expected
* Can be used inside other containers for adaptive layout

---

## 10. Notes

* Always centers children along both axes
* Child items are stacked vertically
* Padding defaults to `gap` unless explicitly set
* Suitable for minimal composition scenarios like modal content or onboarding screens
