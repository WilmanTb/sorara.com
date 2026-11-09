import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, Blocks, Braces, Code2, Smartphone } from "lucide-react";
import { projects } from "@/lib/projects";

const services = [
  { title: "Websites", description: "Clear, characterful websites that make the right first impression and turn visits into action.", icon: Code2, tint: "#b7ff6b", number: "01" },
  { title: "Web applications", description: "Purpose-built tools that make complex work feel simple, connected, and easy to manage.", icon: Braces, tint: "#a78bfa", number: "02" },
  { title: "Mobile applications", description: "Useful, intuitive mobile experiences that bring your service closer to the people who need it.", icon: Smartphone, tint: "#75cfff", number: "03" },
  { title: "Business systems", description: "Practical digital systems and automations that give your team time back.", icon: Blocks, tint: "#ff8b75", number: "04" },
];

const steps = [
  ["01", "Discover", "We get close to your goals, your people, and the real problem worth solving."],
  ["02", "Design", "We shape a clear direction and an experience that feels natural to use."],
  ["03", "Develop", "We build the product with care, keeping it responsive, reliable, and ready to grow."],
  ["04", "Launch", "We help bring it into the world and make sure you feel ready to run with it."],
];

export default function Home() {
  return (
    <>
      <section className="hero-shell">
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="wrap hero-content">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">Independent digital studio</p>
            <h1 className="display-title">Your ideas deserve a <span>digital world.</span> Let&apos;s build it.</h1>
            <p className="hero-description">We design and develop websites, applications, and digital systems that help turn ambitious ideas into reality.</p>
            <div className="hero-actions">
              <Link className="button-primary" href="/work">Explore our work <ArrowUpRight size={17} /></Link>
              <Link className="button-light" href="/contact">Start a project <ArrowRight size={16} /></Link>
            </div>
            <div className="hero-note"><span className="note-dot" /> Strategy, design &amp; development <span className="note-separator">/</span> Made for what&apos;s next</div>
          </div>
          <div className="hero-art" aria-label="A layered preview of a digital product interface">
            <div className="art-spark art-spark-a">✳</div>
            <div className="art-spark art-spark-b">✳</div>
            <div className="hero-window window-back">
              <div className="window-top"><i /><i /><i /><span>shopora.store</span></div>
              <div className="window-back-body"><div className="back-chip" /><div className="back-line long" /><div className="back-line" /><div className="back-shape" /></div>
            </div>
            <div className="hero-window window-front">
              <div className="mock-nav"><b>goodform<span>.</span></b><span>NEW ARRIVALS　 OBJECTS　 JOURNAL</span><div className="mock-bag">BAG <small>02</small></div></div>
              <div className="mock-hero"><div className="mock-copy"><small>THE EVERYDAY EDIT</small><strong>Made for<br />your kind<br />of living.</strong><span>Explore the collection ↗</span></div><div className="mock-photo"><div className="photo-orb" /><div className="photo-vase" /></div></div>
              <div className="mock-foot"><span>01 — OBJECTS WITH INTENTION</span><span>SCROLL TO EXPLORE ↓</span></div>
            </div>
            <div className="floating-sticker"><span>✦</span><small>IDEA<br />IN MOTION</small></div>
            <div className="art-caption">A good idea<br />looks good<br />in motion.</div>
          </div>
          <a className="hero-scroll" href="#selected-work" aria-label="Scroll to selected work"><ArrowDown size={16} /> Scroll to explore</a>
        </div>
      </section>

      <section className="intro-strip">
        <div className="wrap intro-inner"><span className="eyebrow">Small studio. Big-picture thinking.</span><p>We turn <em>“what if?”</em> into things people can use, love, and grow with.</p><span className="intro-mark">S<span>O</span>RARA</span></div>
      </section>

      <section className="section-pad work-section" id="selected-work">
        <div className="wrap">
          <div className="section-heading-row"><div><p className="eyebrow">Selected concepts / 2025—26</p><h2 className="display-title">Good ideas,<br /><span>made tangible.</span></h2><p className="concept-note">These are concept projects—not client work—created as examples of what we could build for your business. Use them as a starting point to explore ideas and shape a solution around your needs.</p></div><p className="section-intro">Explore each live preview to see its design direction, key features, and the thinking behind it.</p></div>
          <div className="home-project-grid">
            {projects.map((project, index) => (
              <Link className={`home-project home-project-${index + 1}`} href={`/work/${project.slug}`} key={project.slug}>
                <div className={`project-visual visual-${project.slug}`}>
                  {project.slug === "shopora" ? <div className="shopora-visual"><span className="visual-label">SHOPORA / YOUR NEW FAVORITE THING</span><div className="shopora-product"><div className="product-sun" /><div className="product-chair" /><span>THE EVERYDAY CHAIR<br /><b>$240</b></span></div><div className="shopora-word">Shop<br />better.</div></div> : null}
                  {project.slug === "manageflow" ? <div className="manage-visual"><div className="manage-sidebar"><b>m.</b><i /><i /><i /><i /></div><div className="manage-content"><span>MONDAY, OCTOBER 21</span><strong>Good morning, Alex</strong><small>Here&apos;s what&apos;s happening today.</small><div className="manage-stats"><i /><i /><i /></div><div className="manage-chart"><i /><i /><i /><i /><i /><i /><i /><i /></div></div><div className="manage-tag">A calmer way to work</div></div> : null}
                  {project.slug === "dinenow" ? <div className="dine-visual"><div className="dine-photo" /><div className="dine-overlay"><span>DINENOW PRESENTS</span><strong>Gather<br />around.</strong><small>GOOD FOOD. GOOD PEOPLE.</small></div><div className="dine-stamp">EST.<br /><b>2024</b></div></div> : null}
                  {project.slug === "gather-church" ? <div className="gather-visual"><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 700px) 100vw, 65vw" /><div className="gather-overlay"><span>A PLACE TO BELONG</span><strong>Find your<br />people.</strong><small>SUNDAYS / 10:00 AM</small></div></div> : null}
                  {project.slug === "brightpath-school" ? <div className="campus-visual"><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 700px) 100vw, 40vw" /><div className="campus-overlay"><span>LEARN / GROW / BELONG</span><strong>A bright<br />place to begin.</strong><small>DISCOVER BRIGHTPATH</small></div></div> : null}
                  {project.slug === "harborlight-hotel" ? <div className="hotel-visual"><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 700px) 100vw, 40vw" /><div className="hotel-overlay"><span>HARBORLIGHT / A BOUTIQUE STAY</span><strong>Stay a little<br />longer.</strong><small>ROOMS / RITUALS / REST</small></div></div> : null}
                  {project.slug === "admin-dashboard" || project.slug === "cashier-app" ? <div className="hotel-visual"><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" /><div className="hotel-overlay"><span>{project.slug === "admin-dashboard" ? "NORTHSTAR / OPERATIONS" : "COUNTERPOINT / POINT OF SALE"}</span><strong>{project.title}</strong><small>{project.slug === "admin-dashboard" ? "USERS / PRODUCTS / REPORTS" : "MINIMARKET / COFFEE / STORE"}</small></div></div> : null}
                  <span className="concept-mark">CONCEPT PROJECT</span>
                </div>
                <div className="project-meta"><div><span className="project-category">{project.category}</span><h3>{project.title}</h3></div><span className="project-arrow"><ArrowUpRight size={19} /></span></div>
                <p className="project-description">{project.shortDescription}</p>
                <div className="project-tags">{project.technologies.slice(0, 3).map((technology) => <span key={technology}>{technology}</span>)}</div>
              </Link>
            ))}
          </div>
          <div className="work-cta"><Link href="/work" className="text-link">Explore all projects <ArrowRight size={17} /></Link><span>{String(projects.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} CONCEPTS</span></div>
        </div>
      </section>

      <section className="services-section section-pad">
        <div className="wrap">
          <div className="services-top"><div><p className="eyebrow">What we make</p><h2 className="display-title">Digital, with<br />a <span>reason.</span></h2></div><p>Good technology should do more than work. It should make something easier, clearer, or more possible.</p></div>
          <div className="service-list">{services.map(({ title, description, icon: Icon, tint, number }) => <article className="service-row" key={title}><span className="service-number">{number}</span><span className="service-icon" style={{ backgroundColor: tint }}><Icon size={20} strokeWidth={1.7} /></span><h3>{title}</h3><p>{description}</p><Link href="/services" aria-label={`Learn more about ${title}`}><ArrowUpRight size={19} /></Link></article>)}</div>
          <div className="services-bottom"><span className="eyebrow">From first sketch to final pixel</span><Link className="text-link" href="/services">See how we can help <ArrowRight size={17} /></Link></div>
        </div>
      </section>

      <section className="process-section section-pad">
        <div className="wrap"><div className="process-heading"><p className="eyebrow">A clear path, together</p><h2 className="display-title">From maybe<br />to <span>made.</span></h2><p>No mystery process. Just good questions, shared decisions, and a steady move from idea to launch.</p></div><div className="process-steps">{steps.map(([number, title, description]) => <article className="process-step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></div>
      </section>

      <section className="home-cta"><div className="wrap cta-inner"><div><p className="eyebrow">The next move is yours</p><h2 className="display-title">Have an idea?<br />Let&apos;s make <span>something great.</span></h2></div><div className="cta-side"><p>Tell us what you&apos;re thinking. We&apos;ll help you figure out the next step.</p><Link className="button-dark" href="/contact">Let&apos;s talk <ArrowUpRight size={18} /></Link></div></div><div className="cta-bottom-mark">SORARA — MAKE YOUR NEXT IDEA REAL</div></section>
    </>
  );
}
