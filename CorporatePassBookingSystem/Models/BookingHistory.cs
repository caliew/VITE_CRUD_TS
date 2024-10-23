// Booking.cs
using System.ComponentModel.DataAnnotations;

namespace CorporatePassBookingSystem.Models
{
    public class BookingHistory
    {
        [Key]
        public int Id { get; set; }
        public int BookingId { get; set; }
        public DateTime BookingDate { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public string? Status { get; set; }
    }
}