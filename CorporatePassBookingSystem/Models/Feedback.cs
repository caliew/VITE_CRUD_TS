// Facilities.cs
using System.ComponentModel.DataAnnotations;

namespace CorporatePassBookingSystem.Models
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }
        public int BookingId { get; set; }
        public string? Comment { get; set; }
        public int Rating { get; set; }
    }
}


