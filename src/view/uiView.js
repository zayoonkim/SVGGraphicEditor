import ActionGenerator from "../controller/actionGenerator.js";
import Connector from "../controller/Connector.js";

export default class UIView {
  constructor() {
    this.createToolbar();
  }

  createToolbar() {
    // 컬러 선택기
    this.toolbar = document.getElementById("toolbar");
    this.colorPicker = document.getElementById("colorPicker");
    this.colorPicker.value = Connector.getCanvasColor();

    // 크기 입력
    const canvasSize = Connector.getCanvasSize();
    this.widthInput = document.getElementById("widthInput");
    this.widthInput.value = canvasSize.width;

    this.heightInput = document.getElementById("heightInput");
    this.heightInput.value = canvasSize.height;

    // 확인 버튼
    this.confirmButton = document.getElementById("confirmButton");

    this.addTools = document.getElementById("addTools");

    // 이벤트 바인딩
    this.colorPicker.addEventListener("input", (event) =>
      this.updateCanvasColor(event)
    );
    this.confirmButton.addEventListener("click", () => this.updateCanvasSize()); // 확인 버튼 클릭 시 크기 업데이트
    this.addTools.addEventListener("click", (event) => {
      if (event.target.id === "text") {
        this.addText();
      } else {
        this.addShape(event.target.id);
      }
    });
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

  static updateColorPickerForShape(shapeId, currentColor) {
    this.shapecolorPicker = document.getElementById('shapecolorPicker');
    this.shapecolorPicker.value = currentColor;
    this.shapecolorPicker.style.display = 'block';
    this.shapecolorPicker.oninput = (event) => {
      ActionGenerator.updateShapeColor(shapeId, event.target.value);
    };
  }

  static updateColorPickerForCanvas() {
    this.shapecolorPicker = document.getElementById('shapecolorPicker'); 
    this.shapecolorPicker.style.display = 'none';
  }


  addText() {
    Connector.setAddingText();
  }
}