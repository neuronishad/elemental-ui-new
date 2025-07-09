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

function applyTone(prefix, base) {
  const root = document.documentElement
  root.style.setProperty(`--eui-color-${prefix}-base`, base)
  root.style.setProperty(`--eui-color-${prefix}-hover`, darken(base, 0.1))
  root.style.setProperty(`--eui-color-${prefix}-active`, darken(base, 0.2))
  root.style.setProperty(`--eui-color-${prefix}-container`, lighten(base, 0.4))
  root.style.setProperty(`--eui-color-${prefix}-disabled`, lighten(base, 0.5))
  root.style.setProperty(`--eui-color-on-${prefix}`, contrast(base))
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
  useEffect(() => {
    const update = () => {
      const primary = document.getElementById('primaryColor').value
      const secondary = document.getElementById('secondaryColor').value
      const surface = document.getElementById('surfaceColor').value
      applyTone('primary', primary)
      applyTone('secondary', secondary)
      document.documentElement.style.setProperty('--eui-color-surface', surface)
      document.documentElement.style.setProperty('--eui-color-background', surface)
      document.documentElement.style.setProperty('--eui-color-on-background', contrast(surface))
      document.documentElement.style.setProperty('--eui-color-on-surface', contrast(surface))
    }

    update()

    const inputs = document.querySelectorAll('input[data-color]')
    inputs.forEach((inp) => inp.addEventListener('input', update))
    return () => inputs.forEach((inp) => inp.removeEventListener('input', update))
  }, [])

  return (
    <div className="demo-layout">
      <aside className="theme-panel">
        <fieldset>
          <legend>Theme</legend>
          <div className="controls">
            <label>
              Primary
              <input id="primaryColor" data-color="primary" type="color" defaultValue="#6200ee" />
            </label>
            <label>
              Secondary
              <input id="secondaryColor" data-color="secondary" type="color" defaultValue="#018786" />
            </label>
            <label>
              Surface
              <input id="surfaceColor" data-color="surface" type="color" defaultValue="#ffffff" />
            </label>
          </div>
        </fieldset>
      </aside>

      <main className="demo-content">
        <h1>Elemental UI Components</h1>
        <nav>
          <a href="#buttons">Buttons</a>
        </nav>

        <Section id="buttons">
          <eui-button id="defaultBtn" label="Default Button"></eui-button>
          <eui-button variant="contained" label="Contained Button"></eui-button>
          <eui-button variant="outlined" label="Outlined Button"></eui-button>
          <eui-button variant="icon" icon="❤" label="Like"></eui-button>
        </Section>
      </main>
    </div>
  )
}

