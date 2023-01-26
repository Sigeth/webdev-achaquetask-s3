import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import {DragDropModule} from '@angular/cdk/drag-drop'; 
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { TasksComponent } from './component/tasks/tasks.component';
import { AppRoutingModule } from "./app-routing-module";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { TaskFilterPipe } from './pipe/task-filter.pipe';
import { TaskListComponent } from './component/taskList/taskList.component';
import { RegisterComponent } from './component/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TasksComponent,
    TaskFilterPipe,
    TaskListComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
