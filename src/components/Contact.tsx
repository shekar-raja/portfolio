"use client";
import portfolioConfig from "@/data/portfolio.config";
import CharReveal from "@/components/CharReveal";

const { personal, contact: contactInfo } = portfolioConfig;

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: "8rem 0",
        background: "rgba(6,4,12,0.95)",
        backdropFilter: "blur(18px) saturate(160%)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "0 2rem",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontFamily: "Sora, sans-serif",
            fontWeight: 600,
            fontSize: "0.8rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--cyan)",
            marginBottom: "0.75rem",
          }}
        >
          Contact
        </p>
        <CharReveal
          text={contactInfo.heading}
          style={{
            fontFamily: "Sora, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "var(--text-primary)",
            marginBottom: "1.25rem",
            display: "block",
          }}
        />

        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.05rem",
            lineHeight: 1.75,
            marginBottom: "3rem",
          }}
        >
          {contactInfo.subtext}
        </p>

        <a
          href={`mailto:${personal.email}`}
          style={{
            display: "inline-block",
            padding: "1rem 2.5rem",
            borderRadius: "10px",
            background:
              "linear-gradient(135deg, var(--indigo) 0%, #818cf8 100%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1rem",
            textDecoration: "none",
            letterSpacing: "0.01em",
            boxShadow: "0 0 40px rgba(99,102,241,0.35)",
            transition: "transform 0.2s, box-shadow 0.2s",
            marginBottom: "2.5rem",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform =
              "translateY(-3px)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "0 0 55px rgba(99,102,241,0.5)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform =
              "translateY(0)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "0 0 40px rgba(99,102,241,0.35)";
          }}
        >
          personal.email
        </a>

        {/* Social row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "LinkedIn", href: personal.linkedin },
            { label: "GitHub", href: personal.github },
            { label: "Resume ↗", href: personal.resume },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
                transition: "color 0.2s",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--indigo-light)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--text-secondary)")
              }
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
