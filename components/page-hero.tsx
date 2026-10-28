import AnimatedHeading from "@/components/animated-heading";

export default function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <span className="eyebrow" style={{ color: "#c4aa83" }}>{eyebrow}</span>
        <AnimatedHeading text={title} />
        <p>{description}</p>
      </div>
    </section>
  );
}
