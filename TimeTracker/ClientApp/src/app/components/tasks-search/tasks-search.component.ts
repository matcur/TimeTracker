import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProjectsService} from "../../services/projects/projects.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tasks-search',
  templateUrl: './tasks-search.component.html',
  styleUrls: ['./tasks-search.component.css'],
  providers: []
})
export class TasksSearchComponent implements OnInit {
  @Output()
  startDateChanged = new EventEmitter<string>()

  @Output()
  endDateChanged = new EventEmitter<string>()

  @Output()
  projectIdChanged = new EventEmitter<string>()

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onEndDateChanged(value: string) {
    this.endDateChanged.emit(value);
  }

  onProjectIdChanged(value: string) {
    this.projectIdChanged.emit(value);
  }

  onStartDateChanged(value: string) {
    this.startDateChanged.emit(value);
  }

  onCreateNewClick() {
    this.router.navigate([{ outlets: { popup: ['tasks-creation'] } }])
  }
}
