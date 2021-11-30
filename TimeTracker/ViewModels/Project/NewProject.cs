using System;
using System.ComponentModel.DataAnnotations;

namespace TimeTracker.ViewModels.Project
{
    public class NewProject
    {
        [Required]
        public string Name { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime UpdateDate { get; set; }
    }
}