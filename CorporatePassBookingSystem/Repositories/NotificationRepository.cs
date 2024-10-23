using CorporatePassBookingSystem.Data;
using CorporatePassBookingSystem.Models;
using System.Collections.Generic;
using System.Linq;

namespace CorporatePassBookingSystem.Repositories
{

    public class NotificationRepository : INotificationRepository
    {
        private readonly CorporatePassBookingSystemContext _context;

        public NotificationRepository(CorporatePassBookingSystemContext context)
        {
            _context = context;
        }

        public IEnumerable<Notification> GetAllNotifications()
        {
            return _context.Notifications.ToList();
        }

        public Notification? GetNotificationById(int id)
        {
            return _context.Notifications.Find(id);
        }

        public void AddNotification(Notification notification)
        {
            _context.Notifications.Add(notification);
            _context.SaveChanges();
        }

        public void UpdateNotification(Notification notification)
        {
            _context.Notifications.Update(notification);
            _context.SaveChanges();
        }

        public void DeleteNotification(int id)
        {
            var notification = _context.Notifications.Find(id);
            if (notification != null)
            {
                _context.Notifications.Remove(notification);
                _context.SaveChanges();
            }
        }
    }
}