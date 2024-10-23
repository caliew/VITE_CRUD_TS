using CorporatePassBookingSystem.Data;
using CorporatePassBookingSystem.Models;
using System.Collections.Generic;
using System.Linq;

namespace CorporatePassBookingSystem.Repositories
{
    public class VisitorRepository : IVisitorRepository
    {
        private readonly CorporatePassBookingSystemContext _context;

        public VisitorRepository(CorporatePassBookingSystemContext context)
        {
            _context = context;
        }

        public IEnumerable<Visitor> GetVisitors()
        {
            return _context.Visitors.ToList();
        }

        public Visitor? GetVisitor(int id)
        {
            return _context.Visitors.Find(id);
        }

        public void CreateVisitor(Visitor visitor)
        {
            _context.Visitors.Add(visitor);
            _context.SaveChanges();
        }

        public void UpdateVisitor(Visitor visitor)
        {
            _context.Visitors.Update(visitor);
            _context.SaveChanges();
        }

        public void DeleteVisitor(int id)
        {
            var visitor = _context.Visitors.Find(id);
            if (visitor != null)
            {
                _context.Visitors.Remove(visitor);
                _context.SaveChanges();
            }
        }
    }
}