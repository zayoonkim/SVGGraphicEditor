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

  static getHandlePositions() {
    const object = Connector.getObjectById(Selector.getSelectedObjectId());
    const handleSize = 5;
    if (object.getType() === "text") {
      const bbox = document.getElementById(object.getId()).getBBox();
      const x = bbox.x;
      const y = bbox.y;
      const width = bbox.width;
      const height = bbox.height;

      return this.calculateHandles(x, y, width, height, handleSize);
    } else {
      const x = object.position().x;
      const y = object.position().y;
      const width = object.size().width;
      const height = object.size().height;

      return this.calculateHandles(x, y, width, height, handleSize);
    }

  }
  static calculateHandles(x, y, width, height, handleSize) {
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
    handles.forEach((handle) => {
      canvasElement.removeChild(handle);
    });
  }
}
