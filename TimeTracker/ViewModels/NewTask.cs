using System;
using System.ComponentModel.DataAnnotations;

namespace TimeTracker.ViewModels
{
    public class NewTask
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public Guid ProjectId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }
    }
}