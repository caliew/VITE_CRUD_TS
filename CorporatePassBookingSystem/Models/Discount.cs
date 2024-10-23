// Booking.cs
using System.ComponentModel.DataAnnotations;

namespace CorporatePassBookingSystem.Models
{
    public class Discount
    {
        [Key]
        public int Id { get; set; }
        public string? Code { get; set; }
        public decimal PercentageOff { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public bool AppliesToBookings { get; set; }
        public bool AppliesToPasses { get; set; }
    }
}