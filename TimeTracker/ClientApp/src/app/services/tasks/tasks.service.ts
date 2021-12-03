import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewTask, NewTaskComment, Task, UpdateTask} from "../../../shared/models";
import {apiUrl} from "../../../shared/apiUrl";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) { }

  getTasks(startDate?: Date, endDate?: Date, projectId?: number) {
    return this.http.get<Task[]>(
      `${apiUrl}tasks?startDate=${startDate}&endDate=${endDate}&projectId=${projectId}`
    );
  }

  getTaskById(id: string) {
    return this.http.get<Task>(`${apiUrl}tasks/${id}`);
  }

  update(task: UpdateTask) {
    return this.http
      .put(`${apiUrl}tasks/${task.id}`, task)
      .toPromise() as Promise<Task>
  }

  async create(task: NewTask) {
    return await this.http
      .post(`${apiUrl}tasks/create`, task)
      .toPromise() as Promise<Task>
  }

  async removeComment(id: string) {
    return await this.http
      .delete(`${apiUrl}task-comments/${id}`)
      .toPromise()
  }

  async addComments(comments: NewTaskComment[], taskId: string) {
    return await this.http
      .post(`${apiUrl}tasks/${taskId}/comments`, comments)
      .toPromise()
  }
}
