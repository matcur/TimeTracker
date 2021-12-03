using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using TimeTracker.DataAccess;
using TimeTracker.DataAccess.Models;
using TimeTracker.ViewModels;
using TimeTracker.ViewModels.Task;

namespace TimeTracker.Domain.Services
{
    public class TasksService : ITasksService
    {
        private readonly AppDb _db;
        
        private readonly DbSet<Task> _tasks;

        public TasksService(AppDb db)
        {
            _db = db;
            _tasks = _db.Tasks;
        }

        public List<Task> GetFiltered(DateTime? startDate, DateTime? endDate, Guid? projectId)
        {
            var query = _tasks.Include(t => t.Comments).AsQueryable();
            if (projectId.HasValue)
            {
                query = query.Where(t => t.ProjectId == projectId.Value);
            }

            if (startDate.HasValue)
            {
                query = query.Where(t => t.StartDate >= startDate.Value);
            }

            if (startDate.HasValue)
            {
                query = query.Where(t => t.EndDate <= endDate.Value);
            }

            return query.ToList();
        }

        public Task GetById(Guid id)
        {
            EnsureTaskExisting(id);

            return _tasks
                .Include(t => t.Comments)
                .First(t => t.Id == id);
        }

        public bool Exists(Guid id)
        {
            return _tasks.Any(t => t.Id == id);
        }

        public Task Update(UpdateTask task)
        {
            EnsureTaskExisting(task.Id);

            var updateTask = new Task(task) {UpdateDate = DateTime.Now};
            
            _tasks.Update(updateTask);
            _db.SaveChanges();

            return updateTask;
        }

        public Task Create(NewTask task)
        {
            var newTask = new Task(task)
            {
                CreateDate = DateTime.Now,
            };

            _tasks.Add(newTask);
            _db.SaveChanges();
            
            return newTask;
        }

        public List<TaskComment> AddComments(IEnumerable<NewComment> comments, Guid taskId)
        {
            EnsureTaskExisting(taskId);

            var newComments = comments.Select(c => new TaskComment(c)
            {
                TaskId = taskId
            }).ToList();
            _db.TaskComments.AddRange(newComments);

            return newComments;
        }

        public void RemoveComment(Guid id)
        {
            var comment = new TaskComment{Id = id};
            
            _db.TaskComments.Attach(comment);
            _db.TaskComments.Remove(comment);
            _db.SaveChanges();
        }

        public bool CommentExists(Guid id)
        {
            return _db.TaskComments.Any(t => t.Id == id);
        }

        private void EnsureTaskExisting(Guid id)
        {
            if (!Exists(id))
            {
                throw new ArgumentException($"Task with id = {id} is not found.");
            }
        }
    }
}