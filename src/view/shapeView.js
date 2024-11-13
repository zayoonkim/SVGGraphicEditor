import ActionGenerator from "../controller/actionGenerator.js";
import Connector from "../controller/Connector.js";
import Selector from "../controller/selector.js";

export default class ShapeView {
  constructor(shape) {
    this.shape = shape;
    this.isDragging = false;
    this.isResizing = false;
    this.startclientX = 0;
    this.startclientY = 0;
    this.previewShape = null;
    this.shape.addListener(this.update.bind(this));
    this.element = null;
    this.newX, this.newY, this.newWidth, this.newHeight;
  }

  // changeType에 따른 업데이트 처리
  update(changeType) {
    if (changeType === "position" || changeType === "size") {
      this.updatePosition();
    }
  }

  createSVGElement() {
    const canvasElement = document.getElementById("canvas");
    const shape = this.shape;
    if (shape.type() === "rectangle") {
      this.element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      this.element.setAttribute("x", shape.position().x);
      this.element.setAttribute("y", shape.position().y);
      this.element.setAttribute("width", shape.size().width);
      this.element.setAttribute("height", shape.size().height);
      this.element.setAttribute("fill", shape.fillcolor());
      this.element.setAttribute("opacity", shape.fillOpacity());
      this.element.setAttribute("stroke", shape.stroke().color);
      this.element.setAttribute("stroke-width", shape.stroke().width);
    }
    this.element.setAttribute("id", this.shape.getId());
    if (!this.element) return;

    this.element.addEventListener("mouseenter", () => {
      this.element.setAttribute("stroke", "#4F80FF");
      this.element.setAttribute("stroke-width", 1);
    });

    this.element.addEventListener("mouseleave", () => {
      this.element.setAttribute("stroke", shape.stroke().color);
      this.element.setAttribute("stroke-width", shape.stroke().width);
    });

    this.element.addEventListener("mousedown", (e) => {
      this.startMoving(e);
    });

    canvasElement.addEventListener("mousemove", (e) => {
      if (this.isDragging) {
        // 선택된 도형을 가장 위로
        canvasElement.appendChild(this.element);
        // 이동 길이
        const dx = e.clientX - this.startclientX;
        const dy = e.clientY - this.startclientY;
        const newX = this.shape.position().x + dx;
        const newY = this.shape.position().y + dy;

        this.element.setAttribute("visibility", "hidden");
        this.updatePreviewShapePosition(newX, newY, this.shape.size().width, this.shape.size().height);
        Selector.clearSelection();
      } else if (this.isResizing) {
        this.handleResizing(e);
      }
    });

    canvasElement.addEventListener("mouseup", (e) => {
      if (this.isDragging) {
        const dx = e.clientX - this.startclientX;
        const dy = e.clientY - this.startclientY;

        const finalX = shape.position().x + dx;
        const finalY = shape.position().y + dy;

        const newPosition = { x: finalX, y: finalY };
        // 위치 이동 액션 생성
        ActionGenerator.updateShapePosition(shape.getId(), newPosition);
        this.isDragging = false;
        this.createResizeHandles();
      } else if (this.isResizing) {
        this.endResizing(e);
      }
      this.removePreview();
      this.element.setAttribute("visibility", "visible");
    });
    return this.element;
  }

  startMoving(e) {
    this.isDragging = true; // TODO : 추후 flag 분리 예정
    this.startclientX = e.clientX;
    this.startclientY = e.clientY;
    Selector.setSelectedShape(this.shape.getId());
    this.createResizeHandles();
    this.createPreviewShape(e.clientX, e.clientY);
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
      handleElement.addEventListener("mousedown", (e) => this.startResizing(e));
      canvasElement.appendChild(handleElement);
    });
  }

  // 도형 resizing
  startResizing(e) {
    this.currentHandle = (e.target.id).substr(7);
    this.isResizing = true;
    this.startclientX = e.clientX;
    this.startclientY = e.clientY;
    this.createPreviewShape();
  }

  handleResizing(e) {
    const dx = e.clientX - this.startclientX;
    const dy = e.clientY - this.startclientY;
    let newWidth = this.shape.size().width;
    let newHeight = this.shape.size().height;
    let newX = this.shape.position().x;
    let newY = this.shape.position().y;

    switch (this.currentHandle) {
      case "nw":
        newWidth -= dx;
        newHeight -= dy;
        newX += dx;
        newY += dy;
        break;
      case "n":
        newHeight -= dy;
        newY += dy;
        break;
      case "ne":
        newWidth += dx;
        newHeight -= dy;
        newY += dy;
        break;
      case "e":
        newWidth += dx;
        break;
      case "se":
        newWidth += dx;
        newHeight += dy;
        break;
      case "s":
        newHeight += dy;
        break;
      case "sw":
        newWidth -= dx;
        newHeight += dy;
        newX += dx;
        break;
      case "w":
        newWidth -= dx;
        newX += dx;
        break;
    }
    this.updatePreviewShapePosition(newX, newY, newWidth, newHeight);
    this.element.setAttribute("visibility", "hidden");
    Selector.clearSelection();

    this.newWidth = newWidth;
    this.newHeight = newHeight;
    this.newX = newX;
    this.newY = newY;
  }

  endResizing(e) {
    this.isResizing = false;
    this.currentHandle = null;
    ActionGenerator.resizeShape(this.shape.getId(), { width: this.newWidth, height: this.newHeight }, { x: this.newX, y: this.newY });
    this.createResizeHandles();
  }

  // 도형 미리보기 로직
  createPreviewShape(x, y) {
    const shape = this.shape;
    const canvasElement = document.getElementById("canvas");
    if (!this.previewShape) {
      this.previewShape = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      this.previewShape.setAttribute("fill", shape.fillcolor());
      this.previewShape.setAttribute("opacity", shape.fillOpacity());
      this.previewShape.setAttribute("stroke", shape.stroke().color);
      this.previewShape.setAttribute("stroke-width", shape.stroke().width);
      canvasElement.appendChild(this.previewShape);
    }

    this.previewShape.setAttribute("x", shape.position().x);
    this.previewShape.setAttribute("y", shape.position().y);
    this.previewShape.setAttribute("width", shape.size().width);
    this.previewShape.setAttribute("height", shape.size().height);

  }

  updatePreviewShapePosition(x, y, width, height) {
    const preview = this.previewShape;
    if (preview) {
      preview.setAttribute("x", x);
      preview.setAttribute("y", y);
      preview.setAttribute("width", width);
      preview.setAttribute("height", height);
    }
  }

  removePreview() {
    if (this.previewShape) {
      this.previewShape.remove();
      this.previewShape = null;
    }
  }

  // view 업데이트
  updatePosition() {
    const selectedShape = Connector.getShapeById(Selector.getSelectedShapeId());
    const shapeElement = document.getElementById(selectedShape.getId());
    if (shapeElement) {
      shapeElement.setAttribute("x", selectedShape.position().x);
      shapeElement.setAttribute("y", selectedShape.position().y);
      shapeElement.setAttribute("width", selectedShape.size().width);
      shapeElement.setAttribute("height", selectedShape.size().height);
    }
  }
}

