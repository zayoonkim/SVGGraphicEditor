import Selector from "../controller/selector.js";
import ActionGenerator from "../controller/actionGenerator.js";
import Connector from "../controller/Connector.js";

export default class TextView {
    constructor(text) {
        this.text = text;
        this.isDragging = false;
        this.startClientX = 0;
        this.startClientY = 0;
        this.textElement = null;
        this.isDragging = false;

        this.text.addListener(this.update.bind(this));
    }

    createTextElement() {
        const text = this.text;
        const canvasElement = document.getElementById("canvas");
        const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textElement.setAttribute("id", text.getId());
        textElement.textContent = text.content();
        textElement.setAttribute("type", text.getType());
        textElement.setAttribute("fill", text.fillColor());
        textElement.setAttribute("stroke", text.stroke());
        textElement.setAttribute("x", text.position().x);
        textElement.setAttribute("y", text.position().y);
        textElement.setAttribute("font-family", text.fontFamily());
        textElement.setAttribute("font-weight", text.fontWeight());
        textElement.setAttribute("font-size", text.fontSize());
        textElement.setAttribute("dominant-baseline", "hanging");
        textElement.style.cursor = "text";

        // 이벤트 바인딩
        textElement.addEventListener("mouseenter", (e) => textElement.style.cursor = "move");
        textElement.addEventListener("mousedown", (e) => this.handleMouseDown(e));
        textElement.addEventListener("dblclick", () => this.handleDoubleClick());

        this.textElement = textElement;
        canvasElement.appendChild(textElement);
        return textElement;
    }

    handleMouseDown(e) {
        e.stopPropagation();
        Selector.setSelectedObject(this.text.getId());
        Connector.setToolbarForObject(this.text.getId());

        this.startClientX = e.clientX;
        this.startClientY = e.clientY;

        this.isDragging = true;
        this.createPreview();


        document.addEventListener("mousemove", this.handleDragging.bind(this));
        document.addEventListener("mouseup", this.handleMouseUp.bind(this));

    }

    handleDragging(e) {
        if (!this.isDragging) return;

        const dx = e.clientX - this.startClientX;
        const dy = e.clientY - this.startClientY;
    
        const newX = this.text.position().x + dx;
        const newY = this.text.position().y + dy;
    
        // 프리뷰 위치 업데이트
        this.updatePreviewPosition({ x: newX, y: newY });
    }

    handleMouseUp(e) {
        if (this.isDragging) {
            const dx = e.clientX - this.startClientX;
            const dy = e.clientY - this.startClientY;

            const finalX = this.text.position().x + dx;
            const finalY = this.text.position().y + dy;

            const newPosition = {
                x: finalX,
                y: finalY,
            };
            ActionGenerator.updateTextPosition(this.text.getId(), newPosition);
        }
        this.isDragging = false;
        this.removePreview();
        document.removeEventListener("mousemove", this.handleDragging.bind(this));
        document.removeEventListener("mouseup", this.handleMouseUp.bind(this));
    }

    handleDoubleClick() {
        // clearTimeout(this.clickTimeout);
        this.startEditing(this.textElement);
    }

    createPreview() {
        // 텍스트 프리뷰 생성
        this.previewElement = this.textElement.cloneNode(true);
        this.previewElement.setAttribute("opacity", "0.5"); // 반투명 효과
        this.previewElement.setAttribute("pointer-events", "none"); // 이벤트 차단
        const canvasElement = document.getElementById("canvas");
        canvasElement.appendChild(this.previewElement);
    }
    
    updatePreviewPosition({ x, y }) {
        if (this.previewElement) {
            this.previewElement.setAttribute("x", x);
            this.previewElement.setAttribute("y", y);
        }
    }
    
    removePreview() {
        // 프리뷰 제거
        if (this.previewElement) {
            this.previewElement.remove();
            this.previewElement = null;
        }
    }

    createResizeHandles() {
        const canvasElement = document.getElementById("canvas");
        Selector.clearSelection();
        const handleSize = 8;
        Selector.getHandlePositions().forEach((handle) => {
          const handleElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect"
          );
          handleElement.setAttribute("id", `resize_${handle.id}`);
          handleElement.setAttribute("x", handle.x);
          handleElement.setAttribute("y", handle.y);
          handleElement.setAttribute("width", handleSize);
          handleElement.setAttribute("height", handleSize);
          handleElement.setAttribute("fill", "#4F80FF");
          handleElement.setAttribute("style", `cursor:${handle.cursor}`);
          canvasElement.appendChild(handleElement);
        });
      }

      updateHandles() {
        const handlePositions = Selector.getHandlePositions();
    
        handlePositions.forEach((handle) => {
            const handleElement = document.getElementById(`resize_${handle.id}`);
            if (handleElement) {
                handleElement.setAttribute("x", handle.x);
                handleElement.setAttribute("y", handle.y);
            }
        });
    }

    startEditing(element) {
        const text = this.text;
        let isForeignReplaced = false;
        Selector.clearSelection();
        const bbox = element.getBBox();

        const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        foreignObject.setAttribute("x", bbox.x);
        foreignObject.setAttribute("y", bbox.y);
        foreignObject.setAttribute("width", "300");
        foreignObject.setAttribute("height", "40");

        const input = document.createElement("input");
        input.value = this.textElement.textContent;
        input.style.fontSize = text.fontSize() + "px";
        input.style.fontWeight = text.fontWeight();
        input.style.fontFamily = text.fontFamily();
        input.style.border = "none";
        input.style.backgroundColor = "transparent";
        input.style.outline = "none";

        foreignObject.appendChild(input);
        this.textElement.replaceWith(foreignObject);
        input.focus();

        const finishEditing = () => {
            if (isForeignReplaced) return;
            isForeignReplaced = true;

            const newText = input.value;
            if (newText) {
                ActionGenerator.updateTextContent(text.getId(), newText);
            }

            foreignObject.replaceWith(this.textElement);
        };

        input.addEventListener("blur", finishEditing);
        input.addEventListener("keydown", (e) => {
            console.log(e.key);
            if (e.key === "Enter" || e.key === "esc") finishEditing();
        });
    }

    update(changeType) {
        if (changeType === "content") {
            this.updateContent(this.text.content());
        } else if (changeType === "position") {
            this.updatePosition(this.text.position());
        } else if (changeType === "color") {
            this.updateColor(this.text.fillColor());
        } else if (changeType === "size") {
            this.updateSize(this.text.fontSize());
        }
    }

    updateContent(content) {
        this.textElement.textContent = content;
    }

    updatePosition(position) {
        this.textElement.setAttribute("x", position.x);
        this.textElement.setAttribute("y", position.y);
        Selector.setSelectedObject(this.text.getId());
        this.createResizeHandles();
    }

    updateColor(color) {
        this.textElement.setAttribute("fill", color);
    }

    updateSize(size) {
        console.log("fontSize 업데이트")
        this.textElement.setAttribute("font-size", size);
        this.updateHandles(); // 핸들 위치 동적 갱신
    }
}
