"use client";
import portfolioConfig from "@/data/portfolio.config";

const blogs = portfolioConfig.writing;

export default function Writing() {
  return (
    <section
      id="writing"
      style={{
        padding: "8rem 0",
        background: "rgba(4,4,10,0.78)",
        backdropFilter: "blur(18px) saturate(160%)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
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
          Writing
        </p>
        <h2
          style={{
            fontFamily: "Sora, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            marginBottom: "3rem",
          }}
        >
          Thoughts & articles
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {blogs.map((blog, i) => (
            <a
              key={i}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                display: "block",
              }}
            >
              <div
                style={{
                  padding: "2rem",
                  borderRadius: "16px",
                  background: "rgba(13,13,20,0.7)",
                  border: "1px solid rgba(99,102,241,0.12)",
                  backdropFilter: "blur(12px)",
                  transition:
                    "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(99,102,241,0.4)";
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 20px 50px rgba(99,102,241,0.1)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(99,102,241,0.12)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
                  >
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: "0.2rem 0.6rem",
                          borderRadius: "20px",
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          background: "rgba(99,102,241,0.1)",
                          border: "1px solid rgba(99,102,241,0.2)",
                          color: "var(--indigo-light)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--text-secondary)",
                      opacity: 0.6,
                      flexShrink: 0,
                    }}
                  >
                    {blog.readTime}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "var(--text-primary)",
                    lineHeight: 1.4,
                    marginBottom: "0.75rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {blog.title}
                </h3>

                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    marginBottom: "1.25rem",
                  }}
                >
                  {blog.summary}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    color: "var(--indigo-light)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  Read Article
                  <span style={{ fontSize: "0.9rem" }}>→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
