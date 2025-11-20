'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const CitationMap = dynamic(() => import('@/components/CitationMap'), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-gray-900 rounded-lg animate-pulse" />
});

export default function Home() {
  const [expandedWork, setExpandedWork] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/movyrjgl', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setShowSuccess(true);
        form.reset();
        // Auto-hide after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
        // Scroll to top to see success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const workRefs = {
    'amazon-sem': useRef<HTMLDivElement>(null),
    'amazon-pm': useRef<HTMLDivElement>(null),
    'amazon-sde1': useRef<HTMLDivElement>(null),
    'amazon-sde2': useRef<HTMLDivElement>(null),
  };

  const toggleWork = (company: string) => {
    const isExpanding = expandedWork !== company;
    setExpandedWork(isExpanding ? company : null);
    
    // Only scroll on larger screens (> 992px) to avoid abrupt movement on mobile/tablet
    if (isExpanding && workRefs[company as keyof typeof workRefs]?.current && window.innerWidth > 992) {
      setTimeout(() => {
        workRefs[company as keyof typeof workRefs].current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      }, 350);
    }
  };

  return (
    <>
      {/* Success Message Banner */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4"
          >
            <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">Message sent successfully!</p>
                  <p className="text-sm text-green-100">I'll get back to you soon.</p>
                </div>
              </div>
              <button
                onClick={() => setShowSuccess(false)}
                className="text-white hover:text-green-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Home Section - Centered Intro */}
      <section id="home" className="snap-section min-h-screen px-6 lg:px-12 bg-[#1a1a1a] flex items-center justify-center">
        <div className="max-w-5xl mx-auto text-center">
          {/* Profile Image - Centered */}
          <div className="flex justify-center mb-8">
            <Image
              src="/images/archit-headshot.jpg"
              alt="Archit Taneja - Professional Headshot"
              width={280}
              height={280}
              className="w-64 h-64 md:w-72 md:h-72 rounded-full object-cover shadow-2xl border-4 border-gray-700"
              priority
              style={{ objectPosition: '10% 0%' }}
            />
          </div>
          
          {/* Introduction Content - Crisp & Clean */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-white">
              Hi, I'm Archit Taneja
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Engineering Manager @ Amazon focused on growth, user retention, and identity — leading teams of Software Engineers and Product Managers, with prior experience as an SDE and PM-Tech.
            </p>
            
            {/* Social Links - Centered with Enhanced Hover */}
            <div className="flex items-center gap-6 justify-center pt-4">
              <motion.a 
                href="https://www.linkedin.com/in/archittaneja/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 text-gray-400 hover:text-blue-400 transition-all duration-300" 
                aria-label="LinkedIn"
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </motion.a>
              <motion.a 
                href="https://github.com/archittaneja" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 text-gray-400 hover:text-white transition-all duration-300" 
                aria-label="GitHub"
                whileHover={{ scale: 1.1, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </motion.a>
              <motion.a 
                href="/Archit_Portfolio_Resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                View Resume
              </motion.a>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 cursor-pointer"
          onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className="text-xs font-light">Check out my work</span>
          <motion.svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.div>
      </section>

      {/* Work Experience Section - Continuous Timeline */}
      <section id="work" className="snap-section px-4 sm:px-6 lg:px-12 bg-[#1a1a1a] pt-20 md:pt-16 pb-24 sm:pb-32 min-h-[80vh] sm:min-h-screen">
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white">What I do</h2>
                <div className="text-sm text-gray-400">Years of Experience → <span className="text-white font-medium">11</span></div>
              </div>
              
              {/* Detailed Introduction */}
              <div className="space-y-3 text-sm sm:text-base text-gray-300 leading-relaxed">
                <p>
                  I build growth-focused, scalable systems at the intersection of product, engineering, and AI. Over the past decade at Amazon, I've launched 0→1 platforms, scaled multi-tenant systems used by thousands of users globally, and consistently driven measurable improvements in customer experience, user adoption, and operational efficiency.
                </p>
                <p>
                  I bring a uniquely blended background across SDE, PM-Tech, and Engineering Management. I've led high-performing teams of PM-Ts, SDEs, and Front-End Engineers to deliver AI-powered automation, self-service workflows, and identity/authorization systems that streamline product development and accelerate growth.
                </p>
              </div>
            </div>
            
            <div className="relative pl-8 sm:pl-10 mt-6 pt-4 border-t border-gray-800">
              {/* Vertical Timeline Line */}
              <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-px bg-gray-700"></div>

              {/* Amazon Senior Engineering Manager */}
              <motion.div 
                ref={workRefs['amazon-sem']}
                className="relative pb-4 cursor-pointer group hover:bg-gray-900/10 pr-4 py-1 rounded-lg transition-all duration-200 pl-8"
                onClick={() => toggleWork('amazon-sem')}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0 }}
              >
                {/* Milestone Marker on Timeline */}
                <div className="absolute left-4 top-10 w-3 h-3 bg-white border-2 border-gray-900 rounded-full transform -translate-x-1/2 z-20"></div>
                
                <div className="absolute -left-12 sm:-left-16 top-6 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-lg flex items-center justify-center flex-shrink-0 p-1.5 sm:p-2 z-10 shadow-lg">
                  <Image
                    src="/images/logos/pb3.png"
                    alt="Amazon Private Brands"
                    width={56}
                    height={56}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="ml-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-2">September 2024 — Present</p>
                      <h3 className="text-lg font-medium text-white mb-1 group-hover:text-blue-400 transition-colors">Senior Engineering Manager</h3>
                      <p className="text-sm italic text-gray-400 mb-3">Amazon Private Brands</p>
                    </div>
                    <svg 
                      className={`w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-all duration-300 flex-shrink-0 ${expandedWork === 'amazon-sem' ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      expandedWork === 'amazon-sem' ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="space-y-1.5 text-[15px] text-gray-300 leading-relaxed">
                      <p>
                        I led a 30x year-over-year adoption surge for PBCentral (<a href="https://pbcentral.amazon.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">pbcentral.amazon.com</a>) by transforming it into a growth engine for Amazon Private Brands. We reduced supplier onboarding time from 45 days to 5 by redesigning the platform around an AI-first architecture, accelerating time-to-value and conversion. Through rigorous A/B testing, funnel diagnostics, and cohort analysis, we identified and eliminated key drop-off points, increasing supplier activation and engagement across more than 3,000 global partners.
                      </p>
                      <p>
                        To drive user retention and streamline access, I led end-to-end re-architecture of onboarding, identity, and access control. We automated invitations, verification, and authentication flows, integrating RBAC, ABAC, SSO, and Passkey standards. This reduced friction across the supplier lifecycle, boosted active user retention, and improved security posture.
                      </p>
                      <p>
                        I also owned the LLM automation charter, launching multi-agent MCP-based workflows that cut claims evaluation cycle time from 30 days to 5. These agents optimized response relevance and throughput, accelerating speed-to-market and reducing manual intervention.
                      </p>
                      <p>
                        To support this growth and technical complexity, I scaled the org to over 15 engineers and PMTs, driving hiring bar-raising, delivery predictability, and coaching top talent into senior roles.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Amazon Manager, Product Mgmt */}
              <motion.div 
                ref={workRefs['amazon-pm']}
                className="relative pb-4 cursor-pointer group hover:bg-gray-900/10 pr-4 py-1 rounded-lg transition-all duration-200 pl-8"
                onClick={() => toggleWork('amazon-pm')}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                {/* Milestone Marker on Timeline */}
                <div className="absolute left-4 top-10 w-3 h-3 bg-white border-2 border-gray-900 rounded-full transform -translate-x-1/2 z-20"></div>
                
                <div className="absolute -left-12 sm:-left-16 top-6 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-lg flex items-center justify-center flex-shrink-0 p-1.5 sm:p-2 z-10 shadow-lg">
                  <Image
                    src="/images/logos/pb2.png"
                    alt="Amazon Private Brands"
                    width={56}
                    height={56}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="ml-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-2">January 2021 — September 2024</p>
                      <h3 className="text-lg font-medium text-white mb-1 group-hover:text-blue-400 transition-colors">Sr. Product Manager - Tech / Product Lead</h3>
                      <p className="text-sm italic text-gray-400 mb-3">Amazon Private Brands</p>
                    </div>
                    <svg 
                      className={`w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-all duration-300 flex-shrink-0 ${expandedWork === 'amazon-pm' ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      expandedWork === 'amazon-pm' ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="space-y-1.5 text-[15px] text-gray-300 leading-relaxed">
                      <p>
                        I led the 0→1 build and launch of the Private Brands PLM workflow platform — scaling it to over 100,000 annual tasks, 1,000+ monthly users, and tracking $1B+ in product development across 100+ brands. We built the platform from the ground up as a configurable orchestration engine, partnering closely with Process Engineers, UX, and SDEs to simplify complex product workflows and enable rapid iteration and scalability.
                      </p>
                      <p>
                        To improve speed-to-market and reduce friction, I developed a throughput acceleration model that leveraged dwell times, SLA breaches, and team capacity metrics. This data-driven approach identified key blockers and enabled targeted automation of high-friction workflow steps — ultimately doubling task throughput and contributing to hundreds of millions in projected GMS uplift.
                      </p>
                      <p>
                        I also introduced ML-based task prioritization, training ranking models on historical task data (e.g., resolution times, dependencies, business impact) to intelligently sequence backlog execution. This maximized delivery velocity and ensured high-leverage work received timely attention, improving platform responsiveness and planning predictability.
                      </p>
                      <p>
                        I drove alignment at the VP and Director level through clear metrics, PRFAQs, and benchmarking studies. The platform achieved the highest CSAT across the PLM suite and laid the groundwork for future-facing externalized supplier systems.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Amazon SDE */}
              <motion.div 
                ref={workRefs['amazon-sde1']}
                className="relative pb-4 cursor-pointer group hover:bg-gray-900/10 pr-4 py-1 rounded-lg transition-all duration-200 pl-8"
                onClick={() => toggleWork('amazon-sde1')}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Milestone Marker on Timeline */}
                <div className="absolute left-4 top-10 w-3 h-3 bg-white border-2 border-gray-900 rounded-full transform -translate-x-1/2 z-20"></div>
                
                <div className="absolute -left-12 sm:-left-16 top-6 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-lg flex items-center justify-center flex-shrink-0 p-1.5 sm:p-2 z-10 shadow-lg">
                  <Image
                    src="/images/logos/pb1.png"
                    alt="Amazon Private Brands"
                    width={56}
                    height={56}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="ml-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-2">December 2019 — January 2021</p>
                      <h3 className="text-lg font-medium text-white mb-1 group-hover:text-blue-400 transition-colors">Software Development Engineer</h3>
                      <p className="text-sm italic text-gray-400 mb-3">Amazon Private Brands</p>
                    </div>
                    <svg 
                      className={`w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-all duration-300 flex-shrink-0 ${expandedWork === 'amazon-sde1' ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      expandedWork === 'amazon-sde1' ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="space-y-1.5 text-[15px] text-gray-300 leading-relaxed">
                      <p>
                        I built the technical foundation for Private Brands PLM tool at scale. I created data pipelines that processed more than 100 million records, enabling deep performance and quality insights for product and sourcing teams across thousands of ASINs.
                      </p>
                      <p>
                        I built task and team management services that coordinated more than 100,000 product development tasks across Process Engineers, designers, sourcing teams, and QA partners. These systems became critical infrastructure and formed the backbone for the PLM workflow platform I later owned as a PMT and Engineering Manager.
                      </p>
                      
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Amazon SDE I/II */}
              <motion.div 
                ref={workRefs['amazon-sde2']}
                className="relative pb-0 cursor-pointer group hover:bg-gray-900/10 pr-4 py-1 rounded-lg transition-all duration-200 pl-8"
                onClick={() => toggleWork('amazon-sde2')}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                {/* Milestone Marker on Timeline */}
                <div className="absolute left-4 top-10 w-3 h-3 bg-white border-2 border-gray-900 rounded-full transform -translate-x-1/2 z-20"></div>
                
                <div className="absolute -left-12 sm:-left-16 top-6 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-lg flex items-center justify-center flex-shrink-0 p-1.5 sm:p-2 z-10 shadow-lg">
                  <Image
                    src="/images/logos/returns.png"
                    alt="Amazon Returns"
                    width={56}
                    height={56}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="ml-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-2">January 2015 — December 2019</p>
                      <h3 className="text-lg font-medium text-white mb-1 group-hover:text-blue-400 transition-colors">Software Development Engineer</h3>
                      <p className="text-sm italic text-gray-400 mb-3">Amazon Worldwide Returns</p>
                    </div>
                    <svg 
                      className={`w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-all duration-300 flex-shrink-0 ${expandedWork === 'amazon-sde2' ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      expandedWork === 'amazon-sde2' ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="space-y-1.5 text-[15px] text-gray-300 leading-relaxed">
                      <p>
                        I redesigned Amazon's return routing and carrier selection engine, introducing dynamic load balancing and improved rule evaluation. This reduced latency by 70% and cut configuration time by 66%, improving customer experience and operational cost efficiency across the reverse logistics network.
                      </p>
                      <p>
                        I led development of the workflow system used by more than 500 Whole Foods and partner stores to manage return containers. This distributed system handled 15% of all US customer returns and required building resilient pipelines, monitoring, and automated recovery to support store operations at scale.
                      </p>
                     
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
        </div>
      </section>



      {/* Other Achievements Section */}
      <section id="achievements" className="snap-section px-4 sm:px-6 lg:px-12 bg-[#1a1a1a] pt-20 md:pt-16 pb-24 sm:pb-32 overflow-visible">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-6 sm:mb-8">Other achievements</h2>
          
          <div className="space-y-6 sm:space-y-8">
            {/* Privacy Bar Raiser */}
            <motion.div 
              className="py-4 sm:py-6 border-b border-gray-800"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-medium text-white mb-2">Amazon Privacy Bar Raiser</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">Amazon • 2020 — Present</p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    As a Privacy Bar Raiser, I lead privacy compliance and risk identification for my organization, driving organization-wide privacy compliance strategy, goals, and implementation plans. I coordinate resolution of privacy issues, including escalation to Leadership, Legal, and SDO Privacy. I document business-specific privacy guidance, participate in PRFAQs and design reviews, and ensure all privacy requirements are met before feature and product launches. I provide monthly feedback to leadership regarding privacy program status and advocate privacy best practices while supporting privacy audits across the organization.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Open Source & Community */}
            <motion.div 
              className="py-4 sm:py-6 border-b border-gray-800"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-medium text-white mb-2">Open Source & Community Contributions</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">Google Summer of Code, Amazon Internal Conferences</p>
                  <div className="space-y-2 text-sm text-gray-300 leading-relaxed">
                    <p>
                      Built products for developer productivity in the open source community, including work as part of Google Summer of Code with the Prism Model Checker software, where I developed enhanced graph visualization capabilities that improved debugging efficiency for global research use.
                    </p>
                    <p>
                      Presented developer tools at Amazon's internal ProdCon and DevCon conferences that are now used by 50,000+ developers at Amazon and recognized by the internal developer community.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Research Publication */}
            <motion.div 
              className="py-4 sm:py-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-medium text-white mb-2">Research: Fingerphoto Spoofing Detection</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">IEEE BTAS Conference</p>
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-300 leading-relaxed">
                    <p>
                      Conducted research on machine learning and computer vision for biometric authentication on mobile devices. Investigated fingerphoto spoofing attacks and developed detection algorithms to enhance security for smartphone-based authentication systems.
                    </p>
                    <p>
                      Created a large spoofed fingerphoto database made publicly available for research, established the effect of print and photo attacks in fingerphoto spoofing, and evaluated the performance of existing spoofing detection algorithms.
                    </p>
                    <p className="pt-1 sm:pt-2">
                      <a 
                        href="https://ieeexplore.ieee.org/document/7791201" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
                      >
                        View published paper at IEEE BTAS
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </p>
                    
                    {/* Citation Map */}
                    <div className="mt-6">
                      <p className="text-xs sm:text-sm text-gray-400 mb-3">
                        Global citation map showing research institutions worldwide that have cited this work:
                      </p>
                      <CitationMap />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Outside of Work Section */}
      <section id="outside-work" className="snap-section min-h-screen px-4 sm:px-6 lg:px-12 bg-[#1a1a1a] pt-20 md:pt-16 pb-16 sm:pb-24 overflow-visible">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-6 sm:mb-8 text-center">Outside of work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Golf */}
            <motion.div 
              className="group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative overflow-hidden rounded-lg mb-3 h-64 sm:h-72 md:h-80">
                <Image
                  src="/images/nonwork/golf.jpg"
                  alt="Playing golf"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Golf</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                I play golf—though my handicap would suggest I'm still working on the "play" part. Always chasing that elusive perfect round.
              </p>
            </motion.div>

            {/* Skiing */}
            <motion.div 
              className="group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="relative overflow-hidden rounded-lg mb-3 h-64 sm:h-72 md:h-80">
                <Image
                  src="/images/nonwork/ski.jpeg"
                  alt="Skiing"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Skiing</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Hitting the slopes whenever I can. There's nothing quite like the rush of carving down a mountain.
              </p>
            </motion.div>

            {/* Tennis */}
            <motion.div 
              className="group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative overflow-hidden rounded-lg mb-3 h-64 sm:h-72 md:h-80">
                <Image
                  src="/images/nonwork/tennis.jpg"
                  alt="Playing tennis"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Tennis</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                On the court as often as possible. A great way to stay active and competitive.
              </p>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Contact Section - Form */}
      <section id="contact" className="snap-section min-h-screen px-4 sm:px-6 lg:px-12 bg-[#1a1a1a] pt-20 md:pt-16 pb-12 overflow-y-auto flex items-center">
        <div className="max-w-2xl mx-auto w-full">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-3 text-center">Get In Touch</h2>
          <p className="text-gray-400 text-center mb-8">Have a question or want to work together? Drop me a message!</p>
          
          <form 
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Hidden field for email subject */}
            <input type="hidden" name="_subject" value="New contact from Portfolio" />
            
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Your message..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>

          {/* Social Links */}
          <div className="pt-8 mt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 mb-4">Or connect with me on:</p>
            <div className="flex items-center justify-center gap-6">
              <a 
                href="https://www.linkedin.com/in/archittaneja/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a 
                href="https://github.com/archittaneja" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
