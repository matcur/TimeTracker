import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NewTaskComment, TaskComment} from "../../../shared/models";
import {FileUploadService} from "../../services/file-upload/file-upload.service";

@Component({
  selector: 'app-task-description',
  templateUrl: './task-description.component.html',
  styleUrls: ['./task-description.component.css']
})
export class TaskDescriptionComponent implements OnInit {
  @Output()
  valueChanged = new EventEmitter<NewTaskComment>();

  value: NewTaskComment = {
    type: 'Text',
    content: '',
  }

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {
  }

  onTextChanged(value: string) {
    this.value.content = value;
    this.valueChanged.emit(this.value);
  }

  async onFileChanged(files: FileList) {
    const file = files.item(0);

    await this.fileUploadService
      .postFile(file)
      .subscribe(path => {
        this.value.content = path;
        this.valueChanged.emit(this.value);
      })
  }
}
