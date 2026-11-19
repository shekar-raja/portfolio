import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { resume } from "@/content/resume";
import { formatText } from "@/components/resume/formatText";
import { Header } from "@/components/resume/Header";
import { SectionBand } from "@/components/resume/SectionBand";
import { Prose } from "@/components/resume/Prose";
import { Entry } from "@/components/resume/Entry";
import { Snapshot } from "@/components/resume/Snapshot";
import { LaunchList } from "@/components/resume/LaunchList";
import { Skills } from "@/components/resume/Skills";
import { Tags } from "@/components/resume/Tags";
import { Rail } from "@/components/resume/Rail";
import SwarmScript from "@/components/resume/SwarmScript";
import "./resume.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    absolute: "Bhavya Verma · Product & Developer Experience Engineer",
  },
  description:
    "Product engineer who ships the feature, writes the docs and runs the community. 3+ years at BuildShip and Rowy.",
  alternates: {
    canonical: "https://beebombshell.com/resume",
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://beebombshell.com/resume",
    title: "Bhavya Verma · Product & Developer Experience Engineer",
    description:
      "Product engineer who ships the feature, writes the docs and runs the community. 3+ years at BuildShip and Rowy.",
    siteName: "BeeBombshell",
  },
  twitter: {
    card: "summary",
    title: "Bhavya Verma · Product & Developer Experience Engineer",
    description:
      "Product engineer who ships the feature, writes the docs and runs the community. 3+ years at BuildShip and Rowy.",
    creator: "@Bee_Bombshell",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bhavya Verma",
  jobTitle: "Product & Developer Experience Engineer",
  url: "https://beebombshell.com/resume",
  sameAs: [
    "https://x.com/Bee_Bombshell",
    "https://github.com/BeeBombshell",
    "https://www.producthunt.com/@beebombshell",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Cluster Innovation Centre, University of Delhi",
  },
};

export default function ResumePage() {
  return (
    <div
      id="resume-page"
      data-page="resume"
      className={instrumentSerif.variable}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <Rail />

      <main>
        <Header
          name={resume.name}
          role={resume.role}
          lede={resume.lede}
          links={resume.links}
        />

        <SectionBand id="about" title="About" />
        <section>
          {resume.about.map((p, idx) => (
            <Prose key={idx} content={p} />
          ))}
          <Snapshot items={resume.snapshot} />
        </section>

        <SectionBand id="experience" title="Experience" />
        <section>
          {resume.experience.map((job) => (
            <Entry key={job.title} entry={job} />
          ))}
        </section>

        <SectionBand id="projects" title="Projects" />
        <section>
          {resume.projects.map((project) => (
            <Entry key={project.title} entry={project} />
          ))}
        </section>

        <SectionBand id="launches" title="Launches" />
        <section>
          <Prose content={resume.launches.intro} />
          <LaunchList launches={resume.launches.items} />
        </section>

        <SectionBand id="community" title="Community & open source" />
        <section>
          <Prose content={resume.community.intro} />
          <ul className="bullets">
            {resume.community.bullets.map((bullet, idx) => (
              <li key={idx}>{formatText(bullet)}</li>
            ))}
          </ul>
        </section>

        <SectionBand title="Skills & education" />
        <section>
          <Skills skills={resume.skills} />
          <div className="head" style={{ marginTop: "32px" }}>
            <h3>{resume.education.title}</h3>
            <span className="when">{resume.education.meta}</span>
          </div>
          <p className="org">{resume.education.org}</p>
        </section>

        <SectionBand id="contact" title="Contact" />
        <section>
          <Prose content={resume.contact.intro} />
          <Tags tags={resume.contact.roles} />
          <nav className="links" aria-label="Contact links">
            {resume.contact.links.map((link) => {
              const isExternal =
                link.href.startsWith("http") || link.href.startsWith("mailto:");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  rel="noopener noreferrer"
                  target={isExternal ? "_blank" : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </section>

        <footer>
          <div>{resume.footer.hint}</div>
          <div style={{ marginTop: "8px" }}>
            <a
              href={resume.footer.credit.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {resume.footer.credit.label}
            </a>
          </div>
        </footer>
      </main>

      <SwarmScript />
    </div>
  );
}
