export class EUICard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('div');
    wrapper.className = 'card';
    wrapper.innerHTML = `
      <header><slot name="header"></slot></header>
      <section class="content"><slot></slot></section>
      <footer><slot name="footer"></slot></footer>
    `;
    const style = document.createElement('style');
    style.textContent = `
      .card { border: 1px solid #ccc; border-radius: 4px; overflow: hidden; }
      header, footer { padding: 0.5em 1em; background: #f5f5f5; }
      .content { padding: 1em; }
    `;
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }
}
customElements.define('eui-card', EUICard);
