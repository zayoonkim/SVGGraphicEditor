import ActionGenerator from "../controller/actionGenerator.js";
import Connector from "../controller/Connector.js";
import FileController from "../controller/fileController.js";

export default class UIView {
  constructor() {
    this.bindToolbarEvents();
  }

  initToolbar() {
    // 캔버스 속성
    this.colorPicker = document.getElementById("colorPicker");
    this.confirmButton = document.getElementById("confirmButton");
    this.addTools = document.getElementById("addTools");

    this.openButton = document.getElementById("openButton");
    this.saveButton = document.getElementById("saveButton");
    this.fileInput = document.getElementById("fileInput");

    this.undoButton = document.getElementById("undoButton");
    this.redoButton = document.getElementById("redoButton");

    UIView.updateUndoRedoState(false, false);    
    UIView.setCanvasToolbarState();
  }

  bindToolbarEvents() {
    this.initToolbar();
    this.openButton.addEventListener("click", e => this.handleOpenFile(e));
    this.saveButton.addEventListener("click", this.handleSaveFile);
    this.fileInput.addEventListener("change", this.handleFileInput);
    // 이벤트 바인딩
    this.colorPicker.addEventListener("input", (event) => this.updateCanvasColor(event));
    this.confirmButton.addEventListener("click", () => this.updateCanvasSize());
    this.addTools.addEventListener("click", (event) => {
      if (event.target.id === "text") {
        this.addText();
      } else {
        this.addShape(event.target.id);
      }
    });
    this.undoButton.addEventListener("click", () => this.executeUndo());
    this.redoButton.addEventListener("click", () => this.executeRedo());
  }

  static setCanvasToolbarState() {
    const canvasToolbar = document.getElementById("canvasToolbar");
    const shapeToolbar = document.getElementById("shapeToolbar");

    const colorPicker = document.getElementById("colorPicker");
    const widthInput = document.getElementById("widthInput");
    const heightInput = document.getElementById("heightInput");
    const canvasSize = Connector.getCanvasSize();
    const canvasColor = Connector.getCanvasColor();

    canvasToolbar.style.display = "block";
    shapeToolbar.style.display = "none";

    if (colorPicker) {
      colorPicker.value = canvasColor;
    }
    if (widthInput) {
      widthInput.value = canvasSize.width;
    }
    if (heightInput) {
      heightInput.value = canvasSize.height;
    }
  }

  static updateUndoRedoState(isUndoable, isRedoable) {
    this.undoButton = document.getElementById("undoButton");
    this.redoButton = document.getElementById("redoButton");

    this.undoButton.style.opacity = isUndoable ? "1" : "0.3";
    this.undoButton.style.pointerEvents = isUndoable ? "auto" : "none";

    this.redoButton.style.opacity = isRedoable ? "1" : "0.3";
    this.redoButton.style.pointerEvents = isRedoable ? "auto" : "none";
  }

  static renderShapeProperties(shapeId) {
    this.canvasToolbar = document.getElementById("canvasToolbar");
    this.shapeToolbar = document.getElementById("shapeToolbar");

    const shapeColor = Connector.getObjectColor(shapeId);
    this.canvasToolbar.style.display = "none"; // 캔버스 툴바 숨기기
    this.shapeToolbar.innerHTML = `
      <h2>Shape</h2>
      <label>Fill Color:</label>
      <input type="color" id="shapeFillColor" value="${shapeColor}" />
    `;
    this.shapeToolbar.style.display = "block"; // 도형 툴바 표시

    document.getElementById("shapeFillColor").addEventListener("input", (e) => {
      ActionGenerator.updateShapeColor(shapeId, e.target.value);
    });
  }

  static renderTextProperties(textId) {
    this.canvasToolbar = document.getElementById("canvasToolbar");
    this.shapeToolbar = document.getElementById("shapeToolbar");
    const textColor = Connector.getObjectColor(textId);
    const textSize = Connector.getTextSize(textId);

    this.canvasToolbar.style.display = "none"; // 캔버스 툴바 숨기기
    this.shapeToolbar.innerHTML = `
      <h2>Text</h2>
      <label>Text Color:</label>
      <input type="color" id="textColor" value="${textColor}" />
      <label>Font Size:</label>
      <input type="number" id="fontSize" value="${textSize}" />
    `;
    this.shapeToolbar.style.display = "block"; // 텍스트 툴 바 표시

    document.getElementById("textColor").addEventListener("input", (e) => {
      ActionGenerator.updateTextColor(textId, e.target.value);
    });
    document.getElementById("fontSize").addEventListener("input", (e) => {
      ActionGenerator.updateTextSize(textId, e.target.value);
    });
    // document.getElementById("fontFamily").addEventListener("input", (e) => {
    //   ActionGenerator.updateTextFont(text.id, e.target.value);
    // });
  }

  handleOpenFile = (e) => {
    this.fileInput.click();
  };

  handleFileInput = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.onload = (e) => {
        FileController.openFile(e.target.result);
        e.target.value = ''; // Input value 초기화
      };
      reader.readAsText(file);
    } else {
      console.error("파일이 선택되지 않았습니다.");
    }

  };

  handleSaveFile = () => {
    const jsonData = Connector.getExportData();
    FileController.saveFile(jsonData);

  };

  updateCanvasColor(e) {
    const newColor = e.target.value;
    ActionGenerator.updateCanvasColor(newColor);
    UIView.setCanvasToolbarState();
  }

  updateCanvasSize() {
    const widthInput = document.getElementById("widthInput");
    const heightInput = document.getElementById("heightInput");
    let newWidth = widthInput.value;
    let newHeight = heightInput.value;

    // 문자 / 음수 입력 시의 유효성 검사
    if (isNaN(newWidth) || isNaN(newHeight) || newWidth <= 0 || newHeight <= 0) {
      alert(isNaN(newWidth) || isNaN(newHeight) 
        ? "숫자만 입력 가능합니다." 
        : "양수 값을 입력해주시기 바랍니다."
      );
      const { width, height } = Connector.getCanvasSize();
      widthInput.value = width;
      heightInput.value = height;
      return;
    }
    ActionGenerator.updateCanvasSize(newWidth, newHeight);
  }

  addShape(shapeType) {
    Connector.setDrawingShapeType(shapeType);
  }

  addText() {
    Connector.setAddingTextMode();
  }

  executeUndo() {
    ActionGenerator.undo();
  }

  executeRedo() {
    ActionGenerator.redo();
  }

}
