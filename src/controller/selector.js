import Canvas from "../model/canvas.js";
export default class Selector {
    static setSelectedShape(id) {
        const canvas = Canvas.getInstance();
        this.selectedShape = canvas.objectList.find(shape => shape.id === id);
        console.log("clicked -> " , this.selectedShape)
    }

    static getSelectedShape() {
        return this.selectedShape;
    }
}