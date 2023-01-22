import { Component } from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {login: '', password: ''};
  error: boolean = false;
  constructor(private userService: UserService, private router: Router) { }

  submit(): void {
    this.userService.register(this.user).subscribe({
      next: () => { this.router.navigate(["login"]); },
      error: () => { this.error = true; }
    });
  }
}
