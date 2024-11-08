import Connector from "./Connector.js";

export default class Selector {
    static setSelectedShape(id) {
        const canvas = Connector.getCanvas();
        this.clearSelection();
        this.selectedShape = canvas.objectList.find(shape => shape.id === id);
        if (this.selectedShape) {
            this.createResizeHandles(this.selectedShape);
        }
    }

    static getSelectedShape() {
        return this.selectedShape;
    }

    static createResizeHandles(shape) {
        const handleSize = 8;
        const x = shape.position.x;
        const y = shape.position.y;
        const width = shape.size.width;
        const height = shape.size.height;
        const handlePositions = [
            { id: 'nw', cursor: 'nw-resize', x: x - handleSize / 2, y: y - handleSize / 2 },
            { id: 'n', cursor: 'n-resize', x: x + width / 2 - handleSize / 2, y: y - handleSize / 2 },
            { id: 'ne', cursor: 'ne-resize', x: x + width - handleSize / 2, y: y - handleSize / 2 },
            { id: 'e', cursor: 'e-resize', x: x + width - handleSize / 2, y: y + height / 2 - handleSize / 2 },
            { id: 'se', cursor: 'se-resize', x: x + width - handleSize / 2, y: y + height - handleSize / 2 },
            { id: 's', cursor: 's-resize', x: x + width / 2 - handleSize / 2, y: y + height - handleSize / 2 },
            { id: 'sw', cursor: 'sw-resize', x: x - handleSize / 2, y: y + height - handleSize / 2 },
            { id: 'w', cursor: 'w-resize', x: x - handleSize / 2, y: y + height / 2 - handleSize / 2 },
        ];

        // canvas에 마커 추가
        const canvasElement = document.getElementById("canvas");
        handlePositions.forEach((marker) => {
            const handleElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            handleElement.setAttribute("id", `resize_${marker.id}`);
            handleElement.setAttribute("x", marker.x);
            handleElement.setAttribute("y", marker.y);
            handleElement.setAttribute("width", handleSize);
            handleElement.setAttribute("height", handleSize);
            handleElement.setAttribute("fill", "#4F80FF");
            handleElement.setAttribute("style", `cursor:${marker.cursor}`);
            canvasElement.appendChild(handleElement);
        });
    }

    static clearSelection() {
        const canvasElement = document.getElementById("canvas");
        const handles = canvasElement.querySelectorAll("[id^='resize_']"); // id에 "resize_" 포함한 요소 검색
        handles.forEach(marker => {
            canvasElement.removeChild(marker);
        });
        this.selectedShape = null;
    }
}