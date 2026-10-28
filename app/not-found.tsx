import Link from "next/link";
import AnimatedHeading from "@/components/animated-heading";

export default function NotFound() {
  return <section className="page-content"><div className="wrap"><span className="eyebrow">404 / Not found</span><AnimatedHeading text="This room doesn’t exist." /><p>The page may have moved or may never have been built.</p><Link className="text-link" href="/">Return home <span aria-hidden="true">↗</span></Link></div></section>;
}
