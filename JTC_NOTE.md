PROJECTS
BACKEND WEBAPI : CorporatePassBookingSystem
BACKEND UNIT TEST : CorporatePassBookingSystem.Tests
FRONT END (REACT,REDUX) : my-app

SETUP REQUIREMENTS:
1. Current WebAPI using MySQL Databse Connection UseMySql
- Replace Your local MySQL Server connection string in file appsettings.json

  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=corporatepassbookingsystem;User ID=root;Password=123456;"
  },
  
2. To Fire up REST API Or WEBAPI
- open Visual Code 
- logging to direcrtory CorporatePassBookingSystem
    SETUP OF DATABASE AND TABLES
- In Terminal run : dotnet ef migrations InitializeDB
- In Terminal run : dotnet ef database update
    SETUP OF REST API (WEBAPI)
- In Terminal run : dotnet build                            -> To builld the solution in \bin
- In Terminal run : dotnet run                              -> This will fired up the REST API Server
- In Browser type : http://localhost:5120/swagger/index.html -> This will run swagger to vwerify and check on the EndPoints

    o GET /api/facilities – List all facilities
    o GET /api/facility/{id} – Get a single facility
    o GET /api/bookings – Get all booking list
    o GET /api/bookings/{VisitorId} – Get booking by visitor
    o GET /api/booking/{id} – Get a single booking

    o POST /api/booking – Create a booking
    o PUT /api/booking – Update a booking
    o GET /api/visitors – Get all visitors
    o GET /api/visitor/{id} – Get a single visitor
    o POST /api/visitor – Create a visitor
    o PUT /api/visitor – Update a visitor

NOTE : 
A. Had included Logging Services and Swagger in the Framework. 
B. All tabled had been created include Optional Tables. 

    Booking: has FacilityId and VisitorId as foreign keys
    Facility: no foreign keys
    Visitor: no foreign keys

    A Booking is related to one Facility and one Visitor
    A Facility can have multiple Bookings
    A Visitor can have multiple Bookings

    NO cascading deleted was implemented.

C. The design is MVC, with Controller linked to Model and using Interface Class to Access Repositories with Final Database Access in \Data via Entity Framework CorporatePassBookingSystemContext.
o DO NOT UNDERSTAND WHAT PASS IS - Check if the pass is available
o DONE - Ensure booking date is valid (not in the past)
o DONE - Prevent double booking

D. Implement proper error handling and return appropriate HTTP status codes
    GET ALL : Returns a 500 Internal Server Error if an exception occurs.
    GET ID  : Returns a 404 Not Found if the visitor/facility is not found, and a 500 Internal Server Error if an exception occurs.
    CREATE  : Returns a 400 Bad Request if the visitor/facility is invalid, and a 500 Internal Server Error if an exception occurs. 
    UPDATE  : Returns a 400 Bad Request if the visitor/facility ID does not match, a 404 Not Found if the visitor/facility is not found, and a 500 Internal Server Error if an exception occurs.
    DELETE  : Returns a 404 Not Found if the visitor is not found, and a 500 Internal Server Error if an exception occurs.


3. To Fire Up Front End React App
- open Visual Code
- login to my-app
- in terminal run : npm install
- in terminal run : npx vite
- in Browser type : http://localhost:5173/
- Basic CRUD API for Booking, Visitors and Facilties had been tested and will work with the REST API
- Basic Data will be populated in the table of each page.