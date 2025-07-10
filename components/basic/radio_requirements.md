# 🔘 Elemental UI Component Specification – `<eui-radio>`

---

## 1. Component Overview

**Tag Name**: `<eui-radio>`  
**Description**:  
A stylized, accessible radio button component that allows selection from a group of mutually exclusive options. Follows Material Design behavior and visual guidelines. Uses secondary color scheme for visual styling.

---

## 2. Variants

| Variant   | Description                    |
|-----------|--------------------------------|
| `default` | Standard radio appearance      |

---

## 3. States

| State     | Description                                                                 |
|-----------|-----------------------------------------------------------------------------|
| `default` | Unchecked and idle                                                          |
| `checked` | Circle filled with secondary-base color, animated                           |
| `hover`   | Background circle or ripple highlights using secondary-hover color          |
| `focus`   | 2px solid ring using `--eui-outline-focus`                                  |
| `active`  | Uses secondary-active tone on the filled icon                               |
| `disabled`| Dimmed, non-clickable, shows disabled stroke and fill if checked            |

---

## 4. Style Tokens

```
--eui-color-secondary-base  
--eui-color-secondary-hover  
--eui-color-secondary-active  
--eui-color-secondary-disabled  
--eui-color-on-secondary  
--eui-color-outline  
--eui-outline-focus  
--eui-shadow-1  
```

---

## 5. Structure

### Example Usage
```html
<eui-radio name="size" value="medium" checked>Medium</eui-radio>
```

### Internal DOM (Shadow DOM)
```html
<label class="container">
  <input type="radio" name="size" value="medium">
  <span class="control">
    <span class="outer-circle"></span>
    <span class="inner-dot"></span>
  </span>
  <span class="label">Medium</span>
  <span class="ripple"></span>
</label>
```

---

## 6. Attributes / Properties

| Attribute   | Type     | Default   | Description                             |
|-------------|----------|-----------|-----------------------------------------|
| `name`      | string   | required  | Group name for mutual exclusivity       |
| `value`     | string   | required  | Value submitted when checked            |
| `checked`   | boolean  | `false`   | Whether this radio is selected          |
| `disabled`  | boolean  | `false`   | Prevents interaction                    |

---

## 7. Events

| Event Name | Trigger                   | Payload              |
|------------|---------------------------|----------------------|
| `change`   | When user checks the radio| `{ name, value }`    |

---

## 8. Accessibility

- [x] Uses native `<input type="radio">` for screen reader support
- [x] Keyboard accessible (`ArrowUp`, `ArrowDown`, `Space`)
- [x] `aria-checked` and `aria-disabled` properly managed
- [x] Focus ring visible via `:focus-visible`

---

## 9. Responsive Behavior

- Size: Fixed diameter (default 20–24px) for control circle
- Label text wraps and adjusts with layout
- Usable in flex/grid/inline layouts
- High contrast colors adapt to dark theme

---

## 10. Notes

- Ripple effect is triggered on click using JS
- Must be used inside a radio group where only one can be selected
- Transitions for check/uncheck are animated (opacity + scale on dot)
