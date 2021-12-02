using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TimeTracker.Files;

namespace TimeTracker.Controllers
{
    public class FilesController : Controller
    {
        private readonly string _webRootPath;

        public FilesController(IWebHostEnvironment appEnvironment)
        {
            _webRootPath = appEnvironment.WebRootPath;
        }
        
        [HttpPost]
        [Route("api/files")]
        public IActionResult Index(IFormFile file)
        {
            return Json(new PublicFile(file).Save(_webRootPath));
        }
    }
}