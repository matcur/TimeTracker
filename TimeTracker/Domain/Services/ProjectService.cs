using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimeTracker.DataAccess;
using TimeTracker.DataAccess.Models;
using TimeTracker.ViewModels;
using TimeTracker.ViewModels.Project;

namespace TimeTracker.Domain.Services
{
    public class ProjectService : IProjectService
    {
        private readonly AppDb _db;
        
        private readonly DbSet<Project> _projects;

        public ProjectService(AppDb db)
        {
            _db = db;
            _projects = db.Projects;
        }

        public List<Project> GetAll()
        {
            return _projects.ToList();
        }

        public Project Create(NewProject project)
        {
            var newProject = new Project(project) {CreateDate = DateTime.Now};
            
            _projects.Add(newProject);
            _db.SaveChanges();

            return newProject;
        }
    }
}