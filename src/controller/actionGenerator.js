// 액션 생성

import ActionManager from "./actionManager.js";
// import Canvas from "../model/canvas.js";

export default class ActionGenerator {
    static updateCanvasColor(newColor) {
        ActionManager.executeAction({
            op: {
                id: "canvas",
                type: "update",
                command: "updateCanvasColor",
                value: newColor,
            },
            rOp: {
                id: "canvas",
                type: "update",
                command: "updateCanvasColor",
                value: "curColor",
            }
            });
    }
    static updateCanvasSize(width, height) {
        ActionManager.executeAction({
            op: {
                id: "canvas",
                type: "update",
                command: "updateCanvasSize",
                width: width,
                height: height,
            },
            rOp: {
                id: "canvas",
                type: "update",
                command: "updateCanvasSize",
                width: width,
                height: height,
            }
        });
    }
    // 예시
    static updateShapeColor(newColor) {
        const selectedShapeModel = Selector.getSelectedShapeModel();
        if (!selectedShapeModel) return;

        const curColor = selectedShapeModel.fill.color;
        ActionManager.executeAction({
            op: {
                id: selectedShapeModel.id,
                type: "update",
                command: "updateShapeColor",
                value: newColor,
            },
            rOp: {
                id: selectedShapeModel.id,
                type: "update",
                command: "updateShapeColor",
                value: "curColor",
            }
        });
    }


}

