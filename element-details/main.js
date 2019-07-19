customElements.define(
  'element-details',
  class extends HTMLElement {
    constructor() {
      super();
      console.log('hello');
      const template = document.getElementById('element-details-template')
        .content;
      this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true));
    }
  }
);
