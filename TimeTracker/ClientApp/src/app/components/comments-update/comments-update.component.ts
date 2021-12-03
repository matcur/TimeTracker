import {Component, Input} from '@angular/core';
import {CommentType, NewTaskComment, UpdateTask} from "../../../shared/models";
import {TasksService} from "../../services/tasks/tasks.service";

@Component({
  selector: 'app-comments-update',
  templateUrl: './comments-update.component.html',
  styleUrls: ['./comments-update.component.css']
})
export class CommentsUpdateComponent {
  @Input()
  task: UpdateTask;

  filePath = CommentType.FilePath;

  text = CommentType.Text;

  constructor(private tasksService: TasksService) { }

  remove(id: string) {
    const task = this.task;

    this.tasksService.removeComment(id);
    task.comments = task.comments.filter(c => c.id != id);
  }

  add(comments: NewTaskComment[]) {
    this.tasksService.addComments(comments, this.task.id);
  }
}
