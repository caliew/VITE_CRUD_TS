// FacilityRepository.cs
using CorporatePassBookingSystem.Data;
using CorporatePassBookingSystem.Models;

namespace CorporatePassBookingSystem.Repositories
{
    public class FacilityRepository : IFacilityRepository
    {
        private readonly CorporatePassBookingSystemContext _context;

        public FacilityRepository(CorporatePassBookingSystemContext context)
        {
            _context = context;
        }

        public IEnumerable<Facility> GetFacilities()
        {
            return _context.Facilities.ToList();
        }

        public Facility? GetFacility(int id)
        {
            return _context.Facilities.Find(id);
        }

        public void CreateFacility(Facility facility)
        {
            _context.Facilities.Add(facility);
            _context.SaveChanges();
        }

        public void UpdateFacility(Facility facility)
        {
            _context.Facilities.Update(facility);
            _context.SaveChanges();
        }

        public void DeleteFacility(int id)
        {
            var facility = _context.Facilities.Find(id);
            if (facility != null)
            {
                _context.Facilities.Remove(facility);
                _context.SaveChanges();
            }
        }
    }
}