import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read from environment or use default
const PORTFOLIO_URL = process.env.VITE_PORTFOLIO_URL || 'https://jenus-ai-portfolio.vercel.app';
const CURRENT_DATE = new Date().toISOString().split('T')[0];

const sections = [
  { loc: '', priority: '1.0', changefreq: 'weekly' },
  { loc: '#about', priority: '0.9', changefreq: 'monthly' },
  { loc: '#skills', priority: '0.8', changefreq: 'monthly' },
  { loc: '#experience', priority: '0.8', changefreq: 'monthly' },
  { loc: '#projects', priority: '0.8', changefreq: 'monthly' },
  { loc: '#contact', priority: '0.7', changefreq: 'monthly' }
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sections.map(({ loc, priority, changefreq }) => `
  <url>
    <loc>${PORTFOLIO_URL}${loc}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
  `).join('')}
</urlset>`;

const publicDir = join(__dirname, '..', 'public');
fs.writeFileSync(join(publicDir, 'sitemap.xml'), sitemap);
console.log(`✅ Sitemap generated for: ${PORTFOLIO_URL}`);