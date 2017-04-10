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
    return ['delay', 'icon']
  }

  get icon () {
    return this.getAttribute('icon') || '◱'
  }

  set icon (value) {
    this.setAttribute('icon', value)
  }

  get delay () {
    return parseInt(this.getAttribute('delay'), 10) || 3
  }

  set delay (value) {
    this.setAttribute('delay', value)
  }

  onConnect () {
    this.classList.add('animated', 'fadeIn')
    this.addEventListener('click', this.toggleFullScreen)
    document.addEventListener('keydown', this.handleKeydown)
    document.addEventListener('mousemove', this.isPointerIdle)
    this.isPointerIdle()
  }

  handleKeydown (e) {
    if (e.keyCode === 13) {
      this.toggleFullScreen()
    }
  }

  renderCallback () {
    this.textContent = this.icon
    Object.assign(this.style, this.inlineCSS())
  }

  inlineCSS () {
    return {
      color: '#FFF',
      position: 'fixed',
      bottom: '60px',
      right: '60px',
      fontSize: '100px',
      zIndex: '1000',
      cursor: 'pointer',
      display: 'block',
      lineHeight: '72px',
      textShadow: `-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000`
    }
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

customElements.define('x-fullscreen', FullScreen)
