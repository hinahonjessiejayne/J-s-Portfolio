import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Booking from './components/Booking';
import Footer from './components/Footer';
import HexagonBackground from './components/HexagonBackground';

function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check local storage or system preference on load
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };
  
  // Click Effect
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const particle = document.createElement('div');
      particle.className = 'click-particle';
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;
      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 800);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="relative min-h-screen bg-light-bg dark:bg-dark-bg font-sans text-light-text dark:text-dark-text selection:bg-brand-400 selection:text-black overflow-x-hidden transition-colors duration-300">
      {/* Background Tech Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-light-bg dark:bg-dark-bg transition-colors duration-300"></div>
        
        {/* Animated Gold Beehive Background */}
        <HexagonBackground />
        
        {/* Overlay Gradient - reduced opacity slightly to let the hexagons show through better */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-light-bg/70 dark:via-dark-bg/70 to-light-bg dark:to-dark-bg"></div>
      </div>

      <div className="relative z-10">
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        <main className="space-y-0">
          <Hero />
          <Services />
          <Experience />
          <Projects />
          <Testimonials />
          <Booking />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;