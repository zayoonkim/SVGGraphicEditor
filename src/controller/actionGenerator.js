import ActionManager from "./actionManager.js";
import Connector from "./Connector.js";

// TODO: 액션 설계

export default class ActionGenerator {
  static updateCanvasColor(newColor) {
    const curColor = Connector.getCanvasColor();
    ActionManager.executeAction({
      op: {
        command: "updateCanvasColor",
        value: newColor
      },
      rOp: {
        command: "updateCanvasColor",
        value: curColor
      }
    });
  }

  static updateCanvasSize(width, height) {
    const curSize = Connector.getCanvasSize();
    ActionManager.executeAction({
      op: {
        command: "updateCanvasSize",
        width: width,
        height: height
      },
      rOp: {
        command: "updateCanvasSize",
        width: curSize.width,
        height: curSize.height
      }
    });
  }

  static insertShape(shapeId, shapeType, position, size) {
    ActionManager.executeAction({
      op : _getInsertingShapeOperation(shapeId, shapeType, position, size),
      rOp : _getDeletingShapeOperation(shapeId)
    });
  }

  static deleteShape(shapeId) {
    const shape = Connector.getObjectById(shapeId);
    ActionManager.executeAction({
      op: _getDeletingShapeOperation(shapeId),
      rOp: _getInsertingShapeOperation(shapeId, shape.getType(), shape.position(), shape.size())
    });
  }

  static updateShapePosition(shapeId, newPosition) {
    const shape = Connector.getObjectById(shapeId);
    const curPosition = shape.position();
    ActionManager.executeAction({
      op: {
        command: "updateShapePosition",
        shapeId: shapeId,
        newPosition: newPosition
      },
      rOp: {
        command: "updateShapePosition",
        shapeId: shapeId,
        newPosition: curPosition
      },
    });
  }

  static resizeShape(shapeId, newSize, newPosition) {
    const shape = Connector.getObjectById(shapeId);
    const curPosition = shape.position();
    const curSize = shape.size();
    ActionManager.executeAction({
      op: {
        command: "resizeShape",
        shapeId: shapeId,
        newSize: newSize,
        newPosition: newPosition
      },
      rOp: {
        command: "resizeShape",
        shapeId: shapeId,
        newSize: curSize,
        newPosition: curPosition
      }
    });
  }

  static updateShapeColor(shapeId, newColor) {
    const shape = Connector.getObjectById(shapeId);
    const curColor = shape.fillColor();
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
        newColor: curColor
      }
    });
  }

  static insertText(textId, textValue, textPosition) {
    ActionManager.executeAction({
      op: _getInsertingTextOperation(textId, textValue, textPosition),
      rOp: _getDeletingTextOperation(textId)
    });
  }

  static deleteText(textId) {
    const text = Connector.getObjectById(textId);
    ActionManager.executeAction({
      op: _getDeletingTextOperation(textId),
      rOp: _getInsertingTextOperation(textId, text.content(), text.position())
    });
  }

  static updateTextPosition(textId, newPosition) {
    const text = Connector.getObjectById(textId);
    const curPosition = text.position();
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
        newPosition: curPosition,
      },
    });
  }

  static updateTextContent(textId, newText) {
    const text = Connector.getObjectById(textId);
    const curContent = text.content();
    ActionManager.executeAction({
      op: {
        command: "editText",
        textId: textId,
        newText: newText,
      },
      rOp: {
        command: "editText",
        textId: textId,
        newText: curContent,
      },
    });
  }

  static updateTextColor(textId, newColor) {
    const text = Connector.getObjectById(textId);
    const curColor = text.fontColor();
    ActionManager.executeAction({
      op: {
        id: "id",
        type: "update",
        command: "updateTextColor",
        textId: textId,
        newColor: newColor,
      },
      rOp: {
        id: "id",
        type: "update",
        command: "updateTextColor",
        textId: textId,
        newColor : curColor,
      },
    });
  }
  
  static updateTextSize(textId, newSize) {
    const text = Connector.getObjectById(textId);
    const curSize = text.fontSize();
    ActionManager.executeAction({
      op: {
        command: "updateTextSize",
        textId: textId,
        newSize: newSize,
      },
      rOp: {
        command: "updateTextSize",
        textId: textId,
        newSize: curSize,
      },
    });
  }

  static undo() {
    const undoOperation = ActionManager.getUndoOperation();
    if(undoOperation)
      ActionManager.executeAction(undoOperation);
  }

  static redo() {
    const redoOperation = ActionManager.getRedoOperation();
    if(redoOperation)
      ActionManager.executeAction(redoOperation);
  }
}

function _getInsertingShapeOperation(id, type, position, size) {
  return { 
      command: "insertShape",
      shapeId: id,
      shapeType: type,
      position: position,
      size: size
  };
}

function _getDeletingShapeOperation(id) {
  return {
      command: "deleteShape",
      shapeId: id
  };
}

function _getInsertingTextOperation(id, textValue, textPosition) {
  return { 
      command: "insertText",
      textId: id,
      textValue: textValue,
      textPosition: textPosition,
  };
}

function _getDeletingTextOperation(id) {
  return {
      command: "deleteText",
      textId: id
  };
}