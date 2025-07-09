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
        <a href="#text-input">Text Input</a>
        <a href="#select">Select</a>
        <a href="#checks">Checkbox &amp; Radio</a>
        <a href="#switch">Switch</a>
        <a href="#dialog">Dialog</a>
        <a href="#snackbar">Snackbar</a>
        <a href="#tabs">Tabs</a>
        <a href="#card">Card</a>
        <a href="#tooltip">Tooltip</a>
        <a href="#progress">Progress</a>
        <a href="#slider">Slider</a>
      </nav>
      <fieldset>
        <legend>Theme</legend>
        <div className="controls">
          <label>
            Primary Color <input type="color" data-token="eui-primary" defaultValue="#6200ee" />
          </label>
          <label>
            On Primary <input type="color" data-token="eui-on-primary" defaultValue="#ffffff" />
          </label>
          <label>
            Input Background <input type="color" data-token="eui-input-bg" defaultValue="#ffffff" />
          </label>
        </div>
      </fieldset>

      <Section id="buttons">
        <eui-button id="defaultBtn" label="Default Button"></eui-button>
        <eui-button variant="text" label="Text Button"></eui-button>
        <eui-button variant="outlined" label="Outlined Button"></eui-button>
        <eui-button variant="icon" icon="❤" label="Like"></eui-button>
      </Section>

      <Section id="text-input">
        <eui-text-input>
          <span slot="label">Name</span>
        </eui-text-input>
      </Section>

      <Section id="select">
        <eui-select>
          <option>Option 1</option>
          <option>Option 2</option>
        </eui-select>
      </Section>

      <Section id="checks">
        <eui-checkbox>Accept</eui-checkbox>
        <br />
        <eui-radio name="r1">A</eui-radio>
        <eui-radio name="r1">B</eui-radio>
      </Section>

      <Section id="switch">
        <eui-switch></eui-switch>
      </Section>

      <Section id="dialog">
        <eui-button label="Open Dialog" onClick={() => document.getElementById('dlg').open()}></eui-button>
        <eui-dialog id="dlg">
          <p>Hello Dialog</p>
          <eui-button label="Close" onClick={() => document.getElementById('dlg').close()}></eui-button>
        </eui-dialog>
      </Section>

      <Section id="snackbar">
        <eui-button label="Show Snackbar" onClick={() => document.getElementById('sb').show()}></eui-button>
        <eui-snackbar id="sb">Saved!</eui-snackbar>
      </Section>

      <Section id="tabs">
        <eui-tabs>
          <span slot="tab">Tab 1</span>
          <span slot="tab">Tab 2</span>
          <div>Content 1</div>
          <div>Content 2</div>
        </eui-tabs>
      </Section>

      <Section id="card">
        <eui-card>
          <span slot="header">Header</span>
          <p>Card content</p>
          <span slot="footer">Footer</span>
        </eui-card>
      </Section>

      <Section id="tooltip">
        <eui-tooltip text="Tooltip text">
          <eui-button variant="text" label="Hover me"></eui-button>
        </eui-tooltip>
      </Section>

      <Section id="progress">
        <eui-progress id="prog" value="50"></eui-progress>
      </Section>

      <Section id="slider">
        <eui-slider value="30"></eui-slider>
      </Section>
    </>
  )
}

