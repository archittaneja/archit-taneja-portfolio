import { WorkExperience, Education, Achievement } from '@/lib/types';

export const workExperience: WorkExperience[] = [
  {
    id: 'work-1',
    company: 'Company Name',
    role: 'Software Engineer',
    duration: 'Jan 2023 - Present',
    location: 'City, State',
    description: 'Brief description of your role and responsibilities',
    achievements: [
      'Led development of key features that improved user engagement by 25%',
      'Mentored junior developers and established coding best practices',
      'Optimized application performance resulting in 40% faster load times'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    companyLogo: {
      src: '/images/companies/company-logo.png',
      alt: 'Company logo',
      width: 100,
      height: 100
    }
  }
];

export const education: Education[] = [
  {
    institution: 'University Name',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    graduationYear: 2022,
    gpa: '3.8',
    honors: ['Magna Cum Laude', 'Dean\'s List'],
    image: {
      src: '/images/education/graduation.jpg',
      alt: 'Graduation photo',
      width: 400,
      height: 300
    }
  }
];

export const achievements: Achievement[] = [
  {
    title: 'Technical Achievement',
    description: 'Description of a significant technical achievement or recognition',
    date: '2023',
    category: 'Technical',
    image: {
      src: '/images/achievements/achievement-1.jpg',
      alt: 'Achievement photo',
      width: 400,
      height: 300
    },
    metrics: [
      {
        label: 'Impact',
        value: '50',
        type: 'percentage'
      }
    ]
  }
];