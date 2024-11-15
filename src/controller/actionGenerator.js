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
        value: newColor
      },
      rOp: {
        id: "canvas",
        type: "update",
        command: "updateCanvasColor",
        value: curColor
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
        height: height
      },
      rOp: {
        id: "canvas",
        type: "update",
        command: "updateCanvasSize",
        width: width,
        height: height
      }
    });
  }

  static insertShape(shapeType, position) {
    ActionManager.executeAction({
      op: {
        id: "canvas",
        type: "add",
        command: "insertShape",
        shapeType: shapeType,
        position: position
      },
      rOp: {
        id: "canvas",
        type: "add",
        command: "deleteShape",
        shapeType: shapeType,
        position: position
      }
    });
  }

  static deleteShape(shapeId) {
    ActionManager.executeAction({
      op: {
        id: "canvas",
        type: "delete",
        command: "deleteShape",
        shapeId: shapeId
      },
      rOp: {
        id: "canvas",
        type: "insert",
        command: "insertShape",
        shapeId: shapeId
      }
    });
  }

  static updateShapePosition(shapeId, newPosition) {
    ActionManager.executeAction({
      op: {
        id: "updateshape",
        type: "update",
        command: "updateShapePosition",
        shapeId: shapeId,
        newPosition: newPosition
      },
      rOp: {
        id: "updateshape",
        type: "update",
        command: "updateShapePosition",
        shapeId: shapeId,
        newPosition: newPosition
      },
    });
  }

  static resizeShape(shapeId, newSize, newPosition) {
    ActionManager.executeAction({
      op: {
        id: "updateshape",
        type: "update",
        command: "resizeShape",
        shapeId: shapeId,
        newSize: newSize,
        newPosition: newPosition
      },
      rOp: {
        id: "updateshape",
        type: "update",
        command: "resizeShape",
        shapeId: shapeId,
        newSize: newSize,
        newPosition: newPosition
      }
    });
  }

  static updateShapeColor(shapeId, newColor) {
    ActionManager.executeAction({
      op: {
        id: "updateshape",
        type: "update",
        command: "updateShapeColor",
        shapeId: shapeId,
        newColor: newColor
      },
      rOp: {
        id: "updateshape",
        type: "update",
        command: "updateShapeColor",
        shapeId: shapeId,
        newColor: newColor
      }
    });
  }

  static insertText(textValue, textPosition) {
    ActionManager.executeAction({
      op: {
        id: "insertText",
        type: "update",
        command: "insertText",
        textValue: textValue,
        textPosition: textPosition,
      },
      rOp: {
        id: "insertText",
        type: "update",
        command: "insertText",
        textValue: textValue,
        textPosition: textPosition,
      },
    });
  }

  static updateTextPosition(textId, newPosition) {
    ActionManager.executeAction({
      op: {
        id: "moveText",
        type: "update",
        command: "moveText",
        textId: textId,
        newPosition: newPosition,
      },
      rOp: {
        id: "moveText",
        type: "update",
        command: "moveText",
        textId: textId,
        newPosition: newPosition,
      },
    });
  }

  static updateTextContent(textId, newText) {
    ActionManager.executeAction({
      op: {
        id: "editText",
        type: "update",
        command: "editText",
        textId: textId,
        newText: newText,
      },
      rOp: {
        id: "editText",
        type: "update",
        command: "editText",
        textId: textId,
        newText: newText,
      },
    });
  }

}
