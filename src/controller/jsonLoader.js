import Canvas from "../model/canvas.js";
import CanvasView from "../view/canvasView.js";
import UIView from "../view/uiView.js";
import {  DEFAULT_CANVAS_JSON  } from "../constant.js";
import Core from "./core.js";

export default class JsonLoader {
  constructor(json) {
    // 초기 캔버스 설정
    const parsedJson = json ? JSON.parse(json) : DEFAULT_CANVAS_JSON;

    if (parsedJson.canvas) {
      Core.registerJson(parsedJson.canvas);
      this.uiView = new UIView();
    }

  }
}
