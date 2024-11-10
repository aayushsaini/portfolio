import React from 'react';
import TechStack, { SKILLS } from './TechStack';

const experiences = [
    {
      company: 'Boston Consulting Group',
      role: 'Software Engineer',
      period: 'Aug 2024 - Present',
      description: 'Part of the core engineering team at BCG X-Delivery, responsible for engineering software products for both BCG & their top clients.',
      technologies: [SKILLS.javascript, SKILLS.typescript, SKILLS.react, SKILLS.html5, SKILLS.scss, SKILLS.python, SKILLS.postgresql, SKILLS.nextjs, SKILLS.figma]
    },
    {
      company: 'Deloitte Consulting',
      role: 'SWE Analyst (Frontend)',
      period: 'Aug 2024 - Present',
      description: `Building Deloitte's award-winning audit platform - Deloitte Omnia. Responsible for engineering, developing new platform level features & delivering performance optimisation. 
        • Engineered the concurrency management features to enable real - time multiuser collaboration experience
        • Designed a dynamic auto-save mechanism to improve the UX & reduce data loss by 100%
        • Contributed to performance optimisation for improving application's performance using WebSockets
        • Developed a browser extension (dev's utility) as a personal contribution towards the project
        • Received several distinction & performance awards for my contributions`,
      technologies: [SKILLS.javascript, SKILLS.typescript, SKILLS.react, SKILLS.html5, SKILLS.scss, SKILLS.figma]
    },
    {
      company: 'Deloitte Consulting',
      role: 'SWE Intern (Frontend)',
      period: 'Aug 2024 - Present',
      description: `Part of the engineering team building Deloitte’s Omnia. Assisted the engineering team in building business features and fixing bugs`,
      technologies: [SKILLS.javascript, SKILLS.react, SKILLS.html5, SKILLS.scss, SKILLS.figma]
    }
  ];

const WorkExperience = () => {
  const [showMore, setShowMore] = React.useState(true);
  return (
    <section className="mb-16 mt-[100px]">
      <h2 className="text-2xl font-bold mb-8 text-white">
        <span className="text-green-500">&gt; </span>Work Experience <span className="text-gray-500 text-sm cursor-pointer" onClick={() => setShowMore(!showMore)}>[{ !showMore ? 'show more' : 'show less'}]</span>
      </h2>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
            <div key={index} className={`pl-6 relative border-l-2 border-gray-800`}>
            <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-[7px] top-1.5"></div>
            <h3><span className="text-green-500 font-bold mb-1">{exp.company}</span> | {exp.role}</h3>
            <p className="text-sm text-gray-500 mb-4">{exp.period}</p>
            {showMore && (<p className="mb-4 whitespace-pre-line leading-relaxed">{exp.description}</p>)}
            <div className="mb-2">
              <span className="text-sm text-gray-500">Technologies worked with:</span>
            </div>
            <TechStack technologies={exp.technologies} />
            </div>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;