import Shape from "./shape.js";
import { nanoid } from 'https://cdn.skypack.dev/nanoid';


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

  addShapeModel(shapeType, position) {
    const shapeData = {
      type: shapeType,
      id: nanoid(),
      stroke: { color: "#000000", width: 1 },
      fill: { color: "#ffffff", opacity: 1.0 },
      transform: {
        position: { x: position.x, y: position.y },
        size: { width: position.width, height: position.height },
        rotation: 0
      },
      alignment: "center"
    };
    this.objectList.push(new Shape(shapeData));
    this.notifyListeners("addingShape");
  }

  deleteShapeModel(shapeId) {
    const index = this.objectList.findIndex(shape => shape.id === shapeId);
    this.objectList.splice(index, 1);
    this.notifyListeners("deletingShape");
  }

  getShapeById(shapeId) {
    const shape = this.objectList.find(shape => shape.id === shapeId);
    return shape;
  }
  
  addListener(listener) {
    this.listeners.push(listener);
  }

  // 구독중인 View에 변화를 알림
  notifyListeners(changeType) {
    this.listeners.forEach((listener) => listener(this, changeType));
  }
}