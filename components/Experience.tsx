import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../constants';
import { Download } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-gray-50 dark:bg-dark-surface/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-brand-500 dark:text-brand-400 font-mono font-medium tracking-widest text-xs mb-3">CAREER TIMELINE</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">Work Experience</h3>
            <p className="text-light-muted dark:text-dark-muted leading-relaxed mb-8 border-l border-light-border dark:border-dark-border pl-4">
              A timeline of my professional journey, highlighting key roles in management, engineering, and quality assurance.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center text-brand-600 dark:text-brand-400 font-semibold hover:text-brand-500 dark:hover:text-brand-300 transition-colors uppercase text-sm tracking-wider"
            >
              <Download className="w-4 h-4 mr-2" /> Download Full Resume
            </a>
          </motion.div>

          <div className="lg:col-span-2">
            <div className="relative border-l border-gray-300 dark:border-dark-border ml-3 md:ml-6 space-y-12">
              {EXPERIENCE.map((exp, index) => (
                <motion.div 
                  key={exp.id} 
                  className="relative pl-8 md:pl-12 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white dark:bg-dark-bg border border-brand-400/50 group-hover:bg-brand-400 group-hover:shadow-[0_0_10px_#D4AF37] transition-all duration-300 rounded-full"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{exp.role}</h4>
                      <p className="text-gray-500 font-medium">{exp.company}</p>
                    </div>
                    <span className="mt-2 sm:mt-0 px-3 py-1 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-sm text-xs font-mono text-brand-600 dark:text-brand-400 whitespace-nowrap shadow-sm dark:shadow-none">
                      {exp.period}
                    </span>
                  </div>
                  
                  <ul className="space-y-2">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-3 mt-2.5 w-1 h-1 bg-brand-600 rounded-full flex-shrink-0"></span>
                        <span className="text-light-muted dark:text-dark-muted text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
              
              {/* Education Node */}
               <motion.div 
                className="relative pl-8 md:pl-12 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: EXPERIENCE.length * 0.1 }}
               >
                  <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white dark:bg-dark-bg border border-gray-400 dark:border-gray-600 group-hover:border-brand-400 transition-all rounded-full"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">AMA Computer University</h4>
                      <p className="text-gray-500 font-medium">Makati Main Site</p>
                    </div>
                    <span className="mt-2 sm:mt-0 px-3 py-1 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-sm text-xs font-mono text-gray-500 whitespace-nowrap shadow-sm dark:shadow-none">
                      2001 - 2005
                    </span>
                  </div>
                  <p className="text-light-muted dark:text-dark-muted text-sm">Bachelor's Degree in Computer Science</p>
               </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;