import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../model/task";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private url: string = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  getTasks(listId: string | undefined): Observable<Array<Task>> {
      return this.http.get<Array<Task>>(`${this.url}/tasks?listId=${listId ? listId : ""}`, {withCredentials: true});
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.url}/task`, task, {withCredentials: true});
  }

  updateTask(oldTask: Task, newTask: Task): Observable<void> {
    return this.http.put<void>(`${this.url}/task/${oldTask._id}`, newTask, {withCredentials: true});
  }

  deleteTask(task: Task): Observable<void> {
    return this.http.delete<void>(`${this.url}/task/${task._id}`, {withCredentials: true});
  }
}
