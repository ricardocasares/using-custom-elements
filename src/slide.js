const DEFAULT_IN = 'fadeIn'
const DEFAULT_OUT = 'fadeOut'

class Slide extends BaseElement {
  static get observedAttributes () {
    return ['active', 'in', 'out']
  }

  get active () {
    return this.hasAttribute('active')
  }

  set active (value) {
    value ? this.setAttribute('active', '')
          : this.removeAttribute('active')
  }

  get in () {
    return this.getAttribute('in') || DEFAULT_IN
  }

  get out () {
    return this.getAttribute('out') || DEFAULT_OUT
  }

  onConnect() {
    this.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      `

    this.classList.add('animated')
  }

  renderCallback () {
    if (this.active) {
      this.classList.add(this.in)
      this.classList.remove(this.out)
    } else {
      this.classList.add(this.out)
      this.classList.remove(this.in)
    }
  }
}

customElements.define('x-slide', Slide)
