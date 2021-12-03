import {CommentType, TaskComment} from "../models";

export const findCommentByType = (comments: Partial<TaskComment>[], type: CommentType) => {
  const result = comments.find(c => c.type == type);
  if (result == undefined) {
    return {type: CommentType.Text, content: ''};
  }

  return result;
}
