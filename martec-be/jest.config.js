module.exports = {
  preset: 'ts-jest',
  roots: ['./test'],
  testEnvironment: 'node',
  setupFiles: ['./test/setupFile.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/?(*.)+(spec|test).ts'],
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};