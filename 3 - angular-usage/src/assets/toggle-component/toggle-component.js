(function() {
  const template = document.createElement('template');

  template.innerHTML = `
    <div id="toggle-template">
        <style>
        :host {
            display: flex;
            width: 100%;
            align-items: center;
            flex-direction: column;
            --on-color: red;
            --off-color: green;
          }

          .tgl {
            display: none;
          }
          .tgl,
          .tgl:after,
          .tgl:before,
          .tgl *,
          .tgl *:after,
          .tgl *:before,
          .tgl + .tgl-btn {
            box-sizing: border-box;
          }
          .tgl::-moz-selection,
          .tgl:after::-moz-selection,
          .tgl:before::-moz-selection,
          .tgl *::-moz-selection,
          .tgl *:after::-moz-selection,
          .tgl *:before::-moz-selection,
          .tgl + .tgl-btn::-moz-selection {
            background: none;
          }
          .tgl::selection,
          .tgl:after::selection,
          .tgl:before::selection,
          .tgl *::selection,
          .tgl *:after::selection,
          .tgl *:before::selection,
          .tgl + .tgl-btn::selection {
            background: none;
          }
          .tgl + .tgl-btn {
            margin-bottom: 1em;
            margin-top: 0.25em;
            outline: 0;
            display: block;
            width: 4em;
            height: 2em;
            position: relative;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          .tgl + .tgl-btn:after,
          .tgl + .tgl-btn:before {
            position: relative;
            display: block;
            content: '';
            width: 50%;
            height: 100%;
          }
          .tgl + .tgl-btn:after {
            left: 0;
          }
          .tgl + .tgl-btn:before {
            display: none;
          }
          .tgl:checked + .tgl-btn:after {
            left: 50%;
          }

          .tgl-flip + .tgl-btn {
            padding: 2px;
            transition: all 0.2s ease;
            font-family: sans-serif;
            -webkit-perspective: 100px;
            perspective: 100px;
          }
          .tgl-flip + .tgl-btn:after,
          .tgl-flip + .tgl-btn:before {
            display: inline-block;
            transition: all 0.4s ease;
            width: 100%;
            text-align: center;
            position: absolute;
            line-height: 2em;
            font-weight: bold;
            color: #fff;
            position: absolute;
            top: 0;
            left: 0;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            border-radius: 4px;
          }
          .tgl-flip + .tgl-btn:after {
            content: attr(data-tg-on);
            background: var(--on-color);
            -webkit-transform: rotateY(-180deg);
            transform: rotateY(-180deg);
          }
          .tgl-flip + .tgl-btn:before {
            background: var(--off-color);
            content: attr(data-tg-off);
          }
          .tgl-flip + .tgl-btn:active:before {
            -webkit-transform: rotateY(-20deg);
            transform: rotateY(-20deg);
          }
          .tgl-flip:checked + .tgl-btn:before {
            -webkit-transform: rotateY(180deg);
            transform: rotateY(180deg);
          }
          .tgl-flip:checked + .tgl-btn:after {
            -webkit-transform: rotateY(0);
            transform: rotateY(0);
            left: 0;
            background: var(--on-color);
          }
          .tgl-flip:checked + .tgl-btn:active:after {
            -webkit-transform: rotateY(20deg);
            transform: rotateY(20deg);
          }
                  </style>

        <slot></slot>

        <input class="tgl tgl-flip" id="toggle-checkbox" type="checkbox" />
        <label id="tgl-btn" class="tgl-btn" data-tg-off="True" data-tg-on="False" for="toggle-checkbox">
        </label>
    </div>`;

  class CmbjsToggleElement extends HTMLElement {
    constructor() {
      super();
      //let toggleTemplate = document.currentScript.ownerDocument.getElementById('toggle-template');

      // attach shadow dom and append the toggleTemplate to it
      // open mode allows the outer DOM access the shadow DOM
      let shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
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
})();
