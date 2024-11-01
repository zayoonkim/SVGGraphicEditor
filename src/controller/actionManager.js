import ActionHandler from "./actionHandler.js";

export default class ActionManager {
  static executeAction({ op }) {
    ActionHandler[op.command](op);
  }
}
