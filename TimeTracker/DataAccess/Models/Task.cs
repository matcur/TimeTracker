using System;
using System.ComponentModel.DataAnnotations.Schema;
using TimeTracker.ViewModels;
using TimeTracker.ViewModels.Task;

namespace TimeTracker.DataAccess.Models
{
    public class Task
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        [ForeignKey(nameof(Project))]
        public Guid ProjectId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime UpdateDate { get; set; }

        public Project Project { get; set; }

        [NotMapped]
        public string SpendTime
        {
            get
            {
                if (EndDate == DateTime.MinValue)
                {
                    return GetReadableDateDiff(StartDate, DateTime.Now);
                }
                
                return GetReadableDateDiff(StartDate, EndDate);
            }
        }

        public Task() {}
        
        public Task(UpdateTask other)
        {
            Id = other.Id;
            Name = other.Name;
            ProjectId = other.ProjectId;
            StartDate = other.StartDate;
            EndDate = other.EndDate;
        }

        public Task(NewTask other)
        {
            Name = other.Name;
            ProjectId = other.ProjectId;
            StartDate = other.StartDate;
            EndDate = other.EndDate;
        }

        private string GetReadableDateDiff(DateTime start, DateTime end)
        {
            var hours = (int)(end - start).TotalHours;
            var minutes = (int)(end - start).TotalMinutes;
                    
            return $"{hours}:{minutes % 60}";
        }
    }
}