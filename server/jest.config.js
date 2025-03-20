module.exports = {
  testEnvironment: 'node',
  setupFiles: ['./jest.setup.js'], // Load environment variables before tests
  testMatch: ['**/*.test.js'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  preset: undefined, // Remove TypeScript preset
  transform: {},
};
