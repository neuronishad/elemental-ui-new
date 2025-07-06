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
<script type="module" src="https://cdn.example.com/components/button.min.js"></script>
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

## Repository Layout

Currently this repository only contains documentation. Future commits will add the source for each component under a `/components` directory. Tests and a demo site will also be included.

## Contributing

Contributions are welcome! Please open an issue or pull request if you have suggestions or want to help.

