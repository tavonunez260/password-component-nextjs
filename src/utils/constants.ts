import { RenderRuleMessage, ValidateResponse } from '@/types';

export const passwordRules: ValidateResponse[] = [
	{
		id: '1',
		name: 'specialCharacters',
		message: 'Password must contain at least one special character (!@#$%^&*)',
		validateFunction: '[\\W_]+'
	},
	{
		id: '2',
		name: 'digits',
		message: 'Password must contain at least one digit',
		validateFunction: '\\d+'
	},
	{
		id: '3',
		name: 'upperCaseLetters',
		message: 'Password must contain at least one uppercase letter',
		validateFunction: '[A-Z]+'
	},
	{
		id: '4',
		name: 'noConsecutiveLetters',
		message: 'Password must not have consecutive letters',
		validateFunction: '^(?!.*[a-zA-Z]{2,}).*$'
	},
];

export const validatePasswordRules = (rules:ValidateResponse[], value: string): RenderRuleMessage[] => {
	const validationResults: RenderRuleMessage[] = [];

	rules.forEach(rule => {
		const regexPattern = new RegExp(rule.validateFunction); // Convert the pattern string to a regex
		const isValid = value !== '' && regexPattern.test(value);
		validationResults.push({ id: rule.id, message: rule.message, value: isValid });
	});

	return validationResults;
};
