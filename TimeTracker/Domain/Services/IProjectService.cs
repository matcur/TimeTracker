using System.Collections.Generic;
using TimeTracker.DataAccess.Models;
using TimeTracker.ViewModels.Project;

namespace TimeTracker.Domain.Services
{
    public interface IProjectService
    {
        List<Project> GetAll();
        
        Project Create(NewProject project);
    }
}