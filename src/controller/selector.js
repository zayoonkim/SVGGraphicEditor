import Connector from "./Connector.js";

export default class Selector {
  // static isResizing = false;
  static currentHandle = null;

  static setSelectedShape(id) {
    this.id = id;
    this.clearSelection();
  }

  static getSelectedShapeId() {
    return this.id;
  }

  static getHandlePositions() {
    const shape = Connector.getShapeById(Selector.getSelectedShapeId());
    const handleSize = 8;
    const x = shape.position().x;
    const y = shape.position().y;
    const width = shape.size().width;
    const height = shape.size().height;
    return [
      {
        id: "nw",
        cursor: "nw-resize",
        x: x - handleSize / 2,
        y: y - handleSize / 2,
      },
      {
        id: "n",
        cursor: "n-resize",
        x: x + width / 2 - handleSize / 2,
        y: y - handleSize / 2,
      },
      {
        id: "ne",
        cursor: "ne-resize",
        x: x + width - handleSize / 2,
        y: y - handleSize / 2,
      },
      {
        id: "e",
        cursor: "e-resize",
        x: x + width - handleSize / 2,
        y: y + height / 2 - handleSize / 2,
      },
      {
        id: "se",
        cursor: "se-resize",
        x: x + width - handleSize / 2,
        y: y + height - handleSize / 2,
      },
      {
        id: "s",
        cursor: "s-resize",
        x: x + width / 2 - handleSize / 2,
        y: y + height - handleSize / 2,
      },
      {
        id: "sw",
        cursor: "sw-resize",
        x: x - handleSize / 2,
        y: y + height - handleSize / 2,
      },
      {
        id: "w",
        cursor: "w-resize",
        x: x - handleSize / 2,
        y: y + height / 2 - handleSize / 2,
      },
    ];
  }

  static clearSelection() {
    const canvasElement = document.getElementById("canvas");
    const handles = canvasElement.querySelectorAll("[id^='resize_']"); // id에 "resize_" 포함한 요소 검색
    handles.forEach((marker) => {
      canvasElement.removeChild(marker);
    });
  }
}
