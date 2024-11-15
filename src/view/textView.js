import Selector from "../controller/selector.js";
import ActionGenerator from "../controller/actionGenerator.js";

export default class TextView {
    constructor(text) {
        this.text = text;
        this.isDragging = false;
        this.startClientX = 0;
        this.startClientY = 0;
        this.textElement = null;
        this.text.addListener(this.update.bind(this));
    }

    createTextElement() {
        const canvasElement = document.getElementById("canvas");
        const text = this.text;
        const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textElement.setAttribute("id", text.getId());
        textElement.textContent = text.content();
        textElement.setAttribute("type", text.getType());
        textElement.setAttribute("fill", text.fill());
        textElement.setAttribute("stroke", text.stroke());
        textElement.setAttribute("x", text.position().x);
        textElement.setAttribute("y", text.position().y + 15);
        textElement.setAttribute("rotate", text.rotate());
        textElement.setAttribute("font-family", text.fontFamily());
        textElement.setAttribute("font-weight", text.fontWeight());
        textElement.setAttribute("font-size", text.fontSize());
        textElement.style.cursor = "text";
        // text element 이벤트 바인딩
        textElement.addEventListener("mousedown", this.handleMouseDown.bind(this));
        textElement.addEventListener("dblclick", this.handleDoubleClick.bind(this));

        canvasElement.appendChild(textElement);
        this.textElement = textElement;

        return this.textElement;
    }

    handleMouseDown(e) {
        Selector.setSelectedObject(this.text.getId());
        this.createResizeHandles();
        // 더블 클릭 감지 타이머
        this.clickTimeout = setTimeout(() => {
            this.startMoving(e);
        }, 300);

        document.addEventListener("mousemove", this.handleDragging.bind(this));
        document.addEventListener("mouseup", this.handleMouseUp.bind(this));
    }

    // TODO : dragging preview 
    handleDragging(e) {
        if (!this.isDragging) return;
        const dx = e.clientX - this.startClientX;
        const dy = e.clientY - this.startClientY;

        const newX = this.text.position().x + dx;
        const newY = this.text.position().y + dy;

        this.textElement.style.cursor = "default";
    }

    handleMouseUp(e) {
        if (this.isDragging) {
            const dx = e.clientX - this.startClientX;
            const dy = e.clientY - this.startClientY;

            const finalX = this.text.position().x + dx;
            const finalY = this.text.position().y + dy;

            ActionGenerator.updateTextPosition(this.text.getId(), { x: finalX, y: finalY });
            this.isDragging = false;
        }
        document.removeEventListener("mousemove", this.handleDragging);
        document.removeEventListener("mouseup", this.handleMouseUp);
    }

    handleDoubleClick() {
        clearTimeout(this.clickTimeout);
        console.log("Double-click detected");
        this.startEditing(this.textElement);
    }

    startEditing(element) {
        let isForeignReplaced = false;
        const bbox = element.getBBox();

        //input 추가
        const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        foreignObject.setAttribute("x", bbox.x);
        foreignObject.setAttribute("y", bbox.y);
        foreignObject.setAttribute("width", "300");
        foreignObject.setAttribute("height", "40");

        const input = document.createElement("input");
        input.value = this.textElement.textContent;
        input.style.fontSize = this.text.fontSize() + "px";
        input.style.fontWeight = this.text.fontWeight();
        input.style.fontFamily = this.text.fontFamily();
        input.style.fill = this.text.fill();
        input.style.stroke = this.text.stroke();
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
                ActionGenerator.updateTextContent(this.text.getId(), newText);
            }
            // 변경이 끝나면 다시 replace
            foreignObject.replaceWith(this.textElement);
            this.isDragging = false;
        };

        input.addEventListener("blur", finishEditing);
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                finishEditing();
            }
        });
    }

    startMoving(e) {
        this.isDragging = true;
        this.startClientX = e.clientX;
        this.startClientY = e.clientY;
    }

    // resizeHandle 렌더링
    createResizeHandles() {
        const canvasElement = document.getElementById("canvas");

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
            // handleElement.addEventListener("mousedown", (e) => this.startResizing(e));
            canvasElement.appendChild(handleElement);
        });
    }

    update(changeType) {
        if (changeType === "content") {
            this.updateContent(this.text.content());
        } else if (changeType === "position") {
            this.updatePosition(this.text.position());
        }
    }

    updateContent(content) {
        this.textElement.textContent = content;
    }

    updatePosition(position) {
        this.textElement.setAttribute("x", position.x);
        this.textElement.setAttribute("y", position.y + 15);
    }

}
