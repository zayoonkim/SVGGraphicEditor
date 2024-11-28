import Connector from "./Connector.js";

export default class Selector {
  // static isResizing = false;
  static currentHandle = null;

  static setSelectedObject(id) {
    this.id = id;
    this.clearSelection();
  }

  static getSelectedObjectId() {
    return this.id;
  }
  
  static clearSelection() {
    const canvasElement = Connector.getCanvasView().canvasElement;
    const handles = canvasElement.querySelectorAll("[id^='resize_']"); // id에 "resize_" 포함한 요소 검색
    handles.forEach((handle) => {
      canvasElement.removeChild(handle);
    });
  }
}
