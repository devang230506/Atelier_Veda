import Link from "next/link";
import RoomExperience from "@/components/room-experience";
import Reveal from "@/components/reveal";
import ProjectCard from "@/components/project-card";
import VisualStoryParallax from "@/components/visual-story-parallax";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <>
      <RoomExperience />
      <section className="visual-story-section section-pad" id="intro" aria-label="A visual study of architecture and interiors">
        <div className="wrap visual-story-heading">
          <Reveal><span className="eyebrow">A visual study / Spaces shaped by light</span></Reveal>
          <Reveal motion="right"><Link className="text-link" href="/about">Meet the studio <span aria-hidden="true">↗</span></Link></Reveal>
        </div>
        <VisualStoryParallax>
          <Reveal className="visual-story-card visual-story-card-main" motion="left">
            <figure>
              <div className="visual-story-parallax"><img src={projects[0].image} alt={projects[0].alt} loading="lazy" decoding="async" /></div>
              <figcaption><span>01 / The living space</span><span>Light · Timber · Quiet</span></figcaption>
            </figure>
          </Reveal>
          <div className="visual-story-side">
            <Reveal className="visual-story-card visual-story-card-detail" motion="right" delay={0.08}>
              <figure>
                <div className="visual-story-parallax"><img src={projects[1].gallery[0].src} alt={projects[1].gallery[0].alt} loading="lazy" decoding="async" /></div>
                <figcaption><span>02 / Material in focus</span><span>Stone · Linen</span></figcaption>
              </figure>
            </Reveal>
            <Reveal className="visual-story-card visual-story-card-landscape" motion="right" delay={0.16}>
              <figure>
                <div className="visual-story-parallax"><img src={projects[3].image} alt={projects[3].alt} loading="lazy" decoding="async" /></div>
                <figcaption><span>03 / A quieter outlook</span><span>Architecture · Landscape</span></figcaption>
              </figure>
            </Reveal>
          </div>
        </VisualStoryParallax>
        <div className="wrap visual-story-foot"><span>Architecture, interiors and the spaces between.</span><span>01 — 03</span></div>
      </section>

      <section className="marquee" aria-label="Architecture, interiors, landscape, lighting"><div>Architecture <i>✳</i> Interiors <i>✳</i> Landscape <i>✳</i> Light <i>✳</i> Material <i>✳</i> Architecture <i>✳</i> Interiors <i>✳</i> Landscape <i>✳</i></div></section>

      <section className="principles-section section-pad">
        <div className="wrap principles-heading"><Reveal><span className="eyebrow">A clear point of view</span><h2>Good spaces make room for life.</h2></Reveal><Reveal><p>From the first sketch to the last handle, the decisions should feel connected. We bring architecture, interiors and landscape into one conversation.</p></Reveal></div>
        <div className="wrap principles-grid"><Reveal><span>01 / Proportion</span><h3>Human scale</h3><p>Movement, sightlines and room proportions set the rhythm of daily life.</p></Reveal><Reveal><span>02 / Light</span><h3>Natural rhythm</h3><p>We consider how daylight changes through the day and where a room needs softness.</p></Reveal><Reveal><span>03 / Material</span><h3>Honest touch</h3><p>Stone, timber and plaster are chosen for how they feel and how they grow with use.</p></Reveal></div>
      </section>

      <section className="selected-section section-pad" id="selected-work">
        <div className="wrap section-heading"><Reveal><span className="eyebrow">Selected work / Concept studies</span><h2>Spaces with a sense of place.</h2></Reveal><Link className="text-link" href="/projects">View all projects <span aria-hidden="true">↗</span></Link></div>
        <div className="wrap project-grid">{projects.slice(0, 4).map((project, index) => <ProjectCard key={project.slug} project={project} index={index} featured />)}</div>
        <div className="wrap selected-footnote"><span>01 / 10</span><p>Homes, workspaces and places to pause. Each study begins with light, material and the way a space is used.</p><Link className="text-link" href="/projects">Explore the full collection <span aria-hidden="true">↗</span></Link></div>
        <p className="wrap concept-note">Concept projects for visual presentation. Locations, dimensions and narratives are illustrative.</p>
      </section>

      <section className="process-section section-pad">
        <div className="wrap process-layout"><Reveal><span className="eyebrow">The process</span><h2>Thoughtful from first conversation to final detail.</h2></Reveal><div className="process-list"><Reveal><b>01</b><div><h3>Listen</h3><p>Understand the site, the brief and the way you want to live.</p></div></Reveal><Reveal><b>02</b><div><h3>Imagine</h3><p>Explore plan, material and atmosphere through clear design options.</p></div></Reveal><Reveal><b>03</b><div><h3>Resolve</h3><p>Bring the chosen direction into a coordinated set of decisions.</p></div></Reveal><Reveal><b>04</b><div><h3>Realise</h3><p>Project support and site involvement are agreed to suit the brief.</p></div></Reveal></div></div>
      </section>

      <section className="closing-section">
        <div className="closing-image" role="img" aria-label="Sunlight falling across a quiet contemporary interior"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80" alt="" loading="lazy" decoding="async" /></div>
        <div className="closing-copy"><span className="eyebrow">A place to begin</span><h2>Let’s make space for what matters.</h2><Link className="pill-link" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link></div>
      </section>
    </>
  );
}
