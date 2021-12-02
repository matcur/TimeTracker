import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewTask, Task} from "../../../shared/models";
import {RequireOnly} from "../../../shared/types/RequireOnly";
import {apiUrl} from "../../../shared/apiUrl";

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

  getTaskById(id: number) {
    return this.http.get<Task>(`${apiUrl}tasks/${id}`);
  }

  update(task: RequireOnly<Task, 'Id'>) {
    return this.http.put(`${apiUrl}tasks/${task.id}`, task)
  }

   async create(task: NewTask) {
    return await this.http
      .post(`${apiUrl}tasks/create`, task)
      .toPromise() as Promise<Task>
  }
}
