import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables based on mode (development/production)
  const env = loadEnv(mode, process.cwd(), '');
  
  // Define your URLs (use environment variables or defaults)
  const portfolioUrl = env.VITE_PORTFOLIO_URL || 'http://localhost:5173';
  const currentYear = new Date().getFullYear().toString();
  
  // Your social URLs (hardcode these since they don't change per environment)
  const githubUrl = 'https://github.com/jjenus';
  const linkedinUrl = 'https://linkedin.com/in/alakere-jenus';
  const twitterHandle = '@_jjenus';

  return {
    plugins: [
      react(),
      // HTML transform plugin
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html
            .replace(/__PORTFOLIO_URL__/g, portfolioUrl)
            .replace(/__OG_IMAGE_URL__/g, `${portfolioUrl}/og-image.png`)
            .replace(/__TWITTER_IMAGE_URL__/g, `${portfolioUrl}/twitter-image.png`)
            .replace(/__GITHUB_URL__/g, githubUrl)
            .replace(/__LINKEDIN_URL__/g, linkedinUrl)
            .replace(/__TWITTER_HANDLE__/g, twitterHandle)
            .replace(/__CURRENT_YEAR__/g, currentYear);
        }
      }
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    css: {
      postcss: './postcss.config.js',
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge'],
            animation: ['framer-motion'],
            icons: ['lucide-react']
          }
        }
      }
    }
  };
});