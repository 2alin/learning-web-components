class Square extends HTMLElement {
  // Specify observed attributes so that
  // attributeChangedCallback will work
  static get observedAttributes() {
    return ['c', 'l'];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const div = document.createElement('div');
    const style = document.createElement('style');
    shadow.appendChild(style);
    shadow.appendChild(div);
  }

  connectedCallback() {
    console.log('Custom square element added to page');
    updateStyle(this);
  }

  disconnectedCallback() {
    console.log('Custom square element removed from page');
  }

  adoptedCallback() {
    console.log('Custom square element moved to new page');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom square element attributes changed');
    updateStyle(this);
  }
}

customElements.define('custom-square', Square);

function updateStyle(elem) {
  const shadow = elem.shadowRoot;
  shadow.querySelector('style').textContent = `
    div {
      width: ${elem.getAttribute('l')}px;
      height: ${elem.getAttribute('l')}px;
      background-color: ${elem.getAttribute('c')};
      margin: 20px 0;
    }
  `;
}

const add = document.querySelector('.add');
const update = document.querySelector('.update');
const remove = document.querySelector('.remove');
let square;

update.disabled = true;
remove.disabled = true;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor() {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
}

function setAttributes(values, elem) {
  // `values` is an object of the form {attr1: value1, attr2: value2}
  for (let attr in values) {
    elem.setAttribute(attr, values[attr]);
  }
}

add.addEventListener('click', function() {
  // Create a custom square element
  square = document.createElement('custom-square');
  setAttributes({ l: 100, c: 'red' }, square);
  document.body.appendChild(square);

  update.disabled = false;
  remove.disabled = false;
  add.disabled = true;
});

update.addEventListener('click', function() {
  // Randomly update square's attributes
  setAttributes({ l: random(50, 200), c: randomColor() }, square);
});

remove.addEventListener('click', function() {
  // Remove the square
  document.body.removeChild(square);

  update.disabled = true;
  remove.disabled = true;
  add.disabled = false;
});
