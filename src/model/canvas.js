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
    this.fillColor(canvasJson.fill?.color);
    this.width(canvasJson.transform?.width);
    this.height(canvasJson.transform?.height);
    this.initializeObjects(canvasJson.objectList);
  }

  initializeObjects(objectList) {
    objectList?.forEach((object) => {
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
  
  // getter - setters
  fillColor(newFillColor) {
    return newFillColor == null ? this.fillColor : (this.fillColor = newFillColor);
  }

  width(newWidth) {
    return newWidth == null ? this.width : (this.width = newWidth);
  }

  height(newHeight) {
    return newHeight == null ? this.height : (this.height = newHeight);
  }

  updateColor(newColor) {
    this.fillColor = newColor;
    this.notifyListeners("color");
  }

  updateSize(width, height) {
    this.width = width;
    this.height = height;
    this.notifyListeners("size");
  }

  addShape(shapeType, position) {
    // 새로운 도형 기본값 설정
    const shapeData = {
      type: shapeType,
      stroke: { color: "black", width: 1 },
      fill: { color: "white", opacity: 1 },
      transform: {
        position: position,
        size: { width: position.width, height: position.height },
        rotation: 0,
      },
    };
    this.objectList.push(new Shape(shapeData));
    this.notifyListeners("addingShape");
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  // 구독중인 View에 변화를 알림
  notifyListeners(changeType) {
    this.listeners.forEach((listener) => listener(this, changeType));
  }
}
