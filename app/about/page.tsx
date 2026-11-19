import { getProfile } from "@/lib/queries";
import type { Metadata } from "next";
import { AboutContent } from "@/components/about/about-content";

export const metadata: Metadata = {
  title: "About",
  description: "About Raja Shekar - cloud data engineer.",
  alternates: {
    canonical: "/about",
  },
};

export default async function AboutPage() {
  const profile = await getProfile();

  return <AboutContent profile={profile} />;
}
