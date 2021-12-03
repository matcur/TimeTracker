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
import { NewTaskCommentComponent } from './components/new-task-comment/new-task-comment.component';
import { TaskUpdateComponent } from './components/task-update/task-update.component';
import { CommentsUpdateComponent } from './components/comments-update/comments-update.component';
import {TaskCommentsComponent} from "./components/task-comments/task-comments.component";
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent,
  },
  {
    path: 'tasks',
    component: TaskListComponent,
  },
  {
    path: 'tasks-creation',
    component: TaskCreationComponent,
    outlet: 'popup'
  },
  {
    path: 'tasks/:id',
    component: TaskUpdateComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '*path',
    component: NotFoundComponent
  },
]

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TasksSearchComponent,
    TaskCreationComponent,
    ProjectsSelectComponent,
    NewTaskCommentComponent,
    TaskUpdateComponent,
    TaskCommentsComponent,
    CommentsUpdateComponent,
    NotFoundComponent,
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
