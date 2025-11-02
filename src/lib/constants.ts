// Site configuration constants
export const SITE_CONFIG = {
  name: 'Portfolio',
  description: 'Professional portfolio showcasing work experience, projects, and achievements',
  url: 'https://yourdomain.com',
  ogImage: '/images/og-image.jpg',
  author: 'Your Name',
  keywords: ['portfolio', 'software engineer', 'web developer', 'react', 'next.js'],
} as const;

// Navigation links
export const NAVIGATION_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
] as const;

// Social media platforms
export const SOCIAL_PLATFORMS = {
  linkedin: 'LinkedIn',
  github: 'GitHub',
  twitter: 'Twitter',
  website: 'Website',
} as const;

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

// Performance targets
export const PERFORMANCE_TARGETS = {
  lighthouseScore: 90,
  loadTime: 2000, // 2 seconds
  imageOptimization: true,
} as const;