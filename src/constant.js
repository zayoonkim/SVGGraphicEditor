export const DEFAULT_CANVAS_JSON = {
    canvas: {
        size: {
            width: 800,
            height: 600
        },
        fill: {
            color: "#e3e3e3",
            opacity: 1.0
        },
        objectList: []
    }
};

export const DEFAULT_SHAPE_POSITION = (e) => ({
    x: e.offsetX,
    y: e.offsetY,
    width: 100,
    height: 100
});

export const DEFAULT_TEXT_DATA = {
    id: "",
    type: "text",
    textContent: "",  // 초기 텍스트
    fill: "#000000",
    stroke: { color: "#000000", width: 1 },
    position: { x: 0, y: 0 },
    size: { width: 100, height: 40 },
    font: {
        size: 16,
        family: "Noto Sans JP",
    },
    alignment: "center",
};