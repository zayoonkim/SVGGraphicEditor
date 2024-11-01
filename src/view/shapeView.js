export default class ShapeView {
    constructor(shape) {
        this.shape = shape;
    }

    createSVGElement() { 
        let element; 
        if (this.shape.type === 'rectangle') {
            element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            element.setAttribute("x", this.shape.position.x || 0);
            element.setAttribute("y", this.shape.position.y || 0);
            element.setAttribute("width", this.shape.size.width);
            element.setAttribute("height", this.shape.size.height);
            element.setAttribute("fill", this.shape.fillcolor);
            element.setAttribute("opacity", this.shape.fillopacity);
            element.setAttribute("stroke", this.shape.stroke.color);
            element.setAttribute("stroke-width", this.shape.stroke.width);
        } 
        // else if (this.shape.type === 'circle') {
        //     element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        // }
        element.setAttribute("id", this.shape.id);

        return element;
    }
}
