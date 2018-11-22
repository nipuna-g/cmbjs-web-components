class CmbjsToggleElement extends HTMLElement {
  constructor() {
    super();
    let toggleTemplate = document.currentScript.ownerDocument.getElementById('toggle-template');

    // attach shadow dom and append the toggleTemplate to it
    // open mode allows the outer DOM access the shadow DOM
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(toggleTemplate.content.cloneNode(true));
    let toggleCheckbox = shadowRoot.getElementById('toggle-checkbox');

    this.addEventListener('click', e => {
      this.toggleValue = toggleCheckbox.checked;
      this.dispatchEvent(new CustomEvent('toggled', { bubbles: true, detail: this.toggleValue }));
    });
  }

  // we need this getter for performance optimizations
  static get observedAttributes() {
    return ['on-caption', 'off-caption'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'on-caption':
        this.shadowRoot.getElementById('tgl-btn').setAttribute('data-tg-on', newValue);
        break;
      case 'off-caption':
        this.shadowRoot.getElementById('tgl-btn').setAttribute('data-tg-off', newValue);
        break;
    }
  }

  // Other life cycle events
  // connectedCallBack - element added to the DOM
  // disconnectedCallBack - element removed from the DOM
  // adoptedCallback - element moved to new document
}

window.customElements.define('cmbjs-toggle', CmbjsToggleElement);
