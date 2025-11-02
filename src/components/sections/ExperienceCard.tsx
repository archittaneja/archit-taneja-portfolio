'use client';

interface ExperienceCardProps {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export default function ExperienceCard({
  title,
  company,
  duration,
  location,
  description,
  achievements,
  technologies
}: ExperienceCardProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-light mb-4">{title}</h2>
        <p className="text-xl opacity-75 mb-2">{company} • {duration}</p>
        <p className="text-lg opacity-60">{location}</p>
      </div>

      {/* Main Content Layout */}
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Side - Image Placeholder */}
        <div className="relative">
          <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
            <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <div className="text-6xl mb-4">🏢</div>
                <p className="text-lg font-medium">{company}</p>
                <p className="text-sm opacity-75">{title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="space-y-8">
          {/* Description */}
          <div>
            <p className="text-lg md:text-xl leading-relaxed">
              {description}
            </p>
          </div>

          {/* Key Achievements */}
          <div>
            <h3 className="text-xl font-medium mb-6">Key Achievements</h3>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span className="text-blue-500 mt-1 flex-shrink-0">•</span>
                  <span className="text-base leading-relaxed">{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-xl font-medium mb-6">Technologies & Tools</h3>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}