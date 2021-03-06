using System;
using TimeTracker.ViewModels;
using TimeTracker.ViewModels.Project;

namespace TimeTracker.DataAccess.Models
{
    public class Project
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime UpdateDate { get; set; }

        public Project() {}
        
        public Project(NewProject other)
        {
            Name = other.Name;
            CreateDate = other.CreateDate;
            UpdateDate = other.UpdateDate;
        }
    }
}