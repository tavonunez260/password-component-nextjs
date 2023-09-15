import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import Home from '@/app/page';
import { fetchPassword } from '@/services';
import { passwordRules } from '@/utils';
import '@testing-library/jest-dom';

jest.mock('../services', () => ({
	fetchPassword: jest.fn()
}));

describe('Home component', () => {
	test('should pass when all the messages are being rendered', async () => {
		(fetchPassword as jest.Mock).mockResolvedValueOnce(passwordRules);
		await act(async () => render(<Home />));

		await waitFor(() => {
			passwordRules.forEach((passwordRule) => {
				const text = screen.getByText(passwordRule.message);
				expect(text).toBeInTheDocument();
			});
		});
	});

	test('should render all X if input violates all rules', async () => {
		(fetchPassword as jest.Mock).mockResolvedValueOnce(passwordRules);
		await act(async () => render(<Home />));

		await waitFor(() => {
			const validPassword = 'abc';
			const passwordInput = screen.getByLabelText('Password');
			fireEvent.change(passwordInput, { target: { value: validPassword } });
			passwordRules.forEach((passwordRule) => {
				const validDiv = screen.getByTestId(`failure_${passwordRule.id}`);
				expect(validDiv).toBeInTheDocument();
			});
		});
	});

	test('should render all ✓ if input input complies with all rules', async () => {
		(fetchPassword as jest.Mock).mockResolvedValueOnce(passwordRules);
		await act(async () => render(<Home />));

		await waitFor(() => {
			const validPassword = 'A@1';
			const passwordInput = screen.getByLabelText('Password');
			fireEvent.change(passwordInput, { target: { value: validPassword } });
			passwordRules.forEach((passwordRule) => {
				const validDiv = screen.getByTestId(`success_${passwordRule.id}`);
				expect(validDiv).toBeInTheDocument();
			});
		});
	});
});
