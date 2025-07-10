export class EUIContainerElement extends HTMLElement {
  constructor(template) {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    if (template) {
      this._shadow.appendChild(template.content.cloneNode(true));
    }
  }
}
