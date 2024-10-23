using CorporatePassBookingSystem.Models;
using System.Collections.Generic;

namespace CorporatePassBookingSystem.Repositories
{
    public interface IVisitorRepository
    {
        IEnumerable<Visitor> GetVisitors();
        Visitor? GetVisitor(int id);
        void CreateVisitor(Visitor visitor);
        void UpdateVisitor(Visitor visitor);
        void DeleteVisitor(int id);
    }
}