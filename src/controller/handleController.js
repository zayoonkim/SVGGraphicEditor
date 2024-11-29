import Connector from "./Connector.js";
import Selector from './selector.js';

export default class HandleController {
  static createResizeHandles(objView) {
    const canvasElement = Connector.getCanvasView().canvasElement;

    const existingHandles = canvasElement.querySelectorAll("[id^='resize_']");
    if (existingHandles.length > 0) {
      return;
    }

    const handleSize = 8;

    this.getHandlePositions().forEach((handle) => {
      const handleElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );

      handleElement.setAttribute("id", `resize_${handle.id}`);
      handleElement.setAttribute("x", handle.x);
      handleElement.setAttribute("y", handle.y);
      handleElement.setAttribute("width", handleSize);
      handleElement.setAttribute("height", handleSize);
      handleElement.setAttribute("fill", "#4F80FF");
      handleElement.setAttribute("style", `cursor:${handle.cursor}`);
      if (objView.getType() !== "text") {
        handleElement.addEventListener("mousedown", (e) => objView.startResizing(e));
      }
      canvasElement.appendChild(handleElement);
    });
  }

  static updateHandles() {
    const handlePositions = this.getHandlePositions();

    handlePositions.forEach((handle) => {
      const handleElement = document.getElementById(`resize_${handle.id}`);
      if (handleElement) {
        handleElement.setAttribute("x", handle.x);
        handleElement.setAttribute("y", handle.y);
      }
    });
  }

  static getHandlePositions() {
    const object = Connector.getObjectById(Selector.getSelectedObjectId());
    const handleSize = 5;
    const bbox = document.getElementById(object.getId()).getBBox();
    const x = bbox.x;
    const y = bbox.y;
    const width = bbox.width;
    const height = bbox.height;

    return this.calculateHandles(x, y, width, height, handleSize);
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
}