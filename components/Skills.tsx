import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <div className="w-full bg-brand-400 text-black py-4 overflow-hidden relative z-20 border-y-4 border-black dark:border-white shadow-lg transform -rotate-1 origin-left md:-rotate-1">
      <div className="flex animate-scroll whitespace-nowrap">
        {/* Triple duplication for smoother infinite scroll on wide screens */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center">
            {SKILLS.map((skill, index) => (
              <div key={index} className="flex items-center mx-6 md:mx-10">
                <span className="text-lg md:text-xl font-bold uppercase tracking-wider font-mono">
                  {skill}
                </span>
                <span className="ml-12 md:ml-20 w-2 h-2 bg-black rounded-full" />
              </div>
            ))}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          width: fit-content;
        }
      `}</style>
    </div>
  );
};

export default Skills;