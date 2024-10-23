// IFacilityRepository.cs
using CorporatePassBookingSystem.Models;

namespace CorporatePassBookingSystem.Repositories
{
    public interface IFeedbackRepository
    {
        IEnumerable<Feedback> GetAllFeedbacks();
        Feedback? GetFeedbackById(int id);
        void AddFeedback(Feedback feedback);
        void UpdateFeedback(Feedback feedback);
        void DeleteFeedback(int id);
    }
}