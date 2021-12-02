import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import {TasksService} from "./services/tasks/tasks.service";
import { TasksSearchComponent } from './components/tasks-search/tasks-search.component';
import {ProjectsService} from "./services/projects/projects.service";
import { TaskCreationComponent } from './components/task-creation/task-creation.component';
import { ProjectsSelectComponent } from './components/projects-select/projects-select.component';
import { FormBuilder } from '@angular/forms';
import {NewTaskService} from "./services/new-task/new-task.service";

const routes: Routes = [
  {
    path: 'tasks',
    component: TaskListComponent,
  },
  {
    path: 'tasks-creation',
    component: TaskCreationComponent,
    outlet: 'popup'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TasksSearchComponent,
    TaskCreationComponent,
    ProjectsSelectComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
  ],
  providers: [
    TasksService,
    ProjectsService,
    NewTaskService,
    FormBuilder,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
