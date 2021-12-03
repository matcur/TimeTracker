using System;
using System.ComponentModel.DataAnnotations.Schema;
using TimeTracker.ViewModels.Task;

namespace TimeTracker.DataAccess.Models
{
    public class TaskComment
    {
        public Guid Id { get; set; }

        [ForeignKey(nameof(Task))]
        public Guid TaskId { get; set; }

        public CommentContentType Type { get; set; }

        public string Content { get; set; }

        public Task Task { get; set; }

        public TaskComment() {}

        public TaskComment(NewComment other)
        {
            Type = other.Type;
            Content = other.Content;
        }
    }
}