// FacilitiesController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CorporatePassBookingSystem.Data;
using CorporatePassBookingSystem.Models;
using CorporatePassBookingSystem.Repositories;
using Microsoft.Extensions.Logging;

// FacilitiesController.cs
namespace CorporatePassBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FacilitiesController : ControllerBase
    {        
        private readonly ILogger<BookingController> _logger;
        private readonly IFacilityRepository _facilityRepository;

        public FacilitiesController(ILogger<BookingController> logger, IFacilityRepository facilityRepository)
        {
            _logger = logger;
            _facilityRepository = facilityRepository;
        }

        [HttpGet]
        public IActionResult GetFacilities()
        {
            _logger.LogInformation("Getting all facilities");
            var facilities = _facilityRepository.GetFacilities();
            return Ok(facilities);
        }

        [HttpGet("{id}")]
        public IActionResult GetFacility(int id)
        {
            _logger.LogInformation($"Getting facility with id {id}");
            var facility = _facilityRepository.GetFacility(id);
            if (facility == null)
            {
                return NotFound();
            }
            return Ok(facility);
        }

        [HttpPost]
        public IActionResult CreateFacility(Facility facility)
        {
            _logger.LogInformation($"Creating new facility with id {facility.Id}");
            _facilityRepository.CreateFacility(facility);
            return CreatedAtAction(nameof(GetFacility), new { id = facility.Id }, facility);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateFacility(int id, Facility facility)
        {
            if (id != facility.Id)
            {
                return BadRequest();
            }
            _logger.LogInformation($"Updating facility with id {id}");
            _facilityRepository.UpdateFacility(facility);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteFacility(int id)
        {
            _logger.LogInformation($"Deleting facility with id {id}");
            _facilityRepository.DeleteFacility(id);            
            return NoContent();
        }
    }
}