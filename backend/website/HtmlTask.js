import { removeTask, updateTask } from "./api.js";

export class HtmlTask {
    constructor(task) {
        this.task = task;
        this.parentHtml = document.createElement("div");

        const text = document.createElement("div");
        text.textContent = task.title;
        task.finished ?
            text.setAttribute("class", "text-decoration-line-through") :
            text.setAttribute("class", "");

        const buttonDelete = document.createElement("button");
        buttonDelete.textContent = "Delete";

        const checkboxFinished = document.createElement("input");
        checkboxFinished.setAttribute("type", "checkbox");
        checkboxFinished.checked = task.finished;

        this.parentHtml.appendChild(text);
        this.parentHtml.appendChild(buttonDelete);
        this.parentHtml.appendChild(checkboxFinished);

        buttonDelete.addEventListener("click", e => this.remove());
        checkboxFinished.addEventListener("click", e => this.finish());
    }

    async remove() {
        await removeTask(this.task._id);
        this.parentHtml.remove();
    }

    async finish() {
        this.task.finished = !this.task.finished;
        await updateTask(this.task._id, this.task);
        for (const el of this.parentHtml.childNodes) {
            if (el.nodeName === "DIV") {
                if (this.task.finished) {
                    el.setAttribute("class", "text-decoration-line-through");
                } else {
                    el.setAttribute("class", "");
                }
            }
        }
    }
}
