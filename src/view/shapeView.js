import ActionGenerator from "../controller/actionGenerator.js";
import Connector from "../controller/Connector.js";
import Selector from "../controller/selector.js";

export default class ShapeView {
  constructor(shape) {
    this.shape = shape;
    this.isDragging = false;
    this.startclientX = 0;
    this.startclientY = 0;
    this.previewShape = null;
    this.x = 0;
    this.y = 0;
    this.shape.addListener(this.update.bind(this));
  }

  // changeType에 따른 업데이트 처리
  update(shape, changeType) {
    if (changeType === "position") {
      this.updatePosition();
      this.createResizeHandles();
    }
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
      element.setAttribute("opacity", this.shape.fillOpacity);
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
      // 이동 시 미리보기
      this.createPreviewShape(e.clientX, e.clientY);
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

      const newX = this.shape.position.x + dx;
      const newY = this.shape.position.y + dy;

      this.updatePreviewShapePosition(newX, newY);
      element.setAttribute("visibility", "hidden");

      Selector.clearSelection();
    });

    canvasElement.addEventListener("mouseup", (e) => {
      if (!this.isDragging) {
        return;
      }
      const dx = e.clientX - this.startclientX;
      const dy = e.clientY - this.startclientY;

      const finalX = this.shape.position.x + dx;
      const finalY = this.shape.position.y + dy;

      const newPosition = { x: finalX, y: finalY };

      element.setAttribute("visibility", "visible");
      this.removePreview();

      // 위치 이동 액션 생성
      ActionGenerator.updateShapePosition(this.shape.id, newPosition);
      this.isDragging = false;
    });

    return element;
  }


  // 도형 드래그 미리보기 생성
  createPreviewShape(x, y) {
    const canvasElement = document.getElementById("canvas");

    if (!this.previewShape) {
      this.previewShape = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      this.previewShape.setAttribute("fill", this.shape.fillcolor);
      this.previewShape.setAttribute("opacity", this.shape.fillOpacity);
      this.previewShape.setAttribute("stroke", this.shape.stroke.color);
      this.previewShape.setAttribute("stroke-width", this.shape.stroke.width);
      canvasElement.appendChild(this.previewShape);
    }

    this.previewShape.setAttribute("x", this.shape.position.x);
    this.previewShape.setAttribute("y", this.shape.position.y);
    this.previewShape.setAttribute("width", this.shape.size.width);
    this.previewShape.setAttribute("height", this.shape.size.height);
  }

  updatePreviewShapePosition(x, y) {
    if (this.previewShape) {
      this.previewShape.setAttribute("x", x);
      this.previewShape.setAttribute("y", y);
    }
  }

  removePreview() {
    if (this.previewShape) {
      this.previewShape.remove();
      this.previewShape = null;
    }
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

  updatePosition() {
    const selectedShape = Connector.getShapeById(Selector.getSelectedShapeId());
    const shapeElement = document.getElementById(selectedShape.id);
    if (shapeElement) {
      shapeElement.setAttribute("x", selectedShape.position.x);
      shapeElement.setAttribute("y", selectedShape.position.y);
    }
  }
}
