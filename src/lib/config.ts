// src/lib/config.ts

// Base configuration from environment variables
const env = {
  portfolioUrl: import.meta.env.VITE_PORTFOLIO_URL || 
                import.meta.env.VITE_DEV_PORTFOLIO_URL || 
                'http://localhost:5173',
  openRouterApiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  environment: import.meta.env.VITE_ENV || 'development'
};

// Derived URLs
export const PORTFOLIO_URL = env.portfolioUrl;
export const OPENROUTER_API_KEY = env.openRouterApiKey;
export const IS_PRODUCTION = env.environment === 'production';

// Image URLs
export const OG_IMAGE_URL = `${PORTFOLIO_URL}/og-image.png`;
export const TWITTER_IMAGE_URL = `${PORTFOLIO_URL}/twitter-image.png`;
export const AVATAR_URL = `${PORTFOLIO_URL}/avatar.jpg`;

// Social URLs (replace with your actual profiles)
export const GITHUB_URL = 'https://github.com/jjenus';
export const LINKEDIN_URL = 'https://linkedin.com/in/alakere-jenus';
export const TWITTER_URL = 'https://twitter.com/_jjenus';
export const TWITTER_HANDLE = "@_jjenus"

export default env;