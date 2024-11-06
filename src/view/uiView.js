import ActionGenerator from "../controller/actionGenerator.js";
import Connector from "../controller/Connector.js";

export default class UIView {
  constructor() {
    this.createToolbar();
  }

  createToolbar() {
    const toolbar = document.createElement("div");
    toolbar.style.display = "flex";
    toolbar.style.alignItems = "center";
    toolbar.style.padding = "10px";
    toolbar.style.border = "1px solid";
    toolbar.style.borderColor = "lightgray";

    // 컬러 선택기
    this.colorPicker = document.createElement("input");
    this.colorPicker.type = "color";
    this.colorPicker.value = Connector.getCanvasColor();

    const labelColor = document.createElement("label");
    labelColor.textContent = "Canvas Color";
    labelColor.style.marginRight = "8px";

    // 크기 입력 필드
    const labelWidth = document.createElement("label");
    labelWidth.textContent = "Width:";
    labelWidth.style.marginRight = "8px";

    const canvasSize = Connector.getCanvasSize();
    this.widthInput = document.createElement("input");
    this.widthInput.type = "number";
    this.widthInput.value = canvasSize.width;
    
    this.widthInput.style.marginRight = "8px";

    const labelHeight = document.createElement("label");
    labelHeight.textContent = "Height:";
    labelHeight.style.marginRight = "8px";

    this.heightInput = document.createElement("input");
    this.heightInput.type = "number";
    this.heightInput.value = canvasSize.height;
    this.heightInput.style.marginRight = "8px";

    // 확인 버튼
    this.confirmButton = document.createElement("button");
    this.confirmButton.textContent = "확인";
    this.confirmButton.style.marginLeft = "8px";

    // shape 추가 버튼(임시)
    this.addRectangleButton = document.createElement("button");
    this.addRectangleButton.textContent = "사각형";
    this.addRectangleButton.id = "rectangle";
    this.addRectangleButton.style.marginLeft = "8px";

    // TODO : 타원 추가
    this.addEllipseButton = document.createElement("button");
    this.addEllipseButton.textContent = "타원";
    this.addEllipseButton.id = "ellipse";
    this.addEllipseButton.style.marginLeft = "8px";

    // TODO : 삼각형 추가
    this.addTriangleButton = document.createElement("button");
    this.addTriangleButton.textContent = "삼각형";
    this.addTriangleButton.id = "triangle";
    this.addTriangleButton.style.marginLeft = "8px";

    this.addTools = document.createElement("div");
    this.addTools.append(this.addRectangleButton, this.addEllipseButton, this.addTriangleButton);

    // 툴바에 추가
    toolbar.append(
      labelColor,
      this.colorPicker,
      labelWidth,
      this.widthInput,
      labelHeight,
      this.heightInput,
      this.confirmButton,
      this.addTools
    );
    document.getElementById("root").appendChild(toolbar);

    // 이벤트 바인딩
    this.colorPicker.addEventListener("input", (event) =>
      this.updateCanvasColor(event)
    );
    this.confirmButton.addEventListener("click", () => this.updateCanvasSize()); // 확인 버튼 클릭 시 크기 업데이트
    this.addTools.addEventListener("click", (event) =>
      this.addShape(event.target.id)
    );
  }

  updateCanvasColor(e) {
    const newColor = e.target.value;
    ActionGenerator.updateCanvasColor(newColor);
  }

  updateCanvasSize() {
    const newWidth = parseInt(this.widthInput.value, 10);
    const newHeight = parseInt(this.heightInput.value, 10);
    ActionGenerator.updateCanvasSize(newWidth, newHeight);
  }

  addShape(shapeType) {
    Connector.setDrawingShapeType(shapeType);
  }
}