'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  image: string;
}

const experiences: Experience[] = [
  {
    id: 'experience-1',
    title: 'Engineering Manager',
    company: 'Amazon',
    duration: '2022 - Present',
    location: 'Seattle, WA',
    description: 'Leading a team of 12 engineers to build scalable cloud infrastructure solutions serving millions of customers worldwide.',
    achievements: [
      'Reduced system latency by 40% through architectural improvements',
      'Led migration to microservices architecture serving 10M+ requests/day',
      'Implemented CI/CD pipeline reducing deployment time by 60%',
      'Mentored 8 engineers resulting in 3 promotions'
    ],
    technologies: ['AWS', 'Kubernetes', 'Python', 'Java', 'React', 'TypeScript'],
    image: '/images/amazon-office.jpg' // You'll need to add this image
  },
  {
    id: 'experience-2',
    title: 'Product Manager',
    company: 'Amazon',
    duration: '2020 - 2022',
    location: 'Seattle, WA',
    description: 'Drove product strategy and roadmap for consumer-facing features impacting 50M+ active users globally.',
    achievements: [
      'Launched 3 major features increasing user engagement by 25%',
      'Coordinated cross-functional teams of 20+ members',
      'Increased conversion rate by 18% through data-driven optimizations',
      'Managed $5M annual product budget with 15% cost reduction'
    ],
    technologies: ['SQL', 'Tableau', 'Figma', 'Jira', 'A/B Testing', 'Analytics'],
    image: '/images/amazon-product.jpg' // You'll need to add this image
  }
];

export default function WorkExperience() {
  const [selectedExperience, setSelectedExperience] = useState(experiences[0]);

  // Listen for experience selection from navigation
  useEffect(() => {
    const handleExperienceSelect = (event: CustomEvent) => {
      const { index } = event.detail;
      if (experiences[index]) {
        setSelectedExperience(experiences[index]);
      }
    };

    window.addEventListener('selectExperience', handleExperienceSelect as EventListener);

    return () => {
      window.removeEventListener('selectExperience', handleExperienceSelect as EventListener);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-12">
      <h2 className="text-3xl md:text-5xl font-light mb-12 text-center">
        Work Experience
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left side - Image */}
        <div className="relative">
          <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-gray-200">
            {/* Placeholder for now - you can add actual images later */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-2">🏢</div>
                <p className="text-sm">{selectedExperience.company}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Experience selector and content */}
        <div className="space-y-8">
          {/* Experience Selector */}
          <div className="space-y-3">
            {experiences.map((experience) => {
              const isSelected = selectedExperience.id === experience.id;
              return (
                <button
                  key={experience.id}
                  onClick={() => setSelectedExperience(experience)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transform hover:scale-[1.02] ${isSelected
                    ? 'opacity-100 scale-100'
                    : 'opacity-40 hover:opacity-70 scale-95'
                    }`}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none'
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg">{experience.title}</h3>
                    <span className="text-sm opacity-75">{experience.duration}</span>
                  </div>
                  <p className="text-sm opacity-75">{experience.company} • {experience.location}</p>
                </button>
              );
            })}
          </div>

          {/* Selected Experience Details */}
          <div className="space-y-6 transition-all duration-500">
            <div>
              <h3 className="text-2xl font-light mb-2">{selectedExperience.title}</h3>
              <p className="text-lg opacity-75 mb-4">
                {selectedExperience.company} • {selectedExperience.duration}
              </p>
              <p className="text-base leading-relaxed mb-6">
                {selectedExperience.description}
              </p>
            </div>

            {/* Key Achievements */}
            <div>
              <h4 className="font-medium mb-3">Key Achievements</h4>
              <ul className="space-y-2">
                {selectedExperience.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span className="text-sm leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="font-medium mb-3">Technologies & Tools</h4>
              <div className="flex flex-wrap gap-2">
                {selectedExperience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}