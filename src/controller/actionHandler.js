// 액션을 처리하여 모델을 업데이트

import Canvas from "../model/canvas.js";
import CanvasView from "../view/canvasView.js";

  export default class ActionHandler {
    constructor() {
    }
    // Canvas 색상 업데이트 핸들러
    static updateCanvasColor(op) {
        const canvas = Canvas.getInstance(); // 추후에 Selector
        canvas.updateColor(op.value);
        
    }
    static updateCanvasSize(op) {
        const canvas = Canvas.getInstance();
        canvas.updateSize(op.width, op.height); // 크기 업데이트
    }

    static updateShapeColor(op) {
        const targetShape = Selector.findShapeModelById(op.id);
        targetShape.updateShapeColor(op.value);
    }
}
