import Shape from "./shape.js";

export default class Canvas {
    constructor(canvasJson) {
        this.id = "canvas"; // 임시 canvas id
        this.objectList = [];
        this.listeners = [];
        this.initializeProps(canvasJson); 
        Canvas.instance = this;
    }

    initializeProps(canvasJson) {
        this.fillColor = canvasJson.fill?.color || "white";
        this.width = canvasJson.transform?.width || 800;
        this.height = canvasJson.transform?.height || 600;
        this.initializeObjects(canvasJson.objectList);
    }

    initializeObjects(objectList) {
        objectList?.forEach(object => {
            if (object.shape) {
                this.objectList.push(new Shape(object.shape));
            } else if (object.text) {
                this.objectList.push(new Text(object.text));
            }
        });
    }

    static getInstance() {
        return Canvas.instance;
    }
    
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

    // 구독중인 View에 변화를 알림
    notifyListeners(changeType) { 
        this.listeners.forEach(listener => listener(this, changeType));
    }

}
