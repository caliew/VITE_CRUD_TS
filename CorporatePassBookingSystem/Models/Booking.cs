// Booking.cs
using System.ComponentModel.DataAnnotations;

namespace CorporatePassBookingSystem.Models
{
    public class Booking
    {
        [Key]
        public int Id { get; set; }
        public int FacilityId { get; set; }
        public int VisitorId { get; set; }
        public DateTime BookingDate { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string? Status { get; set; }

        public Facility? Facility { get; set; }
        public Visitor? Visitor { get; set; }
    }
}