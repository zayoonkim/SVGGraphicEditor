// export default class Shape {
//     constructor() {
//         console.log("gg");
//         // this.id = id;
//         // this.color = color;
//     }
//     // color(color) {
//     //     if (color !== undefined) {
//     //         this.color = color;
//     //     }
//     //     return this.color;
//     // }

//     // updateShapeColor(newColor) {
//     //     this.color(newColor);
//     //     // view 갱신
//     // }
// }

// "shape": {
//           "id": "string",
//           "type": "string", // "rectangle", "ellipse", "triangle", "star", etc.
//           "transform": {
//             "position": {
//               "x": "number",
//               "y": "number"
//             },
//             "size": {
//               "width": "number",
//               "height": "number"
//             },
//             "rotation": "number" // 각도
//           },
//           "fill": {
//             "color": "string",
//             "opacity": "number" // 투명도
//           },
//           "stroke": {
//             "color": "string",
//             "width": "number"
//           },
//           "alignment": "string" // "left", "center", "right" 등
//         }

export default class Shape {
    constructor(shapeData) {
        this.type = shapeData.type;
        this.id = shapeData.id;
        this.stroke = shapeData.stroke; // color, width
        this.fillcolor = shapeData.fill.color;
        this.fillopacity = shapeData.fill.opacity;
        this.transform = shapeData.transform; // transform - position(x, y) / rotation (num) / size(width, height)
        this.alignment = shapeData.alignment;
    }

    createSVGElement() { 
        let element; 
        if (this.type === 'rectangle') {
            element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            element.setAttribute("x", this.transform.position.x || 0);
            element.setAttribute("y", this.transform.position.y || 0);
            element.setAttribute("width", this.transform.size.width);
            element.setAttribute("height", this.transform.size.height);
            element.setAttribute("fill", this.fillcolor);
            element.setAttribute("opacity", this.fillopacity)
            element.setAttribute("stroke", this.stroke.color);
            element.setAttribute("stroke-width", this.stroke.width);

        } else if (this.type === 'circle') {
            element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        }
        element.setAttribute("id", this.id);

        return element;
    }
}
