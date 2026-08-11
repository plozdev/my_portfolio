import { SEO } from './components/SEO';
import { CustomCursor } from './components/ui/CustomCursor';
import { Footer } from './components/layout/Footer';
import { Hero } from './sections/Hero';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';

function App() {
  return (
    <>
      <SEO />
      <CustomCursor />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;


