import ActionHandler from "./actionHandler.js";
import Selector from "./selector.js";
import Connector from "./Connector.js";

export default class ActionManager {
  static undoStack = [];
  static redoStack = [];
  static isExecutingUndoRedo = false;
  static undoable = false;
  static redoable = false;


  static executeAction({ op, rOp }) {
    ActionHandler[op.command](op);
    // undo, redo 수행 중의 스택 추가 방지
    if (!this.isExecutingUndoRedo) {
      this.undoStack.push({ op, rOp });
      console.log("undoStack => ", this.undoStack);
      this.redoStack = [];
      this.updateUndoRedoState();
    }
    this.isExecutingUndoRedo = false;
  }

  static getUndoOperation() {
    if (this.undoStack.length > 0) {
      const { op, rOp } = this.undoStack.pop();
      this.redoStack.push({ op, rOp }); // Redo 스택에 추가
      Selector.clearSelection(); // 핸들 제거
      this.isExecutingUndoRedo = true;
      this.updateUndoRedoState();

      return { op: rOp, rOp: op };
    }
    return null;
  }

  static getRedoOperation() {
    if (this.redoStack.length > 0) {
      const { op, rOp } = this.redoStack.pop();
      this.undoStack.push({ op, rOp }); // Undo 스택에 추가
      Selector.clearSelection(); // 핸들 제거
      this.isExecutingUndoRedo = true;
      this.updateUndoRedoState();
      return { op, rOp };
    }
    return null;
  }

  // Undo/Redo 상태 업데이트 -> Connector -> UIView에 전달
  static updateUndoRedoState() {
    const undoable = this.undoStack.length > 0;
    const redoable = this.redoStack.length > 0;
    Connector.updateUndoRedoState(undoable, redoable);
  }
}