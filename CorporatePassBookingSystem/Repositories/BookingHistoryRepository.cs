using CorporatePassBookingSystem.Data;
using CorporatePassBookingSystem.Models;
using System.Collections.Generic;
using System.Linq;

namespace CorporatePassBookingSystem.Repositories
{
    public class BookingHistoryRepository : IBookingHistoryRepository
    {
        private readonly CorporatePassBookingSystemContext _context;

        public BookingHistoryRepository(CorporatePassBookingSystemContext context)
        {
            _context = context;
        }

        public IEnumerable<BookingHistory> GetAllBookingHistories()
        {
            return _context.BookingHistories.ToList();
        }

        public BookingHistory? GetBookingHistoryById(int id)
        {
            return _context.BookingHistories.Find(id);
        }

        public void AddBookingHistory(BookingHistory bookingHistory)
        {
            _context.BookingHistories.Add(bookingHistory);
            _context.SaveChanges();
        }

        public void UpdateBookingHistory(BookingHistory bookingHistory)
        {
            _context.BookingHistories.Update(bookingHistory);
            _context.SaveChanges();
        }

        public void DeleteBookingHistory(int id)
        {
            var bookingHistory = _context.BookingHistories.Find(id);
            if (bookingHistory != null)
            {
                _context.BookingHistories.Remove(bookingHistory);
                _context.SaveChanges();
            }
        }
    }
}