using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Burmalda.Server.Data;
using Burmalda.Server.Models;

namespace Burmalda.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CategoriesController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }
    }
}