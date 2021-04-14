const request = require('supertest');
const server = require('../server');

beforeAll(async () => {
  console.log('Jest started!');
});

describe('Create tool', () => {
  test('it should be able to create a new tool', async () => {
    const response = await request(server).post('/tool').send({
      title: 'Test',
      link: 'Test',
      description: 'Test',
    });

    await request(server).delete(`/tool/${response.body._id}`);

    expect(response.body).toHaveProperty('_id');
  });
});

describe('List tool', () => {
  test('it should be able to list a specific tool', async () => {
    const { body: tool } = await request(server).post('/tool').send({
      title: 'Test',
      link: 'Test',
      description: 'Test',
    });

    const response = await request(server).get(`/tool/${tool._id}`);

    await request(server).delete(`/tool/${tool._id}`);

    expect(response.body).toHaveProperty('_id');
  });
});

describe('List all tools', () => {
  test('it should be able to list all tools', async () => {
    const response = await request(server).get(`/tools`);

    expect(Array.isArray([response.body])).toBe(true);
  });
});

describe('Remove tool', () => {
  test('it should be able to remove a specific tool', async () => {
    const { body: tool } = await request(server).post('/tool').send({
      title: 'Test',
      link: 'Test',
      description: 'Test',
    });

    const response = await request(server).delete(`/tool/${tool._id}`);

    expect(typeof response.body).toBe('object');
  });
});
