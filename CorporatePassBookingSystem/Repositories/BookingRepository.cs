using CorporatePassBookingSystem.Data;
using CorporatePassBookingSystem.Models;
using System.Collections.Generic;
using System.Linq;

namespace CorporatePassBookingSystem.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly CorporatePassBookingSystemContext _context;

        public BookingRepository(CorporatePassBookingSystemContext context)
        {
            _context = context;
        }

        public IEnumerable<Booking> GetBookings()
        {
            return _context.Bookings.ToList();
        }

        public Booking? GetBooking(int id)
        {
            return _context.Bookings.Find(id);
        }

        public void CreateBooking(Booking booking)
        {
            _context.Bookings.Add(booking);
            _context.SaveChanges();
        }

        public void UpdateBooking(Booking booking)
        {
            _context.Bookings.Update(booking);
            _context.SaveChanges();
        }

        public void DeleteBooking(int id)
        {
            var booking = _context.Bookings.Find(id);
            if (booking != null)
            {
                _context.Bookings.Remove(booking);
                _context.SaveChanges();
            }
        }
    }
}