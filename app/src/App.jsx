import { useEffect } from 'react'
import './App.css'

function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h
  let s
  const l = (max + min) / 2
  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      default:
        h = (r - g) / d + 4
    }
    h /= 6
  }
  return [h * 360, s, l]
}

function hslToHex(h, s, l) {
  h /= 360
  let r
  let g
  let b
  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  const toHex = (x) => Math.round(x * 255).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function lighten(hex, amt) {
  const [h, s, l] = hexToHsl(hex)
  return hslToHex(h, s, Math.min(1, l + amt))
}

function darken(hex, amt) {
  const [h, s, l] = hexToHsl(hex)
  return hslToHex(h, s, Math.max(0, l - amt))
}

function contrast(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const lum = 0.299 * r + 0.587 * g + 0.114 * b
  return lum > 0.6 ? '#000000' : '#ffffff'
}

function setInputValue(id, value) {
  const el = document.getElementById(id)
  if (el) el.value = value
}

function applyTone(prefix, base) {
  const root = document.documentElement
  const hover = darken(base, 0.1)
  const active = darken(base, 0.2)
  const container = lighten(base, 0.4)
  const disabledTone = lighten(base, 0.5)
  const on = contrast(base)

  root.style.setProperty(`--eui-color-${prefix}-outline`, base)

  root.style.setProperty(`--eui-color-${prefix}-base`, base)
  root.style.setProperty(`--eui-color-${prefix}-hover`, hover)
  root.style.setProperty(`--eui-color-${prefix}-active`, active)
  root.style.setProperty(`--eui-color-${prefix}-container`, container)
  root.style.setProperty(`--eui-color-${prefix}-disabled`, disabledTone)
  root.style.setProperty(`--eui-color-on-${prefix}`, on)

  setInputValue(`${prefix}HoverColor`, hover)
  setInputValue(`${prefix}ActiveColor`, active)
  setInputValue(`${prefix}ContainerColor`, container)
  setInputValue(`${prefix}DisabledColor`, disabledTone)
  setInputValue(`${prefix}OutlineColor`, base)
  setInputValue(`on${prefix.charAt(0).toUpperCase() + prefix.slice(1)}Color`, on)
}

function Section({ id, children }) {
  const label = id.charAt(0).toUpperCase() + id.slice(1).replace('-', ' ')
  return (
    <section id={id}>
      <h2>{label}</h2>
      {children}
    </section>
  )
}

export default function App() {
  const DEFAULTS = {
    primary: '#6200ee',
    secondary: '#018786',
    surface: '#ffffff',
    background: '#ffffff',
    'surface-variant': '#e7e0ec',
    'on-background': '#1c1b1f',
    'on-surface': '#1c1b1f',
    error: '#b00020',
    warning: '#fbc02d',
    success: '#388e3c',
    'elevation-0': '#ffffff',
    'elevation-1': '#f7f2fa',
    'elevation-2': '#eee7f4',
  }


  useEffect(() => {
    const update = () => {
      const primary = document.getElementById('primaryColor').value
      const secondary = document.getElementById('secondaryColor').value
      const surface = document.getElementById('surfaceColor').value
      const error = document.getElementById('errorColor').value
      const warning = document.getElementById('warningColor').value
      const success = document.getElementById('successColor').value
      const background = document.getElementById('backgroundColor').value
      const elevation0 = document.getElementById('elevation0Color').value
      const elevation1 = document.getElementById('elevation1Color').value
      const elevation2 = document.getElementById('elevation2Color').value

      const surfaceVariant = lighten(surface, 0.1)
      const onSurface = contrast(surface)
      const onBackground = contrast(background)

      setInputValue('surfaceVariantColor', surfaceVariant)
      setInputValue('onSurfaceColor', onSurface)
      setInputValue('onBackgroundColor', onBackground)

      applyTone('primary', primary)
      applyTone('secondary', secondary)
      applyTone('error', error)
      applyTone('warning', warning)
      applyTone('success', success)

      document.documentElement.style.setProperty('--eui-color-surface', surface)
      document.documentElement.style.setProperty('--eui-color-background', background)
      document.documentElement.style.setProperty('--eui-color-on-background', onBackground)
      document.documentElement.style.setProperty('--eui-color-surface-variant', surfaceVariant)
      document.documentElement.style.setProperty('--eui-color-on-surface', onSurface)
      document.documentElement.style.setProperty('--eui-color-elevation-0', elevation0)
      document.documentElement.style.setProperty('--eui-color-elevation-1', elevation1)
      document.documentElement.style.setProperty('--eui-color-elevation-2', elevation2)

    }

    update()

    const inputs = document.querySelectorAll('input[data-color]')
    inputs.forEach((inp) => inp.addEventListener('input', update))
    return () => inputs.forEach((inp) => inp.removeEventListener('input', update))
  }, [])

  return (
    <eui-grid
      className="demo-layout"
      columns="auto 1fr auto"
      areas="'theme main nav'"
      gap="lg"
      padding="lg"
    >
      <eui-vbox grid-area="theme" className="theme-panel">
        <fieldset>
          <legend>Theme</legend>
          <div className="flex flex-col gap-2">
            <label className="flex items-center justify-between gap-2">
              <span>Primary</span>
              <input id="primaryColor" data-color="primary" type="color" defaultValue={DEFAULTS.primary} />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Hover</span>
              <input id="primaryHoverColor" data-color="primary-hover" type="color" defaultValue={darken(DEFAULTS.primary, 0.1)} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Active</span>
              <input id="primaryActiveColor" data-color="primary-active" type="color" defaultValue={darken(DEFAULTS.primary, 0.2)} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Container</span>
              <input id="primaryContainerColor" data-color="primary-container" type="color" defaultValue={lighten(DEFAULTS.primary, 0.4)} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Disabled</span>
              <input id="primaryDisabledColor" data-color="primary-disabled" type="color" defaultValue={lighten(DEFAULTS.primary, 0.5)} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Outline</span>
              <input id="primaryOutlineColor" data-color="primary-outline" type="color" defaultValue={DEFAULTS.primary} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>On Primary</span>
              <input id="onPrimaryColor" data-color="on-primary" type="color" defaultValue={contrast(DEFAULTS.primary)} disabled />
            </label>
            <hr className="my-2 border-t" />
            <label className="flex items-center justify-between gap-2">
              <span>Secondary</span>
              <input id="secondaryColor" data-color="secondary" type="color" defaultValue={DEFAULTS.secondary} />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Hover</span>
              <input id="secondaryHoverColor" data-color="secondary-hover" type="color" defaultValue={darken(DEFAULTS.secondary, 0.1)} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Active</span>
              <input id="secondaryActiveColor" data-color="secondary-active" type="color" defaultValue={darken(DEFAULTS.secondary, 0.2)} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Container</span>
              <input id="secondaryContainerColor" data-color="secondary-container" type="color" defaultValue={lighten(DEFAULTS.secondary, 0.4)} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Disabled</span>
              <input id="secondaryDisabledColor" data-color="secondary-disabled" type="color" defaultValue={lighten(DEFAULTS.secondary, 0.5)} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Outline</span>
              <input id="secondaryOutlineColor" data-color="secondary-outline" type="color" defaultValue={DEFAULTS.secondary} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>On Secondary</span>
              <input id="onSecondaryColor" data-color="on-secondary" type="color" defaultValue={contrast(DEFAULTS.secondary)} disabled />
            </label>
            <hr className="my-2 border-t" />
            <label className="flex items-center justify-between gap-2">
              <span>Surface</span>
              <input id="surfaceColor" data-color="surface" type="color" defaultValue={DEFAULTS.surface} />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Surface Variant</span>
              <input id="surfaceVariantColor" data-color="surface-variant" type="color" defaultValue={lighten(DEFAULTS.surface, 0.1)} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>On Surface</span>
              <input id="onSurfaceColor" data-color="on-surface" type="color" defaultValue={contrast(DEFAULTS.surface)} disabled />
            </label>
            <hr className="my-2 border-t" />
            <label className="flex items-center justify-between gap-2">
              <span>Background</span>
              <input id="backgroundColor" data-color="background" type="color" defaultValue={DEFAULTS.background} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>On Background</span>
              <input id="onBackgroundColor" data-color="on-background" type="color" defaultValue={contrast(DEFAULTS.background)} disabled />
            </label>
            <hr className="my-2 border-t" />
            <label className="flex items-center justify-between gap-2">
              <span>Error</span>
              <input id="errorColor" data-color="error" type="color" defaultValue={DEFAULTS.error} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Hover</span>
              <input id="errorHoverColor" data-color="error-hover" type="color" defaultValue={darken(DEFAULTS.error, 0.1)} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Active</span>
              <input id="errorActiveColor" data-color="error-active" type="color" defaultValue={darken(DEFAULTS.error, 0.2)} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Container</span>
              <input id="errorContainerColor" data-color="error-container" type="color" defaultValue={lighten(DEFAULTS.error, 0.4)} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Disabled</span>
              <input id="errorDisabledColor" data-color="error-disabled" type="color" defaultValue={lighten(DEFAULTS.error, 0.5)} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Outline</span>
              <input id="errorOutlineColor" data-color="error-outline" type="color" defaultValue={DEFAULTS.error} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>On Error</span>
              <input id="onErrorColor" data-color="on-error" type="color" defaultValue={contrast(DEFAULTS.error)} disabled />
            </label>
            <hr className="my-2 border-t" />

            <label className="flex items-center justify-between gap-2">
              <span>Warning</span>
              <input id="warningColor" data-color="warning" type="color" defaultValue={DEFAULTS.warning} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Hover</span>
              <input id="warningHoverColor" data-color="warning-hover" type="color" defaultValue={darken(DEFAULTS.warning, 0.1)} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Active</span>
              <input id="warningActiveColor" data-color="warning-active" type="color" defaultValue={darken(DEFAULTS.warning, 0.2)} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Container</span>
              <input id="warningContainerColor" data-color="warning-container" type="color" defaultValue={lighten(DEFAULTS.warning, 0.4)} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Disabled</span>
              <input id="warningDisabledColor" data-color="warning-disabled" type="color" defaultValue={lighten(DEFAULTS.warning, 0.5)} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Outline</span>
              <input id="warningOutlineColor" data-color="warning-outline" type="color" defaultValue={DEFAULTS.warning} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>On Warning</span>
              <input id="onWarningColor" data-color="on-warning" type="color" defaultValue={contrast(DEFAULTS.warning)} disabled />
            </label>
            <hr className="my-2 border-t" />

            <label className="flex items-center justify-between gap-2">
              <span>Success</span>
              <input id="successColor" data-color="success" type="color" defaultValue={DEFAULTS.success} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Hover</span>
              <input id="successHoverColor" data-color="success-hover" type="color" defaultValue={darken(DEFAULTS.success, 0.1)} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Active</span>
              <input id="successActiveColor" data-color="success-active" type="color" defaultValue={darken(DEFAULTS.success, 0.2)} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Container</span>
              <input id="successContainerColor" data-color="success-container" type="color" defaultValue={lighten(DEFAULTS.success, 0.4)} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Disabled</span>
              <input id="successDisabledColor" data-color="success-disabled" type="color" defaultValue={lighten(DEFAULTS.success, 0.5)} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>Outline</span>
              <input id="successOutlineColor" data-color="success-outline" type="color" defaultValue={DEFAULTS.success} disabled />
            </label>
            <label className="flex items-center justify-between gap-2 pl-4">
              <span>On Success</span>
              <input id="onSuccessColor" data-color="on-success" type="color" defaultValue={contrast(DEFAULTS.success)} disabled />
            </label>
            <hr className="my-2 border-t" />
            <label className="flex items-center justify-between gap-2">
              <span>Elevation 0</span>
              <input id="elevation0Color" data-color="elevation-0" type="color" defaultValue={DEFAULTS['elevation-0']} disabled />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Elevation 1</span>
              <input id="elevation1Color" data-color="elevation-1" type="color" defaultValue={DEFAULTS['elevation-1']} disabled />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Elevation 2</span>
              <input id="elevation2Color" data-color="elevation-2" type="color" defaultValue={DEFAULTS['elevation-2']} disabled />
            </label>
          </div>
        </fieldset>
      </eui-vbox>

      <main grid-area="main" className="demo-content">
        <h1>Elemental UI Components</h1>

        <Section id="vbox">
          <eui-vbox gap="sm" padding="sm">
            <div className="demo-box">One</div>
            <div className="demo-box">Two</div>
            <div className="demo-box">Three</div>
          </eui-vbox>
        </Section>

        <Section id="hbox">
          <eui-hbox gap="sm" padding="sm">
            <div className="demo-box">One</div>
            <div className="demo-box">Two</div>
            <div className="demo-box">Three</div>
          </eui-hbox>
        </Section>

        <Section id="center-box">
          <div className="border border-dashed p-2" style={{ height: '200px' }}>
            <eui-center-box gap="sm" padding="sm">
              <div className="demo-box">One</div>
              <div className="demo-box">Two</div>
            </eui-center-box>
          </div>
        </Section>

        <Section id="grid-box">
         <eui-grid
  columns="auto auto auto"
  rows="auto auto"
  areas="'a b c' 'd e f'"
  gap="sm"
  padding="sm"
>
  <div className="demo-box" grid-area="a">A</div>
  <div className="demo-box" grid-area="b">B</div>
  <div className="demo-box" grid-area="c">C</div>
  <div className="demo-box" grid-area="d">D</div>
  <div className="demo-box" grid-area="e">E</div>
  <div className="demo-box" grid-area="f">F</div>
</eui-grid>
        </Section>

        <Section id="buttons">
          <eui-hbox gap="sm">
            <eui-button id="defaultBtn" label="Default Button"></eui-button>
            <eui-button variant="contained" label="Contained Button"></eui-button>
            <eui-button variant="outlined" label="Outlined Button"></eui-button>
            <eui-button variant="icon" icon="❤" label="Like"></eui-button>
          </eui-hbox>
        </Section>

        <Section id="select">
          <eui-select label="Choose Country" searchable>
            <eui-option value="IN">India</eui-option>
            <eui-option value="US">United States</eui-option>
            <eui-option value="JP">Japan</eui-option>
          </eui-select>
        </Section>
      </main>
      <eui-vbox grid-area="nav" className="nav-panel">
        <a href="#vbox">VBox</a>
        <a href="#hbox">HBox</a>
        <a href="#center-box">Center Box</a>
        <a href="#grid-box">Grid Box</a>
        <a href="#buttons">Buttons</a>
        <a href="#select">Select</a>
      </eui-vbox>
    </eui-grid>
  )
}

