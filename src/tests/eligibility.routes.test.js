import request from 'supertest';
import app from '../app.js';

describe('POST /eligibility', () => {
  it('should return 200 with eligible true', async () => {
    const response = await request(app)
      .post('/eligibility')
      .send({
        documentNumber: '21554495008',
        connectionType: 'biphase',
        consumptionClass: 'commercial',
        tariffModality: 'conventional',
        consumptionHistory: [4000, 5000, 6000],
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.eligible).toBe(true);
    expect(response.body.annualCO2Savings).toBeDefined();
  });

  it('should return 400 if input is invalid', async () => {
    const response = await request(app).post('/eligibility').send({
      connectionType: 'monophase',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Invalid input');
    expect(response.body.details).toBeDefined();
  });
});
