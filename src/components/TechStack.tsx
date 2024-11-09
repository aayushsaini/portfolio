import React from 'react';

interface TechStackProps {
  technologies: string[];
}

export const SKILLS = {
  javascript: 'JavaScript',
  react: 'React',
  typescript: 'TypeScript',
  python: 'Python',
  redis: 'Redis',
  postgresql: 'PostgreSQL',
  html5: 'HTML5',
  scss: 'SCSS',
  css: 'CSS',
  figma: 'Figma',
  nextjs: 'Nextjs',
};

const TechStack: React.FC<TechStackProps> = ({ technologies }) => {
  const getIcon = (tech: string) => {
    switch (tech.toLowerCase()) {
      case SKILLS.javascript.toLowerCase():
        return <img src="https://img.icons8.com/color/48/000000/javascript.png" alt="JavaScript" className="w-6 h-6" />;
      case SKILLS.react.toLowerCase():
        return <img src="https://img.icons8.com/color/48/000000/react-native.png" alt="React" className="w-6 h-6" />;
      case SKILLS.typescript.toLowerCase():
        return <img src="https://img.icons8.com/color/48/000000/typescript.png" alt="TypeScript" className="w-6 h-6" />;
      case SKILLS.python.toLowerCase():
        return <img src="https://img.icons8.com/color/48/000000/python.png" alt="Python" className="w-6 h-6" />;
      case SKILLS.redis.toLowerCase():
        return <img src="https://img.icons8.com/color/48/000000/redis.png" alt="Redis" className="w-6 h-6" />;
      case SKILLS.postgresql.toLowerCase():
        return <img src="https://img.icons8.com/?size=100&id=38561&format=png&color=000000" alt="PostgreSQL" className="w-6 h-6" />;
      case SKILLS.html5.toLowerCase():
        return <img src="https://img.icons8.com/color/48/000000/html-5.png" alt="HTML5" className="w-6 h-6" />;
      case SKILLS.scss.toLowerCase():
        return <img src="https://img.icons8.com/color/48/000000/sass.png" alt="SCSS" className="w-6 h-6" />;
      case SKILLS.css.toLowerCase():
        return <img src="https://img.icons8.com/color/48/000000/css3.png" alt="CSS" className="w-6 h-6" />;
      case SKILLS.figma.toLowerCase():
        return <img src="https://img.icons8.com/color/48/000000/figma.png" alt="Figma" className="w-6 h-6" />;
      case SKILLS.nextjs.toLowerCase():
        return <img src="https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=000000" alt="Nextjs" className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-3">
      {technologies.map((tech, index) => (
        <div key={index} className="flex items-center">
          {getIcon(tech)}
        </div>
      ))}
    </div>
  );
};

export default TechStack;