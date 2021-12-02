import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Task} from "../../../shared/models";

@Injectable({
  providedIn: 'root'
})
export class NewTaskService {
  static data = new Subject<Task>();

  public static subject = NewTaskService.data.asObservable();

  getSubject() {
    return NewTaskService.subject;
  }

  update(task: Task) {
    NewTaskService.data.next(task);
  }
}
