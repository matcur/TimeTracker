import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Project} from "../../../shared/models";
import {ProjectsService} from "../../services/projects/projects.service";

@Component({
  selector: 'app-projects-select',
  templateUrl: './projects-select.component.html',
  styleUrls: ['./projects-select.component.css']
})
export class ProjectsSelectComponent implements OnInit {
  @Output()
  idChanged = new EventEmitter<string>();

  projects: Project[] = []

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService
      .getProjects()
      .subscribe(projects => this.projects = projects)
  }

  onProjectChange($event: any) {
    this.idChanged.emit($event.target.value);
  }
}
