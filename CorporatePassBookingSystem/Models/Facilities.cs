// Facilities.cs
using System.ComponentModel.DataAnnotations;

namespace CorporatePassBookingSystem.Models
{
    public class Facility
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Type { get; set; }
        public int? Capacity { get; set; }
        public string? Location { get; set; }
        public string? Amenities { get; set; }
    }
}


