export default class Shape {
    constructor(shapeData) {
        this.initializeProps(shapeData);
    }
    
    initializeProps(shapeData) {
        this.type = shapeData.type;
        this.id = shapeData.id;
        this.stroke = shapeData.stroke; // color, width
        this.fillcolor = shapeData.fill.color;
        this.fillopacity = shapeData.fill.opacity;
        this.position = shapeData.transform.position; // x,y
        this.size = shapeData.transform.size; // width, height
        this.rotation = shapeData.transform.rotation; 
        this.alignment = shapeData.alignment;
    }
}
