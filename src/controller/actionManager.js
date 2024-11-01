// 액션을 실행하고, undo/redo 기능을 관리

import ActionHandler from "./actionHandler.js";

export default class ActionManager {
  static executeAction({ op }) {
    ActionHandler[op.command](op);
  }
}
