class BaseElement extends HTMLElement {
  constructor () {
    super()

    this.connected = false
  }

  onConnect () {
    // to be overriden by user
  }

  renderCallback () {
    // to be overriden by user
  }

  inlineStyles () {
    // to be overriden by user
    return {};
  }

  connectedCallback () {
    if (!this.connected) {
      this.onConnect()
      this.connected = true
    }

    this.render()
  }

  render () {
    Object.assign(this.style, this.inlineStyles())
    this.renderCallback();
  }

  attributeChangedCallback (attr, prev, curr) {
    if (this.connected && prev !== curr) {
      this.render()
    }
  }
}
