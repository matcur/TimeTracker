using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TimeTracker.ViewModels.Task
{
    public class UpdateTask
    {
        [Required]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public Guid ProjectId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public List<NewComment> Comments { get; set; }
    }
}