import Canvas from "../model/canvas.js";
import UIView from "../view/uiView.js";
import CanvasView from "../view/canvasView.js";
import ShapeView from "../view/shapeView.js";

// Model / View 영역

export default class Core {
    static registerJson(canvas) {
        this.canvas = new Canvas(canvas);
        this.canvasView = new CanvasView(this.canvas);
    }

    static Model = {
        getCanvas() {
            return Core.canvas;
        },

        getObjectById(id) {
            return Core.canvas.getObjectById(id);
        },

        getCanvasSize() {
            return {
                width: Core.canvas.width(),
                height: Core.canvas.height()
            };
        },

        getCanvasColor() {
            return Core.canvas.fillColor();
        },
        
        getTextSize(id) {
            return Core.canvas.getObjectById(id).fontSize();
        },

        getObjectColor(id) {
            return Core.canvas.getObjectById(id).fillColor();
        },

        getExportData() {
            return Core.canvas.getExportData();
        }
    };

    static View = {
        getCanvasView() {
            return Core.canvasView;
        },

        setDrawingShapeType(shapeType) {
            Core.canvasView.setDrawingShapeType(shapeType);
        },

        setAddingTextMode() {
            Core.canvasView.setAddingTextMode();
        },

        updateShapePosition(shapeId) {
            Core.shapeView.updateShapePosition(shapeId);
        },

        getObjectViewById(id) {
            Core.canvasView.getObjectViewById(id);
        }
    };

}