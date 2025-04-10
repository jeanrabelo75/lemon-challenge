import express from 'express';
import eligibilityRoutes from './routes/eligibility.routes.js';
import healthRoutes from './routes/health.routes.js';

const app = express();

app.use(express.json());

app.use(healthRoutes);
app.use(eligibilityRoutes);

export default app;
