import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Writing from "@/components/Writing";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HeroWrapper from "@/components/HeroWrapper";
import ScrollReactiveBand from "@/components/ScrollReactiveBand";

export default function Home() {
  return (
    <main>
      <HeroWrapper />
      <ScrollReactiveBand />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Writing />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
