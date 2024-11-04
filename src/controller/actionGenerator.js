import ActionManager from "./actionManager.js";

// TODO: 액션 설계

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
      },
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
      },
    });
  }

  static addShape(shapeType, position) {
    ActionManager.executeAction({
      op: {
        id: "canvas",
        type: "add",
        command: "addShape",
        shapeType: shapeType,
        position: position,
      },
      rOp: {
        id: "canvas",
        type: "add",
        command: "addShape",
        shapeType: shapeType,
        position: position,
      },
    });
  }
}
