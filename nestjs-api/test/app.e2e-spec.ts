import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import { CreateBookmarkDto, EditBookmarkDto } from 'src/bookmark/dto';

describe('App e2e',()=>{

  let app:INestApplication;
  let prisma:PrismaService;

  beforeAll((async()=>{
    const moduleRef = await Test.createTestingModule({
      imports:[AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      })
    );

    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDB();
    pactum.request.setBaseUrl('http://localhost:3333')
  }),10000);

  afterAll(()=>{
    app.close();
  })

  describe('Auth',()=>{
    const dto: AuthDto = {
      email: 'valdner@gmail.com',
      password: '123',
      firstName: 'Dune',
      lastName: 'Joe'
    }
    describe('Signup',() => {
      it('should throw if email empty',()=>{
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password
          })
          .expectStatus(400)        
      })
      it('should throw if password empty',()=>{
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email
          })
          .expectStatus(400)        
      })
      it('should throw if no body provided',()=>{
        return pactum
          .spec()
          .post('/auth/signup')
          .expectStatus(400)        
      })
      it('should signup',() => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .inspect()
      });
    });
    describe('Signin',()=>{
      it('should throw if email empty',()=>{
        return pactum
          .spec() 
          .post('/auth/signin')
          .withBody({
            email: dto.email
          })
          .expectStatus(500)
      }); 
      it('should throw if password empty',()=>{
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email
          })
          .expectStatus(500)        
      })
      it('should throw if no body provided',()=>{
        return pactum
          .spec()
          .post('/auth/signin')
          .expectStatus(500)        
      })
      it('should signin',() => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt','access_token')
      });
    });
  })

  describe('User',()=>{
    describe('Get User',()=>{
      it('should get current user',()=>{
        return pactum
          .spec()
          .get('/users/test')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
      })
    });
    describe('Edit User',()=>{
      it('should edit user',()=>{
        const dto: EditUserDto = {
          firstName:'Vladimir',
          email:'vl1@hotmail.com'
        }
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.email)
          .expectBodyContains(dto.firstName)
      })

    });
  })

  describe('Bookmarks',()=>{
    describe('Get Empty Bookmark',()=>{
      it('should get bookmarks',()=>{
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })          
          .expectStatus(200)
          .expectBody([])
      })
    });
    describe('Create Bookmark',()=>{
      it('should create bookmark',()=>{
        const dto: CreateBookmarkDto = {
          title:"First Bookmark",
          link:"https://www.eporner.com/video-12UmJs8Tp50/vam-3d-vamtnt-vol-12-urban-beauty-hunting-young-wife-bai-han/"
        }
        return pactum
          .spec()
          .post('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('bookmarkId','id')
      })
    });
    describe('Get Bookmarks',()=>{
      it('should get bookmarks',()=>{
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
          .expectJsonLength(1)
      })
    });
    describe('Get Bookmarks by Id',()=>{
      it('should get bookmark by id',()=>{
        return pactum
          .spec() 
          .get('/bookmarks/{id}')
          .withPathParams('id','$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
          .expectBodyContains('$S{bookmarkId}')

      })
    });
    describe('Edit Bookmark by Id',()=>{
      const dto : EditBookmarkDto = {
        title:'Slut in',
        description: 'Edited Description'
      }
      it('should edit bookmark by id',()=>{
        return pactum
          .spec() 
          .patch('/bookmarks/{id}')
          .withPathParams('id','$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.title)
          .expectBodyContains(dto.description)

      })
    });
    describe('Delete Bookmark by Id',()=>{
      it('should delete bookmark by id',()=>{
        return pactum
          .spec() 
          .delete('/bookmarks/{id}')
          .withPathParams('id','$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
      })
      it('should get empty bookmarks',()=>{
        return pactum
          .spec() 
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
          .expectJsonLength(0)
      })

    });
  })

})