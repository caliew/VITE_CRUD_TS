// FacilitiesController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CorporatePassBookingSystem.Data;
using CorporatePassBookingSystem.Models;
using CorporatePassBookingSystem.Repositories;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;

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
            try
            {
                var facilities = _facilityRepository.GetFacilities();
                return Ok(facilities);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting facilities");
                return StatusCode(500, "An error occurred while getting facilities.");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetFacility(int id)
        {
            try
            {
                var facility = _facilityRepository.GetFacility(id);
                if (facility == null)
                {
                    return NotFound();
                }
                return Ok(facility);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting facility");
                return StatusCode(500, "An error occurred while getting facility.");
            }
        }

        [HttpPost]
        public IActionResult CreateFacility(Facility facility)
        {
            try
            {
                _facilityRepository.CreateFacility(facility);
                return CreatedAtAction(nameof(GetFacility), new { id = facility.Id }, facility);
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating facility");
                return StatusCode(500, "An error occurred while creating facility.");
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateFacility(int id, Facility facility)
        {
            try
            {
                if (id != facility.Id)
                {
                    return BadRequest("Facility ID does not match");
                }
                _facilityRepository.UpdateFacility(facility);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating facility");
                return StatusCode(500, "An error occurred while updating facility.");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteFacility(int id)
        {
            try
            {
                _facilityRepository.DeleteFacility(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting facility");
                return StatusCode(500, "An error occurred while deleting facility.");
            }
        }
    }
}