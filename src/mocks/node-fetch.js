// __mocks__/node-fetch.js
const fetchMock = require('node-fetch');

const mockFetch = jest.fn();

fetchMock.mockImplementation(mockFetch);

module.exports = mockFetch;
