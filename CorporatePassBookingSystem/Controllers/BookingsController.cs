using CorporatePassBookingSystem.Models;
using CorporatePassBookingSystem.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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
            _logger.LogInformation("Getting all bookings");
            var bookings = _bookingRepository.GetBookings();
            return Ok(bookings);
        }

        [HttpGet("{id}")]
        public IActionResult GetBooking(int id)
        {
            _logger.LogInformation($"Getting booking with id {id}");
            var booking = _bookingRepository.GetBooking(id);
            if (booking == null)
            {
                return NotFound();
            }
            return Ok(booking);
        }

        [HttpPost]
        public IActionResult CreateBooking(Booking booking)
        {
            _logger.LogInformation($"Creating new booking with id {booking.Id}");
            _bookingRepository.CreateBooking(booking);
            return CreatedAtAction(nameof(GetBooking), new { id = booking.Id }, booking);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBooking(int id, Booking booking)
        {
            if (id != booking.Id)
            {
                return BadRequest();
            }
            _logger.LogInformation($"Updating booking with id {id}");
            _bookingRepository.UpdateBooking(booking);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBooking(int id)
        {
            _logger.LogInformation($"Deleting booking with id {id}");
            _bookingRepository.DeleteBooking(id);
            return NoContent();
        }
    }
}