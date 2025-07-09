# AGENTS

This directory contains the source for each Elemental UI component. Every JavaScript file defines a custom element and registers it when imported.

## Guidelines

- Components must remain framework-agnostic and depend only on standard web APIs.
- Styles rely on CSS custom properties for theming. Keep implementations lightweight.
- Update `index.js` whenever a new component file is added.
- Test changes manually using the root `index.html` or by running the React demo in `app/`.
- Mirror updates in `app/components` so the demo stays in sync.

There are currently no automated checks for this directory.

## Requirements Template

Each component will have it own requirements.md file. Refer to this file to implement or update component. Make sure the given requirements and component code are in sync and fully implemented

# 🧩 Elemental UI Component Specification Template

A standardized template to define each Elemental UI web component in a clear, complete, and developer-friendly way.

---

## 1. Component Overview

**Tag Name**: `<eui-[component]>`  
**Description**:  
_A short summary of what the component is and its general usage._

---

## 2. Variants

List all visual or behavioral variants and their purposes.

| Variant     | Description                                 |
|-------------|---------------------------------------------|
| `default`   | Default appearance                          |
| `outlined`  | Has a visible border                        |
| `contained` | Filled with color and elevation             |

---

## 3. States

Define supported interaction states with visual and behavioral details.

| State     | Description                                         |
|-----------|-----------------------------------------------------|
| `default` | Normal state                                        |
| `hover`   | On mouse hover                                      |
| `focus`   | When focused via keyboard or mouse                  |
| `active`  | On press/click                                      |
| `disabled`| Inactive, non-clickable state                       |

---

## 4. Style Tokens

List relevant CSS custom properties used from the theme:

```
--eui-color-primary-base  
--eui-color-on-primary  
--eui-shadow-1  
--eui-outline-focus  
...
```

---

## 5. Structure

Show the internal layout of the component.

### Example Usage
```html
<eui-button variant="contained" icon="add">Add</eui-button>
```

### Internal DOM (Shadow DOM)
```html
<button>
  <span class="icon leading"></span>
  <span class="label">Add</span>
  <span class="icon trailing"></span>
  <span class="ripple"></span>
</button>
```

---

## 6. Attributes / Properties

| Attribute       | Type     | Default   | Description                      |
|------------------|----------|-----------|----------------------------------|
| `variant`        | string   | `"text"`  | Visual style of the component    |
| `disabled`       | boolean  | `false`   | Disable interaction              |
| `icon`           | string   | `null`    | Name of leading icon (optional)  |
| `trailing-icon`  | string   | `null`    | Name of trailing icon (optional) |
| `label`          | string   | required  | Visible label text               |

---

## 7. Events

List custom DOM events this component may emit:

| Event Name    | Trigger                   | Payload              |
|---------------|---------------------------|----------------------|
| `click`       | On user click             | Native click event   |
| `change`      | When value/state changes  | Depends on component |

---

## 8. Accessibility

Accessibility support checklist:

- [ ] Uses correct ARIA roles
- [ ] Supports keyboard navigation
- [ ] Uses `aria-disabled` or similar
- [ ] Focus ring visible on keyboard focus

---

## 9. Responsive Behavior

Explain how this component adapts to different screen sizes or layouts.

---

## 10. Notes

Optional notes for special cases, design deviations, or implementation warnings.

## Coding Guidelines

You are a senior frontend engineer and expert in Web Components.

TASK:  
I will give you a custom element built using plain HTML, JS, and CSS (with Shadow DOM). Your job is to **audit and refactor** it so that it adheres to all of the following best practices:

---

🔧 **1. Attribute ↔ Property Synchronization**  
• For every attribute listed in `observedAttributes`, define a matching JS property with both `get` and `set`.  
• When the property is updated, reflect the change to the attribute.  
• When the attribute is changed, reflect it to the property.

---

🧠 **2. Efficient attributeChangedCallback**  
• Accept the standard parameters: `(name, oldValue, newValue)`.  
• Only trigger re-renders or logic if `oldValue !== newValue`.

---

♻️ **3. Safe Rendering & DOM Updates**  
• Avoid using `this.shadowRoot.innerHTML = ...` repeatedly—this clears listeners.  
• Use:
  – `template.cloneNode(true)`  
  – or a minimal diffing/rendering strategy (e.g., lit-html, uhtml, or manual patching).  
• Preserve DOM nodes and event listeners where possible.

---

🎯 **4. Slots & Content Injection**  
• Replace fixed content attributes (like `label`, `icon`, `value`, etc.) with named `<slot>` elements.  
• Example: `<slot name="icon">default-icon</slot>`.  
• Let developers inject arbitrary markup (icons, spans, etc.) cleanly.  
• Always provide fallback slot content where useful.

---

🎨 **5. Theming with CSS Variables**  
• All colors, spacing, shadows, borders, etc. must be defined using CSS variables (e.g., `var(--component-color, fallback)`).  
• Encapsulate all styles within Shadow DOM.  
• Ensure default fallbacks are present.

---

♿ **6. Accessibility Compliance**  
• Use semantic HTML elements wherever possible (`<button>`, `<input>`, `<label>`, etc.).  
• For non-semantic roles (like `<div>`), add `role`, `tabindex`, and keyboard handlers (`Enter` / `Space`).  
• Reflect `disabled` state via:
  – `aria-disabled="true"`  
  – `tabindex="-1"`  
  – preventing all interaction (pointer + keyboard)

---

✨ **7. Animation / Interactions (if applicable)**  
• For visual effects like ripples or transitions:
  – Ensure they don't stack up or leak (e.g., multiple ripples on long press).  
  – Clean up DOM nodes (`animationend` or `transitionend`).  
• Avoid layout thrashing or heavy reflows during animation.

---

🔐 **8. Security & Robustness**  
• Never use `innerHTML` with user-supplied or attribute data—use `textContent` instead.  
• Avoid inline JS or unsafe injection.  
• Ensure graceful fallback when missing attributes or malformed input.

---

🧪 **9. Output Testing Checklist (Include this in your reply)**  
After rewriting the component, give me a checklist like this:

| Check                          | Pass/Fail | Notes                              |
|-------------------------------|-----------|------------------------------------|
| Property ↔ Attribute Sync     | ✅ / ❌   | ...                                |
| Efficient Rendering           | ✅ / ❌   | ...                                |
| Slots Used Where Appropriate  | ✅ / ❌   | ...                                |
| Theming via CSS Vars          | ✅ / ❌   | ...                                |
| Accessibility (a11y)          | ✅ / ❌   | ...                                |
| Safe Ripple / Animation Logic | ✅ / ❌   | If applicable                      |
| Uses textContent over HTML    | ✅ / ❌   | ...                                |

---

🧾 **10. Deliverables**  
Return the following:
1. ✅ Fully refactored Web Component code  
2. 📋 A short changelog summarizing what was fixed  
3. ✅ The testing checklist filled out

NOTE: This instruction is **universal** and should be applied to any Web Component (buttons, inputs, sliders, etc.) using Shadow DOM and native JS.

Now wait for the component code before continuing.

