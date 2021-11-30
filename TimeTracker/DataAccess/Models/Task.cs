using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace TimeTracker.DataAccess.Models
{
    public class Task
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        [ForeignKey(nameof(Project))]
        public Guid ProjectId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime CancelDate { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime UpdateDate { get; set; }

        public Project Project { get; set; }
    }
}