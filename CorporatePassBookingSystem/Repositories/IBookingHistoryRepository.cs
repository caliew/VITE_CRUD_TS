using CorporatePassBookingSystem.Models;
using System.Collections.Generic;

namespace CorporatePassBookingSystem.Repositories
{
    public interface IBookingHistoryRepository
    {
        IEnumerable<BookingHistory> GetAllBookingHistories();
        BookingHistory? GetBookingHistoryById(int id);
        void AddBookingHistory(BookingHistory bookingHistory);
        void UpdateBookingHistory(BookingHistory bookingHistory);
        void DeleteBookingHistory(int id);
    }
}