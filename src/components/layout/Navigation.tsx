'use client';

import { useState, useEffect } from 'react';
import { NavigationProps } from '@/lib/types';

const navigationItems = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'press', label: 'Press' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation({}: NavigationProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWorkExpanded, setIsWorkExpanded] = useState(false);



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
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sectionsToObserve = ['home', 'work', 'press', 'contact'];
    sectionsToObserve.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

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
      {/* Fixed Name Header */}
      <div className="fixed top-6 left-6 z-50 hidden md:block">
        <h1 className="text-lg font-medium tracking-wide text-white">
          ARCHIT TANEJA
        </h1>
      </div>

      {/* Desktop Sidebar Navigation */}
      <nav
        className="fixed left-0 top-0 h-full w-48 z-40 hidden md:flex flex-col justify-center bg-gray-900"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex flex-col space-y-4 px-8">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <div key={item.id} className="flex flex-col">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => scrollToSection(item.id)}
                    onKeyDown={(e) => handleKeyDown(e, item.id)}
                    className={`text-left py-3 px-4 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 flex-1 ${isActive
                      ? 'font-medium'
                      : 'hover:opacity-80'
                      }`}
                    aria-label={`Go to ${item.label} section`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span className="text-lg font-light text-white">{item.label}</span>
                  </button>


                </div>


              </div>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 backdrop-blur-sm z-40">
        <div className="flex justify-between items-center px-4 py-4">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="text-lg font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 rounded-md px-2 py-1"
          >
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
        <div className={`transition-all duration-200 ease-in-out ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
          <div className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`flex-1 text-left px-4 py-3 rounded-md font-light focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 ${isActive
                        ? 'font-medium'
                        : 'hover:opacity-80'
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
