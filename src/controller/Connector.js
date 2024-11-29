import Core from "./core.js";
import UIView from "../view/uiView.js";

// UI <-> Core 간 통신모듈
export default class Connector {
    static getCanvas() {
        return Core.Model.getCanvas();
    }

    static getCanvasView() {
        return Core.View.getCanvasView();
    }

    static getObjectById(id) {
        return Core.Model.getObjectById(id);
    }

    static getCanvasSize() {
        return Core.Model.getCanvasSize();
    }

    static getCanvasColor() {
        return Core.Model.getCanvasColor();
    }

    static getObjectColor(id) {
        return Core.Model.getObjectColor(id);
    }

    static getTextSize(id) {
        return Core.Model.getTextSize(id);
    }

    static setDrawingShapeType(shapeType) {
        Core.View.setDrawingShapeType(shapeType);
    }

    static setAddingTextMode() {
        Core.View.setAddingTextMode();
    }

    static setToolbarForObject(objectId) {
        const object = this.getObjectById(objectId);
        if (object) {
            if (object.getType() === "text") {
                UIView.renderTextProperties(objectId);
            } else {
                UIView.renderShapeProperties(objectId);
            }
        }
    }

    static setToolbarForCanvas() {
        UIView.setCanvasToolbarState();
    }

    static getExportData() {
        return Core.Model.getExportData();
    }

    static updateUndoRedoState(undoable, redoable) {
        UIView.updateUndoRedoState(undoable, redoable);
    }

    static getObjectViewById(id) {
        return Core.View.getObjectViewById(id);
    }
}
