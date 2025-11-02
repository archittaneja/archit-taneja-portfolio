import { Project } from '@/lib/types';

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Sample Project',
    summary: 'A brief description of your project and its impact',
    description: 'Detailed description of the project, technologies used, and challenges overcome.',
    problem: 'The specific problem this project aimed to solve',
    action: 'The approach and technologies used to solve the problem',
    result: 'The measurable outcomes and impact of the solution',
    metrics: [
      {
        label: 'Performance Improvement',
        value: '40',
        type: 'percentage'
      },
      {
        label: 'Users Impacted',
        value: '10,000',
        type: 'absolute'
      }
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    role: 'Full Stack Developer',
    duration: '3 months',
    images: [
      {
        src: '/images/projects/project-1.jpg',
        alt: 'Project screenshot',
        width: 800,
        height: 600
      }
    ],
    links: [
      {
        type: 'demo',
        url: 'https://project-demo.com',
        label: 'Live Demo'
      },
      {
        type: 'github',
        url: 'https://github.com/username/project',
        label: 'Source Code'
      }
    ],
    featured: true
  }
];

export const featuredProjects = projects.filter(project => project.featured);