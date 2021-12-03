using System;
using System.Collections.Generic;
using TimeTracker.DataAccess.Models;
using TimeTracker.ViewModels.Task;

namespace TimeTracker.Domain.Services
{
    public interface ITasksService
    {
        List<Task> GetFiltered(DateTime? startDate, DateTime? endDate, Guid? projectId);
        
        Task GetById(Guid id);
        
        bool Exists(Guid id);
        
        Task Update(UpdateTask task);
        
        Task Create(NewTask task);
        
        List<TaskComment> AddComments(IEnumerable<NewComment> comments, Guid taskId);
        
        void RemoveComment(Guid id);

        public bool CommentExists(Guid id);
    }
}