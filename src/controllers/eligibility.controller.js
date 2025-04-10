import { execute } from '../services/eligibility.service.js';
import { EligibilityInputSchema } from '../dtos/eligibility.input.dto.js';
import { EligibilityOutputSchema } from '../dtos/eligibility.output.dto.js';

export function handleEligibility(req, res) {
  try {
    const parseResult = EligibilityInputSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: 'Invalid input',
        details: parseResult.error.errors,
      });
    }

    const result = execute(parseResult.data);

    const outputValidation = EligibilityOutputSchema.safeParse(result);
    if (!outputValidation.success) {
      console.error('Invalid service response format:', outputValidation.error.format());
      return res.status(500).json({ error: 'Internal server error - invalid response format' });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Eligibility check failed:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
