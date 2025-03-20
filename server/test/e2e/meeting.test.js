const mongoose = require('mongoose');

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Meeting API', () => {
  test.only('Test', async () => {
    expect(1).toBe(1);
  });
});
