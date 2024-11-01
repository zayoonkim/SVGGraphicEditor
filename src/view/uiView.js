import ActionGenerator from "../controller/actionGenerator.js";

export default class UIView {
    constructor(canvasModel) {
        this.canvasModel = canvasModel;
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
        this.colorPicker.value = this.canvasModel.fillColor;

        const labelColor = document.createElement("label");
        labelColor.textContent = "Canvas Color";
        labelColor.style.marginRight = "8px";

        // 크기 입력 필드
        const labelWidth = document.createElement("label");
        labelWidth.textContent = "Width:";
        labelWidth.style.marginRight = "8px";

        this.widthInput = document.createElement("input");
        this.widthInput.type = "number";
        this.widthInput.value = this.canvasModel.width;
        this.widthInput.style.marginRight = "8px";

        const labelHeight = document.createElement("label");
        labelHeight.textContent = "Height:";
        labelHeight.style.marginRight = "8px";

        this.heightInput = document.createElement("input");
        this.heightInput.type = "number";
        this.heightInput.value = this.canvasModel.height;
        this.heightInput.style.marginRight = "8px";

        // 확인 버튼
        this.confirmButton = document.createElement("button");
        this.confirmButton.textContent = "확인";
        this.confirmButton.style.marginLeft = "8px";

        // 툴바에 추가
        toolbar.appendChild(labelColor);
        toolbar.appendChild(this.colorPicker);
        toolbar.appendChild(labelWidth);
        toolbar.appendChild(this.widthInput);
        toolbar.appendChild(labelHeight);
        toolbar.appendChild(this.heightInput);
        toolbar.appendChild(this.confirmButton);
        document.getElementById("root").appendChild(toolbar);

        // 이벤트 바인딩
        this.colorPicker.addEventListener("input", (event) => this.updateCanvasColor(event));
        this.confirmButton.addEventListener("click", () => this.updateCanvasSize()); // 확인 버튼 클릭 시 크기 업데이트
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
}
