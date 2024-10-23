using CorporatePassBookingSystem.Models;
using System.Collections.Generic;
using System.Linq;

namespace CorporatePassBookingSystem.Repositories
{
    public interface INotificationRepository
    {
        IEnumerable<Notification> GetAllNotifications();
        Notification? GetNotificationById(int id);
        void AddNotification(Notification notification);
        void UpdateNotification(Notification notification);
        void DeleteNotification(int id);
    }

}