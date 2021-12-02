using System;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TimeTracker.Attributes;
using TimeTracker.DataAccess.Models;
using TimeTracker.Domain.Services;
using TimeTracker.ViewModels;
using TimeTracker.ViewModels.Task;

namespace TimeTracker.Controllers
{
    public class TasksController : Controller
    {
        private readonly ITasksService _tasksService;

        public TasksController(ITasksService tasksService)
        {
            _tasksService = tasksService;
        }
        
        [HttpGet]
        [Route("api/tasks")]
        public IActionResult Index(
            [FromQuery]DateTime? startDate,
            [FromQuery]DateTime? endDate,
            [FromQuery]Guid? projectId)
        {
            var tasks = _tasksService.GetFiltered(startDate, endDate, projectId);
            
            return Json(tasks);
        }

        [HttpGet]
        [Route("api/tasks/{id:guid}")]
        public IActionResult Details([FromQuery]Guid id)
        {
            if (!_tasksService.Exists(id))
            {
                return NotFound($"Task with id = {id} is not found.");
            }
            
            return Json(_tasksService.GetById(id));
        }

        [HttpPut]
        [ModelValidation]
        [Route("api/tasks/{id:guid}")]
        public IActionResult Update([FromBody]string value)
        {
            var task = JsonConvert.DeserializeObject<UpdateTask>(value);
            if (!TryValidateModel(value))
            {
                return BadRequest();
            }
            if (!_tasksService.Exists(task.Id))
            {
                return NotFound($"Task with id = {task.Id} is not found.");
            }

            _tasksService.Update(task);

            return Ok();
        }
        
        [HttpPost]
        [Route("api/tasks/create")]
        public IActionResult Create([FromBody]string value)
        {
            var task = JsonConvert.DeserializeObject<NewTask>(value);
            if (!TryValidateModel(value))
            {
                return BadRequest();
            }
            
            var newTask = _tasksService.Create(task);

            return Json(newTask);
        }
    }
}