export default class CanvasView {
    constructor(canvasModel) { 
        console.log("캔버스 뷰")
        this.canvasModel = canvasModel;
        this.canvasElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.canvasElement.setAttribute("width", canvasModel.width);
        this.canvasElement.setAttribute("height", canvasModel.height);
        this.canvasElement.style.backgroundColor = canvasModel.fillColor;
        this.render();

        // 모델의 상태 변화에 대한 리스너
        this.canvasModel.addListener(this.update.bind(this));

    }
    render() {
        document.getElementById("root").appendChild(this.canvasElement); // canvas 초기 렌더링
        this.canvasModel.objectList.forEach(object => {
            this.canvasElement.appendChild(object.createSVGElement());
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
