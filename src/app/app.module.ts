import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { DetailTaskComponent } from './components/detail-task/detail-task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ModalComponent } from './components/modal/modal.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    MenuComponent,
    DetailTaskComponent,
    AddTaskComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    DetailTaskComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
