import { SEO } from './components/SEO';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Journey } from './sections/Journey';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Tech } from './sections/Tech';
// import { Thinking } from './sections/Thinking';
import { Achievements } from './sections/Achievements';
// import { Community } from './sections/Community';
// import { Current } from './sections/Current';
import { Contact } from './sections/Contact';

function App() {
  return (
    <>
      <SEO />
      <Navbar />
      <main className="pt-14">
        <Hero />
        <About />
        <Journey />
        <Experience />
        <Projects />
        <Tech />
        {/* <Thinking /> */}
        <Achievements />
        {/* <Community /> */}
        {/* <Current /> */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
