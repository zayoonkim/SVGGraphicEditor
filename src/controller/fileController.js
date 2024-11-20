import UIView from "../view/uiView.js";
import { DEFAULT_CANVAS_JSON } from "../constant.js";
import Core from "./core.js";

export default class fileController {
    static openFile(canvasData) {
        const parsedJson = canvasData ? JSON.parse(canvasData) : DEFAULT_CANVAS_JSON;
        if (parsedJson.canvas) {
            Core.registerJson(parsedJson.canvas);
        }
        if (!this.uiView) {
            this.uiView =  new UIView();
        } else {
            this.uiView.initToolbar();
        }
    }

    static saveFile(jsonData) {
        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "canvas.json";
        a.click();
        URL.revokeObjectURL(a.href);
    }
}