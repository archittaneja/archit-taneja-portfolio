'use client';

import { ExperienceCard } from '@/components/sections';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* Home Section - Compact */}
      <section id="home" className="snap-section min-h-screen px-6 lg:px-12 bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Profile and Intro - More Compact */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
            {/* Profile Image - Smaller */}
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/images/archit-headshot.jpg"
                alt="Archit Taneja - Professional Headshot"
                width={200}
                height={200}
                className="w-48 h-48 rounded-full object-cover object-top shadow-xl border-3 border-gray-700"
                priority
                style={{ objectPosition: '50% 20%' }}
              />
            </div>
            
            {/* Introduction Content - Compact */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <h1 className="text-2xl md:text-3xl font-light mb-1 leading-tight text-white">
                Archit Taneja
              </h1>
              <h2 className="text-base md:text-lg font-light mb-3 text-gray-400">
                Engineering Manager & Product Leader
              </h2>
              <p className="text-sm leading-relaxed text-gray-300 mb-4">
                I lead high-performing engineering teams to build scalable solutions that serve millions of users. 
                With a passion for both technical excellence and product strategy, I bridge the gap between 
                engineering and business to deliver impactful results.
              </p>
              
              {/* Social Links - Compact */}
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-blue-400 transition-colors" aria-label="Twitter">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="/resume.pdf" download className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors duration-200">
                  <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Resume
                </a>
              </div>
            </div>
          </div>

          {/* Work Experience - Visible on Home Page */}
          <div id="work" className="border-t border-gray-700 pt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-light text-white">Work</h2>
              <div className="text-xs text-gray-400">Years of Experience → <span className="text-white font-medium">4.5</span></div>
            </div>
            
            <div className="space-y-4">
              {/* Meta Experience */}
              <div className="flex items-center justify-between py-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-white">Meta</h3>
                    <p className="text-xs text-gray-400">Technical PM Lead</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">2021 — Present</div>
                </div>
              </div>

              {/* Amazon Experience */}
              <div className="flex items-center justify-between py-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-white">Amazon</h3>
                    <p className="text-xs text-gray-400">Engineering Manager</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">2019 — 2021</div>
                </div>
              </div>

              {/* Previous Experience */}
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-white">Startup</h3>
                    <p className="text-xs text-gray-400">Product Manager</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">2017 — 2019</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Press Section - Compact */}
      <section id="press" className="snap-section min-h-screen px-6 lg:px-12 bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-light text-white mb-6">Press & Features</h2>
          
          <div className="space-y-4">
            {/* Press Item 1 */}
            <div className="flex items-center justify-between py-3 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-medium text-white">Featured Article Title</h3>
                  <p className="text-xs text-gray-400">Publication Name • Date</p>
                </div>
              </div>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Read article">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* Press Item 2 */}
            <div className="flex items-center justify-between py-3 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-medium text-white">Tech Blog Feature</h3>
                  <p className="text-xs text-gray-400">Tech Publication • Date</p>
                </div>
              </div>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Read article">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* Press Item 3 */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-medium text-white">Industry Report</h3>
                  <p className="text-xs text-gray-400">Research Firm • Date</p>
                </div>
              </div>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Read article">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Compact */}
      <section id="contact" className="snap-section min-h-screen px-6 lg:px-12 bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-light text-white mb-6">Get In Touch</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 py-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-medium text-white">Email</h3>
                <p className="text-sm text-gray-400">archit@example.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3 py-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-base font-medium text-white">LinkedIn</h3>
                <p className="text-sm text-gray-400">linkedin.com/in/archit-taneja</p>
              </div>
            </div>

            <div className="flex items-center gap-3 py-3">
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-base font-medium text-white">GitHub</h3>
                <p className="text-sm text-gray-400">github.com/archit-taneja</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
