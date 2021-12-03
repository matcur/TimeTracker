import {Component, OnInit} from '@angular/core';
import {TasksService} from "../../services/tasks/tasks.service";
import {Router} from "@angular/router";
import {NewTaskService} from "../../services/new-task/new-task.service";
import {CommentType, NewTask, NewTaskComment} from "../../../shared/models";

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.css'],
  providers: [TasksService, NewTaskService],
})
export class TaskCreationComponent implements OnInit {
  newTask: NewTask = {
    name: '',
    startDate: null,
    projectId: "",
    endDate: new Date(0).toISOString(),
    comments: []
  };

  errors = {
    name: '',
    startDate: '',
  };

  show = false;

  constructor(private tasksService: TasksService,
              private router: Router,
              private newTaskService: NewTaskService) {}

  onProjectIdChanged(id: string) {
    this.newTask.projectId = id;
  }

  ngOnInit() {
    setTimeout(() => this.show = true, 100);
  }

  async onSubmit() {
    const newTask = this.newTask;
    const errors = this.errors;
    if (newTask.name == '') {
      errors.name = 'Название обязательно';
      return;
    }

    if (newTask.startDate == null) {
      errors.startDate = 'Дана начала обязательное поле';
      return;
    }

    const start = new Date(newTask.startDate);
    const end = new Date(newTask.endDate);
    if (end.getTime() != 0 && start > end) {
      errors.startDate = 'Дата начала не может быть больше даты окончания';
      return;
    }

    console.log(newTask);
    const task = await this.tasksService.create(newTask);
    this.newTaskService.update(task);

    await this.startHideAnimation();
    this.router.navigateByUrl('/tasks');
  }

  async startHideAnimation() {
    this.show = false
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  onDescriptionChanged(comments: NewTaskComment[]) {
    this.newTask.comments = comments;
    console.log(comments)
  }
}
