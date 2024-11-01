import CanvasView from "../view/canvasView.js";
import Shape from "./shape.js";


export default class Canvas {
    constructor(canvasJson) {
        this.id = "canvas"; // 임시
        this.objectList = [];
        this.fillColor = canvasJson.fill?.color || "white";
        this.width = canvasJson.transform?.width || 800;
        this.height = canvasJson.transform?.height || 600;

        // canvas 내부 element 
        canvasJson.objectList?.forEach(object => {
            if (object.shape) {
                this.objectList.push(new Shape(object.shape));
            } else if (object.text) {
                this.objectList.push(new Text(object.text));
            }
        });

        Canvas.instance = this;
        // 역으로 참조할 때, 콜백함수 / this.view = new CanvasView(this.id);
        // this.view = new CanvasView(this); // 현재 모델 상태 데려올 때 필요..
        this.listeners = [];

    }
    static getInstance() {
        return Canvas.instance;
    }

    getColor() {
        return this.fillColor;
    }

    // 모델 색상 변경
    // updateColor(newColor) {
    //     this.fillColor = newColor;
    //     this.view.updateCanvasColor(this.fillColor);
    // }

    updateColor(newColor) {
        this.fillColor = newColor;
        this.notifyListeners('color'); 
    }

    updateSize(width, height) {
        this.width = width;
        this.height = height;
        this.notifyListeners('size');
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    notifyListeners(changeType) {
        this.listeners.forEach(listener => listener(this, changeType));
    }

}
