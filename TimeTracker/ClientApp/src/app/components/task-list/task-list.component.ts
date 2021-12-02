import {Component, Input, OnInit} from '@angular/core';
import {TasksService} from "../../services/tasks/tasks.service";
import { Task } from '../../../shared/models';
import {NewTaskService} from "../../services/new-task/new-task.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TasksService]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filterParameters = {
    id: '-1',
    startDate: null,
    endDate: null,
  }

  constructor(private tasksService: TasksService,
              private newTaskService: NewTaskService) { }

  ngOnInit() {
    this.tasksService
      .getTasks()
      .subscribe(tasks => this.tasks = tasks);
    this.newTaskService
      .getSubject()
      .subscribe(task => {
        console.log('xy'); this.tasks.push(task)});
  }

  filterTasks(tasks) {
    const parameters = this.filterParameters;

    const byId = t => parameters.id == '-1' || t.projectId == parameters.id;
    const byStartDate = t => parameters.startDate == null || new Date(t.startDate) > parameters.startDate;
    const byEndDate = t => parameters.endDate == null || new Date(t.endDate) < parameters.endDate;

    return tasks
      .filter(t => byId(t) && byStartDate(t) && byEndDate(t))
  }

  getReadableDate(dateString: string) {
    if (dateString == '') {
      return '00:00';
    }

    const date = new Date(dateString);

    return `${date.getHours()}:${date.getMinutes()}`;
  }

  onStartDateChange(value: string) {
    this.filterParameters.startDate = new Date(value);
  }

  onEndDateChange(value: string) {
    this.filterParameters.endDate = new Date(value);
  }

  onProjectIdChanged(value: string) {
    this.filterParameters.id = value;
  }
}
