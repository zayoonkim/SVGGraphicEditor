import ShapeView from "./shapeView.js";
import TextView from "./textView.js";
import Connector from "../controller/Connector.js";
import { DEFAULT_SHAPE_POSITION, DEFAULT_TEXT_DATA } from "../constant.js";
import ActionGenerator from "../controller/actionGenerator.js";
import Selector from "../controller/selector.js";
import { nanoid } from 'https://cdn.skypack.dev/nanoid';

export default class CanvasView {
  constructor(canvasModel) {
    this.canvasModel = canvasModel;
    this.canvasElement = this.initializeProps();
    this.selectedShapeType = null;
    this.isDrawing = false;
    this.isDragging = false;
    this.isAddingText = false;
    this.previewElement = null;
    // 모델의 상태 변화에 대한 리스너
    this.canvasModel.addListener(this.update.bind(this));
    this.resgisterKeyEvent();
    this.registerCanvasClickEvent();
    this.render();
  }

  // 내부 프로퍼티
  initializeProps() {
    const existingCanvas = document.querySelector("svg#canvas");
    if (existingCanvas) {
      existingCanvas.remove();
    }
    const canvasElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    canvasElement.setAttribute("width", this.canvasModel.width());
    canvasElement.setAttribute("height", this.canvasModel.height());
    canvasElement.setAttribute("id", "canvas");
    canvasElement.style.backgroundColor = this.canvasModel.fillColor();
    return canvasElement;
  }

  render() {
    document.getElementById("root").appendChild(this.canvasElement);
    this.canvasModel.objectList().forEach((object) => {
      if (object.getType() === "text") {
        const textElement = new TextView(object);
        this.canvasElement.appendChild(textElement.createTextElement());
      } else {
        const shapeElement = new ShapeView(object);
        this.canvasElement.appendChild(shapeElement.createSVGElement());
      }
    });
  }

  renderPreview(position) {
    const { x, y, width, height } = position;

    // previewElement가 없을 때에만 생성
    if (!this.previewElement) {
      if (this.selectedShapeType === "rectangle") {
        this.previewElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      } else if (this.selectedShapeType === "ellipse") {
        this.previewElement = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
      } else if (this.selectedShapeType === "triangle") {
        this.previewElement = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      }
      this.previewElement.setAttribute("fill", "#ffffff");
      this.previewElement.setAttribute("fill-opacity", "0");
      this.previewElement.setAttribute("stroke", "black");
      this.canvasElement.appendChild(this.previewElement);
    }
    if (this.selectedShapeType === "rectangle") {
      this.previewElement.setAttribute("x", x);
      this.previewElement.setAttribute("y", y);
      this.previewElement.setAttribute("width", width);
      this.previewElement.setAttribute("height", height);
    } else if (this.selectedShapeType === "ellipse") {
      this.previewElement.setAttribute("cx", x + width / 2);
      this.previewElement.setAttribute("cy", y + height / 2);
      this.previewElement.setAttribute("rx", width / 2);
      this.previewElement.setAttribute("ry", height / 2);
    } else if (this.selectedShapeType === "triangle") {
      const points = [
        `${x + width / 2},${y}`,
        `${x},${y + height}`,
        `${x + width},${y + height}`
      ].join(" ");
      this.previewElement.setAttribute("points", points);
    }
  }

  removePreview() {
    if (this.previewElement) {
      this.canvasElement.removeChild(this.previewElement);
      this.previewElement = null;
    }
  }

  // changeType에 따른 업데이트 처리
  update(canvas, changeType, shapeId) {
    if (changeType === "color") {
      this.updateCanvasColor(canvas.fillColor());
    } else if (changeType === "size") {
      this.updateCanvasSize(canvas.width(), canvas.height());
    } else if (changeType === "addingShape") {
      this.addShapeToCanvas();
    } else if (changeType === "deletingShape") {
      this.deleteShapeOfCanvas(shapeId);
    } else if (changeType === "addingText") {
      this.addTextToCanvas();
    }
  }

  resgisterKeyEvent() {
    window.addEventListener("keydown", (e) => {
      const selectedObject = this.canvasModel.getObjectById(Selector.getSelectedObjectId()),
        _getModifiedPosByKeyInput = (key, pos) => {
          const {x, y} = pos,
            incDecValueByKey = key === "ArrowRight" || key === "ArrowDown" ? 20 : -20;

          return {
            x: key === "ArrowLeft" || key === "ArrowRight" ? x + incDecValueByKey : x,
            y: key === "ArrowUp" || key === "ArrowDown" ? y + incDecValueByKey : y
          };
        };

      if (selectedObject != null) {
        const isTextSelected = selectedObject.getType() === "text",
          selectedObjectId = selectedObject.getId();

        switch (e.key) {
          case "Backspace":
          case "Delete":
            ActionGenerator[ isTextSelected ? "deleteText" : "deleteShape" ](selectedObjectId);
            Selector.clearSelection();
            break;
          case "ArrowLeft":
          case "ArrowRight":
          case "ArrowUp":
          case "ArrowDown":
            ActionGenerator[ isTextSelected ? "updateTextPosition" : "updateShapePosition" ](selectedObjectId,
              _getModifiedPosByKeyInput(e.key, selectedObject.position()));
            break;
          default:
            break;
        }
      }
    });
  }

  registerCanvasClickEvent() {
    this.canvasElement.addEventListener("click", (e) => {
      const clickedElement = e.target;
      if (clickedElement === this.canvasElement) {
        Selector.clearSelection();
        Selector.setSelectedObject(null);
        Connector.setToolbarForCanvas();
      }
    });
  }

  setDrawingShapeType(shapeType) {
    this.selectedShapeType = shapeType;
    this.setDrawingMode();
  }

