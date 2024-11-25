// INSTALL NESTJS TEMPLATE
nest new nestjs-api

// START DOCKER ON posgres
docker ps
docker compose up dev-db -d

// INSTALL PRISMA LIBRARY
npm install -D prisma
npm install -D @prisma/client

// INITIALIZE PRISMA WITHIN THE PROJECT
npx prisma init
.. primsa directory and .env will be created in folder
amend in .env DATABASE_URL="postgresql://postgres:123@localhost:5432/nest?schema=public" 
        with reference to docker-compose.yml
npx prisma migrate dev
npx prisma studio
npx prisma generate

// PIPE AND CLASS VALIDATOR
npm i --save class-validator class-transformer
- SET IN main.ts >  app.useGlobalPipes(new ValidationPipe())
- SET in dto > import { IsEmail, IsNotEmpty, IsString } from "class-validator";

// GENERATE HASH BASED ON PASSWORD
// NODE.BCRYPT.JS - VERIFICATION ALGORITHM ONLY FIRST FOR FIRST 72 BYTES OF A STRING
// ARGON2 - BETTER SOLUTION
npm i argon2

// ADD CONFIG MODULE
npm install @nestjs/config

// AUTHENTICATION
// JWT 
npm install --save @nestjs/passport passport @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt

// GUARDS - AUTHORIZATION
@useGuards(AuthGuard('jwt'))

// CUSTOM GUARD
@useGuards(JwtGuard)    => JwtGuard extends AuthGuard('jwt')

// CUSTOM DECORATOR
@GetUser                => GetUser = createParamDecorator((data:string | undefined, ctx: ExecutionContext) => {...

// DECORATOR
@HttpCode(HttpStatus.ACCEPTED)

// END-TO-END TEST WITH PACTUM
npm install pactum
- SETUP TEST DATABASE FOR END-TO-END TEST
- SETUP PRISMA SERVICE TO CLEAN DATABASE EVERYTIME RUN TEST

// SETUP WITH TEST DB
- Modify Package.json
- use dotenv to manage configuration for prisma ENV
- npm install dotenv-cli
  to enable variable of our choice to npm script

