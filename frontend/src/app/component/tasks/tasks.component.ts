import {Component, OnInit} from '@angular/core';
import {Task} from "../../model/task";
import {TasksService} from "../../service/tasks.service";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {TaskListsService} from "../../service/lists.service";
import {TaskList} from "../../model/taskList";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{

  possibleStatus = [
    "undefined",
    "en_attente",
    "en_cours",
    "termine"
  ];
  newList: TaskList = {
    title: ""
  };
  error: boolean = false;
  taskList: Array<TaskList> = new Array<TaskList>();

  constructor(private taskService: TasksService, private taskListsService: TaskListsService, private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.taskService.getTasks(undefined).subscribe({
      next: (tasks) => {
        this.taskListsService.getLists().subscribe({
          next: (lists) => {
            if (tasks.length != 0) {
              this.taskList.push({_id: "", title: "Pas trié"});
            }
            for (let l of lists) {
              this.taskList.push(l);
            }
          },
          error: () => { this.error = true; }
        });
      },
      error: () => { this.error = true; }
    });
  }
  addTaskList(): void {
    this.taskListsService.addList(this.newList).subscribe({
      next: (data) => {
        this.taskList.push(data);
        this.newList.title = "";
      }
    })
  }
  logout(): void {
    this.userService.logout().subscribe({
      next: () => { this.router.navigate(["login"]); }
    });
  }
}
