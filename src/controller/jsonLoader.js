import Canvas from "../model/canvas.js";
import CanvasView from "../view/canvasView.js";
import UIView from "../view/uiView.js";
import {DEFAULT_CANVAS_JSON} from "../constant.js";

export default class JsonLoader {
    constructor(json) {
        // 초기 캔버스 설정
        const parsedJson = json ? JSON.parse(json) : DEFAULT_CANVAS_JSON;
        // const parsedJson = {
        //     "canvas": {
        //       "transform": {
        //         "width": 800,
        //         "height": 600
        //       },
        //       "fill": {
        //         "color": "#c7c5c5",
        //       },
        //       "objectList": [
        //         {
        //           "shape": {
        //             "id": "ㅋ",
        //             "type": "rectangle", // "rectangle", "ellipse", "triangle", "star", etc.
        //             "transform": {
        //               "position": {
        //                 "x": 32,
        //                 "y": 22
        //               },
        //               "size": {
        //                 "width": 33,
        //                 "height": 44
        //               },
        //               "rotation": 40 
        //             },
        //             "fill": {
        //               "color": "#90a8ad",
        //             },
        //             "stroke": {
        //               "color": "black",
        //               "width": "1"
        //             },
        //             "alignment": "string" // "left", "center", "right" 등
        //           }, 
                  
        //         },
        //         {
        //           "shape": {
        //             "id": "d",
        //             "type": "rectangle", // "rectangle", "ellipse", "triangle", "star", etc.
        //             "transform": {
        //               "position": {
        //                 "x": 120,
        //                 "y": 78
        //               },
        //               "size": {
        //                 "width": 120,
        //                 "height": 12
        //               },
        //               "rotation": 12 // 각도
        //             },
        //             "fill": {
        //               "color": "#8a8a8a",
        //             },
        //             "stroke": {
        //               "color": "black",
        //               "width": "0"
        //             },
        //             "alignment": "string" // "left", "center", "right" 등
        //           }, 
                  
        //         }
                  
        //     ]
        // }}
        if (parsedJson.canvas) {
            this.canvas = new Canvas(parsedJson.canvas);
            this.canvasView = new CanvasView(this.canvas);
            this.uiView = new UIView(this.canvas, this.canvasView);
        }
        
    }
}
