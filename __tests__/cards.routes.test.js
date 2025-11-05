process.env.NODE_ENV = 'test';

const request = require('supertest');
const express = require('express');

/**
 * 1) Мокаємо sequelize-інстанс
 */
jest.mock('../config/sequelize', () => ({
  define: jest.fn(),
  authenticate: jest.fn().mockResolvedValue(), // щоб не падало на .authenticate()
  sync: jest.fn().mockResolvedValue(),
}));

/**
 * 2) Мокаємо МОДЕЛІ:
 *   - ClubCard: потрібен лише findAll для цього тесту
 *   - Purchase: повністю глушимо, щоб не виконалась асоціація belongsTo(...)
 */
jest.mock('../models/ClubCard', () => ({
  findAll: jest.fn().mockResolvedValue([
    { id: 1, type: 'Adult', title: 'Premium 1m', price: 1200, benefits: 'Gym, Sauna' },
    { id: 2, type: 'Kids',  title: 'Kids 3m',    price:  550, benefits: 'Group, Playground' },
  ]),
}));

jest.mock('../models/Purchase', () => ({})); // важливо — глушимо side-effects

// ПІСЛЯ моків імпортуємо роутер
const cardsRoutes = require('../routes/cardsRoutes');

describe('GET /api/cards', () => {
  let app;
  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api', cardsRoutes); // підключаємо тільки те, що тестуємо
  });

  it('повертає 200 та масив карток', async () => {
    const res = await request(app).get('/api/cards').expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        type: 'Adult',
        title: 'Premium 1m',
        price: expect.any(Number),
      })
    );
  });
});