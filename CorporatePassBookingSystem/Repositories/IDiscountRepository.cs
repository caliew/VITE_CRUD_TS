using CorporatePassBookingSystem.Models;
using System.Collections.Generic;

namespace CorporatePassBookingSystem.Repositories
{
    public interface IDiscountRepository
    {
        IEnumerable<Discount> GetAllDiscounts();
        Discount? GetDiscountById(int id);
        void AddDiscount(Discount discount);
        void UpdateDiscount(Discount discount);
        void DeleteDiscount(int id);
    }
}