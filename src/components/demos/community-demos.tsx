"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  GraduationCap,
  MapPin,
  Search,
  Users,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import styles from "./community-demos.module.css";
import { ChurchUpdates, SchoolProfile, HotelInformation, RoomDialog, type HotelRoomId } from "./community-details";

export type CommunityDemoSlug = "gather-church" | "brightpath-school" | "harborlight-hotel";

export default function CommunityDemo({ slug, locale }: { slug: CommunityDemoSlug; locale: Locale }) {
  const title = slug === "gather-church" ? "Gather Church" : slug === "brightpath-school" ? "Brightpath School" : "Harborlight Hotel";
  const demoNotice = locale === "id" ? "SEMUA INTERAKSI BERSIFAT DEMO" : "ALL INTERACTIONS ARE A DEMO";

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <main className={styles.demo}>
      <div className={styles.previewBar}>
        <Link href={localePath(locale, `/work/${slug}`)} className={styles.backLink}><ArrowLeft size={15} />{locale === "id" ? "Kembali ke proyek" : "Back to project"}</Link>
        <span className={styles.previewLabel}><i />{locale === "id" ? "PRATINJAU DEMO KONSEP" : "CONCEPT DEMO PREVIEW"}</span>
        <div className={styles.languageLinks} aria-label={locale === "id" ? "Pilih bahasa" : "Choose language"}><Link aria-current={locale === "en" ? "page" : undefined} href={localePath("en", `/demo/${slug}`)}>EN</Link><Link aria-current={locale === "id" ? "page" : undefined} href={localePath("id", `/demo/${slug}`)}>ID</Link></div>
      </div>
      {slug === "gather-church" ? <GatherChurchDemo locale={locale} /> : null}
      {slug === "brightpath-school" ? <BrightpathSchoolDemo locale={locale} /> : null}
      {slug === "harborlight-hotel" ? <HarborlightHotelDemo locale={locale} /> : null}
      <footer className={styles.demoFooter}><span>{title.toUpperCase()} / {locale === "id" ? "KONSEP FIKTIF" : "FICTIONAL CONCEPT"}</span><span>{demoNotice}</span></footer>
    </main>
  );
}

