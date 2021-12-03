import {Component, Input} from '@angular/core';
import {CommentType, Task, TaskComment} from 'src/shared/models';

@Component({
  selector: 'app-task-comments',
  templateUrl: './task-comments.component.html',
  styleUrls: ['./task-comments.component.css']
})
export class TaskCommentsComponent {
  @Input()
  task: Task;

  filePath = CommentType.FilePath;

  text = CommentType.Text;

  sort(comments: Partial<TaskComment>[]) {
    return comments.sort(c => c.type == CommentType.Text? -1: 1);
  }
}
