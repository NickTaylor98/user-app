import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const DEFAULT_USER = {
  LOGIN: 'example@example.com',
  PASSWORD: 'Test1234!',
};

const NEW_USER = {
  LOGIN: `${Date.now()}@test.com`,
  PASSWORD: 'Test1234!',
};

const authenticate = (app: INestApplication, email: string, password: string) => {
  return request(app.getHttpServer()).post('/auth/signin').send({ email, password });
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it(`doesn't authenticate with invalid creds`, async () => {
    await authenticate(app, 'invalid', 'invalid').expect(HttpStatus.BAD_REQUEST);
    await authenticate(app, DEFAULT_USER.LOGIN, 'ErrorPassword1!').expect(HttpStatus.UNAUTHORIZED);
  });

  it('authenticate with valid creds', () => {
    return authenticate(app, DEFAULT_USER.LOGIN, DEFAULT_USER.PASSWORD).expect(HttpStatus.OK);
  });

  it('should create new user', async () => {
    const response = await authenticate(app, DEFAULT_USER.LOGIN, DEFAULT_USER.PASSWORD);
    return request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${response.body.access_token}`)
      .send({
        name: 'Test user',
        email: NEW_USER.LOGIN,
        age: 25,
        password: NEW_USER.PASSWORD,
      })
      .expect(HttpStatus.CREATED);
  });

  it('should not create user (duplicated email)', async () => {
    const response = await authenticate(app, NEW_USER.LOGIN, NEW_USER.PASSWORD);

    return request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${response.body.access_token}`)
      .send({
        name: 'Test user',
        email: DEFAULT_USER.LOGIN,
        age: 25,
        password: 'Test1234!',
      })
      .expect(HttpStatus.CONFLICT);
  });

  it('should not create user (invalid params)', async () => {
    const response = await authenticate(app, NEW_USER.LOGIN, NEW_USER.PASSWORD);

    return request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${response.body.access_token}`)
      .send({
        name: '',
        email: 'test@test',
        age: -2,
        password: 'test-password',
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  afterAll(() => app.close());
});
