import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';

describe('OrderController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    initializeTransactionalContext();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    //clear and seed
  });

  it('should create a new order successfully', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'admin',
        password: 'admin',
      });
    const accessToken: string = response.body.accessToken;

    return await request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        customer: '8d9a507a-c093-45a2-8613-2a2f980389fb',
        addressCountry: 'Romania',
        addressCity: 'Cluj-Napoca',
        addressCounty: 'Cluj',
        addressStreet: 'Brassai',
        orderProducts: [
          {
            product: 'e068a51d-7dd2-4c80-8d99-d34519fbc9d7',
            shippedFrom: '9e8fdec8-ab0a-4355-bcb5-47b8f19cd5b7',
            quantity: 1,
          },
        ],
      })
      .expect(201);
  });

  it('should fail to create an order due to missing stock', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'admin',
        password: 'admin',
      });
    const accessToken: string = response.body.accessToken;

    return await request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        customer: '8d9a507a-c093-45a2-8613-2a2f980389fb',
        addressCountry: 'Romania',
        addressCity: 'Cluj-Napoca',
        addressCounty: 'Cluj',
        addressStreet: 'Brassai',
        orderProducts: [
          {
            product: 'e068a51d-7dd2-4c80-8d99-d34519fbc9d7',
            shippedFrom: '9e8fdec8-ab0a-4355-bcb5-47b8f19cd5b7',
            quantity: 100,
          },
        ],
      })
      .expect(400);
  });
});
