import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignoreExportsUsedInFile: {
    interface: true,
    type: true,
  },
  tags: ['-lintignore'],
  ignoreFiles: [
    '__tests__/**',
    '.config/**',
    '**/*.scss',
    '**/*.css',
    'app/sw.ts',
  ],
  ignoreDependencies: [
    /.*eslint.*/,
    'hygen',
    'nyc-dark',
    'serwist',
    'str.scss',
    /.*stylelint.*/,
    /.*storybook.*/,
    /.*vitest.*/,
    'deepmerge',
    'ansi-colors',
    'csstype',
  ],
  ignoreUnresolved: [/.*setup\.vitest\.ts/],
};

export default config;
