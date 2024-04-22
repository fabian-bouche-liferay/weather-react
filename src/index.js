import React from 'react';
import './index.css';
import App from './App';
import ReactDOM from 'react-dom';

class WebComponent extends HTMLElement {

  static get observedAttributes() {
    return ['city', 'country', 'citydata'];
  }

  constructor() {
    super();
  }

	connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {

    ReactDOM.render(
      <App 
        city={this.getAttribute('city')}
        country={this.getAttribute('country')}
        apiKey={this.getAttribute('apikey')}
        cityData={this.getAttribute('citydata')}
      />,
      this
    );
  }

	disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this);
	}
}

const ELEMENT_ID = 'my-app';

if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}