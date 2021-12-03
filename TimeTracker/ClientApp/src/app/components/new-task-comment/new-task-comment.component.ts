import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommentType, NewTaskComment} from "../../../shared/models";
import {FileUploadService} from "../../services/file-upload/file-upload.service";

@Component({
  selector: 'app-task-description',
  templateUrl: './new-task-comment.component.html',
  styleUrls: ['./new-task-comment.component.css']
})
export class NewTaskCommentComponent {
  @Output()
  valueChanged = new EventEmitter<NewTaskComment[]>();

  @Input()
  textComment: NewTaskComment = {
    type: CommentType.Text,
    content: '',
  };

  @Input()
  fileComments: NewTaskComment[] = []

  constructor(private fileUploadService: FileUploadService) { }

  onTextChanged(value: string) {
    this.textComment.content = value;
    console.log(value, 'on text change')
    this.emitChanges();
  }

  async onFileChanged(files: FileList) {
    await this.fileUploadService
      .postFile(files)
      .subscribe(paths => {
        this.fileComments.push(...paths.map(p => ({type: CommentType.FilePath, content: p})))
        this.emitChanges();
      })
  }

  emitChanges() {
    const comments = [...this.fileComments];
    if (this.textComment.content != '') {
      comments.push(this.textComment);
    }
    this.valueChanged.emit(comments)
  }
}
