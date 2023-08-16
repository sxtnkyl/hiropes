/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts'],
  // This may need refactored once mui support for nextjs13 completed
  // initial issue raised
  // https://github.com/mui/material-ui/issues/35840
  // open MUI issue
  // https://github.com/mui/material-ui/issues/34905
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@emotion/server': {
      transform: '@emotion/server/{{member}}',
    },
  },
};

module.exports = nextConfig;
