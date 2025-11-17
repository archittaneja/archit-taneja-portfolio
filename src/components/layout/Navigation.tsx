'use client';

import { useState, useEffect } from 'react';
import { NavigationProps } from '@/lib/types';

const navigationItems = [
  { 
    id: 'home', 
    label: 'Home',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  { 
    id: 'work', 
    label: 'What I do',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    id: 'achievements', 
    label: 'Other Achievements',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    )
  },
  { 
    id: 'outside-work', 
    label: 'Outside of Work',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  { 
    id: 'contact', 
    label: 'Contact',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
];

export default function Navigation({}: NavigationProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



  // Scroll into view relies on CSS scroll-snap for the per-section snap experience.
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    // Immediately update active section for visual feedback
    setActiveSection(sectionId);

    requestAnimationFrame(() => {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });

    setIsMobileMenuOpen(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, sectionId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToSection(sectionId);
    }
  };

  // Intersection Observer to track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -70% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the entry with the highest intersection ratio
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        const mostVisible = visibleEntries.reduce((prev, current) => 
          current.intersectionRatio > prev.intersectionRatio ? current : prev
        );
        if (mostVisible.target.id) {
          setActiveSection(mostVisible.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const sectionsToObserve = ['home', 'work', 'achievements', 'outside-work', 'contact'];
      sectionsToObserve.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.observe(element);
        }
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  // Handle mobile menu toggle
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Fixed Name Header with Logo */}
      <div className="fixed top-6 left-6 z-50 hidden md:block">
        <div className="flex items-center gap-4">
          <img 
            src="/favicon.svg" 
            alt="AT Logo" 
            className="w-12 h-12"
          />
          <h1 className="text-lg font-medium tracking-wide text-white">
            ARCHIT TANEJA
          </h1>
        </div>
      </div>

      {/* Desktop Sidebar Navigation - Icon Based */}
      <nav
        className="fixed left-0 top-0 h-full w-20 z-40 hidden md:flex flex-col justify-center bg-[#1a1a1a]"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex flex-col space-y-6 px-4">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
                className={`group relative flex items-center justify-center py-3 px-3 rounded-lg transition-all duration-300 focus:outline-none border-0 ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                aria-label={`Go to ${item.label} section`}
                aria-current={isActive ? 'true' : undefined}
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
                
                {/* Tooltip Bubble */}
                <div className="absolute left-full ml-4 px-3 py-2 bg-gray-800 text-white text-sm font-light rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform -translate-x-2 group-hover:translate-x-0 pointer-events-none shadow-lg">
                  {item.label}
                  {/* Arrow */}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-800"></div>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 bg-[#1a1a1a]/95 backdrop-blur-sm z-40">
        <div className="flex justify-between items-center px-4 py-4">
          {/* Logo with Name */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 text-lg font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 rounded-md px-2 py-1"
          >
            <img 
              src="/favicon.svg" 
              alt="AT Logo" 
              className="w-8 h-8"
            />
            ARCHIT TANEJA
          </button>

          {/* Mobile menu button */}
          <button
            onClick={handleMobileMenuToggle}
            className="p-2 rounded-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="w-5 h-5 relative">
              <span className={`absolute block h-0.5 w-5 bg-current transform transition-all duration-200 ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                }`} />
              <span className={`absolute block h-0.5 w-5 bg-current transition-all duration-200 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} />
              <span className={`absolute block h-0.5 w-5 bg-current transform transition-all duration-200 ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                }`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`transition-all duration-200 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
          <div className="px-4 py-2 space-y-0.5 pb-4">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`flex-1 text-left px-3 py-2.5 rounded-md text-sm font-light focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 ${isActive
                        ? 'font-medium border-2 border-white'
                        : 'hover:opacity-80 border-2 border-transparent'
                        }`}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      {item.label}
                    </button>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
