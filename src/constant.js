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
    stroke: { color: "#000000", width: 1 },
    transform: {
        position: { x: 0, y: 0 },
        size: { width: 100, height: 40 },
        rotate: 0,
    },
    font: {
        size: 16,
        family: "Noto Sans JP",
        fill: { color: "#000000", opacity: 1.0 },
    },
    alignment: "center",
};

// 기본 입력 스타일 설정
// export const DEFAULT_INPUT_STYLE = {
//     "font-size": "16px",
//     "font-family": "Noto Sans JP",
//     "border": "none",
//     "outline": "none",
//     "backgroundColor": "transparent",
//     "padding": "0"
// };
