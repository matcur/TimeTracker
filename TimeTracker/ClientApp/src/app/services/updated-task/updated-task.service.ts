import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Task} from "../../../shared/models";

@Injectable({
  providedIn: 'root'
})
export class UpdatedTaskService {
  static data = new Subject<Task>();

  public static subject = UpdatedTaskService.data.asObservable();

  getSubject() {
    return UpdatedTaskService.subject;
  }

  update(task: Task) {
    UpdatedTaskService.data.next(task);
  }
}
