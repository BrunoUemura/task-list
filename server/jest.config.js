/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  bail: false,
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ['src/**'],
  coverageDirectory: 'test/coverage',
  coveragePathIgnorePatterns: ['src/config/*', 'test/coverage/*'],
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts?(x)'],
};
