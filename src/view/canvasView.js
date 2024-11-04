import ActionGenerator from "../controller/actionGenerator.js";
import ShapeView from "./shapeView.js";

export default class CanvasView {

    constructor(canvasModel) {
        this.canvasModel = canvasModel;
        this.canvasElement = this.initializeProps();
        this.selectedShapeType = null;
        this.isDrawing = false;
        // 모델의 상태 변화에 대한 리스너
        this.canvasModel.addListener(this.update.bind(this));
        this.render();
    }
    
    // 내부 프로퍼티 분리
    initializeProps() {
        const canvasElement = document.getElementById("canvas");
        canvasElement.setAttribute("width", this.canvasModel.width);
        canvasElement.setAttribute("height", this.canvasModel.height);
        canvasElement.style.backgroundColor = this.canvasModel.fillColor;
        return canvasElement;
    }

    render() {
        document.getElementById("root").appendChild(this.canvasElement);
        this.canvasModel.objectList.forEach((object) => {
            const shapeElement = new ShapeView(object);
            this.canvasElement.appendChild(shapeElement.createSVGElement());
        });
    }

    renderPreview(position) {
        let previewElement = document.getElementById("previewElement");
        if (!previewElement) {
            previewElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            previewElement.setAttribute("id", "previewElement");
            previewElement.setAttribute("fill", "#ffffff");
            previewElement.setAttribute("fill-opacity", "0");
            previewElement.setAttribute("stroke", "black");
            this.canvasElement.appendChild(previewElement);
        }
        previewElement.setAttribute("x", position.x);
        previewElement.setAttribute("y", position.y);
        previewElement.setAttribute("width", position.width);
        previewElement.setAttribute("height", position.height);
    }

    // changeType에 따른 업데이트 처리
    update(canvas, changeType) {
        if (changeType === "color") {
            this.updateCanvasColor(canvas.fillColor);
        } else if (changeType === "size") {
            this.updateCanvasSize(canvas.width, canvas.height);
        } else if (changeType === "addingShape") {
            this.addShapeToCanvas();
        }
    }

    addShape(shapeType) {
        this.selectedShapeType = shapeType;
        document.getElementById("canvas").style.cursor = "crosshair";
        this.canvasElement.addEventListener("mousedown", this.startDrawing.bind(this)
        );
        this.canvasElement.addEventListener("mousemove", this.drawing.bind(this));
        this.canvasElement.addEventListener("mouseup", this.endDrawing.bind(this));
    }

    startDrawing(e) {
        if (!this.selectedShapeType) return;
        this.isDrawing = true;
        this.isDragging = false;
        this.startX = e.offsetX;
        this.startY = e.offsetY;
    }

    // 드래그 중의 preview shape 
    drawing(e) {
        if (!this.isDrawing) return;
        this.isDragging = true;
        const currentX = e.offsetX;
        const currentY = e.offsetY;
        const width = Math.abs(currentX - this.startX);
        const height = Math.abs(currentY - this.startY);
        this.renderPreview({
            x: Math.min(this.startX, currentX),
            y: Math.min(this.startY, currentY),
            width,
            height
        });

    }

    endDrawing(e) {
        if (!this.isDrawing) return;
        document.getElementById("canvas").style.cursor = "default";
        if (this.isDragging) {
            console.log("커스텀 도형")
            const endX = e.offsetX;
            const endY = e.offsetY;
            const position = {
                x: Math.min(endX, this.startX),
                y: Math.min(this.startY, endY),
                width: Math.abs(endX - this.startX),
                height: Math.abs(endY - this.startY),
            };
            ActionGenerator.addShape(this.selectedShapeType, position);

        }
        else {
            console.log("클릭 - 기본 도형")
            const position = {
                x: e.offsetX,
                y: e.offsetY,
                width: 80,
                height: 80,
            }
            ActionGenerator.addShape(this.selectedShapeType, position);
        }
        // preview 삭제
        const previewElement = document.getElementById("previewElement");
        if (previewElement) {
            this.canvasElement.removeChild(previewElement);
        }
        
        // 초기화
        this.isDrawing = false;
        this.isDragging = false;
        this.selectedShapeType = null;

    }

    updateCanvasColor(newColor) {
        console.log("view 색상 업데이트");
        if (this.canvasElement) {
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
    addShapeToCanvas() {
        console.log(this.canvasModel.objectList)
        if (this.canvasModel.objectList) {
            const lastShape = this.canvasModel.objectList.at(-1);
            const shapeElement = new ShapeView(lastShape);
            this.canvasElement.appendChild(shapeElement.createSVGElement());
        }
    }
}
