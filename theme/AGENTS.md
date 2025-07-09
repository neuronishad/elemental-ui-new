# AGENTS

This directory contains theme.scss file which defines the theme structure to use with Elemental UI components. In Future it will contain other themes for quick use.

# 🎨 theme-guide.md – Elemental UI Theme System

A concise reference for using and extending the Elemental UI theme system via CSS variables.

---

## 🎨 Naming Convention

All theme variables follow:

```
--eui-color-[semantic]-[tone]
```

**Examples**:
- `--eui-color-primary-base`
- `--eui-color-surface-variant`
- `--eui-color-on-primary`

---

## 🧱 Semantic Categories

### 1. Primary / Secondary
Used for main and accent actions.

| Token                        | Purpose                    |
|-----------------------------|----------------------------|
| `--eui-color-primary-base`  | Default primary color      |
| `--eui-color-primary-hover` | On hover                   |
| `--eui-color-primary-active`| On press/click             |
| `--eui-color-primary-container` | Filled bg use (chips/cards) |
| `--eui-color-primary-disabled` | Muted version             |
| `--eui-color-on-primary`    | Text/icon on primary       |

Same structure applies to `secondary`.

---

### 2. Background / Surface

| Token                         | Purpose                    |
|------------------------------|----------------------------|
| `--eui-color-background`      | App/page background        |
| `--eui-color-surface`         | Card/dialog/etc. surfaces  |
| `--eui-color-surface-variant`| Alternate surface tone     |
| `--eui-color-on-background`   | Foreground on background   |
| `--eui-color-on-surface`      | Foreground on surface      |

---

### 3. States (Error / Success / Warning)

Each includes:

- `base`
- `hover`
- `active`
- `container`
- `on-*`

Example:
```scss
--eui-color-error-base
--eui-color-error-hover
--eui-color-error-container
--eui-color-on-error
```

---

### 4. Outline / Focus / Disabled

| Token                       | Purpose                  |
|----------------------------|--------------------------|
| `--eui-color-outline`       | Borders for outlines     |
| `--eui-outline-focus`       | Focus ring (2px solid)   |
| `--eui-color-disabled`      | Muted text/bg            |
| `--eui-color-on-disabled`   | Foreground on disabled   |

---

### 5. Shadows / Elevation

| Token           | Use                      |
|----------------|--------------------------|
| `--eui-shadow-1`| Low elevation (buttons)  |
| `--eui-shadow-2`| Mid elevation (cards)    |
| `--eui-shadow-3`| High elevation (dialogs) |

---

## 🌗 Dark Theme Support

Create dark theme overrides using:

```scss
[data-theme="dark"] {
  --eui-color-background: #121212;
  --eui-color-on-background: #ffffff;
  ...
}
```

---

## 📦 Adding New Semantic Roles

Follow this structure:

```scss
--eui-color-[role]-base
--eui-color-[role]-hover
--eui-color-[role]-active
--eui-color-[role]-container
--eui-color-on-[role]
```
