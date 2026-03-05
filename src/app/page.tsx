import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Writing from "@/components/Writing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HeroWrapper from "@/components/HeroWrapper";

export default function Home() {
  return (
    <main>
      <HeroWrapper />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Writing />
      <Contact />
      <Footer />
    </main>
  );
}
