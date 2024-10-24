using Microsoft.EntityFrameworkCore;
using CorporatePassBookingSystem.Data;
using CorporatePassBookingSystem.Models;
using CorporatePassBookingSystem.Repositories;
using CorporatePassBookingSystem.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;

namespace CorporatePassBookingSystem.Tests
{
    public class BookingLogicTests
    {
        private readonly CorporatePassBookingSystemContext _context;
        private readonly BookingRepository _bookingRepository;
        private readonly VisitorRepository _visitorRepository;
        private readonly FacilityRepository _facilityRepository;


        public BookingLogicTests()
        {
            var options = new DbContextOptionsBuilder<CorporatePassBookingSystemContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            var loggerFactory = new LoggerFactory();
            var logger = loggerFactory.CreateLogger<CorporatePassBookingSystemContext>();

            var configurationBuilder = new ConfigurationBuilder();
            var configuration = configurationBuilder.Build();

            _context = new CorporatePassBookingSystemContext(options, logger, configuration);

            _visitorRepository = new VisitorRepository(_context);
            _facilityRepository = new FacilityRepository(_context);
            _bookingRepository = new BookingRepository(_context);
        }

        [Fact]
        public void CreateBooking_ValidVisitorAndFacility_ReturnsBooking()
        {
            // Arrange
            var visitor = new Visitor { Name = "John Doe" };
            _visitorRepository.CreateVisitor(visitor);
            _context.SaveChanges();

            var facility = new Facility { Name = "Facility 1" };
            _facilityRepository.CreateFacility(facility);
            _context.SaveChanges();

            // Act
            var booking = new Booking { VisitorId = visitor.Id, FacilityId = facility.Id };
            _bookingRepository.CreateBooking(booking);
            _context.SaveChanges();

            // Assert
            Assert.NotNull(booking.Id);
            Assert.Equal(visitor.Id, booking.VisitorId);
            Assert.Equal(facility.Id, booking.FacilityId);
        }

        [Fact]
        public void CreateBooking_InvalidVisitor_ThrowsException()
        {
            // Arrange
            var facility = new Facility { Name = "Facility 1" };
            _facilityRepository.CreateFacility(facility);
            _context.SaveChanges();

            // Act and Assert
            Assert.Throws<Exception>(() => _bookingRepository.CreateBooking(new Booking { FacilityId = facility.Id }));
        }

        [Fact]
        public void CreateBooking_InvalidFacility_ThrowsException()
        {
            // Arrange
            var visitor = new Visitor { Name = "John Doe" };
            _visitorRepository.CreateVisitor(visitor);
            _context.SaveChanges();

            // Act and Assert
            Assert.Throws<Exception>(() => _bookingRepository.CreateBooking(new Booking { VisitorId = visitor.Id }));
        }
    }
}