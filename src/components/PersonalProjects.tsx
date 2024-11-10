import React from 'react';
import TechStack, { SKILLS } from './TechStack';

const projects = [
  {
    title: 'MyGarden.ai',
    description: 'This is an AI-powered gardening assistant that helps you take care of your plants. It uses computer vision to identify the plant species, their diseases & provides you with the care instructions.',
    technologies: [SKILLS.javascript, SKILLS.react, SKILLS.html5, SKILLS.scss, SKILLS.python, SKILLS.tensorflow, SKILLS.computerVision, SKILLS.firebase, SKILLS.figma]
  },
  {
    title: 'CovidNearMe.in',
    description: 'First of its kind when launched in India, CovidNearMe allowed the users to find the covid stats based on their district (location api). The app also provided state-level, national, and global stats. App had a provision to provide local support services details as well.\n\nData source: Crowd sourced, Web Scrapped from regional newpaper websites, covid19india.org api, govt api',
    technologies: [SKILLS.javascript, SKILLS.react, SKILLS.html5, SKILLS.scss, SKILLS.python, SKILLS.googleSheets, SKILLS.webScraping, SKILLS.heroku]
  },
];

const PersonalProjects = () => {
  const [showMore, setShowMore] = React.useState(true);  
  return (
    <section className='mt-[80px]'>
      <h2 className="text-2xl font-bold mb-8 text-white">
        Personal Projects <span className="text-gray-500 text-sm cursor-pointer" onClick={() => setShowMore(!showMore)}>[{ !showMore ? 'show more' : 'show less'}]</span>
      </h2>

      <div className="grid gap-8">
        {projects.map((project, index) => (
          <div key={index} className="border-l-2 border-gray-800 pl-6 relative">
            <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[7px] top-1.5"></div>
            <h3 className="text-purple-400 font-bold mb-2">{project.title}</h3>
            {showMore && <p className="mb-4 whitespace-pre-line leading-relaxed">{project.description}</p>}
            <div className="mb-2">
              <span className="text-sm text-gray-500">Technologies used:</span>
            </div>
            <TechStack technologies={project.technologies} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PersonalProjects;