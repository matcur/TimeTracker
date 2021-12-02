import {Component, OnInit, ViewChild} from '@angular/core';
import {TasksService} from "../../services/tasks/tasks.service";
import {Router} from "@angular/router";
import {NewTaskService} from "../../services/new-task/new-task.service";
import {NewTask} from "../../../shared/models";

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.css'],
  providers: [TasksService, NewTaskService],
})
export class TaskCreationComponent implements OnInit {
  newTask: NewTask = {
    name: '',
    startDate: new Date(0).toISOString(),
    projectId: "5c897ac0-4f7a-4f02-a6c1-bb763c397ab4",
    endDate: new Date().toISOString()
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
    setTimeout(() => this.show = true, 100)
  }

  async onSubmit() {
    if (this.newTask.name == '') {
      this.errors.name = 'Название обязательно';
      return;
    }

    const start = new Date(this.newTask.startDate);
    const end = new Date(this.newTask.endDate);
    if (end.getTime() != 0 && start > end) {
      this.errors.startDate = 'Дата запуска не может быть больше даты окончания';
      return;
    }

    const task = await this.tasksService.create(this.newTask);
    this.newTaskService.update(task);

    await this.startHideAnimation();
    this.router.navigateByUrl('/tasks');
  }

  async startHideAnimation() {
    this.show = false
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}
