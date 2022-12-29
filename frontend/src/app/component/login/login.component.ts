import { Component } from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = {login: '', password: ''};
  error: boolean = false;
  constructor(private userService: UserService, private router: Router) { }

  submit(): void {
    this.userService.login(this.user).subscribe({
      next: () => { this.router.navigate(["tasks"]); },
      error: () => { this.error = true; }
    });
  }
}
