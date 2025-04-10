import { execute } from '../services/eligibility.service.js';
import { EligibilityInputDTO } from '../dtos/eligibility.input.dto.js';

export function handleEligibility(req, res) {
  try {
    const parseResult = EligibilityInputDTO.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: 'Invalid input',
        details: parseResult.error.errors,
      });
    }

    const result = execute(parseResult.data);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Eligibility check failed:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
