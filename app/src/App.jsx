import { useEffect } from 'react'
import './App.css'

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
    document.querySelectorAll('input[data-token]').forEach((inp) => {
      inp.addEventListener('input', (e) => {
        document.documentElement.style.setProperty(`--${e.target.dataset.token}`, e.target.value)
      })
    })
  }, [])

  return (
    <>
      <h1>Elemental UI Components</h1>
      <nav>
        <a href="#buttons">Buttons</a>
      </nav>
      <fieldset>
        <legend>Theme</legend>
        <div className="controls">
          <label>
            Primary Color <input type="color" data-token="eui-color-primary-base" defaultValue="#6200ee" />
          </label>
          <label>
            On Primary <input type="color" data-token="eui-color-on-primary" defaultValue="#ffffff" />
          </label>
          <label>
            Surface <input type="color" data-token="eui-color-surface" defaultValue="#ffffff" />
          </label>
        </div>
      </fieldset>

      <Section id="buttons">
        <eui-button id="defaultBtn" label="Default Button"></eui-button>
        <eui-button variant="contained" label="Contained Button"></eui-button>
        <eui-button variant="outlined" label="Outlined Button"></eui-button>
        <eui-button variant="icon" icon="❤" label="Like"></eui-button>
      </Section>
    </>
  )
}

