import { HtmlTask } from "./HtmlTask.js";
import { addTask } from "./api.js";

export class Application {
    constructor(tasks) {

        const addTaskInput = document.getElementById("inputAjoutTache");
        const addTaskButton = document.getElementById("buttonAjoutTache");
        addTaskButton.addEventListener("click", e => this.addEvent(addTaskInput));

        addTaskInput.addEventListener("keyup", (event) => {
            event.preventDefault();
            if (event.key === "Enter") {
                addTaskButton.click();
            }
        });

        this.tasksListHtml = document.getElementById("taskList");

        tasks.forEach(task => {
            this.addEventHtml(task);
        });
    }

    addEventHtml(task) {
        const htmlTask = new HtmlTask(task);
        this.tasksListHtml.appendChild(htmlTask.parentHtml);
    }

    async addEvent(addTaskInput) {
        const { task } = await addTask({title: addTaskInput.value, finished: false});
        addTaskInput.value = "";
        this.addEventHtml(task);
    }
}
