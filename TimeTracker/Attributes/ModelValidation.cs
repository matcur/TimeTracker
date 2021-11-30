﻿using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace TimeTracker.Attributes
{
    public class ModelValidation : Attribute, IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context) { }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var model = context.ModelState;
            if (!model.IsValid)
            {
                context.Result = new BadRequestObjectResult(model);
            }
        }
    }
}