require('dotenv').config();

const fakeRequest = require('supertest');
const app = require('../server.js');

describe('app routes', () => {
  beforeAll(() => {
    // TODO: a
  });

  beforeEach(() => {
    // TODO: ADD DROP SETUP DB SCRIPT
  });

  afterAll(() => {
    // TODO: ADD CLOSE DB SCRIPT
  });

  test('returns minerals', async() => {

    const expectation = [
      {
        'name': 'Amethyst',
        'vibrates_to': 3,
        'rarity': false,
        'associated_signs': 'Pisces',
        'chakra': 'Crown',
        'id': 1
      },
      {
        'name': 'Opal',
        'vibrates_to': 8,
        'rarity': true,
        'associated_signs': 'Libra',
        'chakra': 'Crown',
        'id': 2
      }
    ];

    const data = await fakeRequest(app)
      .get('/minerals')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });
});
