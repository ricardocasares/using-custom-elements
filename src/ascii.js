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
    return parseFloat(this.getAttribute('size'))
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
    this.style.cssText = this.buildStyles()
  }

  buildStyles () {
    let styles = []

    if (this.color) styles.push(`color: ${this.color};`)
    if (this.size) styles.push(`font-size: ${this.size}px;`)

    return styles.join(' ')
  }
}

customElements.define('x-ascii', AsciiFace)
