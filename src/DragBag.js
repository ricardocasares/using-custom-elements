class DragBag extends BaseElement {
    onConnect() {
        Array
            .from(this.children)
            .map(element => {
                element.setAttribute('draggable', 'true')
                return element
            })
            .map(element => element.ondragstart = this.dragStart.bind(this))
    }

    dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.id)
        event.dataTransfer.dropEffect = 'move'
    }

    inlineStyles() {
        return {
            display: 'block',
            border: '5px dashed #EEE',
            borderRadius: '5px',
            padding: '20px',
            width: '100%',
            minHeight: '100%',
            marginRight: '5px'
        }
    }
}

customElements.define('x-drag', DragBag)