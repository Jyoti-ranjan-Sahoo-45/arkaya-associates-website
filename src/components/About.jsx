import { motion } from 'framer-motion';
import { Award, CheckCircle, Users, Zap } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const About = () => {
  const { data } = useLocalStorage();

  const features = [
    { icon: Award, title: 'ISO Certified', desc: 'Quality management standards' },
    { icon: CheckCircle, title: 'OREDA Registered', desc: 'Government authorized' },
    { icon: Users, title: 'Expert Team', desc: 'Experienced professionals' },
    { icon: Zap, title: 'Fast Installation', desc: 'Quick & efficient service' },
  ];

  return (
    <section 
      id="about" 
      className="section-container"
      style={{ backgroundColor: data.colors?.about || '#FFFFFF' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {data.about.heading}
          </h2>
          <div className="w-24 h-1 bg-solar-yellow mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line mb-6">
              {data.about.text}
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="font-semibold text-gray-800">{data.about.certifications}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-blue-100 to-cyan-100 p-6 rounded-xl text-center hover:shadow-xl transition-shadow"
                >
                  <Icon className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Leadership */}
        {data.leadership && data.leadership.length > 0 && (
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Leadership</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {data.leadership.map((leader, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-blue-500 transition-all"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-1">{leader.name}</h4>
                  <p className="text-sm text-gray-600">{leader.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default About;
