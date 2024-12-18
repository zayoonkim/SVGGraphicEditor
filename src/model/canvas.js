import Shape from "./shape.js";
import Text from "./text.js";
import { DEFAULT_TEXT_DATA } from '../constant.js';


export default class Canvas {
  constructor(canvasJson) {
    this.initializeProps(canvasJson);
  }

  initializeProps(canvasJson) {
    this._id = "canvas"; // 임시 canvas id
    this._fillColor = canvasJson.fill?.color;
    this._width = canvasJson.size?.width;
    this._height = canvasJson.size?.height;
    this._objectList = [];
    this._listeners = [];
    this.initializeObjects(canvasJson.objectList);
  }


  initializeObjects(objectList) {
    objectList?.forEach((object) => {
      if (object.type === "text") {
        this._objectList.push(new Text(object));
      } else {
        this._objectList.push(new Shape(object));
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
    this.fillColor(newColor);
    this.notifyListeners("color");
  }

  updateSize(width, height) {
    this.width(width);
    this.height(height);
    this.notifyListeners("size");
  }

  addShapeModel(shapeId, shapeType, position, size) {
    const shapeData = {
      type: shapeType,
      id: shapeId,
      stroke: { color: "#000000", width: 1 },
      fill: { color: "#ffffff", opacity: 1.0 },
      position: { x: position.x, y: position.y },
      size: { width: size.width, height: size.height },
      rotation: 0,
      alignment: "center"
    };
    this.objectList().push(new Shape(shapeData));
    this.notifyListeners("addingShape");
  }

  deleteObjectModel(shapeId) {
    const index = this.objectList().findIndex(shape => shape.getId() === shapeId);
    this.objectList().splice(index, 1);
    this.notifyListeners("deletingShape", shapeId);
  }

  addTextModel(textId, value, position) {
    const textData = {
      ...DEFAULT_TEXT_DATA,
      id: textId,
      textContent: value,
      position: { x: position.x, y: position.y }
    }
    console.log(textData);
    this.objectList().push(new Text(textData));
    this.notifyListeners("addingText");
  }

  getObjectById(shapeId) {
    return this.objectList().find(shape => shape.getId() === shapeId);
  }

  addListener(listener) {
    this._listeners.push(listener);
  }

  // 구독중인 View에 변화를 알림
  notifyListeners(changeType, shapeId) {
    this._listeners.forEach((listener) => listener(this, changeType, shapeId));
  }

  getExportData() {
    return {
      canvas: {
        id: this._id,
        fill: { color: this._fillColor },
        size: {
          width: this._width,
          height: this._height,
        },
        objectList: this._objectList.map(obj => obj.getExportData()),
      }
    }
  }
}