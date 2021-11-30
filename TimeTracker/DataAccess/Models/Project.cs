using System;

namespace TimeTracker.DataAccess.Models
{
    public class Project
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime UpdateDate { get; set; }
    }
}