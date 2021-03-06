using Microsoft.EntityFrameworkCore;
using TimeTracker.DataAccess.Models;

namespace TimeTracker.DataAccess
{
    public class AppDb : DbContext
    {
        public DbSet<Project> Projects { get; set; }
        
        public DbSet<TaskComment> TaskComments { get; set; }
        
        public DbSet<Task> Tasks { get; set; }

        public AppDb(DbContextOptions options): base(options)
        {
        }
    }
}