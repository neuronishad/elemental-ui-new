# 🔘 Elemental UI Component Specification – `<eui-button>`

---

## 1. Component Overview

**Tag Name**: `<eui-button>`  
**Description**:  
A flexible, accessible button component that supports multiple visual variants, interactive states, optional icons, and ripple animation. Styled and animated to match Material Design specifications.

---

## 2. Variants

| Variant     | Description                                  |
|-------------|----------------------------------------------|
| `text`      | Transparent background, no border            |
| `outlined`  | Transparent background, 1px solid border     |
| `contained` | Filled background, elevation, white text     |

---

## 3. States

| State     | Description                                                                 |
|-----------|-----------------------------------------------------------------------------|
| `default` | Regular appearance based on variant                                         |
| `hover`   | Slight background tint or elevation increase                                |
| `focus`   | Blue 2px focus ring around button                                           |
| `active`  | Darker background or ripple expansion                                       |
| `disabled`| Muted appearance, no pointer events or ripple animation                     |

---

## 4. Style Tokens

```
--eui-color-primary-base  
--eui-color-primary-hover  
--eui-color-primary-active  
--eui-color-primary-disabled  
--eui-color-on-primary  
--eui-color-outline  
--eui-color-disabled  
--eui-outline-focus  
--eui-shadow-1  
--eui-shadow-2  
```

---

## 5. Structure

### Example Usage
```html
<eui-button variant="contained">
  <svg slot="icon"><!-- icon --></svg>
  Add
</eui-button>
```

### Internal DOM (Shadow DOM)
```html
<button class="button">
  <span class="icon leading"><slot name="icon"></slot></span>
  <span class="label"><slot></slot></span>
  <span class="icon trailing"><slot name="trailing-icon"></slot></span>
  <span class="ripple"></span>
</button>
```

---

## 6. Attributes / Properties

| Attribute       | Type     | Default     | Description                             |
|------------------|----------|-------------|-----------------------------------------|
| `variant`        | string   | `"text"`    | Style variant: `text`, `outlined`, etc. |
| `disabled`       | boolean  | `false`     | Disable interaction                     |
| `icon`           | string   | `null`      | Fallback content for leading icon slot |
| `trailing-icon`  | string   | `null`      | Fallback content for trailing icon slot |
| `label`          | string   | required    | Fallback text if default slot empty |

---

## 7. Events

| Event Name | Trigger      | Payload            |
|------------|--------------|--------------------|
| `click`    | On user click| Native click event |

---

## 8. Accessibility

- [x] Uses `<button>` element with `type="button"`
- [x] `aria-disabled` for disabled state
- [x] Keyboard support (`Enter`, `Space`)
- [x] Focus ring shown via `:focus-visible`

---

## 9. Responsive Behavior

- Minimum height: `36px`
- Width: auto-fit to content
- Can be used in flex or block layouts
- Icons scale proportionally with text

---

## 10. Notes

- Ripple animation should be lightweight (pure CSS + JS).
- All icons are assumed to be handled via inline SVG.
- Keyboard activation triggers the same ripple effect as pointer clicks.
