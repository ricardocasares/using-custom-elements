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

  inlineStyles() {
    return {
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      width: '100%',
      height: '100%',
      background: 'black',
      fontFamily: 'BlinkMacSystemFont, sans-serif',
      borderWidth: '30px',
      borderStyle: 'solid',
      padding: '100px'
    }
  }
}

customElements.define('x-slide', Slide)
