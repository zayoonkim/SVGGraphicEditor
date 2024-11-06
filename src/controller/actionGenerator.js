import ActionManager from "./actionManager.js";
import Connector from "./Connector.js";

// TODO: 액션 설계

export default class ActionGenerator {
  static updateCanvasColor(newColor) {
    const curColor = Connector.getCanvasColor();
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
        value: curColor,
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

  static insertShape(shapeType, position) {
    ActionManager.executeAction({
      op: {
        id: "canvas",
        type: "add",
        command: "insertShape",
        shapeType: shapeType,
        position: position,
      },
      rOp: {
        id: "canvas",
        type: "add",
        command: "insertShape",
        shapeType: shapeType,
        position: position,
      },
    });
  }
}
