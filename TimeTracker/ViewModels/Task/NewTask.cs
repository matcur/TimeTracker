using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TimeTracker.ViewModels.Task
{
    public class NewTask
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public Guid ProjectId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public List<NewComment> Comments { get; set; } = new();
    }
}