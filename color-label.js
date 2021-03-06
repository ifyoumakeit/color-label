class ColorLabel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = this.__template;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.host.style.backgroundColor = this.__backgroundColor;
  }

  get __backgroundColor() {
    return this.__getPastelColor(this.shadowRoot.host.innerHTML);
  }

  __getPastelColor(string) {
    const strArr = string.split("");
    const count = string
      .split("")
      .reduce((acc, val) => acc + val.charCodeAt(0), 0);
    return `hsl(${count % 360}, 100%, 85%)`;
  }

  get __template() {
    return `<style>${this.__css}</style>${this.__html}`;
  }

  get __html() {
    return `<slot></slot>`;
  }

  get __style() {
    return `
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: bold;
        font-size: 11px;
        color: #444;
        display: inline-block;
        margin: 0 4px 4px 0;
        text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.3);
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"
      `;
  }

  get __css() {
    // Firefox and Chrome are clashing
    // and need :host or the actual tag-name.
    return `
        :host{ ${this.__style} }
        color-label { ${this.__style} }
      `;
  }
}

customElements.define("color-label", ColorLabel);
export default ColorLabel;
