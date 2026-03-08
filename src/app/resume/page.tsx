import type { Metadata } from "next";
import portfolioConfig from "@/data/portfolio.config";
import { getDrivePreviewUrl } from "@/utils/drive";

const { personal } = portfolioConfig;
const previewUrl = getDrivePreviewUrl(personal.resumeSource);

export const metadata: Metadata = {
  title: `Resume — ${personal.name}`,
};

export default function ResumePage() {
  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000",
        cursor: "auto",
      }}
    >
      <iframe
        src={previewUrl}
        title={`${personal.name} — Resume`}
        style={{ width: "100%", height: "100%", border: "none" }}
        allowFullScreen
      />
    </main>
  );
}
