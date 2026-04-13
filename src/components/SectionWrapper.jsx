import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const SectionWrapper = ({ children, className = '', id }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 60 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`py-12 px-4 md:px-12 lg:px-20 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          {/* Background glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl opacity-50" />
          
          {/* Glassmorphism container - transparent to show background */}
          <div className="relative backdrop-blur-sm bg-black/10 border border-white/10 rounded-2xl p-8 md:p-12 shadow-lg shadow-black/20">
            {children}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SectionWrapper;
