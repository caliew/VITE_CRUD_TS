// IFacilityRepository.cs
using CorporatePassBookingSystem.Models;

namespace CorporatePassBookingSystem.Repositories
{
    public interface IFacilityRepository
    {
        IEnumerable<Facility> GetFacilities();
        Facility? GetFacility(int id);
        void CreateFacility(Facility facility);
        void UpdateFacility(Facility facility);
        void DeleteFacility(int id);
    }
}