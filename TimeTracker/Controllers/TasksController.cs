using System;
using Microsoft.AspNetCore.Mvc;
using TimeTracker.Attributes;
using TimeTracker.DataAccess.Models;
using TimeTracker.Domain.Services;
using TimeTracker.ViewModels;
using TimeTracker.ViewModels.Task;

namespace TimeTracker.Controllers
{
    public class TasksController : Controller
    {
        private readonly TasksService _tasksService;

        public TasksController(TasksService tasksService)
        {
            _tasksService = tasksService;
        }
        
        [HttpGet]
        [Route("tasks")]
        public IActionResult Index(
            [FromQuery]DateTime? startDate,
            [FromQuery]DateTime? endDate,
            [FromQuery]Guid? projectId)
        {
            var tasks = _tasksService.GetFiltered(startDate, endDate, projectId);
            
            return Json(tasks);
        }

        [HttpGet]
        [Route("tasks/{id:guid}")]
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
        [Route("tasks/{id:guid}")]
        public IActionResult Update([FromForm]UpdateTask task)
        {
            if (!_tasksService.Exists(task.Id))
            {
                return NotFound($"Task with id = {task.Id} is not found.");
            }

            _tasksService.Update(task);

            return Ok();
        }
        
        [HttpPost]
        [ModelValidation]
        [Route("tasks/create")]
        public IActionResult Create([FromForm]NewTask task)
        {
            var newTask = _tasksService.Create(task);

            return Json(newTask);
        }
    }
}