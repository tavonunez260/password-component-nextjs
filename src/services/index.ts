import fetch from 'node-fetch';

export const fetchPassword = async () =>  {
	const response = await fetch('/api/password');
	return response.json();
};
