# 🔽 Elemental UI Component Specification – `<eui-select>`

---

## 1. Component Overview

**Tag Name**: `<eui-select>`  
**Description**:  
A Material Design-inspired select dropdown component. Allows users to choose one option from a predefined list. Styled with elevation and a floating label. Supports keyboard interaction, client-side filtering, and validation states.

---

## 2. Variants

| Variant     | Description                                 |
|-------------|---------------------------------------------|
| `filled`    | Filled container with elevation             |
| `outlined`  | Transparent background with visible outline |

---

## 3. States

| State       | Description                                                              |
|-------------|--------------------------------------------------------------------------|
| `default`   | Base state                                                               |
| `hover`     | Background/outline highlight on hover                                    |
| `focus`     | Label shrinks into legend, primary outline |
| `active`    | Dropdown expanded, selected value visible                                |
| `disabled`  | Muted style, no interaction, `aria-disabled="true"`                      |
| `error`     | Red outline or underline, optional error message visible below dropdown  |

---

## 4. Style Tokens

```
--eui-color-primary-base  
--eui-color-primary-hover  
--eui-color-primary-active  
--eui-color-on-primary  
--eui-color-outline  
--eui-color-background  
--eui-color-on-background  
--eui-color-surface  
--eui-color-on-surface  
--eui-outline-focus  
--eui-shadow-1  
--eui-color-error-base  
--eui-color-on-error
```

---

## 5. Structure

### Example Usage
```html
<eui-select label="Choose Country" value="IN">
  <eui-option value="IN">India</eui-option>
  <eui-option value="US">United States</eui-option>
  <eui-option value="JP">Japan</eui-option>
</eui-select>
```

### Internal DOM (Shadow DOM)
```html
<div class="container" part="container">
  <label class="floating-label">Choose Country</label>
  <div class="trigger" tabindex="0" role="combobox">
    <input class="search-input" placeholder="Search..." />
    <div class="selected-value">India</div>
    <div class="dropdown-icon">▾</div>
  </div>
  <div class="dropdown-panel">
    <div class="option-list" role="listbox">
      <slot></slot>
    </div>
  </div>
  <div class="support-text"> <!-- helper or error --> </div>
</div>
```

---

## 6. Attributes / Properties

| Attribute       | Type     | Default    | Description                                 |
|------------------|----------|------------|---------------------------------------------|
| `label`          | string   | —          | Floating label shown above input            |
| `value`          | string   | —          | Current selected value                      |
| `disabled`       | boolean  | `false`    | Disables input and dropdown                 |
| `variant`        | string   | `"filled"` | Either `filled` or `outlined`               |
| `placeholder`    | string   | —          | Placeholder shown when nothing is selected  |
| `error`          | string   | `null`     | Error message shown in red below field      |
| `searchable`     | boolean  | `false`    | Enables client-side filtering of options    |

---

## 7. Events

| Event Name   | Trigger                           | Payload                        |
|--------------|-----------------------------------|--------------------------------|
| `change`     | When selection changes            | `{ value: string }`            |
| `input`      | On search input change            | `{ query: string }` (if searchable) |
| `focus`      | When select is focused            | native focus event             |
| `blur`       | When focus leaves the component   | native blur event              |

---

## 8. Accessibility

- [x] ARIA role `combobox` on trigger
- [x] ARIA `listbox` on dropdown
- [x] ARIA `option` per item
- [x] Keyboard support: ↑ ↓ ⏎ Esc Tab
- [x] Focus ring visible on `:focus-visible`
- [x] Announce selected option via `aria-activedescendant`

---

## 9. Responsive Behavior

- Width: `100%` of container unless overridden
- Max dropdown height: 240px scrollable
- Options and label scale with `rem`
- Works inside flex/grid parents

---

## 10. Notes

- `eui-option` elements are slotted children, with `value` attribute and text content.
- Floating label animates above when value is selected or on focus.
- `searchable` enables client-side filtering via `.search-input`, filtering matching option text case-insensitively.
- No pagination or async loading is included (manual slotted children only).
