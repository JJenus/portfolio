// src/components/seo/MetaTags.tsx
import { Helmet } from 'react-helmet-async';
import { 
  PORTFOLIO_URL, 
  OG_IMAGE_URL, 
  TWITTER_IMAGE_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  TWITTER_URL
} from '@/lib/config';

interface MetaTagsProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  robots?: string;
  noIndex?: boolean;
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title = 'Alakere Jenus | Backend Engineer & Architect Portfolio',
  description = 'Results-driven Backend Engineer with 4+ years experience building scalable, high-availability systems. Specialized in Java/Spring Boot and Node.js microservices with AI voice interaction.',
  canonicalUrl = PORTFOLIO_URL,
  ogImage = OG_IMAGE_URL,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  robots,
  noIndex = false,
}) => {
  const fullTitle = title.includes('Alakere Jenus') ? title : `${title} | Alakere Jenus Portfolio`;
  const finalRobots = robots || (noIndex ? 'noindex, nofollow' : 'index, follow');
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={finalRobots} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Alakere Jenus Portfolio Preview" />
      <meta property="og:site_name" content="Alakere Jenus Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={TWITTER_IMAGE_URL} />
      <meta name="twitter:site" content="@_jjenus" />
      <meta name="twitter:creator" content="@_jjenus" />
      
      {/* Additional Meta */}
      <meta name="author" content="Alakere Jenus" />
      <meta name="keywords" content="backend engineer, java, spring boot, node.js, microservices, software architect, AI portfolio, voice assistant" />
      
      {/* Structured Data for Current Page */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": fullTitle,
          "description": description,
          "url": canonicalUrl,
          "mainEntity": {
            "@type": "Person",
            "name": "Alakere Jenus",
            "jobTitle": "Backend Engineer & Architect",
            "url": canonicalUrl,
            "sameAs": [GITHUB_URL, LINKEDIN_URL],
            "knowsAbout": ["Java", "Spring Boot", "Node.js", "Microservices", "PostgreSQL", "AWS"],
            "description": description
          },
          "datePublished": "2024-01-01",
          "dateModified": new Date().toISOString().split('T')[0]
        })}
      </script>
    </Helmet>
  );
};

export default MetaTags;