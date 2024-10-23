using System.ComponentModel.DataAnnotations;

namespace CorporatePassBookingSystem.Models
{
    public class Notification
    {
        [Key]
        public int Id { get; set; }
        public int BookingId { get; set; }
        public string? Message { get; set; }
        public DateTime SendDate { get; set; }
    }
}