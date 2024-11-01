import ShapeView from "./shapeView.js";

export default class CanvasView {
    constructor(canvasModel) { 
        this.canvasModel = canvasModel;
        this.canvasElement = this.initializeProps();
        this.render();
        // 모델의 상태 변화에 대한 리스너
        this.canvasModel.addListener(this.update.bind(this));

    }
    // 내부 프로퍼티 분리
    initializeProps() {
        const canvasElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        canvasElement.setAttribute("width", this.canvasModel.width);
        canvasElement.setAttribute("height", this.canvasModel.height);
        canvasElement.style.backgroundColor = this.canvasModel.fillColor;
        return canvasElement;
    }

    render() {
        document.getElementById("root").appendChild(this.canvasElement);
        this.canvasModel.objectList.forEach(object => {
            const shapeElement = new ShapeView(object);
            this.canvasElement.appendChild(shapeElement.createSVGElement());
        })
    }

    // changeType에 따른 업데이트 처리
    update(canvas, changeType) {
        if (changeType === 'color') {
            this.updateCanvasColor(canvas.fillColor);
        } else if (changeType === 'size') {
            this.updateCanvasSize(canvas.width, canvas.height);
        }
    }

    updateCanvasColor(newColor) {
        console.log("view 색상 업데이트")
        if(this.canvasElement) {
            this.canvasElement.style.backgroundColor = newColor;

        }
    }
    updateCanvasSize(width, height) {
        console.log("크기 업데이트");
        if (this.canvasElement) {
            this.canvasElement.setAttribute("width", width);
            this.canvasElement.setAttribute("height", height);
        }
    }
}
