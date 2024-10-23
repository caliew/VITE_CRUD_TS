// FacilityRepository.cs
using CorporatePassBookingSystem.Data;
using CorporatePassBookingSystem.Models;

namespace CorporatePassBookingSystem.Repositories
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly CorporatePassBookingSystemContext _context;

        public FeedbackRepository(CorporatePassBookingSystemContext context)
        {
            _context = context;
        }

        public IEnumerable<Feedback> GetAllFeedbacks()
        {
            return _context.Feedbacks.ToList();
        }

        public Feedback? GetFeedbackById(int id)
        {
            return _context.Feedbacks.Find(id);
        }

        public void AddFeedback(Feedback feedback)
        {
            _context.Feedbacks.Add(feedback);
            _context.SaveChanges();
        }

        public void UpdateFeedback(Feedback feedback)
        {
            _context.Feedbacks.Update(feedback);
            _context.SaveChanges();
        }

        public void DeleteFeedback(int id)
        {
            var feedback = _context.Feedbacks.Find(id);
            if (feedback != null)
            {
                _context.Feedbacks.Remove(feedback);
                _context.SaveChanges();
            }
        }
    }    
}