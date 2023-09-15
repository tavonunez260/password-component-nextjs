import { describe, expect, test } from '@jest/globals';

import { passwordRules, validatePasswordRules } from '@/utils';
describe('validatePasswordRules', () => {
	test('should pass when input satisfies all rules', () => {
		const input = 'A@1';

		const results = validatePasswordRules(passwordRules, input);

		results.forEach(result => {
			expect(result.value).toBe(true);
		});
	});

	test('should fail when input violates at least one rule', () => {
		const input = 'abc';

		const results = validatePasswordRules(passwordRules, input);

		expect(results.some(result => !result.value)).toBe(true);
	});
});
