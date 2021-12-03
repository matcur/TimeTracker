using System;
using TimeTracker.DataAccess.Models;

namespace TimeTracker.ViewModels.Task
{
    public class NewComment
    {
        public CommentContentType Type { get; set; }

        public string Content { get; set; }
    }
}