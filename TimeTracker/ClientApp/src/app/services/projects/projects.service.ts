import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Project} from "../../../shared/models";
import {apiUrl} from "../../../shared/apiUrl";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get<Project[]>(`${apiUrl}projects`);
  }
}
