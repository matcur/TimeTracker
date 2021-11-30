using Microsoft.AspNetCore.Mvc;
using TimeTracker.Domain.Services;
using TimeTracker.ViewModels;

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
        [Route("projects/create")]
        public IActionResult Create([FromForm]NewProject project)
        {
            var newProject = _projectService.Create(project);
            
            return Json(newProject);
        }
    }
}