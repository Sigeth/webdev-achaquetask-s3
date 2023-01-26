import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../model/task";
import {TasksService} from "../../service/tasks.service";
import {TaskList} from "../../model/taskList";
import {TaskListsService} from "../../service/lists.service";
import { CdkDragDrop } from '@angular/cdk/drag-drop';



@Component({
  selector: 'taskList',
  templateUrl: './taskList.component.html',
  styleUrls: ['./taskList.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() list: TaskList | undefined;
  @Input() tasklist: Array<TaskList> = new Array<TaskList>(); 
  tasks: Array<Task> = new Array<Task>();
  newTask: Task = {
    title: '',
    finished: false,
    status: "undefined",
    listId: undefined
  };

  error: boolean = false;
  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
    this.newTask.listId = this.list?._id;
    this.taskService.getTasks(this.list?._id).subscribe({
      next: (data) => { this.tasks = data; }
    });
  }

  add(): void {
    this.taskService.addTask(this.newTask).subscribe({
      next: (data) => {
        this.tasks.push(data);
        this.newTask.title = '';
        this.refreshTasks();
      }
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
      finished: !task.finished,
      status: task.status,
      listId: task.listId
    };
    this.taskService.updateTask(task, modifiedTask).subscribe({
      next: () => { console.log("ok"); }
    });
  }

  private refreshTasks(): void {
    this.tasks = this.tasks.filter(currentTask => currentTask._id == currentTask._id);
  }

  drop(event: CdkDragDrop<any[]>){
    if(event.previousContainer == event.container) {
      let save= this.tasks[event.currentIndex];
      this.tasks[event.currentIndex] = this.tasks[event.previousIndex];
      this.tasks[event.previousIndex]= save ;
      this.refreshTasks();
    }
    else {
      event.container.data.splice(event.currentIndex,0,event.previousContainer.data[event.previousIndex]);
      event.previousContainer.data.filter(curentTask => curentTask._id != event.previousContainer.data[event.previousIndex]._id);
      this.changeListId(event.previousContainer.data[event.previousIndex],event.container.id)
      //window.location.reload()
    }
  }


  changeListId(task:Task,listId:string){
    const modifiedTask: Task = {
      title: task.title,
      finished: task.finished,
      status: task.status,
      listId: listId
    };
    this.taskService.updateTask(task, modifiedTask).subscribe({
      next: () => { console.log("ok"); }
    });
  }
}
 
