class AsciiFace extends BaseElement {
  static get observedAttributes () {
    return ['face', 'size', 'color']
  }

  get face () {
    return this.getAttribute('face') || 'meh'
  }

  set face (value) {
    this.setAttribute('face', value)
  }

  get color () {
    return this.getAttribute('color') || 'currentColor'
  }

  set color (value) {
    this.setAttribute('color', value)
  }

  get size () {
    if (this.getAttribute('size')) {
      return `${parseFloat(this.getAttribute('size'))}px`
    }

    return '120px'
  }

  set size (value) {
    this.setAttribute('size', value)
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
    Object.assign(this.style, this.inlineCSS())
  }

  inlineCSS () {
    let styles = {}

    if (this.color) styles.color = this.color
    if (this.size) styles.fontSize = this.size

    return styles
  }
}

customElements.define('x-ascii', AsciiFace)
