'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Set initial theme state (CSS already handles the styling)
    setTheme('dark');
    document.documentElement.classList.add('dark');
    console.log('Initialized dark mode');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Force update all elements
    const html = document.documentElement;
    const body = document.body;
    const main = document.querySelector('main');
    const sections = document.querySelectorAll('section');
    const nav = document.querySelector('nav');
    
    if (newTheme === 'dark') {
      html.classList.add('dark');
      body.style.setProperty('background-color', '#111827', 'important');
      body.style.setProperty('color', '#f9fafb', 'important');
      
      // Force all sections to dark
      sections.forEach(section => {
        (section as HTMLElement).style.setProperty('background-color', '#111827', 'important');
        (section as HTMLElement).style.setProperty('color', '#f9fafb', 'important');
      });
      
      if (main) {
        (main as HTMLElement).style.setProperty('background-color', '#111827', 'important');
      }
      
      if (nav) {
        (nav as HTMLElement).style.setProperty('background-color', '#111827', 'important');
      }
    } else {
      html.classList.remove('dark');
      body.style.setProperty('background-color', '#ffffff', 'important');
      body.style.setProperty('color', '#1f2937', 'important');
      
      // Force all sections to light
      sections.forEach(section => {
        (section as HTMLElement).style.setProperty('background-color', '#ffffff', 'important');
        (section as HTMLElement).style.setProperty('color', '#1f2937', 'important');
      });
      
      if (main) {
        (main as HTMLElement).style.setProperty('background-color', '#ffffff', 'important');
      }
      
      if (nav) {
        (nav as HTMLElement).style.setProperty('background-color', '#ffffff', 'important');
      }
    }
    
    localStorage.setItem('theme', newTheme);
    console.log(`Switched to ${newTheme} mode`);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg hover:shadow-xl focus:outline-none transition-all duration-200"
      style={{
        backgroundColor: theme === 'dark' ? '#374151' : '#f3f4f6',
      }}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        // Sun icon - currently in dark mode, click to go light
        <svg
          className="w-5 h-5"
          style={{ color: '#fbbf24' }}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        // Moon icon - currently in light mode, click to go dark
        <svg
          className="w-5 h-5"
          style={{ color: '#4b5563' }}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}