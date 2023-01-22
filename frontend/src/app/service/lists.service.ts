import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TaskList} from "../model/taskList";

@Injectable({
  providedIn: 'root'
})

export class TaskListsService {
  private url: string = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  getLists(): Observable<Array<TaskList>> {
    return this.http.get<Array<TaskList>>(`${this.url}/lists`, {withCredentials: true});
  }

  addList(taskList: TaskList): Observable<TaskList> {
    return this.http.post<TaskList>(`${this.url}/list`, taskList, {withCredentials: true});
  }

  updateList(oldTaskList: TaskList, newTaskList: TaskList): Observable<void> {
    return this.http.put<void>(`${this.url}/list/${oldTaskList._id}`, newTaskList, {withCredentials: true});
  }

  deleteList(taskList: TaskList | undefined): Observable<void> {
    return this.http.delete<void>(`${this.url}/list/${taskList?._id}`, {withCredentials: true});
  }
}
