// Visitor.cs
using System.ComponentModel.DataAnnotations;

namespace CorporatePassBookingSystem.Models
{
    public class Visitor
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
    }
}