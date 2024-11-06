import Canvas from "../model/canvas.js";
import UIView from "../view/uiView.js";
import CanvasView from "../view/canvasView.js";

// Model / View 영역

export default class Core {
    static registerJson(canvas) {
        this.canvas = new Canvas(canvas);
        // this.uiView = new UIView();
        this.canvasView = new CanvasView(this.canvas);
    }

    static Model = {
        getCanvas() {
            return Core.canvas;
        },

        getCanvasSizeValue() {
            return {
                width: Core.canvas.width, 
                height: Core.canvas.height
            };
        },

        getCanvasColorValue() {
            return Core.canvas.fillColor;
        },
    };
    
    static View = {
        setDrawingShapeType(shapeType) {
            Core.canvasView.setDrawingShapeType(shapeType);
        }
    };
    
}