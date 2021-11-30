using Microsoft.AspNetCore.Mvc;
using TimeTracker.Attributes;
using TimeTracker.Domain.Services;
using TimeTracker.ViewModels;
using TimeTracker.ViewModels.Project;

namespace TimeTracker.Controllers
{
    public class ProjectController : Controller
    {
        private readonly ProjectService _projectService;

        public ProjectController(ProjectService projectService)
        {
            _projectService = projectService;
        }
        
        [HttpGet]
        [Route("projects")]
        public IActionResult Index()
        {
            var projects = _projectService.GetAll();
            
            return Json(projects);
        }
        
        [HttpPost]
        [ModelValidation]
        [Route("projects/create")]
        public IActionResult Create([FromForm]NewProject project)
        {
            var newProject = _projectService.Create(project);
            
            return Json(newProject);
        }
    }
}