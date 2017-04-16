class DropZone extends BaseElement {
    onConnect() {
        this.ondrop = this.dropHandler.bind(this)
        this.ondragover = this.dragOverHandler.bind(this)
    }

    dropHandler(event) {
        let data = event.dataTransfer.getData('text');
        event.target.appendChild(document.getElementById(data));
        event.preventDefault()
    }

    dragOverHandler(event) {
        event.preventDefault()
    }

    inlineStyles() {
        return {
            display: 'block',
            border: '5px dashed #EEE',
            borderRadius: '5px',
            padding: '20px',
            minWidth: '100%',
            minHeight: '100%',
            marginLeft: '5px'
        }
    }
}

customElements.define('x-drop', DropZone)