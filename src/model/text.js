export default class Text {
    constructor() {
        this.id = id;
        this.color = color;
    }
    color(color) {
        if (color !== undefined) {
            this.color = color;
        }
        return this.color;
    }

    updateShapeColor(newColor) {
        this.color(newColor);
        // view 갱신
    }
}
