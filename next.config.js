/** @type {import('next').NextConfig} */

// Determine if we're building for GitHub Pages
const isGithubActions = process.env.GITHUB_ACTIONS || false
const repoName = process.env.GITHUB_PAGES_REPO || 'portfolio'

// For GitHub Pages, we need to set the correct base path
// For local development or other deployments, we use root path
const basePath = isGithubActions ? `/${repoName}` : ''
const assetPrefix = isGithubActions ? `/${repoName}` : ''

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: assetPrefix,
  basePath: basePath,
  // Ensure static optimization works properly
  experimental: {
    optimizeCss: false,
  }
}

console.log('Next.js Config:', {
  isGithubActions,
  repoName,
  basePath,
  assetPrefix
})

module.exports = nextConfig