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
        
        void Update(UpdateTask task);
        
        Task Create(NewTask task);
    }
}