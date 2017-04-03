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

  connectedCallback () {
    if (!this.connected) {
      this.onConnect()
      this.connected = true
    }

    this.renderCallback()
  }

  attributeChangedCallback (attr, prev, curr) {
    if (this.connected && prev !== curr) {
      this.renderCallback()
    }
  }
}
