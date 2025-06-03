import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';




// Sample car data
const sampleCar = {
  brand: 'Toyota',
  model: 'Camry',
  price: 25000,
  availability: true
};

describe('POST /cars', () => {
  afterAll(async () => {
    await mongoose.connection.close(); // Prevent test leaks
  });

  it('should create a new car', async () => {
    const res = await request(app)
      .post('/api/cars')
      .send(sampleCar)
      .set('Authorization', 'Bearer ${token}') //when authentication is involved
     // .set('Accept', 'application/json'); //when authentication is not involved

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.brand).toBe(sampleCar.brand);
    expect(res.body.model).toBe(sampleCar.model);
    expect(res.body.price).toBe(sampleCar.price);
  });
});



describe('GET /cars', () => {
  afterAll(async () => {
  await mongoose.connection.close();
   });

   
  it('should return cars filtered by brand', async () => {
    const res = await request(app).get('/api/cars?brand=Toyota');
    expect(res.statusCode).toBe(200);
    expect(res.body.every((car: any) => car.brand === 'Toyota')).toBe(true);
  });

  it('should return only available cars', async () => {
    const res = await request(app).get('/api/cars?availability=true');
    expect(res.statusCode).toBe(200);
    expect(res.body.every((car: any) => car.availability === true)).toBe(true);
  });

  it('should return cars within the price range', async () => {
    const res = await request(app).get('/api/cars?minPrice=10000&maxPrice=30000');
    expect(res.statusCode).toBe(200);
    expect(res.body.every((car: any) => car.price >= 10000 && car.price <= 30000)).toBe(true);
  });
});
