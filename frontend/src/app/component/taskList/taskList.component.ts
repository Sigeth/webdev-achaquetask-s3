import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../model/task";
import {TasksService} from "../../service/tasks.service";
@Component({
  selector: 'taskList',
  templateUrl: './taskList.component.html',
  styleUrls: ['./taskList.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() status: string = "undefined";

  tasks: Array<Task> = new Array<Task>();

  newTask: Task = {
    title: '',
    finished: false
  };

  error: boolean = false;
  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => { this.tasks = data; },
      error: () => { this.error = true; }
    });
  }

  add(): void {
    this.taskService.addTask(this.newTask).subscribe({
      next: (data) => { this.tasks.push(data); }
    });
  }

  delete(task: Task): void {
    this.taskService.deleteTask(task).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(currentTask => currentTask._id !== task._id);
      }
    });
  }

  update(task: Task): void {
    const modifiedTask: Task = {
      title: task.title,
      finished: !task.finished
    };
    this.taskService.updateTask(task, modifiedTask).subscribe({
      next: () => { console.log("ok"); }
    });
  }




}
