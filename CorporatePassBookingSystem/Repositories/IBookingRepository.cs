using CorporatePassBookingSystem.Models;
using System.Collections.Generic;

namespace CorporatePassBookingSystem.Repositories
{
    public interface IBookingRepository
    {
        IEnumerable<Booking> GetBookings();
        Booking? GetBooking(int id);
        void CreateBooking(Booking booking);
        void UpdateBooking(Booking booking);
        void DeleteBooking(int id);
    }
}