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
export class TasksComponent {

  possibleStatus = [
      "undefined",
      "en_attente",
      "en_cours",
      "termine"
  ]
  error: boolean = false;
  filter: string = "all";

  constructor(private taskService: TasksService, private userService: UserService, private router: Router) { }
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
