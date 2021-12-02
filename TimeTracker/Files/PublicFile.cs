using System.IO;
using Microsoft.AspNetCore.Http;

namespace TimeTracker.Files
{
    public class PublicFile
    {
        private readonly IFormFile _file;

        public PublicFile(IFormFile file)
        {
            _file = file;
        }

        public string Save(string folder)
        {
            var path = Path.Combine(folder, _file.FileName);
            using (var stream = File.Create(path))
            {
                _file.CopyTo(stream);
            }

            return path;
        }
    }
}