class RollingSlide extends Slide {
  constructor () {
    super()
  }

  inlineStyles () {
      return Object.assign(super.inlineStyles(), {
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