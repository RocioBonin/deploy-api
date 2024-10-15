import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Get /users/ Retorna un array con un status code 200', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFhMGRkOTQ3LWE4NDQtNDFlMy04YTNjLWMzMDhkNzYxNjdiNiIsImVtYWlsIjoiYW5jb0BleGFtcGxlLmNvbSIsImFkbWluaXN0cmF0b3IiOmZhbHNlLCJpYXQiOjE3Mjg1Mjg4MzEsImV4cCI6MTcyODUzMjQzMX0.6-Cxl4tr9i4698sqd_fjGJqZrUavsnVyJ6OR0N9U1EQ';
    const req = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });

  it('Get /users/:id Retorna un usuario con id pedido', async () => {
    const req = await request(app.getHttpServer())
      .get('/users/5e0d5883-5cc8-44ca-a92d-6e4f0829c84e')

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  })

  it('Get /orders/:id Retorna una orden con id pedido', async () => {
    const req = await request(app.getHttpServer())
      .get('/orders/9cd18763-fd26-4ca2-939e-991e4d1eb001')

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });

  it('Get /products/ Retorna un array con un status code 200', async () => {
    const req = await request(app.getHttpServer())
      .get('/products')

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });

  it('Get /categories/ Retorna un array con un status code 200', async () => {
    const req = await request(app.getHttpServer())
      .get('/categories')

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });
});
