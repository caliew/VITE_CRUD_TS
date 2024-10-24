using CorporatePassBookingSystem.Models;
using CorporatePassBookingSystem.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;

namespace CorporatePassBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly ILogger<BookingController> _logger;
        private readonly IBookingRepository _bookingRepository;

        public BookingController(ILogger<BookingController> logger, IBookingRepository bookingRepository)
        {            
            _logger = logger;
            _bookingRepository = bookingRepository;
        }

        [HttpGet]
        public IActionResult GetBookings()
        {
            try
            {
                _logger.LogInformation("Getting all bookings");
                var bookings = _bookingRepository.GetBookings();
                return Ok(bookings);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting bookings");
                return StatusCode(500, "An error occurred while getting bookings.");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetBooking(int id)
        {
            try
            {
                _logger.LogInformation($"Getting booking with id {id}");
                var booking = _bookingRepository.GetBooking(id);
                if (booking == null)
                {
                    return NotFound();
                }
                return Ok(booking);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting booking");
                return StatusCode(500, "An error occurred while getting booking.");
            }
        }

        [HttpPost]
        public IActionResult CreateBooking(Booking booking)
        {
            try
            {
                _logger.LogInformation($"Creating new booking with id {booking.Id}");
                if (booking.BookingDate < DateTime.Now)
                {
                    return BadRequest("Booking date is in the past");
                }
                var existingBooking = _bookingRepository.GetBookingByFacilityIdAndDate(booking.FacilityId, booking.BookingDate);
                if (existingBooking != null)
                {
                    return BadRequest("Double booking detected");
                }
                _bookingRepository.CreateBooking(booking);
                return CreatedAtAction(nameof(GetBooking), new { id = booking.Id }, booking);
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating booking");
                return StatusCode(500, "An error occurred while creating booking.");
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBooking(int id, Booking booking)
        {
            try
            {
                if (id != booking.Id)
                {
                    return BadRequest("Booking ID does not match");
                }
                _logger.LogInformation($"Updating booking with id {id}");
                _bookingRepository.UpdateBooking(booking);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating booking");
                return StatusCode(500, "An error occurred while updating booking.");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBooking(int id)
        {
            try
            {
                _logger.LogInformation($"Deleting booking with id {id}");
                _bookingRepository.DeleteBooking(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting booking");
                return StatusCode(500, "An error occurred while deleting booking.");
            }
        }
    }
}