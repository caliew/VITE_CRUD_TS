using CorporatePassBookingSystem.Data;
using CorporatePassBookingSystem.Models;
using System.Collections.Generic;
using System.Linq;

namespace CorporatePassBookingSystem.Repositories
{
    public class DiscountRepository : IDiscountRepository
    {
        private readonly CorporatePassBookingSystemContext _context;

        public DiscountRepository(CorporatePassBookingSystemContext context)
        {
            _context = context;
        }

        public IEnumerable<Discount> GetAllDiscounts()
        {
            return _context.Discounts.ToList();
        }

        public Discount? GetDiscountById(int id)
        {
            return _context.Discounts.Find(id);
        }

        public void AddDiscount(Discount discount)
        {
            _context.Discounts.Add(discount);
            _context.SaveChanges();
        }

        public void UpdateDiscount(Discount discount)
        {
            _context.Discounts.Update(discount);
            _context.SaveChanges();
        }

        public void DeleteDiscount(int id)
        {
            var discount = _context.Discounts.Find(id);
            if (discount != null)
            {
                _context.Discounts.Remove(discount);
                _context.SaveChanges();
            }
        }
    }
}