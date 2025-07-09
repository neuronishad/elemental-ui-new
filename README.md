# Elemental UI

Elemental UI is an experimental collection of **JavaScript/HTML only web components** designed to be consumed without any specific framework. The goal is to provide a set of reusable UI elements that can be dropped directly into a [templ](https://templ.guide/) + [htmx](https://htmx.org/) stack or any other server rendered environment.

## Goals

- **Material design** &ndash; each component follows the Material guidelines so that they feel familiar and accessible out of the box.
- **Individual installation** &ndash; components are published individually so you can include only what you need via a CDN (similar to `shacdn`).
- **Theming** &ndash; a small theming system allows you to apply consistent colors, typography and spacing across all components.
- **Responsive** &ndash; components scale to different viewports and apply sensible spacing for mobile and desktop layouts.
- **Pure JS/HTML** &ndash; no build tools or frameworks required. Import the component scripts and use them directly in your HTML templates.

## Usage

1. Import the script for the component you want to use:

```html
<script type="module" src="https://cdn.example.com/components/basic/button.min.js"></script>
```

2. Use the custom element in your markup:

```html
<eui-button>Save</eui-button>
```

Each component registers itself when loaded so you can simply drop the tag into your templates.

## Theming

The library exposes CSS custom properties for colors, spacing and typography. Define these variables on a wrapper element or globally to change the look and feel:

```css
:root {
  --eui-primary: #6200ee;
  --eui-spacing: 8px;
  /* other tokens */
}
```

## Demo

Run the Vite demo in the `app/` directory to see all components in action and tweak theme colors:

```bash
cd app
npm install
npm run dev
```

The React app loads the Elemental UI components via `<script>` tags and lets you tweak theme colors at runtime. This replaces the old `react-demo.html` file.

## Repository Layout

The `components` directory contains the source for each custom element. You can import them individually from `components/basic/` or via `components/index.js` which re-exports every component.
Available modules include:

- `button.js`
- `text-input.js`
- `select.js`
- `checkbox.js`
- `radio.js`
- `switch.js`
- `dialog.js`
- `snackbar.js`
- `tabs.js`
- `card.js`
- `tooltip.js`
- `progress.js`
- `slider.js`

Importing from `index.js` looks like this:

```
import { EUIButton, EUITextInput } from './components/index.js';
```

Each component is an ES module that automatically registers a custom element
when imported.

## Contributing

Contributions are welcome! Please open an issue or pull request if you have suggestions or want to help.

