export const DEFAULT_CANVAS_JSON = {
    canvas: {
        transform: {
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
//constant.js
export const DEFAULT_SHAPE_POSITION = (e) => ({
    x: e.offsetX,
    y: e.offsetY,
    width: 100,
    height: 100
});