import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../model/user";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post<void>(`${this.url}/register`, user, {withCredentials: true});
  }
  login(user: User) {
    return this.http.post<void>(`${this.url}/login`, user, {withCredentials: true});
  }

  logout() {
    return this.http.post<void>(`${this.url}/logout`, {}, {withCredentials: true});
  }

  isConnected(): Observable<void> {
    return this.http.get<void>(`${this.url}/isConnected`, {withCredentials: true});
  }
}
