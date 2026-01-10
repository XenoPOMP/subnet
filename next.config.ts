import type { NextConfig } from 'next';

import config from '@/utils/next';

/** This will be set only when building app for distribution. */
const IS_TAURI = process.env.IS_TAURI === '1';

const baseConfig: NextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Support docker standalone build
  output: !IS_TAURI ? 'standalone' : 'export',
};

export default config(baseConfig, {
  mdx: true,
  serwist: false,
});
