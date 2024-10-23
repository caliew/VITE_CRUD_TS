using CorporatePassBookingSystem.Models;
using CorporatePassBookingSystem.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CorporatePassBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VisitorController : ControllerBase
    {
        private readonly ILogger<BookingController> _logger;
        private readonly IVisitorRepository _visitorRepository;

        public VisitorController(ILogger<BookingController> logger, IVisitorRepository visitorRepository)
        {
            _logger = logger;
            _visitorRepository = visitorRepository;
        }

        [HttpGet]
        public IActionResult GetVisitors()
        {
            _logger.LogInformation("Getting all visitor");
            var visitors = _visitorRepository.GetVisitors();
            return Ok(visitors);
        }

        [HttpGet("{id}")]
        public IActionResult GetVisitor(int id)
        {
            _logger.LogInformation($"Getting visitor with id {id}");
            var visitor = _visitorRepository.GetVisitor(id);
            if (visitor == null)
            {
                return NotFound();
            }
            return Ok(visitor);
        }

        [HttpPost]
        public IActionResult CreateVisitor(Visitor visitor)
        {
            _logger.LogInformation($"Creating new visitor with id {visitor.Id}");            
            _visitorRepository.CreateVisitor(visitor);
            return CreatedAtAction(nameof(GetVisitor), new { id = visitor.Id }, visitor);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateVisitor(int id, Visitor visitor)
        {
            if (id != visitor.Id)
            {
                return BadRequest();
            }
            _logger.LogInformation($"Updating visitor with id {id}");
            _visitorRepository.UpdateVisitor(visitor);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteVisitor(int id)
        {
            _logger.LogInformation($"Deleting visitor with id {id}");
            _visitorRepository.DeleteVisitor(id);
            return NoContent();
        }
    }
}