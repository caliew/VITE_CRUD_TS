CURRENT SETTING USE MYSQL DATABASE SERVER
- CREATE A NEW DATABASE name corporatepassbookingsystem
- get the required connection string and update in file appsettings.json
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=corporatepassbookingsystem;User ID=root;Password=123456;"
  },
  
- RUN ENTITY FRAMEWORK TO BUILD THE TABLES IN DATABASE SERVER
- dotnet ef migrations add UpdateDatabase
- dotnet ef database update
