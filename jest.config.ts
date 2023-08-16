import type {Config} from '@jest/types'

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },

  // Test File Settings
  modulePathIgnorePatterns: ['dist'],
  testMatch: ['**/*.(unit|spec).(j|t)s'],

  // Code Coverage Settings
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',

    // Ignore Coverage For these Files
    '!src/main.ts',
    '!src/**/index.ts',
    '!src/schemas/*.ts',
    '!src/routes/*.ts',
    '!src/constants.ts',
  ],
  coverageReporters: ['html', 'json', 'text'],
  reporters: ['default'],
  silent: true,
}
export default config
