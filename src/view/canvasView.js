import ShapeView from "./shapeView.js";
import Connector from "../controller/Connector.js";
import { DEFAULT_SHAPE_POSITION } from "../constant.js";
import ActionGenerator from "../controller/actionGenerator.js";
import Selector from "../controller/selector.js";

export default class CanvasView {
    constructor(canvasModel) {
        this.canvasModel = canvasModel;
        this.canvasElement = this.initializeProps();
        this.selectedShapeType = null;
        this.isDrawing = false;
        this.isDragging = false;
        this.previewElement = null;
        // 모델의 상태 변화에 대한 리스너
        this.canvasModel.addListener(this.update.bind(this));
        this.resgisterEvent();
        this.render();

    }

    // 내부 프로퍼티
    initializeProps() {
        const canvasElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        canvasElement.setAttribute("width", this.canvasModel.width);
        canvasElement.setAttribute("height", this.canvasModel.height);
        canvasElement.setAttribute("id", "canvas");
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
        if (!this.previewElement) {
            this.previewElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            this.previewElement.setAttribute("fill", "#ffffff");
            this.previewElement.setAttribute("fill-opacity", "0");
            this.previewElement.setAttribute("stroke", "black");
            this.previewElement.setAttribute("id", "previewElement");
            this.canvasElement.appendChild(this.previewElement);
        }
        this.previewElement.setAttribute("x", position.x);
        this.previewElement.setAttribute("y", position.y);
        this.previewElement.setAttribute("width", position.width);
        this.previewElement.setAttribute("height", position.height);
    }

    removePreview() {
        if (this.previewElement) {
            this.canvasElement.removeChild(this.previewElement);
            this.previewElement = null;
        }
    }

    // changeType에 따른 업데이트 처리
    update(canvas, changeType) {
        if (changeType === "color") {
            this.updateCanvasColor(canvas.fillColor);
        } else if (changeType === "size") {
            this.updateCanvasSize(canvas.width, canvas.height);
        } else if (changeType === "addingShape") {
            this.addShapeToCanvas();
        } else if (changeType === "deletingShape") {
            this.deleteShapeOfCanvas();
        }
    }

    resgisterEvent() {
        window.addEventListener('keydown', (e) => {
            const selectedShape = Selector.getSelectedShape();
            if (e.key === 'Backspace' && selectedShape !== undefined) {
                ActionGenerator.deleteShape(selectedShape.id);
                Selector.clearSelection();
            }
        });
    }

    setDrawingShapeType(shapeType) {
        this.selectedShapeType = shapeType;
        this.setDrawingMode();
    }

    setDrawingMode() {
        this.canvasElement.style.cursor = "crosshair";
        this.canvasElement.addEventListener("mousedown", this.startDrawing.bind(this)
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
            height: Math.abs(currentY - this.startY)
        });
    }

    endDrawing(e) {
        if (!this.isDrawing) {
            return;
        }
        this.canvasElement.style.cursor = "default";
        if (this.isDragging) {
            let position = this.calculatePosition(e);
            ActionGenerator.insertShape(this.selectedShapeType, position);
        } else {
            let position = DEFAULT_SHAPE_POSITION(e);
            ActionGenerator.insertShape(this.selectedShapeType, position);
        }
        //도형 Preview 삭제 및 초기화
        this.removePreview();
        this.isDrawing = false;
        this.isDragging = false;
        this.selectedShapeType = null;
    }

    calculatePosition(e) {
        return {
            x: Math.min(this.startX, e.offsetX),
            y: Math.min(this.startY, e.offsetY),
            width: Math.abs(e.offsetX - this.startX),
            height: Math.abs(e.offsetY - this.startY)
        };
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
    // canvas -> 모델에 도형 추가 시 실행
    addShapeToCanvas() {
        if (this.canvasModel.objectList) {
            const lastShape = this.canvasModel.objectList.at(-1);
            const shapeElement = new ShapeView(lastShape);
            this.canvasElement.appendChild(shapeElement.createSVGElement());
        }
    }

    deleteShapeOfCanvas() {
        const selectedShape = Selector.getSelectedShape();
        const shapeElement = document.getElementById(selectedShape.id);
        if (shapeElement) {
            this.canvasElement.removeChild(shapeElement);
        }
    }
}

