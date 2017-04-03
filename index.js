
// BASE

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
    return parseInt(window.location.hash.replace('#', ''), 10) || 0
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

// SLIDE

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

  renderCallback () {
    this.attachStyles()
  }

  attachStyles () {
    this.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      `
    this.classList.add('animated')

    if (this.active) {
      this.classList.add(this.in)
      this.classList.remove(this.out)
    } else {
      this.classList.add(this.out)
      this.classList.remove(this.in)
    }
  }
}

// ASCII ICON

class AsciiFace extends BaseElement {
  static get observedAttributes () {
    return ['face', 'size', 'color']
  }

  get face () {
    return this.getAttribute('face') || 'meh'
  }

  get color () {
    return this.getAttribute('color') || 'currentColor'
  }

  get size () {
    return parseFloat(this.getAttribute('size'))
  }

  constructor () {
    super()

    this.faces = {
      disapprove: 'ಠ_ಠ',
      shrug: '¯\\_(ツ)_/¯',
      meh: '¯\\(°_o)/¯',
      love: '♥‿♥',
      careless: '◔_◔',
      dance: 'ヾ(-_- )ゞ',
      cry: 'ಥ﹏ಥ',
      happy: 'ヽ(´▽`)/',
      bear: 'ʕ•ᴥ•ʔ',
      what: '¯\\_(⊙︿⊙)_/¯'
    }
  }

  renderCallback () {
    this.innerHTML = this.faces[this.face]
    this.style.cssText = this.buildStyles()
  }

  buildStyles () {
    let styles = []

    if (this.color) styles.push(`color: ${this.color};`)
    if (this.size) styles.push(`font-size: ${this.size}px;`)

    return styles.join(' ')
  }
}

class FullScreen extends BaseElement {
  constructor () {
    super()

    this.timeout = null
    this.isPointerIdle = this.isPointerIdle.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
    this.toggleFullScreen = this.toggleFullScreen.bind(this)
    this.hideFullScreenToggle = this.hideFullScreenToggle.bind(this)
  }

  static get observedAttributes () {
    return ['delay']
  }

  get delay () {
    return this.getAttribute('delay') || 5
  }

  onConnect () {
    this.classList.add('animated', 'fadeIn')
    this.addEventListener('click', this.toggleFullScreen)
    document.addEventListener('keydown', this.handleKeydown)
    document.addEventListener('mousemove', this.isPointerIdle)
    this.isPointerIdle()
  }

  handleKeydown(e) {
    if (e.keyCode === 13) {
      this.toggleFullScreen()
    }
  }

  renderCallback () {
    this.textContent = '◱'
    this.style.cssText = this.buildStyles()
  }

  buildStyles () {
    return `
      color: #FFF;
      position: fixed;
      bottom: 60px;
      right: 60px;
      font-size: 100px;
      z-index: 1000;
      cursor: pointer;
      display: block;
      line-height: 72px;
    `
  }

  toggleFullScreen () {
    if (!document.webkitFullscreenElement) {
      document.body.webkitRequestFullscreen()
    } else {
      if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  }

  isPointerIdle () {
    clearTimeout(this.timeout)
    this.showFullScreenToggle()
    this.timeout = setTimeout(this.hideFullScreenToggle, this.delay * 1000)
  }

  hideFullScreenToggle () {
    this.classList.remove('fadeIn')
    this.classList.add('fadeOut')
  }

  showFullScreenToggle () {
    this.classList.add('fadeIn')
    this.classList.remove('fadeOut')
  }

  disconnectedCallback () {
    clearTimeout(this.timeout)
    this.removeEventListener('click', this.toggleFullScreen)
    document.removeEventListener('keydown', this.handleKeydown)
    document.removeEventListener('mousemove', this.isPointerIdle)
  }
}

// DEFINITION

customElements.define('x-deck', Deck)
customElements.define('x-slide', Slide)
customElements.define('x-ascii', AsciiFace)
customElements.define('x-fullscreen', FullScreen)
