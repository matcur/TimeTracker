import {Component, Input, OnInit} from '@angular/core';
import {CommentType, NewTaskComment, TaskComment, UpdateTask} from "../../../shared/models";
import {TasksService} from "../../services/tasks/tasks.service";
import {ActivatedRoute, Router} from "@angular/router";
import {findCommentByType} from "../../../shared/functions/findCommentByType";
import {UpdatedTaskService} from "../../services/updated-task/updated-task.service";

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent implements OnInit {
  task: UpdateTask = {
    id: '',
    name: '',
    startDate: new Date().toISOString(),
    projectId: "",
    endDate: new Date(0).toISOString(),
    comments: []
  };

  errors = {
    name: '',
    startDate: '',
  };

  newComments: NewTaskComment[] = [];

  utcStartTime = '1970-01-01T00:00:0';

  constructor(private tasksService: TasksService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private updatedTaskService: UpdatedTaskService) {}

  onProjectIdChanged(id: string) {
    this.task.projectId = id;
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    this.tasksService
      .getTaskById(id)
      .toPromise()
      .then(task => this.task = task)
      .catch(err => this.router.navigateByUrl('/not-found'))
  }

  async onSubmit() {
    const task = this.task;
    const errors = this.errors;

    if (task.name == '') {
      errors.name = 'Название обязательно';
      return;
    }

    const start = new Date(task.startDate);
    const end = new Date(task.endDate);
    if (end.getTime() > 0 && start > end) {
      errors.startDate = 'Дата начала не может быть больше даты окончания';
      return;
    }

    // @ts-ignore
    task.comments = this.newComments;

    const updatedTask = await this.tasksService.update(task);
    this.updatedTaskService.update(updatedTask);
    this.router.navigateByUrl('/tasks');
  }

  addComments(comments: NewTaskComment[]) {
    this.newComments = comments;
    console.log(comments)
  }
}