function GatherChurchDemo({ locale }: { locale: Locale }) {
  const isId = locale === "id";
  const [topic, setTopic] = useState("All");
  const [visitSent, setVisitSent] = useState(false);
  const text = isId
    ? { nav: ["Tentang", "Kehidupan", "Khotbah", "Kunjungi"], welcome: "GEREJA LOKAL, PINTU TERBUKA", title: "Ada tempat\nuntukmu di sini.", intro: "Komunitas untuk bertumbuh, ruang untuk bertanya, dan selalu ada tempat di meja.", visit: "Rencanakan kunjungan", service: "IBADAH MINGGU", serviceTimes: "09.00 & 11.00", location: "18 Orchard Lane · Brooklyn", next: "Kehidupan komunitas", nextTitle: "Tumbuh bersama.", events: "ACARA MENDATANG", sermons: "Dengarkan dan renungkan", all: "Semua", faith: "Iman", community: "Komunitas", plan: "Kunjungan pertamamu", date: "Tanggal pilihan", people: "Jumlah tamu", send: "Simpan rencana demo", sent: "Rencana kunjungan demo tersimpan.", disclaimer: "Pratinjau ini tidak mengirimkan data atau menghubungi gereja." }
    : { nav: ["Our story", "Community", "Messages", "Visit"], welcome: "A NEIGHBORHOOD CHURCH, AN OPEN DOOR", title: "There is room\nfor you here.", intro: "A community to grow with, room to ask questions, and always a place at the table.", visit: "Plan your visit", service: "SUNDAY GATHERING", serviceTimes: "9:00 & 11:00 AM", location: "18 Orchard Lane · Brooklyn", next: "Life together", nextTitle: "Grow in good company.", events: "COMING TOGETHER", sermons: "Listen, reflect, begin again", all: "All", faith: "Faith", community: "Community", plan: "Your first visit", date: "Preferred day", people: "Guests", send: "Save demo visit plan", sent: "Your demo visit plan is saved.", disclaimer: "This preview does not send information or contact the church." };
  const sermonList = isId ? [
    { title: "Langkah kecil, kasih besar", speaker: "Pastor Maya Chen", topic: "Faith", date: "20 Okt" },
    { title: "Menjadi tetangga yang baik", speaker: "Jordan Ellis", topic: "Community", date: "13 Okt" },
    { title: "Ruang untuk memulai lagi", speaker: "Pastor Maya Chen", topic: "Faith", date: "06 Okt" },
  ] : [
    { title: "Small steps, generous love", speaker: "Pastor Maya Chen", topic: "Faith", date: "Oct 20" },
    { title: "The good work of being neighbors", speaker: "Jordan Ellis", topic: "Community", date: "Oct 13" },
    { title: "Room to begin again", speaker: "Pastor Maya Chen", topic: "Faith", date: "Oct 06" },
  ];
  const filteredSermons = topic === "All" ? sermonList : sermonList.filter((item) => item.topic === topic);

  function saveVisit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setVisitSent(true);
  }

  return (
    <div className={styles.churchSite}>
      <nav className={styles.sectionNav} aria-label={isId ? "Kabar gereja" : "Church updates"}><a href="#church-devotions">{isId ? "Santapan rohani" : "Daily devotionals"}</a><a href="#church-announcements">{isId ? "Pengumuman" : "Announcements"}</a></nav>
      <header className={styles.churchHeader}><Link href={localePath(locale, "/work/gather-church")} className={styles.churchLogo}><span className={styles.churchMark}>g</span>gather<span className={styles.logoDot}>.</span></Link><nav aria-label={isId ? "Navigasi gereja" : "Church navigation"}>{text.nav.slice(0, 3).map((item, index) => <a href={index === 0 ? "#church-story" : index === 1 ? "#church-life" : "#church-sermons"} key={item}>{item}</a>)}</nav><a className={styles.churchVisitLink} href="#church-visit">{text.nav[3]} <ArrowRight size={14} /></a></header>
      <section className={styles.churchHero} id="church-story"><Image src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1800&q=85" alt={isId ? "Cahaya matahari masuk ke ruang gereja" : "Sunlight falls into a welcoming church sanctuary"} fill priority sizes="100vw" /><div className={styles.churchHeroShade} /><div className={styles.churchHeroCopy}><span>{text.welcome}</span><h1>{text.title}</h1><p>{text.intro}</p><a href="#church-visit">{text.visit} <ArrowRight size={16} /></a></div><div className={styles.churchHeroFoot}><span>GATHER / BROOKLYN</span><span>{text.service} · {text.serviceTimes}</span></div></section>
      <section className={styles.churchIntro}><span>{text.service}</span><div><h2>{text.serviceTimes}</h2><p><MapPin size={15} />{text.location}</p></div><Link href="#church-visit">{text.visit}<ArrowRight size={15} /></Link></section>
      <section className={styles.churchLife} id="church-life"><div className={styles.sectionHeading}><div><span>{text.next}</span><h2>{text.nextTitle}</h2></div><span className={styles.sectionIndex}>01 — 03</span></div><div className={styles.eventGrid}><article><div className={styles.eventArt}><Users size={24} /><span>WED / 6:30 PM</span></div><small>{text.events} · COMMUNITY</small><h3>{isId ? "Makan malam bersama" : "Community table"}</h3><p>{isId ? "Makan malam santai, teman baru, semua dipersilakan." : "A relaxed shared meal. New faces and familiar ones welcome."}</p></article><article><div className={`${styles.eventArt} ${styles.eventArtAlt}`}><BookOpen size={24} /><span>SAT / 10:00 AM</span></div><small>{text.events} · GROWTH</small><h3>{isId ? "Lingkar baca pagi" : "Saturday reading circle"}</h3><p>{isId ? "Membaca, kopi, dan percakapan yang bermakna." : "A few pages, a good cup of coffee, an open conversation."}</p></article><article><div className={`${styles.eventArt} ${styles.eventArtWarm}`}><CalendarDays size={24} /><span>SUN / 9:00 AM</span></div><small>{text.events} · GATHERING</small><h3>{isId ? "Ibadah hari Minggu" : "Sunday gathering"}</h3><p>{isId ? "Musik, pesan singkat, dan waktu untuk terhubung." : "Music, a short message, and time to reconnect."}</p></article></div></section>
      <section className={styles.sermonSection} id="church-sermons"><div className={styles.sectionHeading}><div><span>GATHER / AUDIO</span><h2>{text.sermons}</h2></div><div className={styles.churchFilters} role="group" aria-label={isId ? "Filter khotbah" : "Filter messages"}>{[["All", text.all], ["Faith", text.faith], ["Community", text.community]].map(([key, label]) => <button aria-pressed={topic === key} className={topic === key ? styles.churchFilterActive : ""} key={key} onClick={() => setTopic(key)} type="button">{label}</button>)}</div></div><div className={styles.sermonList}>{filteredSermons.map((sermon, index) => <article className={styles.sermonRow} key={sermon.title}><span className={styles.sermonNumber}>0{index + 1}</span><button className={styles.playButton} type="button" aria-label={`${isId ? "Putar demo" : "Play demo"}: ${sermon.title}`}>▶</button><div><h3>{sermon.title}</h3><span>{sermon.speaker} · {sermon.date}</span></div><span className={styles.sermonTopic}>{sermon.topic}</span><span className={styles.sermonDuration}>24:18</span></article>)}</div><p className={styles.communityDemoNote}>{isId ? "Audio merupakan elemen demo dan tidak memutar rekaman sungguhan." : "Audio controls are visual demo elements; no real recording is streamed."}</p></section>
      <section className={styles.visitSection} id="church-visit"><div><span>{text.visit.toUpperCase()}</span><h2>{text.plan}</h2><p>{text.serviceTimes}<br />{text.location}</p></div><form className={styles.visitForm} onSubmit={saveVisit}>{visitSent ? <div className={styles.visitSuccess} role="status"><Check size={18} /><div><b>{text.sent}</b><small>{text.disclaimer}</small></div></div> : <><label>{text.date}<input required type="date" /></label><label>{text.people}<select defaultValue="2"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4+</option></select></label><button type="submit">{text.send}<ArrowRight size={15} /></button><small>{text.disclaimer}</small></>}</form></section>
      <ChurchUpdates locale={locale} />
      <footer className={styles.communityFooter}><Link href={localePath(locale, "/work/gather-church")}>gather<span>.</span></Link><span>CONCEPT PROJECT / DEMO ONLY</span></footer>
    </div>
  );
}

