# AGENTS

This directory contains the source for each Elemental UI component. Every JavaScript file defines a custom element and registers it when imported.

## Guidelines

- Components must remain framework-agnostic and depend only on standard web APIs.
- Styles rely on CSS custom properties for theming. Keep implementations lightweight.
- Update `index.js` whenever a new component file is added.
- Test changes manually using the root `index.html` or by running the React demo in `app/`.
- Mirror updates in `app/components` so the demo stays in sync.

There are currently no automated checks for this directory.

## Understanding the Requirements Template

Each component will have it own requirements.md file. Refer to this file to implement or update component. Make sure the given requirements and component code are in sync and fully implemented.

This format defines the complete structure and expectations for each custom web component.  

---

## 1. Component Identity

- `tag`: Custom element tag name, e.g. `<eui-button>`
- `description`: Short summary of what this component does

---

## 2. Variants

Each visual or behavioral variant should be listed.

- Format:
  - `variant-name`: Purpose or behavior of the variant

**Example**:
- `default`: Basic appearance
- `outlined`: Has a border
- `contained`: Filled background with elevation

---

## 3. States

Describe all interaction states and their expected behavior or visuals.

- `default`: Base appearance
- `hover`: On mouse hover
- `focus`: When element is focused (keyboard/mouse)
- `active`: On press/click
- `disabled`: Non-interactive and visually muted

---

## 4. Style Tokens (CSS Variables)

List of required CSS variables used by this component.

**Example**:
- `--eui-color-primary-base`
- `--eui-color-on-primary`
- `--eui-shadow-1`
- `--eui-outline-focus`

---

## 5. DOM Structure

### a. Usage

Provide a usage snippet for reference.

```html
<eui-[component] variant="contained">Label</eui-[component]>
```

### b. Shadow DOM Layout

Show internal structure of the component.

```html
<element-root>
  <span class="icon leading"></span>
  <span class="label">Label</span>
  <span class="icon trailing"></span>
  <span class="ripple"></span>
</element-root>
```

---

## 6. Attributes / Properties

List supported attributes and their behaviors.

- Format:
  - `attribute-name` (type, default) – description

**Example**:
- `variant` (string, "text") – Visual variant of the component  
- `disabled` (boolean, false) – Prevents interaction  
- `icon` (string, null) – Leading icon  
- `trailing-icon` (string, null) – Trailing icon  
- `label` (string, required) – Visible button label

---

## 7. Events

List all custom DOM events emitted.

- Format:
  - `event-name`: Trigger condition – Payload type or detail

**Example**:
- `click`: Fired on user interaction – native click event  
- `change`: Fired on value/state update – string or object

---

## 8. Accessibility Checklist

Indicate what ARIA and keyboard features are implemented.

- Uses native interactive elements (`button`, `input`, etc)
- Adds proper ARIA roles when needed
- Handles `aria-disabled` or similar attributes
- Supports keyboard navigation (`Tab`, `Enter`, `Space`)
- Shows visible focus ring on keyboard focus

---

## 9. Responsive Behavior

Describe how the component behaves in flexible layouts.

- Minimum/maximum sizes (e.g. `min-height: 36px`)
- Whether content auto-wraps or shrinks
- How icons or labels scale with screen size

---

## 10. Notes (Optional)

Any implementation-specific rules, limitations, or design deviations.

---

## Coding Guidelines

You are a senior frontend engineer and expert in Web Components.
Keep in mind below guidelines while implementing any component

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

