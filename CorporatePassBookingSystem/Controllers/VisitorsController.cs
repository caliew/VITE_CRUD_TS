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
            try
            {
                var visitors = _visitorRepository.GetVisitors();
                return Ok(visitors);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting visitors");
                return StatusCode(500, "An error occurred while getting visitors.");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetVisitor(int id)
        {
            try
            {
                var visitor = _visitorRepository.GetVisitor(id);
                if (visitor == null)
                {
                    return NotFound();
                }
                return Ok(visitor);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting visitor");
                return StatusCode(500, "An error occurred while getting visitor.");
            }
        }

        [HttpPost]
        public IActionResult CreateVisitor(Visitor visitor)
        {
            try
            {
                _visitorRepository.CreateVisitor(visitor);
                return CreatedAtAction(nameof(GetVisitor), new { id = visitor.Id }, visitor);
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating visitor");
                return StatusCode(500, "An error occurred while creating visitor.");
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateVisitor(int id, Visitor visitor)
        {
            try
            {
                if (id != visitor.Id)
                {
                    return BadRequest("Visitor ID does not match");
                }
                _visitorRepository.UpdateVisitor(visitor);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating visitor");
                return StatusCode(500, "An error occurred while updating visitor.");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteVisitor(int id)
        {
            try
            {
                _visitorRepository.DeleteVisitor(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting visitor");
                return StatusCode(500, "An error occurred while deleting visitor.");
            }
        }
    }
}