const DEFAULT_IN_ROLL = 'rollIn'
const DEFAULT_OUT_ROLL = 'rollOut'

class RollingSlide extends Slide {
  constructor () {
    super()
  }

  get in () {
    return this.getAttribute('in') || DEFAULT_IN_ROLL
  }

  get out () {
    return this.getAttribute('out') || DEFAULT_OUT_ROLL
  }

  inlineStyles () {
      return Object.assign(super.inlineCSS(), {
          textAlign: 'center',
          borderColor: 'black',
          backgroundColor: 'white',
          color: 'black',
          backgroundImage: 'url(/scopes.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '2% 98%',
          border: 'none'
      })
  }
}

customElements.define('x-rolling', RollingSlide)