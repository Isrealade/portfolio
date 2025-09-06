/** @type {import('next').NextConfig} */

// Detect GitHub Actions (for repo-based GitHub Pages)
const isGithubActions = process.env.GITHUB_ACTIONS === 'true' || false
const repoName = process.env.GITHUB_PAGES_REPO || 'portfolio'

// Detect if using custom domain
const isCustomDomain = process.env.NEXT_PUBLIC_CUSTOM_DOMAIN === 'true'

// basePath: prefix for routes
// assetPrefix: prefix for static assets
const basePath = isGithubActions && !isCustomDomain ? `/${repoName}` : ''
const assetPrefix = isGithubActions && !isCustomDomain ? `/${repoName}` : ''

const nextConfig = {
  output: 'export',       // static export
  trailingSlash: true,    // required for GitHub Pages
  basePath: basePath,     
  assetPrefix: assetPrefix,
  images: {
    unoptimized: true,    // required for static export
  },
  experimental: {
    optimizeCss: false,   // avoid breaking Tailwind
  },
}

console.log('Next.js Config:', {
  isGithubActions,
  repoName,
  basePath,
  assetPrefix,
  isCustomDomain,
})

module.exports = nextConfig
