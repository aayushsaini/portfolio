import React from 'react';
import TechStack from './TechStack';

const PersonalProjects = () => {
  const projects = [
    {
      title: 'Coming soon...',
      description: 'I really do have some...will update this section in future 😅',
      technologies: ['React', 'JavaScript']
    }
  ];

  return (
    <section className='mt-[80px]'>
      <h2 className="text-2xl font-bold mb-8 text-white">
        Personal Projects <span className="text-gray-500 text-sm">[show less]</span>
      </h2>

      <div className="grid gap-8">
        {projects.map((project, index) => (
          <div key={index} className="border-l-2 border-gray-800 pl-6 relative">
            <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[7px] top-1.5"></div>
            <h3 className="text-purple-400 font-medium mb-2">{project.title}</h3>
            <p className="mb-4">{project.description}</p>
            <TechStack technologies={project.technologies} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PersonalProjects;