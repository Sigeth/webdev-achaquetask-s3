import {Component, OnInit} from '@angular/core';
import {Task} from "../../model/task";
import {TasksService} from "../../service/tasks.service";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  tasks: Array<Task> = new Array<Task>();
  newTask: Task = {
    title: '',
    finished: false
  };
  error: boolean = false;
  filter: string = "all";

  constructor(private taskService: TasksService, private userService: UserService, private router: Router) { }

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

  logout(): void {
    this.userService.logout().subscribe({
      next: () => { this.router.navigate(["login"]); }
    });
  }
  setFilter(filter: string): void {
    this.filter = filter;
  }
}
