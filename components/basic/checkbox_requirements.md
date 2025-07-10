# ☑️ Elemental UI Component Specification – `<eui-checkbox>`

---

## 1. Component Overview

**Tag Name**: `<eui-checkbox>`  
**Description**:  
An accessible, styled checkbox component following Material Design behavior and visuals. Uses secondary color roles for selection visuals. Supports indeterminate state and ripple animation.

---

## 2. Variants

| Variant     | Description                                  |
|-------------|----------------------------------------------|
| `default`   | Standard checkbox                            |
| `outlined`  | Adds a visible border around the checkbox    |

---

## 3. States

| State        | Description                                                                 |
|--------------|-----------------------------------------------------------------------------|
| `default`    | Unchecked appearance                                                        |
| `checked`    | Box is filled with secondary color and checkmark                            |
| `indeterminate`| Dash shown in box instead of checkmark (partial state)                    |
| `hover`      | Subtle background tint or border color shift                                |
| `focus`      | 2px solid focus ring using `--eui-outline-focus`                            |
| `active`     | Ripple animation + temporary darker tint                                    |
| `disabled`   | Muted colors, no pointer events or ripple                                   |

---

## 4. Style Tokens

```
--eui-color-secondary-base  
--eui-color-secondary-hover  
--eui-color-secondary-active  
--eui-color-secondary-disabled  
--eui-color-on-secondary  
--eui-color-surface  
--eui-color-outline  
--eui-outline-focus  
--eui-shadow-1  
```

---

## 5. Structure

### Example Usage
```html
<eui-checkbox checked label="Accept terms"></eui-checkbox>
```

### Internal DOM (Shadow DOM)
```html
<label class="container">
  <input type="checkbox" />
  <span class="visual-box">
    <span class="checkmark"></span>
    <span class="ripple"></span>
  </span>
  <span class="label-text">Accept terms</span>
</label>
```

---

## 6. Attributes / Properties

| Attribute       | Type     | Default     | Description                          |
|------------------|----------|-------------|--------------------------------------|
| `checked`        | boolean  | `false`     | Marks checkbox as selected           |
| `indeterminate`  | boolean  | `false`     | Shows a dash instead of checkmark    |
| `disabled`       | boolean  | `false`     | Disables interaction                 |
| `label`          | string   | `null`      | Optional label text                  |

---

## 7. Events

| Event Name | Trigger                        | Payload                        |
|------------|--------------------------------|--------------------------------|
| `change`   | When user checks/unchecks box  | `event.target.checked` boolean |

---

## 8. Accessibility

- [x] Uses `<input type="checkbox">` with native semantics
- [x] Label is linked or embedded for screen readers
- [x] Focus ring visible on keyboard focus
- [x] Supports `indeterminate` via JS

---

## 9. Responsive Behavior

- Size: ~18px box with scalable label text
- Can be used inline or block layout
- Click target includes label text for larger area

---

## 10. Notes

- Ripple should be centered in the visual box and not extend into label
- All colors come from **secondary** color role
