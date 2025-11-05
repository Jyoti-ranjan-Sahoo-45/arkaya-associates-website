import { motion } from 'framer-motion';
import { MapPin, Zap } from 'lucide-react';
import { useInstantDB } from '../hooks/useInstantDB';

const Projects = () => {
  const { data } = useInstantDB();

  return (
    <section 
      id="projects" 
      className="section-container"
      style={{ backgroundColor: data.colors?.projects || '#FFFFFF' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Projects
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our successful solar installations across Odisha
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-cyan-500 overflow-hidden">
                {project.img ? (
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Zap className="w-20 h-20 text-white opacity-50" />
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {project.capacity}
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {project.desc}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{project.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {data.projects.length === 0 && (
          <div className="text-center py-12">
            <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No projects available. Add projects from the admin panel.</p>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Projects;
