import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import ProjectCard from "@/components/project-card";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Selected work" };

export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow="Selected work" title="Spaces with a sense of place." description="Concept studies exploring how plan, material and light can shape the feeling of a space." />
      <section className="page-content"><div className="wrap project-list-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div><p className="wrap concept-note">These are illustrative concept studies. Project names, locations, sizes, dates and narratives are fictional.</p></section>
    </>
  );
}
