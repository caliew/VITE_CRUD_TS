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
