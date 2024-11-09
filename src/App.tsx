import WorkExperience from './components/WorkExperience';
import PersonalProjects from './components/PersonalProjects';
import Navigation from './components/Navigation';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12 && hour > 3) return "Good morning";
  if (hour >= 12 && hour <= 16) return "Good afternoon";
  return "Good evening";
}

function App() {
  return (
    <div className="min-h-screen bg-[#0a0f0d] text-gray-300 font-mono">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Navigation />
        <header className="mt-[15vh] mb-16">      
            <h2 className="text-3xl font-bold mb-6 text-white">
            {getGreeting()}, there! 👋
            </h2>
          
          <p className="text-xl mb-4">I am Aayush Saini </p>
          
          <p className="text-lg mb-8 leading-relaxed">
            A full-stack software engineer during the day & a digital dream-weaver
            by night...or vice versa 🧙‍♂️
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="mailto:aayushs99@icloud.com" className="flex items-center gap-2 bg-gray-800/50 hover:outline-green-600 hover:outline  px-4 py-2 transition-colors">
              <img src="https://img.icons8.com/?size=100&id=X0mEIh0RyDdL&format=png&color=000000" alt="Email Icon" width={18} height={18} />
              Send an email
            </a>
            <a href="https://linkedin.com/in/aayush-saini" className="flex items-center gap-2 bg-gray-800/50 hover:outline-green-600 hover:outline  px-4 py-2 transition-colors">
              <img src="https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png&color=000000" alt="LinkedIn Icon" width={18} height={18} />
              /in/aayush-saini
            </a>
            <a href="https://github.com/aayushsaini" className="flex items-center gap-2 bg-gray-800/50 hover:outline-green-600 hover:outline px-4 py-2 transition-colors">
              <img src="https://img.icons8.com/?size=100&id=3tC9EQumUAuq&format=png&color=EBEBEB" alt="GitHub Icon" width={18} height={18} />
              /aayushsaini
            </a>
          </div>
        </header>

        <WorkExperience />
        <PersonalProjects />
      </div>
    </div>
  );
}

export default App;