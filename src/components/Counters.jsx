import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Zap, Calendar } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Counters = () => {
  const { data } = useLocalStorage();
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    mw: 0,
    years: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          animateCounters();
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const incrementValues = {
      projects: data.counters.projects / steps,
      clients: data.counters.clients / steps,
      mw: data.counters.mw / steps,
      years: data.counters.years / steps,
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      
      setCounters({
        projects: Math.min(Math.round(incrementValues.projects * currentStep), data.counters.projects),
        clients: Math.min(Math.round(incrementValues.clients * currentStep), data.counters.clients),
        mw: Math.min(Math.round(incrementValues.mw * currentStep), data.counters.mw),
        years: Math.min(Math.round(incrementValues.years * currentStep), data.counters.years),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);
  };

  const stats = [
    { icon: Award, label: 'Projects Completed', value: counters.projects, suffix: '+', color: 'text-yellow-500' },
    { icon: Users, label: 'Happy Clients', value: counters.clients, suffix: '+', color: 'text-green-500' },
    { icon: Zap, label: 'MW Installed', value: counters.mw, suffix: ' MW', color: 'text-blue-500' },
    { icon: Calendar, label: 'Years of Experience', value: counters.years, suffix: '+', color: 'text-purple-500' },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-16"
      style={{ 
        backgroundImage: `linear-gradient(to bottom right, ${data.colors?.counters || '#3B82F6'}, ${data.colors?.accent || '#60A5FA'})` 
      }}
    >
      <div className="section-container">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 text-center shadow-2xl hover:shadow-3xl transition-shadow"
              >
                <Icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Counters;