  setAddingTextMode() {
    this.canvasElement.style.cursor = "text";
    if (!this.isAddingText) {
      this.canvasElement.addEventListener("click", this.showTextInput.bind(this));
      this.isAddingText = true;
    }
  }

  setDrawingMode() {
    this.canvasElement.style.cursor = "crosshair";
    this.canvasElement.addEventListener(
      "mousedown",
      this.startDrawing.bind(this)
    );
    this.canvasElement.addEventListener("mousemove", this.drawing.bind(this));
    this.canvasElement.addEventListener("mouseup", this.endDrawing.bind(this));
  }

  startDrawing(e) {
    if (!this.selectedShapeType) {
      return;
    }
    this.isDrawing = true;
    this.isDragging = false;
    this.startX = e.offsetX;
    this.startY = e.offsetY;
  }

  // 드래그 중의 preview shape
  drawing(e) {
    if (!this.isDrawing) {
      return;
    }
    const currentX = e.offsetX;
    const currentY = e.offsetY;
    this.isDragging = true;
    this.renderPreview({
      x: Math.min(this.startX, currentX),
      y: Math.min(this.startY, currentY),
      width: Math.abs(currentX - this.startX),
      height: Math.abs(currentY - this.startY),
    });
  }

  endDrawing(e) {
    if (!this.isDrawing) {
      return;
    }
    this.canvasElement.style.cursor = "default";
    let id = nanoid();
    if (this.isDragging) {
      let {position, size} = this.calculateAttribute(e);
      ActionGenerator.insertShape(id, this.selectedShapeType, position, size);
    } else {
      let {position, size} = DEFAULT_SHAPE_POSITION(e);
      ActionGenerator.insertShape(id, this.selectedShapeType, position, size);
    }
    //도형 Preview 삭제 및 초기화
    this.removePreview();
    this.isDrawing = false;
    this.isDragging = false;
    this.selectedShapeType = null;
    // TODO: 삽입된 도형 선택
    Selector.setSelectedObject(id);
    Connector.setToolbarForObject(id);

    e.stopImmediatePropagation();
  }

  showTextInput(e) {
    if (!this.isAddingText) return;

    const clickPosition = { x: e.offsetX, y: e.offsetY };

    // input 추가
    const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    foreignObject.setAttribute("x", clickPosition.x);
    foreignObject.setAttribute("y", clickPosition.y - 10);
    foreignObject.setAttribute("width", "300");
    foreignObject.setAttribute("height", "40");

    const input = document.createElement("input");
    input.value = "";
    input.style.width = DEFAULT_TEXT_DATA.size.width;
    input.style.height = `${DEFAULT_TEXT_DATA.size.height}px`;
    input.style.color = DEFAULT_TEXT_DATA.font.fill;
    input.style.fontSize = `${DEFAULT_TEXT_DATA.font.size}px`;
    input.style.fontFamily = DEFAULT_TEXT_DATA.font.family;
    input.style.fontWeight = DEFAULT_TEXT_DATA.font.weight;
    input.style.border = "none";
    input.style.outline = "none";
    input.style.padding = 0;
    input.style.backgroundColor = "transparent";

    foreignObject.appendChild(input);
    this.canvasElement.appendChild(foreignObject);
    input.focus();

    let isForeignRemoved = false;

    const removeInput = () => {
      if (!isForeignRemoved) {
        isForeignRemoved = true;
        this.finishTextInput(input, foreignObject, clickPosition);
      }
    };

    input.addEventListener("blur", removeInput);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === "Escape") {
        removeInput();
      }
    });

    this.isAddingText = false;
  }


  finishTextInput(input, foreignObject, clickPosition) {
    const textValue = input.value;

    // input 제거
    this.canvasElement.removeChild(foreignObject);

    if (textValue) {
      const id = nanoid();
      ActionGenerator.insertText(id, textValue, clickPosition);
    }

    this.isAddingText = false;
    this.canvasElement.style.cursor = "default";
  }


  calculateAttribute(e) {
    return {
      position: {
        x: Math.min(this.startX, e.offsetX),
        y: Math.min(this.startY, e.offsetY),
      },
      size: {
        width: Math.abs(e.offsetX - this.startX),
        height: Math.abs(e.offsetY - this.startY),
      }
    };
  }

  updateCanvasColor(newColor) {
    console.log("view 색상 업데이트");
    if (this.canvasElement) {
      this.canvasElement.style.backgroundColor = newColor;
      Connector.setToolbarForCanvas();
    }
  }

  updateCanvasSize(width, height) {
    console.log("크기 업데이트");
    if (this.canvasElement) {
      this.canvasElement.setAttribute("width", width);
      this.canvasElement.setAttribute("height", height);
      Connector.setToolbarForCanvas();
    }
  }
  // canvas -> 모델에 도형 추가 시 실행
  addShapeToCanvas() {
    if (this.canvasModel.objectList()) {
      const lastShape = this.canvasModel.objectList().at(-1);
      const shapeElement = new ShapeView(lastShape);
      this.canvasElement.appendChild(shapeElement.createSVGElement());
      Connector.setToolbarForObject(lastShape.getId());
    }
  }

  addTextToCanvas() {
    if (this.canvasModel.objectList()) {
      const lastShape = this.canvasModel.objectList().at(-1);
      const textElement = new TextView(lastShape);
      this.canvasElement.appendChild(textElement.createTextElement());
      Connector.setToolbarForObject(lastShape.getId());
    }
  }

  deleteShapeOfCanvas(shapeId) {
    const shapeElement = document.getElementById(shapeId);
    if (shapeElement) {
      this.canvasElement.removeChild(shapeElement);
      // 도형 제거 시 캔버스 툴바로 갱신
      Connector.setToolbarForCanvas();
    }
  }


}
