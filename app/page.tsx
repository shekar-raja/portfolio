import { getProfile, getProjects, getPosts, getTakes, getExperience, getEducation, getSkills, getTestimonials } from "@/lib/queries";
import { HeroSection } from "@/components/hero/hero-section";

export default async function HomePage() {
  const [profile, projects, posts, takes, experience, education, skills, testimonials] = await Promise.all([
    getProfile(),
    getProjects(),
    getPosts(),
    getTakes(),
    getExperience(),
    getEducation(),
    getSkills(),
    getTestimonials(),
  ]);

  return (
    <HeroSection
      profile={profile}
      selectedProjects={projects}
      recentPosts={posts}
      takes={takes}
      experience={experience}
      education={education}
      skills={skills}
      testimonials={testimonials}
    />
  );
}
