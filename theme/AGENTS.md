# 🎨 Elemental UI Theme Tokens

A structured overview of all CSS variables used in the Elemental UI theme system.  
Each token follows the format:

```
--eui-color-[semantic-role]-[tone]
```

Use these variables in component styles for consistency across themes.

---

## 🔹 Primary & Secondary Roles

Used for main and accent actions.

### Primary

- `--eui-color-primary-base`: Default primary color  
- `--eui-color-primary-hover`: On hover state  
- `--eui-color-primary-active`: On active (pressed) state  
- `--eui-color-primary-container`: For filled surfaces (e.g. chips, cards)  
- `--eui-color-primary-disabled`: Muted state of primary  
- `--eui-color-on-primary`: Foreground content on primary

### Secondary (same structure as primary)

- `--eui-color-secondary-base`  
- `--eui-color-secondary-hover`  
- `--eui-color-secondary-active`  
- `--eui-color-secondary-container`  
- `--eui-color-secondary-disabled`  
- `--eui-color-on-secondary`

**Example Usage**:
```css
background: var(--eui-color-primary-base);
color: var(--eui-color-on-primary);
```

---

## 🧱 Surface & Background

Used for layouts, cards, dialogs.

- `--eui-color-background`: App background  
- `--eui-color-on-background`: Text/icons on background  
- `--eui-color-surface`: Default surface color (cards, sheets)  
- `--eui-color-surface-variant`: Alternate surface color  
- `--eui-color-on-surface`: Foreground on surface

---

## ⚠️ Status Tokens (Error / Warning / Success)

Each status includes the following variants:

- `base`: Default color  
- `hover`: On hover  
- `active`: On press  
- `container`: For filled usage (e.g. alerts)  
- `on-*`: Foreground on that background

### Example Tokens

- `--eui-color-error-base`  
- `--eui-color-warning-container`  
- `--eui-color-on-success`

---

## 🚫 Disabled & Outline

- `--eui-color-disabled`: Muted background (e.g. button)  
- `--eui-color-on-disabled`: Foreground on disabled  
- `--eui-color-outline`: Border color (e.g. outlined button)  
- `--eui-outline-focus`: Focus ring (usually 2px solid)

**Example Usage**:
```css
outline: var(--eui-outline-focus);
color: var(--eui-color-on-disabled);
```

---

## 🧊 Elevation (Box Shadows)

Used to create depth in UI components.

- `--eui-shadow-1`: Low elevation (e.g. buttons)  
- `--eui-shadow-2`: Medium elevation (e.g. cards)  
- `--eui-shadow-3`: High elevation (e.g. dialogs)

**Example Usage**:
```css
box-shadow: var(--eui-shadow-2);
```

---

## 🌘 Dark Theme Support

Use `data-theme="dark"` selector to override tokens for dark mode.

**Example**:
```css
[data-theme="dark"] {
  --eui-color-background: #121212;
  --eui-color-on-background: #ffffff;
  --eui-color-surface: #1e1e1e;
}
```

---

## ➕ Adding New Semantic Roles

Follow the same structure:

- `--eui-color-[role]-base`  
- `--eui-color-[role]-hover`  
- `--eui-color-[role]-active`  
- `--eui-color-[role]-container`  
- `--eui-color-on-[role]`

**Example: `info` role**:
```css
--eui-color-info-base
--eui-color-info-hover
--eui-color-info-container
--eui-color-on-info
```

---