function BrightpathSchoolDemo({ locale }: { locale: Locale }) {
  const isId = locale === "id";
  const [tab, setTab] = useState<"overview" | "calendar" | "admissions" | "resources">("overview");
  const [checkedSteps, setCheckedSteps] = useState<string[]>([]);
  const [monthOffset, setMonthOffset] = useState(0);
  const text = isId
    ? { nav: ["Belajar", "Kehidupan", "Penerimaan"], visit: "Kunjungi sekolah", welcome: "BELAJAR / BERTUMBUH / BERSAMA", hero: "Awal yang cerah\ndimulai di sini.", intro: "Tempat ingin tahu tumbuh, pertemanan dimulai, dan setiap anak menemukan jalannya.", discover: "Kenali Brightpath", overview: "Gambaran umum", calendar: "Kalender", admissions: "Penerimaan", resources: "Sumber daya", learning: "Belajar dengan rasa ingin tahu.", learningCopy: "Hari-hari dipenuhi pertanyaan, eksperimen, kerja sama, dan waktu untuk mendalami hal yang membuat kita penasaran.", campus: "Kehidupan di Brightpath", admissionsTitle: "Langkah awal yang mudah", checklist: "Daftar persiapan", complete: "langkah selesai", calendarTitle: "Kalender sekolah", prev: "Bulan sebelumnya", next: "Bulan berikutnya", resourceTitle: "Pusat keluarga", resourceCopy: "Panduan praktis untuk hari sekolah yang lancar.", noData: "Informasi ini adalah contoh konsep, bukan pengumuman sekolah sungguhan." }
    : { nav: ["Learning", "Community", "Admissions"], visit: "Visit our school", welcome: "LEARN / GROW / BELONG", hero: "A bright place\nto begin.", intro: "Where curiosity grows, friendships begin, and every student finds their own way forward.", discover: "Discover Brightpath", overview: "Our approach", calendar: "Calendar", admissions: "Admissions", resources: "Resources", learning: "Learning starts with curiosity.", learningCopy: "Days are filled with questions, experiments, collaboration, and time to go deeper into the things that make us wonder.", campus: "Life at Brightpath", admissionsTitle: "A simple place to start", checklist: "Your admissions checklist", complete: "steps complete", calendarTitle: "School calendar", prev: "Previous month", next: "Next month", resourceTitle: "Family resource center", resourceCopy: "Helpful guides for a smooth school day.", noData: "This is fictional concept content, not a real school announcement." }
  const admissionsSteps = isId ? ["Jelajahi pendekatan belajar kami", "Ikuti tur kampus demo", "Siapkan dokumen pendaftaran", "Pilih waktu untuk percakapan keluarga"] : ["Explore our learning approach", "Take a concept campus tour", "Gather enrollment documents", "Choose a time for a family conversation"];
  const events = isId ? ["Tur kampus demo", "Hari sains", "Pameran karya siswa", "Libur sekolah"] : ["Concept campus tour", "Science discovery day", "Student showcase", "School holiday"];
  const resources = isId ? ["Panduan keluarga baru", "Rutinitas & perlengkapan", "Transportasi & kedatangan"] : ["New family guide", "Routines & school supplies", "Transport & arrival"];
  const monthName = new Intl.DateTimeFormat(isId ? "id-ID" : "en-US", { month: "long", year: "numeric" }).format(new Date(2026, 9 + monthOffset, 1));

  function toggleStep(step: string) {
    setCheckedSteps((current) => current.includes(step) ? current.filter((item) => item !== step) : [...current, step]);
  }

  return (
    <div className={styles.schoolSite}>
      <nav className={styles.sectionNav} aria-label={isId ? "Informasi sekolah" : "School information"}><a href="#school-profile">{isId ? "Profil sekolah" : "School profile"}</a><a href="#school-facilities">{isId ? "Fasilitas sekolah" : "School facilities"}</a></nav>
      <header className={styles.schoolHeader}><Link href={localePath(locale, "/work/brightpath-school")} className={styles.schoolLogo}><span className={styles.schoolLogoIcon}><GraduationCap size={21} /></span>brightpath<span>.</span></Link><nav aria-label={isId ? "Navigasi sekolah" : "School navigation"}>{text.nav.map((item, index) => <button key={item} onClick={() => setTab(index === 0 ? "overview" : index === 1 ? "calendar" : "admissions")} type="button">{item}</button>)}</nav><a href="#school-visit" className={styles.schoolVisitLink}>{text.visit}<ArrowRight size={14} /></a></header>
      <section className={styles.schoolHero}><Image src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=85" alt={isId ? "Ruang kelas cerah dengan siswa belajar bersama" : "A bright classroom where students learn together"} fill priority sizes="100vw" /><div className={styles.schoolHeroShade} /><div className={styles.schoolHeroCopy}><span>{text.welcome}</span><h1>{text.hero}</h1><p>{text.intro}</p><button onClick={() => setTab("overview")} type="button">{text.discover}<ArrowRight size={15} /></button></div><div className={styles.schoolHeroFoot}><span>BRIGHTPATH / BROOKLYN</span><span>DEMO CAMPUS / FALL TERM</span></div></section>
      <div className={styles.schoolTabs} role="tablist" aria-label={isId ? "Bagian sekolah" : "School sections"}>{([["overview", text.overview], ["calendar", text.calendar], ["admissions", text.admissions], ["resources", text.resources]] as const).map(([key, label]) => <button aria-selected={tab === key} className={tab === key ? styles.schoolTabActive : ""} key={key} onClick={() => setTab(key)} role="tab" type="button">{label}</button>)}</div>
      <section className={styles.schoolContent}>
        {tab === "overview" ? <div className={styles.schoolOverview}><div className={styles.schoolIntro}><span>{text.overview.toUpperCase()}</span><h2>{text.learning}</h2><p>{text.learningCopy}</p><button onClick={() => setTab("admissions")} type="button">{text.visit}<ArrowRight size={15} /></button></div><div className={styles.schoolFeatures}><div><span>01</span><h3>{isId ? "Belajar berbasis proyek" : "Project-based learning"}</h3><p>{isId ? "Ide besar tumbuh dari pengalaman nyata." : "Big ideas grow through hands-on work."}</p></div><div><span>02</span><h3>{isId ? "Ruang untuk berkembang" : "Room to grow"}</h3><p>{isId ? "Dukungan personal di setiap tahap." : "Personal support at every stage."}</p></div><div><span>03</span><h3>{isId ? "Komunitas yang peduli" : "A caring community"}</h3><p>{isId ? "Keluarga dan pendidik bekerja bersama." : "Families and educators learn together."}</p></div></div></div> : null}
        {tab === "calendar" ? <div className={styles.schoolCalendar}><div className={styles.schoolSectionHead}><div><span>{text.campus}</span><h2>{text.calendarTitle}</h2></div><div className={styles.monthStepper}><button onClick={() => setMonthOffset((month) => month - 1)} type="button" aria-label={text.prev}>‹</button><b>{monthName}</b><button onClick={() => setMonthOffset((month) => month + 1)} type="button" aria-label={text.next}>›</button></div></div><div className={styles.schoolEventList}>{events.map((event, index) => <article key={event}><span className={styles.eventDate}><b>{[18, 22, 27, 31][index]}</b><small>{monthName.split(" ")[0].slice(0, 3)}</small></span><div><span>{["9:00 AM", "10:30 AM", "1:00 PM", "ALL DAY"][index]}</span><h3>{event}</h3></div><CalendarDays size={17} /></article>)}</div><p className={styles.schoolSampleNote}>{text.noData}</p></div> : null}
        {tab === "admissions" ? <div className={styles.schoolAdmissions}><div className={styles.schoolSectionHead}><div><span>{text.admissions}</span><h2>{text.admissionsTitle}</h2></div><span className={styles.checklistProgress}>{checkedSteps.length}/4 {text.complete}</span></div><p>{text.noData}</p><div className={styles.admissionsSteps}>{admissionsSteps.map((step, index) => <label className={styles.admissionStep} key={step}><input checked={checkedSteps.includes(step)} onChange={() => toggleStep(step)} type="checkbox" /><span className={styles.admissionNumber}>0{index + 1}</span><span>{step}</span><Check size={17} /></label>)}</div></div> : null}
        {tab === "resources" ? <div className={styles.schoolResources}><div className={styles.schoolSectionHead}><div><span>{text.resources}</span><h2>{text.resourceTitle}</h2></div><span className={styles.sampleMark}>{isId ? "KELUARGA" : "FOR FAMILIES"}</span></div><p>{text.resourceCopy}</p><div className={styles.resourceCards}>{resources.map((resource, index) => <article key={resource}><span>{index === 0 ? <BookOpen size={19} /> : index === 1 ? <CalendarDays size={19} /> : <MapPin size={19} />}</span><h3>{resource}</h3><button onClick={(event) => { event.currentTarget.textContent = isId ? "Panduan demo dibuka" : "Demo guide opened"; }} type="button">{isId ? "Buka panduan" : "Open guide"}<ArrowRight size={14} /></button></article>)}</div></div> : null}
      </section>
      <section className={styles.schoolVisit} id="school-visit"><div><span>BRIGHTPATH / {isId ? "PENERIMAAN" : "ADMISSIONS"}</span><h2>{text.visit}</h2><p>{text.noData}</p></div><button onClick={() => setTab("admissions")} type="button">{isId ? "Lihat langkah pendaftaran" : "Explore admissions steps"}<ArrowRight size={15} /></button></section>
      <SchoolProfile locale={locale} />
      <footer className={styles.communityFooter}><Link href={localePath(locale, "/work/brightpath-school")}>brightpath<span>.</span></Link><span>CONCEPT PROJECT / DEMO ONLY</span></footer>
    </div>
  );
}

