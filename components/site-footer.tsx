import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top wrap">
        <div className="footer-intro">
          <Link className="wordmark" href="/">Atelier <span>Veda</span><i aria-hidden="true">✳</i></Link>
          <p>Spaces shaped by light, proportion and material. Architecture and interiors for living, working and gathering.</p>
          <Link className="footer-cta" href="/contact">Discuss a project <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="footer-links"><h2>Explore</h2><Link href="/about">Studio</Link><Link href="/services">Services</Link><Link href="/projects">Projects</Link><Link href="/faq">FAQs</Link></div>
        <div className="footer-links"><h2>Information</h2><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms of use</Link><Link href="/cookies">Cookies & media</Link><Link href="/accessibility">Accessibility</Link></div>
      </div>
      <div className="footer-bottom wrap"><span>© 2026 Atelier Veda. Concept studio.</span><span>Concept imagery: <a href="https://unsplash.com/license" target="_blank" rel="noreferrer">Unsplash</a> · Replace with studio photography before launch.</span></div>
    </footer>
  );
}
