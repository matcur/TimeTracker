using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TimeTracker.Attributes;
using TimeTracker.Domain.Services;
using TimeTracker.ViewModels;
using TimeTracker.ViewModels.Project;
using TimeTracker.ViewModels.Task;

namespace TimeTracker.Controllers
{
    public class ProjectController : Controller
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }
        
        [HttpGet]
        [Route("api/projects")]
        public IActionResult Index()
        {
            var projects = _projectService.GetAll();
            
            return Json(projects);
        }
        
        [HttpPost]
        [ModelValidation]
        [Route("api/projects/create")]
        public IActionResult Create([FromBody]string value)
        {
            var project = JsonConvert.DeserializeObject<NewProject>(value);
            if (!TryValidateModel(value))
            {
                return BadRequest();
            }
            
            var newProject = _projectService.Create(project);
            
            return Json(newProject);
        }
    }
}