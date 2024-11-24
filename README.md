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
<<<<<<< HEAD
amend in .env DATABASE_URL="postgresql://postgres:123@localhost:5432/nest?schema=public" 
    with reference to docker-compose.yml
=======
amend in .env DATABASE_URL="postgresql://postgres:123@localhost:5432/nest?schema=public" with reference to docker-compose.yml
>>>>>>> 10194637f5e9ea5d96cc1b983e1b483a2c82f037
npx prisma migrate dev
npx prisma studio
