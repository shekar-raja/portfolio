export const REVALIDATE_TAGS = {
  profile: "profile",
  projects: "projects",
  posts: "posts",
  config: "config",
  takes: "takes",
  experience: "experience",
  education: "education",
  skills: "skills",
  testimonials: "testimonials",
} as const;

export type RevalidateTag = (typeof REVALIDATE_TAGS)[keyof typeof REVALIDATE_TAGS];
