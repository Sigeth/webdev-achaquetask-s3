import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {TasksComponent} from "./component/tasks/tasks.component";
import {IsSignedInGuard} from "./is-signed-in.guard";
import {RegisterComponent} from "./component/register/register.component";

export const routes: Routes = [
    {
      path: '',
      component: LoginComponent
    },
    {
      path: 'tasks',
      component: TasksComponent,
      canActivate: [IsSignedInGuard]
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: '**',
      redirectTo: ''
    }
];

@NgModule({
    exports: [
      RouterModule
    ],
    imports: [
      RouterModule.forRoot(routes)
    ]
})
export class AppRoutingModule {
}
