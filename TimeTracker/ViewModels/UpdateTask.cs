using System;
using System.ComponentModel.DataAnnotations;

namespace TimeTracker.ViewModels
{
    public class UpdateTask
    {
        [Required]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public Guid ProjectId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}