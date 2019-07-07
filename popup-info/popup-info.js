class PopUpInfo extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');

    const icon = document.createElement('span');
    icon.setAttribute('class', 'icon');
    icon.setAttribute('tabindex', 0);

    const info = document.createElement('span');
    info.setAttribute('class', 'info');

    // Take attribute content and set it inside info span
    const text = this.getAttribute('data-text');
    info.textContent = text;

    // Insert icon
    let imgUrl = this.hasAttribute('img')
      ? this.getAttribute('img')
      : 'img/default.png';
    const img = document.createElement('img');
    img.src = imgUrl;
    icon.appendChild(img);

    // Style
    const style = document.createElement('style');
    console.log(style.isConnected);

    style.textContent = `
      .wrapper {
        position: relative;
      }

      .info {
        --tip-height: 10px;
        --tip-width: calc(.8 * var(--tip-height));
        position: absolute;
        bottom: calc(100% + var(--tip-height));
        left: calc(-0.5 * var(--tip-width));
        display: inline-block;
        width: 200px;
        padding: 10px;
        font-size: 0.8rem;
        background: black;
        color: white;
        border-radius: 4px;
        opacity: 0;
        transition: 0.6s all;
      }
      .info::before {
        content: "";
        position: absolute;
        top: 100%;
        left:  var(--tip-width);  
        border: var(--tip-width) solid transparent;
        border-top: var(--tip-width) solid black;

      }
      img {
        width: 1.2rem;
      }

      .icon:hover img{
        
      }

      .icon:hover + .info,
      .icon:focus + .info {
        opacity: 1;
      }
    `;

    // Attach created elements to shadow DOM
    console.log(style.isConnected);
    shadow.appendChild(wrapper);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);
    shadow.appendChild(style);
  }
}

customElements.define('popup-info', PopUpInfo);
