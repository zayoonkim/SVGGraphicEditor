import Canvas from "../model/canvas.js";

  export default class ActionHandler {
    static updateCanvasColor(op) {
        const canvas = Canvas.getInstance(); 
        canvas.updateColor(op.value);
        
    }
    static updateCanvasSize(op) {
        const canvas = Canvas.getInstance();
        canvas.updateSize(op.width, op.height);
    }

    static updateShapeColor(op) {
        const targetShape = Selector.findShapeModelById(op.id);
        targetShape.updateShapeColor(op.value);
    }

    static addShape(op) {
        const canvas = Canvas.getInstance();
        canvas.addShape(op.shapeType, op.position);
      }
}
