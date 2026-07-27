import { SEO } from './components/SEO';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './sections/Hero';
import { Journey } from './sections/Journey';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Tech } from './sections/Tech';
import { Achievements } from './sections/Achievements'
import { Contact } from './sections/Contact';

function App() {
  return (
    <>
      <SEO />
      <Navbar />
      <main className="pt-14">
        <Hero />
        <Journey />
        <Experience />
        <Projects />
        <Tech />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
