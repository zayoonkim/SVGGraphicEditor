import Shape from "./shape.js";
import { nanoid } from 'https://cdn.skypack.dev/nanoid';


export default class Canvas {
  constructor(canvasJson) {
    this.initializeProps(canvasJson);
  }

  initializeProps(canvasJson) {
    this._id = "canvas"; // 임시 canvas id
    this._fillColor = canvasJson.fill?.color;
    this._width = canvasJson.transform?.width;
    this._height = canvasJson.transform?.height;
    this._objectList = [];
    this._listeners = [];
    this.initializeObjects(canvasJson.objectList);
  }

  initializeObjects(objectList) {
    objectList?.forEach((object) => {
      if (object.shape) {
        this._objectList.push(new Shape(object.shape));
      } else if (object.text) {
        this._objectList.push(new Text(object.text));
      }
    });
  }

  getId() {
    return this._id;
  }

  // getter - setters
  fillColor(newFillColor) {
    return newFillColor == null ? this._fillColor : (this._fillColor = newFillColor);
  }

  width(newWidth) {
    return newWidth == null ? this._width : (this._width = newWidth);
  }

  height(newHeight) {
    return newHeight == null ? this._height : (this._height = newHeight);
  }

  objectList(newObjectList) {
    return newObjectList == null ? this._objectList : (this._objectList = newObjectList);
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
    this.objectList().push(new Shape(shapeData));
    this.notifyListeners("addingShape");
  }

  deleteShapeModel(shapeId) {
    const index = this.objectList().findIndex(shape => shape.getId() === shapeId);
    this.objectList().splice(index, 1);
    this.notifyListeners("deletingShape", shapeId);
  }
  
  getShapeById(shapeId) {
    return this.objectList().find(shape => shape.id === shapeId);
  }
  
  addListener(listener) {
    this._listeners.push(listener);
  }

  // 구독중인 View에 변화를 알림
  notifyListeners(changeType, shapeId) {
    this._listeners.forEach((listener) => listener(this, changeType, shapeId));
  }
}