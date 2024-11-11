import ActionGenerator from "../controller/actionGenerator.js";
import Selector from "../controller/selector.js";

export default class ShapeView {
  constructor(shape) {
    this.shape = shape;
    this.isDragging = false;
    this.startclientX = 0;
    this.startclientY = 0;
    this.x = 0;
    this.y = 0;
  }

  createSVGElement() {
    const canvasElement = document.getElementById("canvas");
    let element;
    if (this.shape.type === "rectangle") {
      element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      element.setAttribute("x", this.shape.position.x || 0);
      element.setAttribute("y", this.shape.position.y || 0);
      element.setAttribute("width", this.shape.size.width);
      element.setAttribute("height", this.shape.size.height);
      element.setAttribute("fill", this.shape.fillcolor);
      element.setAttribute("opacity", this.shape.fillopacity);
      element.setAttribute("stroke", this.shape.stroke.color);
      element.setAttribute("stroke-width", this.shape.stroke.width);
    }
    // else if (this.shape.type === 'circle') {
    //     element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    // }
    element.setAttribute("id", this.shape.id);

    element.addEventListener("mouseenter", () => {
      element.setAttribute("stroke", "#4F80FF");
      element.setAttribute("stroke-width", 1);
    });

    element.addEventListener("mouseleave", () => {
      element.setAttribute("stroke", this.shape.stroke.color);
      element.setAttribute("stroke-width", this.shape.stroke.width);
    });

    element.addEventListener("mousedown", (e) => {
      this.isDragging = true; // TODO : 추후 flag 분리 예정
      this.startclientX = e.clientX;
      this.startclientY = e.clientY;
      Selector.setSelectedShape(this.shape.id);
      this.createResizeHandles();
    });

    canvasElement.addEventListener("mousemove", (e) => {
      if (!this.isDragging) {
        return;
      }
      // 선택된 도형을 가장 위로
      canvasElement.appendChild(element);
      // 이동 길이
      const dx = e.clientX - this.startclientX;
      const dy = e.clientY - this.startclientY;

      this.shape.position.x += dx;
      this.shape.position.y += dy;

      // 드래그 중의 도형 위치 업데이트
      e.target.setAttribute("x", this.shape.position.x);
      e.target.setAttribute("y", this.shape.position.y);

      this.startclientX = e.clientX;
      this.startclientY = e.clientY;
      Selector.clearSelection();
    });

    canvasElement.addEventListener("mouseup", (e) => {
      if (!this.isDragging) {
        return;
      }
      const newPosition = this.shape.position;
      this.createResizeHandles(this.shape);
      // 위치 이동 액션 생성
      ActionGenerator.updateShapePosition(this.shape.id, newPosition);
      this.isDragging = false;
    });

    return element;
  }

  // resizeHandle 렌더링
  createResizeHandles() {
    const canvasElement = document.getElementById("canvas");
    const handleSize = 8;

    Selector.getHandlePositions().forEach((handle) => {
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

      canvasElement.appendChild(handleElement);
    });
  }
}
