import request from 'supertest';
import app from '../../app.js';

describe('GET /health', () => {
  it('should return 200 and status ok', async () => {
    const response = await request(app).get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body.uptime).toBeGreaterThanOrEqual(0);
    expect(new Date(response.body.timestamp)).toBeInstanceOf(Date);
  });
});
