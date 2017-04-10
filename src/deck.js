// DECK

// @TODO: Self contain and inject all dependencies
// const CDNJS = 'https://cdnjs.cloudflare.com/ajax/libs/'
// const HLJS = `${CDNJS}/highlight.js/9.10.0`
// const HLJS_LIB = `${HLJS}/highlight.min.js`
// const HLJS_JS_PACK = `${HLJS}/languages/javascript.min.js`
// const HLJS_CSS = `${HLJS}/styles/atom-one-dark.min.css`
// const ANIMATE_CSS = `${CDNJS}/animate.css/3.5.2/animate.min.css`

class Deck extends BaseElement {
  constructor () {
    super()

    this.slides = []
    this.timer = null
    this.current = null
    this.next = this.next.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
  }

  static get observedAttributes () {
    return ['autoplay', 'delay', 'active']
  }

  get active () {
    return parseInt(this.getAttribute('active') || window.location.hash.replace('#', ''), 10) || 0
  }

  set active (idx) {
    window.location.hash = `${idx}`
    this.setAttribute('active', `${idx}`)
  }

  get autoplay () {
    return this.hasAttribute('autoplay')
  }

  set autoplay (value) {
    value ? this.setAttribute('autoplay', '')
          : this.removeAttribute('autoplay')
  }

  get interval () {
    return parseFloat(this.getAttribute('interval') || 5)
  }

  set interval (value) {
    value ? this.setAttribute('interval', `${value}`)
          : this.removeAttribute('interval')
  }

  onConnect () {
    this.collectSlides()
    this.attachNavigation()
    
    // wait for slides to be defined
    customElements
      .whenDefined('x-slide')
      .then(this.activateSlide.bind(this, this.active))
  }

  renderCallback () {
    this.autoplayMode()
  }

  collectSlides () {
    this.slides = Array.from(this.querySelectorAll('x-slide'))
  }

  attachNavigation () {
    this.addEventListener('click', this.next)
    document.addEventListener('keydown', this.handleKeydown)
  }

  autoplayMode () {
    if (this.autoplay) {
      clearInterval(this.timer)
      this.timer = setInterval(this.next, this.interval * 1000)
    }
  }

  activateSlide (idx) {
    if (this.current) {
      this.current.active = false
    }

    this.current = this.slides[idx]
    this.current.active = true
    this.active = idx
  }

  handleKeydown (e) {
    switch (e.keyCode) {
      case 32:
        this.next()
        return
      case 37:
        this.prev()
        return
      case 39:
        this.next()
        return;
    }
  }

  next () {
    let next = this.active + 1
    let total = this.slides.length - 1

    if (next <= total) {
      this.activateSlide(next)
    } else {
      this.activateSlide(0)
    }
  }

  prev () {
    let prev = this.active - 1

    if (prev >= 0) {
      this.activateSlide(prev)
    } else {
      this.activateSlide(this.slides.length - 1)
    }
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.next)
    document.removeEventListener('keydown', this.handleKeydown)
  }
}

customElements.define('x-deck', Deck)
