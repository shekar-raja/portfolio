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
import { SITE_URL, SITE_NAME, AUTHOR_NAME, AUTHOR_ROLE, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import "./resume.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const RESUME_TITLE = `${AUTHOR_NAME} · ${AUTHOR_ROLE}`;
const RESUME_DESC =
  "Cloud Data Engineer with 5+ years of experience building data pipelines, AI solutions, and applications.";

export const metadata: Metadata = {
  title: {
    absolute: RESUME_TITLE,
  },
  description: RESUME_DESC,
  alternates: {
    canonical: `${SITE_URL}/resume`,
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${SITE_URL}/resume`,
    title: RESUME_TITLE,
    description: RESUME_DESC,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary",
    title: RESUME_TITLE,
    description: RESUME_DESC,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR_NAME,
  jobTitle: AUTHOR_ROLE,
  url: `${SITE_URL}/resume`,
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Hertfordshire",
  },
};

export default function ResumePage() {
  const hasLaunches = resume.launches.items.length > 0;
  const hasCommunity = resume.community.bullets.length > 0;

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

      <Rail
        hidden={[
          ...(hasLaunches ? [] : ["launches"]),
          ...(hasCommunity ? [] : ["community"]),
        ]}
      />

      <main>
        <Header
          name={resume.name}
          role={resume.role}
          lede={resume.lede}
          links={resume.links}
          pdfHref="/resume.pdf"
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

        {hasLaunches && (
          <>
          <SectionBand id="launches" title="Launches" />
          <section>
            <Prose content={resume.launches.intro} />
            <LaunchList launches={resume.launches.items} />
          </section>
          </>
        )}

        {hasCommunity && (
          <>
          <SectionBand id="community" title="Community & open source" />
          <section>
            <Prose content={resume.community.intro} />
            <ul className="bullets">
              {resume.community.bullets.map((bullet, idx) => (
                <li key={idx}>{formatText(bullet)}</li>
              ))}
            </ul>
          </section>
          </>
        )}

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
        </footer>
      </main>
    </div>
  );
}
