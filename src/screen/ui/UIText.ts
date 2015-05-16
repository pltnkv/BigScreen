class UIText {
    private element

    constructor() {
        this.element = document.createElement("div");
        this.element.setAttribute('class', 'ui-text')
        document.body.appendChild(this.element);
    }

    addLine(value) {
        this.element.innerHTML = value !== undefined && value !== null ? this.element.innerHTML + '<br>' + value.toString() : 'undefined | null'
    }

    clear():void {
        this.element.innerHTML = ''
    }
}

export = UIText