"use client";

import { useEffect, useState, type FormEvent } from "react";
import clinic from "../src/data/clinicData";
import en from "../src/locales/en";
import am from "../src/locales/am";
import CustomCursor from "../src/components/CustomCursor";
import ScrollExpandHero from "../src/components/ScrollExpandHero";
import WaterRippleImage from "../src/components/WaterRippleImage";

type Locale = "en" | "am";
const copy = { en, am };
const media = {
  blueWall: "/assets/images/clinic blue wall.png",
  reception: "/assets/images/clinic-reception-wide.jpg",
  detail: "/assets/images/clinic-details.jpg",
  close: "/assets/images/clinic-reception-close.jpg",
  team: "/assets/team/nova-team.jpg",
  dawit: "/assets/team/dawit adugna picture.png",
  logo: "/assets/logo/nova-logo.jpg",
};

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [menu, setMenu] = useState(false);
  const [tab, setTab] = useState<"appointment" | "inquiry">("appointment");
  const [review, setReview] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const t = copy[locale];
  const phoneHref = `tel:${clinic.phone.replace(/\s/g, "")}`;
  const whatsapp = `https://wa.me/${clinic.whatsapp}`;

  useEffect(() => {
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("in-view")), { threshold: .12 });
    document.querySelectorAll("[data-reveal]").forEach(node => reveal.observe(node));
    return () => reveal.disconnect();
  }, [locale]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setSubmitting(true); setSuccess(false);
    window.setTimeout(() => { setSubmitting(false); setSuccess(true); event.currentTarget.reset(); }, 850);
  };

  return <main>
    <CustomCursor />
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Nova home" data-cursor><img src={media.logo} alt="Nova Physiotherapy logo" /><span><strong>NOVA</strong><small>PHYSIOTHERAPY</small></span></a>
      <nav className={menu ? "nav-links open" : "nav-links"} aria-label="Primary navigation">
        {[[t.nav.About,"about"],[t.nav.Services,"services"],[t.nav.Team,"team"],[t.nav.Reviews,"reviews"],[t.nav.Contact,"contact"]].map(([label,id])=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{label}</a>)}
      </nav>
      <div className="header-actions"><button className="language" onClick={()=>setLocale(locale === "en" ? "am" : "en")}>{locale === "en" ? "አማ" : "EN"}</button><a className="header-cta" href="#booking">{t.nav.book}<span>↗</span></a><button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu ? "×" : "☰"}</button></div>
    </header>

    <ScrollExpandHero locale={locale} eyebrow={t.hero.eyebrow} titleA={t.hero.titleA} titleB={t.hero.titleB} body={t.hero.body} book={t.hero.book} inquiry={t.hero.inquiry} call={t.hero.call} phoneHref={phoneHref} />

    <section className="kinetic-strip" aria-label="Nova care principles"><div>{[t.trust.patients,t.trust.team,t.trust.approach,t.trust.hours,t.trust.patients,t.trust.team].map((item,i)=><span key={i}>{item}<b>✦</b></span>)}</div></section>

    <section className="story section" id="about">
      <div className="section-label" data-reveal><span>01</span><p>{t.about.eyebrow}</p></div>
      <div className="story-grid"><div className="story-title" data-reveal><p className="eyebrow">RESTORING MOVEMENT · RENEWING LIFE</p><h2>{t.about.title}</h2></div><div className="story-copy" data-reveal><p>{t.about.body}</p><a href="#services">{t.about.link}<i>↗</i></a></div></div>
      <div className="story-media" data-reveal><img src={media.blueWall} alt="Nova clinic blue wall lounge" /><div className="story-card"><span>NOVA / ADDIS ABABA</span><strong>Care begins<br/>with listening.</strong><small>09°01′N · 38°45′E</small></div><div className="image-number">01 / 04</div></div>
    </section>

    <section className="services section" id="services">
      <div className="section-label" data-reveal><span>02</span><p>{t.services.eyebrow}</p></div>
      <div className="services-head" data-reveal><h2>{t.services.title}</h2><p>{t.services.body}</p></div>
      <div className="service-grid">{clinic.services.map((service,index)=><article className="service-card" data-reveal data-cursor key={service.name}><span className="service-no">0{index+1}</span><div className="service-mark">{service.icon}</div><h3>{t.services.items[index].name}</h3><p>{t.services.items[index].body}</p><a href="#booking" aria-label={`Book ${service.name}`}>BOOK <b>↗</b></a></article>)}</div>
    </section>

    <section className="clinic-tour section">
      <div className="tour-grid"><figure className="tour-tall" data-reveal><img src={media.reception} alt="Nova clinic reception" /><figcaption>SPACE 01 · RECEPTION</figcaption></figure><div className="tour-copy" data-reveal><p className="eyebrow">DESIGNED FOR CALM</p><h2>A clinic that moves at your pace.</h2><p>Warm materials, focused treatment spaces and a team that makes every step feel understood.</p><div className="tour-stat"><strong>08:00</strong><span>Open six days a week<br/>until 8:00 PM</span></div></div><figure className="tour-small" data-reveal><img src={media.detail} alt="Nova clinic patient information display" /><figcaption>DETAIL 02 · WELCOME</figcaption></figure></div>
    </section>

    <section className="why section"><div className="why-stage" data-reveal><div className="why-image"><img src={media.close} alt="Warm Nova clinic reception interior" /></div><div className="why-content"><p className="eyebrow">{t.why.eyebrow}</p><h2>{t.why.title}</h2><div className="why-list">{t.why.points.map((point,i)=><div key={point}><span>0{i+1}</span><p>{point}</p></div>)}</div></div></div></section>

    <section className="team section" id="team">
      <div className="section-label" data-reveal><span>03</span><p>{t.team.eyebrow}</p></div><div className="team-head" data-reveal><h2>{t.team.title}</h2><p>Clinical expertise. Human energy. One shared goal: your progress.</p></div>
      <div className="team-editorial"><article className="team-feature" data-reveal data-cursor><img src={media.dawit} alt="Dawit Adugna, Senior Physiotherapist and General Manager" /><div><span>LEADERSHIP · 01</span><h3>Dawit Adugna</h3><p>{t.team.roles[0]}</p></div></article><article className="team-group" data-reveal><img src={media.team} alt="Nova Physiotherapy clinical team" /><div><span>THE NOVA TEAM · 02</span><h3>Progress is a team sport.</h3><p>{t.team.roles[1]} · {t.team.roles[2]}</p></div></article></div>
    </section>

    <section className="reviews section" id="reviews"><div className="review-top"><div className="section-label" data-reveal><span>04</span><p>{t.reviews.eyebrow}</p></div><div className="review-count"><strong>5.0</strong><span>★★★★★<small>{t.reviews.source}</small></span></div></div><div className="review-stage" data-reveal><span className="quote-mark">“</span><p>{clinic.reviews[review].quote}</p><div className="review-foot"><div><strong>{clinic.reviews[review].name}</strong><span>GOOGLE REVIEW · 5/5</span></div><div><button onClick={()=>setReview((review+clinic.reviews.length-1)%clinic.reviews.length)}>←</button><small>0{review+1} / 0{clinic.reviews.length}</small><button onClick={()=>setReview((review+1)%clinic.reviews.length)}>→</button></div></div></div></section>

    <section className="booking section" id="booking"><div className="booking-copy" data-reveal><p className="eyebrow">05 · {t.booking.eyebrow}</p><h2>{t.booking.title}</h2><p>{t.booking.body}</p><div className="quick-contact"><a href={phoneHref}>CALL NOVA <span>↗</span></a><a href={whatsapp} target="_blank" rel="noreferrer">WHATSAPP <span>↗</span></a></div></div><div className="booking-form" data-reveal><div className="tabs"><button className={tab==="appointment"?"active":""} onClick={()=>{setTab("appointment");setSuccess(false)}}>{t.booking.appointment}</button><button className={tab==="inquiry"?"active":""} onClick={()=>{setTab("inquiry");setSuccess(false)}}>{t.booking.inquiry}</button></div><form onSubmit={submit}><div className="form-row"><label>{t.booking.name}<input required name="name" placeholder={t.booking.namePlaceholder}/></label><label>{t.booking.phone}<input required name="phone" type="tel" placeholder="+251 9…"/></label></div>{tab==="appointment"?<div className="form-row"><label>{t.booking.service}<select required defaultValue=""><option value="" disabled>{t.booking.select}</option>{t.services.items.map(item=><option key={item.name}>{item.name}</option>)}</select></label><label>{t.booking.date}<input required type="date" name="date"/></label></div>:<label>{t.booking.email}<input required type="email" name="email" placeholder="you@email.com"/></label>}<label>{t.booking.message}<textarea rows={4} name="message" placeholder={t.booking.messagePlaceholder}/></label><button className="submit-button" disabled={submitting}>{submitting?t.booking.sending:t.booking.submit}<span>↗</span></button>{success&&<div className="success" role="status">✓ {t.booking.success}</div>}</form></div></section>

    <section className="contact" id="contact"><div className="contact-copy"><p className="eyebrow">06 · {t.nav.Contact}</p><h2>{t.contact.title}</h2><p>{t.contact.body}</p><a className="contact-call" href={phoneHref}>{clinic.phone}<span>CALL ↗</span></a></div><div className="contact-info"><div><span>{t.contact.addressLabel}</span><p>{clinic.address}</p><a href={clinic.maps} target="_blank" rel="noreferrer">{t.contact.directions} ↗</a></div><div><span>{t.contact.hoursLabel}</span><p>{clinic.hours}</p></div><div><span>{t.contact.socialLabel}</span><p><a href={clinic.socials.facebook}>FACEBOOK</a> · <a href={clinic.socials.instagram}>INSTAGRAM</a></p></div></div></section>

    <section className="ripple-finale"><WaterRippleImage src={media.blueWall} className="ripple-canvas"/><div className="ripple-overlay"><p>RESTORING MOVEMENT</p><h2>Renewing life.</h2><a href="#booking" className="button button-cream">BOOK YOUR VISIT <span>↗</span></a></div><div className="ripple-caption"><span>NOVA PHYSIOTHERAPY</span><span>ADDIS ABABA · ETHIOPIA</span></div></section>
    <footer><a className="brand footer-brand" href="#top"><img src={media.logo} alt="Nova logo"/><span><strong>NOVA</strong><small>PHYSIOTHERAPY</small></span></a><p>© {new Date().getFullYear()} NOVA PHYSIOTHERAPY SPECIALITY CLINIC</p><a href="#top">BACK TO TOP ↑</a></footer>
  </main>;
}