function HarborlightHotelDemo({ locale }: { locale: Locale }) {
  const isId = locale === "id";
  const [roomDetailsId, setRoomDetailsId] = useState<HotelRoomId | null>(null);
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [guests, setGuests] = useState("2");
  const [searched, setSearched] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const text = isId
    ? { nav: ["Menginap", "Fasilitas", "Lokasi"], heroTag: "HARBORLIGHT / TEMPAT UNTUK BERSANTAI", heroTitle: "Biarkan hari\nmelambat.", heroCopy: "Hotel butik tepi laut dengan ruang untuk beristirahat, mengisi ulang, dan merasa seperti di rumah.", findStay: "Cari kamar", stay: "Rencanakan masa inap", arrival: "Tanggal check-in", departure: "Tanggal check-out", guests: "Tamu", search: "Lihat ketersediaan", rooms: "Kamar pilihan kami", perNight: "per malam", choose: "Pilih kamar", selected: "Kamar dipilih", confirm: "Konfirmasi demo", confirmed: "Pemesanan demo tersimpan.", demoNote: "Tidak ada pemesanan nyata atau pembayaran yang dilakukan.", standard: "Kamar dengan cahaya pagi", suite: "Suite balkon laut", garden: "Suite taman", amenities: "Fasilitas & kenyamanan", location: "Di tepi laut, dekat segalanya.", concept: "KONSEP HOTEL / KETERSEDIAAN DAN PEMESANAN HANYA DEMO", storyLabel: "SENI MENIKMATI KEDATANGAN", amenitiesEyebrow: "DIBUAT UNTUK MOMEN DI ANTARA KEGIATAN", locationEyebrow: "HARBORLIGHT / LOKASI", footerNote: "PROYEK KONSEP / DEMO SAJA" }
    : { nav: ["Stay", "Amenities", "Location"], heroTag: "HARBORLIGHT / ROOM TO UNWIND", heroTitle: "Let the day\nslow down.", heroCopy: "A boutique coastal stay with space to rest, reset, and feel a little more at home.", findStay: "Find your stay", stay: "Plan your stay", arrival: "Check in", departure: "Check out", guests: "Guests", search: "Check availability", rooms: "A few ways to stay", perNight: "per night", choose: "Choose room", selected: "Selected room", confirm: "Confirm demo booking", confirmed: "Your demo stay is saved.", demoNote: "No real booking was made and no payment was collected.", standard: "The morning-light room", suite: "The harbor suite", garden: "The garden suite", amenities: "A few thoughtful comforts", location: "By the water, close to everything.", concept: "HOTEL CONCEPT / AVAILABILITY AND BOOKING ARE A DEMO", storyLabel: "THE ART OF ARRIVING", amenitiesEyebrow: "MADE FOR THE IN-BETWEEN MOMENTS", locationEyebrow: "HARBORLIGHT / FIND US", footerNote: "CONCEPT PROJECT / DEMO ONLY" };
  const rooms = [
    { id: "morning", name: text.standard, details: isId ? "King bed · Balkon kecil · 2 tamu" : "King bed · Juliet balcony · Sleeps 2", image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85", rate: 215 },
    { id: "harbor", name: text.suite, details: isId ? "King bed · Pemandangan laut · 2 tamu" : "King bed · Harbor view · Sleeps 2", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=85", rate: 295 },
    { id: "garden", name: text.garden, details: isId ? "King bed · Teras taman · 3 tamu" : "King bed · Garden terrace · Sleeps 3", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85", rate: 265 },
  ];

  function searchAvailability(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearched(true);
    setSelectedRoom(null);
    setBookingConfirmed(false);
  }

  function confirmBooking() {
    setBookingConfirmed(true);
  }

  return (
    <div className={styles.hotelSite}>
      <nav className={styles.sectionNav} aria-label={isId ? "Informasi hotel" : "Hotel information"}><a href="#hotel-room-details">{isId ? "Detail kamar" : "Room details"}</a><a href="#hotel-services">{isId ? "Layanan hotel" : "Hotel services"}</a></nav>
      <header className={styles.hotelHeader}><Link href={localePath(locale, "/work/harborlight-hotel")} className={styles.hotelLogo}>harborlight<span>.</span></Link><nav aria-label={isId ? "Navigasi hotel" : "Hotel navigation"}>{text.nav.map((item, index) => <a href={index === 0 ? "#hotel-stay" : index === 1 ? "#hotel-amenities" : "#hotel-location"} key={item}>{item}</a>)}</nav><a className={styles.hotelReserveLink} href="#hotel-stay">{text.findStay}<ArrowRight size={14} /></a></header>
      <section className={styles.hotelHero}><Image src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=90" alt={isId ? "Kolam renang di hotel butik dekat laut" : "A peaceful boutique hotel pool beside the coast"} fill priority sizes="100vw" /><div className={styles.hotelHeroShade} /><div className={styles.hotelHeroCopy}><span>{text.heroTag}</span><h1>{text.heroTitle}</h1><p>{text.heroCopy}</p><a href="#hotel-stay">{text.findStay}<ArrowRight size={15} /></a></div><div className={styles.hotelHeroFoot}><span>HARBORLIGHT / COASTAL STAY</span><span>ROOM TO RESET</span><span>01 — 03</span></div></section>
      <section className={styles.hotelStory}><span>{text.storyLabel}</span><p>{isId ? "Ritme yang lebih pelan, detail yang dipikirkan dengan cermat, dan ruang untuk menikmati waktu." : "A slower rhythm, thoughtful details, and a little room to enjoy the time away."}</p></section>
      <section className={styles.hotelBooking} id="hotel-stay">
        <div className={styles.hotelSectionHeading}><div><span>HARBORLIGHT / {isId ? "MASA INAP" : "YOUR STAY"}</span><h2>{text.stay}</h2></div><p>{isId ? "Pilih tanggal untuk melihat pratinjau kamar yang tersedia." : "Choose your dates to preview the rooms available."}</p></div>
        <form className={styles.hotelSearchForm} onSubmit={searchAvailability}><label>{text.arrival}<input required aria-label={text.arrival} type="date" value={arrivalDate} onChange={(event) => { setArrivalDate(event.target.value); setSearched(false); }} /></label><label>{text.departure}<input required aria-label={text.departure} type="date" min={arrivalDate || undefined} value={departureDate} onChange={(event) => { setDepartureDate(event.target.value); setSearched(false); }} /></label><label>{text.guests}<select value={guests} onChange={(event) => setGuests(event.target.value)}><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></label><button type="submit">{text.search}<Search size={15} /></button></form>
        {searched ? <div className={styles.roomResults}>
          <div className={styles.roomResultHeading}><h3>{text.rooms}</h3><span>{arrivalDate} — {departureDate} · {guests} {text.guests.toLowerCase()}</span></div>
          <div className={styles.hotelRoomGrid}>{rooms.map((room) => <article className={styles.hotelRoomCard} key={room.id}>
            <button className={styles.hotelRoomImage} onClick={() => setRoomDetailsId(room.id as HotelRoomId)} type="button" aria-haspopup="dialog" aria-label={`${isId ? "Lihat detail" : "View details"}: ${room.name}`}><Image src={room.image} alt={room.name} fill sizes="(max-width: 700px) 100vw, 33vw" /></button>
            <div className={styles.hotelRoomInfo}><h4><button className={styles.roomNameButton} onClick={() => setRoomDetailsId(room.id as HotelRoomId)} type="button" aria-haspopup="dialog">{room.name}</button></h4><p>{room.details}</p><div><strong>${room.rate}</strong><span>{text.perNight}</span></div><button className={selectedRoom === room.id ? styles.hotelRoomSelected : styles.hotelRoomButton} onClick={() => { setSelectedRoom(room.id); setBookingConfirmed(false); }} type="button">{selectedRoom === room.id ? <><Check size={14} />{text.selected}</> : text.choose}</button></div>
          </article>)}</div>
        </div> : null}
        {selectedRoom ? <div className={styles.hotelConfirm}><span>{rooms.find((room) => room.id === selectedRoom)?.name}</span>{bookingConfirmed ? <p role="status"><Check size={16} />{text.confirmed} <small>{text.demoNote}</small></p> : <button onClick={confirmBooking} type="button">{text.confirm}<ArrowRight size={15} /></button>}</div> : null}
        <p className={styles.hotelDemoNote}>{text.concept}</p>
      </section>
      <section className={styles.hotelAmenities} id="hotel-amenities"><div className={styles.hotelSectionHeading}><div><span>{text.amenitiesEyebrow}</span><h2>{text.amenities}</h2></div></div><div className={styles.amenityGrid}><article><span>01</span><h3>{isId ? "Sarapan perlahan" : "A slower breakfast"}</h3><p>{isId ? "Hidangan lokal dan kopi yang diseduh dengan cermat." : "Local ingredients and coffee poured with care."}</p></article><article><span>02</span><h3>{isId ? "Kolam & taman" : "Pool & garden"}</h3><p>{isId ? "Ruang tenang untuk membaca dan bersantai." : "Quiet corners to read, rest, or do nothing at all."}</p></article><article><span>03</span><h3>{isId ? "Kenali sekitar" : "Know the neighborhood"}</h3><p>{isId ? "Peta pilihan dan rekomendasi dari tim hotel." : "A considered guide to local places worth finding."}</p></article></div></section>
      <section className={styles.hotelLocation} id="hotel-location"><span>{text.locationEyebrow}</span><h2>{text.location}</h2><p>18 Seaview Lane · Brooklyn, New York</p><a href="#hotel-stay">{text.findStay}<ArrowRight size={15} /></a></section>
      <HotelInformation locale={locale} onRoomClick={setRoomDetailsId} />
      {roomDetailsId ? <RoomDialog roomId={roomDetailsId} locale={locale} onClose={() => setRoomDetailsId(null)} /> : null}
      <footer className={styles.communityFooter}><Link href={localePath(locale, "/work/harborlight-hotel")}>harborlight<span>.</span></Link><span>{text.footerNote}</span></footer>
    </div>
  );
}
