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

  inlineCSS () {
      return Object.assign(super.inlineCSS(), {
          textAlign: 'center',
          backgroundImage: 'url(https://rollingscopes.com/images/logo_rs_text.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '2% 98%'
      })
  }
}

customElements.define('x-rolling', RollingSlide)