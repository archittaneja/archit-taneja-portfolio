import { PersonalInfo } from '@/lib/types';

export const personalInfo: PersonalInfo = {
  name: "Your Name",
  role: "Software Engineer",
  tagline: "Building exceptional digital experiences",
  bio: "Passionate software engineer with expertise in modern web technologies. I create scalable solutions that drive business growth and enhance user experiences.",
  email: "contact@yourdomain.com",
  location: "Your Location",
  socialLinks: [
    {
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/archittaneja/',
      label: 'LinkedIn Profile'
    },
    {
      platform: 'github',
      url: 'https://github.com/archittaneja',
      label: 'GitHub Profile'
    },
    {
      platform: 'website',
      url: 'https://yourdomain.com',
      label: 'Personal Website'
    }
  ],
  headshot: {
    src: '/images/headshot.jpg',
    alt: 'Professional headshot',
    width: 400,
    height: 400,
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
  }
};