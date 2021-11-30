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
    public class TasksService
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
            var query = _tasks.AsQueryable();
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

            return _tasks.First(t => t.Id == id);
        }

        public bool Exists(Guid id)
        {
            return _tasks.Any(t => t.Id == id);
        }

        public void Update(UpdateTask task)
        {
            EnsureTaskExisting(task.Id);

            var updateTask = new Task(task) {UpdateDate = DateTime.Now};
            
            _tasks.Update(updateTask);
            _db.SaveChanges();
        }

        public Task Create(NewTask task)
        {
            var newTask = new Task(task) {CreateDate = DateTime.Now};

            _tasks.Add(newTask);
            _db.SaveChanges();
            
            return newTask;
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