import {Component, Input, OnInit} from '@angular/core';
import {TasksService} from "../../services/tasks/tasks.service";
import {CommentType, Task} from '../../../shared/models';
import {NewTaskService} from "../../services/new-task/new-task.service";
import {min} from "rxjs/operators";
import {UpdatedTaskService} from "../../services/updated-task/updated-task.service";

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
  utcStartTime = '1970-01-01T00:00:0';

  constructor(private tasksService: TasksService,
              private newTaskService: NewTaskService,
              private updatedTaskService: UpdatedTaskService) { }

  ngOnInit() {
    this.tasksService
      .getTasks()
      .subscribe(tasks => this.tasks = tasks);
    this.newTaskService
      .getSubject()
      .subscribe(task => this.tasks.push(task));
    this.updatedTaskService
      .getSubject()
      .subscribe(task => this.updateTask(task));
  }

  updateTask(task: Task) {
    const tasks = this.tasks;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == task.id) {
        tasks[i] = task;
      }
    }
  }

  filterTasks(tasks): Task[] {
    const parameters = this.filterParameters;

    const byId = t => parameters.id == '-1' || t.projectId == parameters.id;
    const byStartDate = t => parameters.startDate == null || new Date(t.startDate) > parameters.startDate;
    const byEndDate = t => parameters.endDate == null || new Date(t.endDate) < parameters.endDate;

    return tasks
      .filter(t => byId(t) && byStartDate(t) && byEndDate(t))
  }

  getReadableDate(dateString: string) {
    if (dateString == this.utcStartTime) {
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

  getSpentTime(tasks: Task[]) {
    var hours = 0;
    var minutes = 0;
    tasks.forEach(task => {
      const spendTime = task.spendTime.split(":");
      hours += parseInt(spendTime[0])
      minutes += parseInt(spendTime[1])
    });

    hours += parseInt((minutes / 60).toString());
    minutes = minutes % 60;

    return `${hours}:${minutes}`;
  }
}
