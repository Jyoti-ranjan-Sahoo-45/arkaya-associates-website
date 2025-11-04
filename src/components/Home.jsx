import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Counters from './Counters';
import Projects from './Projects';
import Gallery from './Gallery';
import ContactForm from './ContactForm';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Counters />
      <Projects />
      <Gallery />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Home;
