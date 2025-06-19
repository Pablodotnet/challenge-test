/* eslint-disable */
export default {
  displayName: 'challenge-test',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverageFrom: ['./src/app/**/*.{ts,tsx}'],
  coverageDirectory: '../../coverage/apps/challenge-test',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
