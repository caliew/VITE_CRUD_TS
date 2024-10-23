// CorporatePassBookingSystem/Data/CorporatePassBookingSystemContext.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using CorporatePassBookingSystem.Models;

namespace CorporatePassBookingSystem.Data
{
    public class CorporatePassBookingSystemContext : DbContext
    {
        private readonly ILogger<CorporatePassBookingSystemContext> _logger;
        private readonly IConfiguration _configuration;

        public CorporatePassBookingSystemContext(DbContextOptions<CorporatePassBookingSystemContext> options, ILogger<CorporatePassBookingSystemContext> logger, IConfiguration configuration)
            : base(options)
        {
            _logger = logger;
            _configuration = configuration;
        }

        public DbSet<Facility> Facilities { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Visitor> Visitors { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<BookingHistory> BookingHistories { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Notification> Notifications { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql(_configuration.GetConnectionString("DefaultConnection"), 
                    ServerVersion.AutoDetect(_configuration.GetConnectionString("DefaultConnection")));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Facility>().ToTable("Facilities");
            modelBuilder.Entity<Booking>().ToTable("Bookings");
            modelBuilder.Entity<Visitor>().ToTable("Visitors");
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            try
            {
                return await base.SaveChangesAsync(cancellationToken);
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "An error occurred while saving changes to the database.");
                throw;
            }
        }
    }
}