"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import styles from "./community-details.module.css";

export function ChurchUpdates({ locale }: { locale: Locale }) {
  const isId = locale === "id";
  const reflections = isId ? [
    ["Menghadirkan kasih dalam hal kecil", "Bacaan: Markus 12:31", "Kebaikan tidak selalu dimulai dari tindakan besar. Mendengarkan dengan sungguh-sungguh, menyapa tetangga, dan memberi waktu adalah cara sederhana untuk merawat sesama.", "Siapa yang bisa Anda dengarkan dengan lebih sabar hari ini?"],
    ["Memberi ruang untuk beristirahat", "Bacaan: Matius 11:28", "Di tengah kesibukan, berhenti sejenak membantu kita mengenali apa yang paling penting. Luangkan waktu untuk berdoa, bernapas, dan mensyukuri hal sederhana.", "Kebiasaan apa yang dapat memberi ruang untuk ketenangan minggu ini?"],
  ] : [
    ["Love in the small things", "Reading: Mark 12:31", "Kindness does not always begin with a grand gesture. Listening carefully, greeting a neighbor, and sharing our time are simple ways to care for one another.", "Who could you listen to more patiently today?"],
    ["Making room for rest", "Reading: Matthew 11:28", "In a busy day, pausing helps us notice what matters most. Make a little time to pray, breathe, and be grateful for ordinary gifts.", "What habit could make room for quiet this week?"],
  ];
  const notices = isId ? [
    ["Pengumpulan bahan pangan", "15 November 2026", "Contoh pengumuman: bawa bahan pangan tahan lama ke meja komunitas sebelum ibadah Minggu."],
    ["Pertemuan relawan", "18 November 2026", "Contoh pengumuman: orientasi bagi relawan penyambutan dan kegiatan komunitas pukul 18.30."],
    ["Ruang keluarga tersedia", "Setiap Minggu", "Contoh pengumuman: keluarga dapat menggunakan ruang tenang di dekat area penyambutan selama ibadah."],
  ] : [
    ["Community pantry collection", "November 15, 2026", "Sample notice: bring shelf-stable food to the community table before the Sunday gathering."],
    ["Volunteer welcome evening", "November 18, 2026", "Sample notice: an orientation for welcome-team and community volunteers at 6:30 pm."],
    ["Family room available", "Every Sunday", "Sample notice: families can use the quiet room near the welcome area during services."],
  ];
  return <>
    <section className={`${styles.section} ${styles.devotions}`} id="church-devotions"><span className={styles.label}>{isId ? "RENUNGAN HARIAN" : "DAILY REFLECTIONS"}</span><h2>{isId ? "Santapan rohani" : "Daily devotionals"}</h2><p>{isId ? "Renungan singkat untuk menemani hari Anda. Tulisan berikut dibuat untuk demo ini." : "Short original reflections written for this demo."}</p><div className={styles.twoColumns}>{reflections.map(([title, reading, body, question]) => <article className={styles.editorialItem} key={title}><span className={styles.label}>{reading}</span><h3>{title}</h3><p>{body}</p><details><summary>{isId ? "Pertanyaan renungan" : "Reflection question"}</summary><p>{question}</p></details></article>)}</div></section>
    <section className={styles.section} id="church-announcements"><span className={styles.label}>GATHER / {isId ? "KABAR KOMUNITAS" : "COMMUNITY NEWS"}</span><h2>{isId ? "Pengumuman" : "Announcements"}</h2><p>{isId ? "Pengumuman contoh untuk komunitas fiktif Gather Church." : "Sample announcements for the fictional Gather Church community."}</p><div className={styles.noticeList}>{notices.map(([title, date, body]) => <details key={title}><summary><span>{title}</span><small>{date}</small></summary><p>{body}</p></details>)}</div></section>
  </>;
}

export function SchoolProfile({ locale }: { locale: Locale }) {
  const isId = locale === "id";
  const stats = [["480", isId ? "Siswa" : "Students"], ["36", isId ? "Guru" : "Teachers"], ["24", isId ? "Tenaga kependidikan & staf" : "Support staff & employees"], ["20", isId ? "Ruang kelas" : "Classrooms"]];
  const facilities = isId ? [
    ["Perpustakaan & ruang baca", "Koleksi buku, meja belajar, dan ruang membaca kelompok."],
    ["Laboratorium sains", "Ruang eksperimen dengan alat dan pendampingan guru."],
    ["Laboratorium komputer", "Literasi digital, pemrograman, dan proyek multimedia."],
    ["Lapangan olahraga", "Pendidikan jasmani, permainan tim, dan kegiatan luar ruang."],
    ["Studio seni & musik", "Seni visual, musik, dan pertunjukan."],
    ["UKS, konseling & kantin", "Dukungan kesehatan, kesejahteraan siswa, dan makan siang."],
  ] : [
    ["Library & reading room", "Books, study desks, and space for shared reading."],
    ["Science laboratory", "Supervised experiments and practical discovery."],
    ["Computer laboratory", "Digital literacy, coding, and multimedia projects."],
    ["Sports grounds", "Physical education, team games, and outdoor activities."],
    ["Art & music studios", "Visual arts, music, and performance."],
    ["Health, counseling & dining", "Student health, wellbeing support, and a lunch space."],
  ];
  return <>
    <section className={`${styles.section} ${styles.school}`} id="school-profile"><span className={styles.label}>BRIGHTPATH / {isId ? "KENALI SEKOLAH" : "MEET THE SCHOOL"}</span><h2>{isId ? "Profil sekolah" : "School profile"}</h2><p>{isId ? "Brightpath adalah sekolah fiktif untuk jenjang dasar dan menengah pertama. Konsep ini mengutamakan rasa ingin tahu, pembelajaran berbasis proyek, serta kerja sama keluarga dan pendidik." : "Brightpath is a fictional primary and middle school emphasizing curiosity, project-based learning, and partnership between families and educators."}</p><div className={styles.stats} aria-label={isId ? "Statistik contoh sekolah" : "Sample school statistics"}>{stats.map(([count, label]) => <div key={label}><strong>{count}</strong><span>{label}</span></div>)}</div><p className={styles.disclaimer}>{isId ? "Seluruh angka adalah data contoh demo, bukan jumlah siswa atau pegawai sekolah nyata." : "All figures are demo sample data, not the enrollment or staffing of a real school."}</p><div className={styles.twoColumns}><article className={styles.editorialItem}><h3>{isId ? "Visi & misi" : "Vision & mission"}</h3><p>{isId ? "Membangun lingkungan belajar yang peduli dan inklusif, dengan ruang bagi siswa untuk berpikir kritis, berkreasi, dan berkontribusi pada komunitas." : "Build a caring, inclusive learning environment where students think critically, create confidently, and contribute to their community."}</p></article><article className={styles.editorialItem}><h3>{isId ? "Program & keseharian" : "Programs & daily life"}</h3><p>{isId ? "Jadwal contoh: Senin-Jumat, 08.00-15.00. Program meliputi literasi, matematika, sains, seni, olahraga, dan klub setelah sekolah." : "Sample hours: Monday-Friday, 8 am-3 pm. Programs include literacy, mathematics, science, arts, sports, and after-school clubs."}</p></article></div></section>
    <section className={styles.section} id="school-facilities"><span className={styles.label}>{isId ? "KAMPUS & DUKUNGAN SISWA" : "CAMPUS & STUDENT SUPPORT"}</span><h2>{isId ? "Fasilitas sekolah" : "School facilities"}</h2><div className={styles.facilityPhoto}><Image src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85" alt={isId ? "Foto ilustrasi ruang belajar" : "Illustrative classroom photograph"} fill sizes="(max-width: 700px) 100vw, 80vw" /></div><div className={styles.threeColumns}>{facilities.map(([title, description]) => <article className={styles.editorialItem} key={title}><h3>{title}</h3><p>{description}</p></article>)}</div><details className={styles.support}><summary>{isId ? "Kegiatan ekstrakurikuler & dukungan keluarga" : "Clubs & family support"}</summary><p>{isId ? "Contoh klub: robotika, paduan suara, sepak bola, seni, dan lingkungan. Dukungan keluarga mencakup orientasi, pertemuan guru, serta panduan kebutuhan belajar." : "Sample clubs: robotics, choir, football, art, and environmental studies. Family support includes orientation, teacher meetings, and learning-needs guidance."}</p></details></section>
  </>;
}

export const hotelRoomDetails = {
  morning: { size: "28 m2", image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85", en: { name: "The morning-light room", description: "A restful room with a king bed, a reading corner, and a Juliet balcony. Soft daylight and a quiet palette make it an easy place to unwind.", amenities: ["King bed, up to 2 guests", "Private bathroom and walk-in shower", "Wi-Fi, air conditioning, and in-room safe", "Coffee station and daily housekeeping"] }, id: { name: "Kamar dengan cahaya pagi", description: "Kamar tenang dengan tempat tidur king, sudut baca, dan balkon kecil. Cahaya alami dan warna lembut menghadirkan suasana nyaman untuk beristirahat.", amenities: ["King bed, hingga 2 tamu", "Kamar mandi pribadi dan shower", "Wi-Fi, AC, dan brankas", "Kopi di kamar dan pembersihan harian"] } },
  harbor: { size: "42 m2", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=85", en: { name: "The harbor suite", description: "A spacious suite with harbor views, a king bed, and a separate lounge for slow mornings or an evening indoors.", amenities: ["King bed, up to 2 guests", "Separate sitting area and harbor view", "Private bathroom, robes, and toiletries", "Wi-Fi, air conditioning, and coffee station"] }, id: { name: "Suite balkon laut", description: "Suite luas dengan pemandangan pelabuhan, king bed, dan area duduk terpisah untuk menikmati pagi atau malam yang santai.", amenities: ["King bed, hingga 2 tamu", "Area duduk dan pemandangan pelabuhan", "Kamar mandi pribadi, jubah, dan perlengkapan mandi", "Wi-Fi, AC, dan kopi di kamar"] } },
  garden: { size: "38 m2", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85", en: { name: "The garden suite", description: "A garden-facing suite with a private terrace, king bed, and an optional extra bed. A comfortable choice for a small family or a longer stay.", amenities: ["King bed and optional extra bed, up to 3 guests", "Private garden terrace", "Private bathroom and daily housekeeping", "Wi-Fi, air conditioning, and in-room safe"] }, id: { name: "Suite taman", description: "Suite menghadap taman dengan teras pribadi, king bed, dan pilihan tempat tidur tambahan. Cocok untuk keluarga kecil atau masa inap lebih panjang.", amenities: ["King bed dan extra bed opsional, hingga 3 tamu", "Teras taman pribadi", "Kamar mandi pribadi dan pembersihan harian", "Wi-Fi, AC, dan brankas"] } },
};
export type HotelRoomId = keyof typeof hotelRoomDetails;

export function RoomDialog({ roomId, locale, onClose }: { roomId: HotelRoomId; locale: Locale; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const room = hotelRoomDetails[roomId];
  const copy = room[locale];
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, []);
  return <dialog ref={dialogRef} className={styles.roomDialog} aria-labelledby="room-detail-title" onCancel={onClose} onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); onClose(); } }} onClick={(event) => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose(); } }}><button className={styles.closeDialog} type="button" onClick={onClose} aria-label={locale === "id" ? "Tutup detail kamar" : "Close room details"}><X size={20} /></button><div className={styles.roomPhoto}><Image src={room.image} alt={copy.name} fill sizes="(max-width: 700px) 100vw, 45vw" /></div><div className={styles.roomCopy}><span className={styles.label}>HARBORLIGHT / {room.size}</span><h2 id="room-detail-title">{copy.name}</h2><p>{copy.description}</p><h3>{locale === "id" ? "Fasilitas kamar" : "Room amenities"}</h3><ul>{copy.amenities.map((amenity) => <li key={amenity}>{amenity}</li>)}</ul><p className={styles.disclaimer}>{locale === "id" ? "Kamar dan fasilitas adalah contoh konsep hotel fiktif." : "Rooms and amenities are sample content for a fictional hotel."}</p></div></dialog>;
}

export function HotelInformation({ locale, onRoomClick }: { locale: Locale; onRoomClick: (room: HotelRoomId) => void }) {
  const isId = locale === "id";
  const services = isId ? [
    ["Restoran & sarapan", "Sarapan contoh 07.00-10.30, menu musiman, serta pilihan vegetarian. Kebutuhan diet dapat didiskusikan dengan tim hotel pada layanan nyata."],
    ["Resepsionis & concierge", "Resepsionis 24 jam, penitipan bagasi, dan rekomendasi lingkungan sekitar."],
    ["Kolam, kebugaran & relaksasi", "Kolam luar ruang, ruang kebugaran, dan pilihan perawatan relaksasi berdasarkan jadwal."],
    ["Transportasi & parkir", "Contoh layanan antar-jemput dengan pemesanan terlebih dahulu, parkir, dan panduan transportasi lokal."],
    ["Housekeeping & laundry", "Pembersihan kamar harian dan layanan laundry opsional dengan biaya tambahan."],
    ["Ruang pertemuan & aksesibilitas", "Ruang pertemuan kecil serta bantuan kebutuhan aksesibilitas berdasarkan ketersediaan."],
  ] : [
    ["Dining & breakfast", "Sample breakfast hours: 7-10:30 am, seasonal dishes, and vegetarian options. Dietary needs can be discussed with staff in a real service."],
    ["Reception & concierge", "24-hour reception, luggage storage, and neighborhood recommendations."],
    ["Pool, fitness & relaxation", "An outdoor pool, fitness room, and scheduled relaxation treatments."],
    ["Transfers & parking", "Sample pre-booked transfers, parking, and local transport guidance."],
    ["Housekeeping & laundry", "Daily room cleaning and optional laundry services at an additional charge."],
    ["Meetings & accessibility", "Small meeting spaces and assistance with accessibility needs, subject to availability."],
  ];
  return <>
    <section className={`${styles.section} ${styles.hotel}`} id="hotel-room-details"><span className={styles.label}>{isId ? "KENALI KAMAR KAMI" : "EXPLORE OUR ROOMS"}</span><h2>{isId ? "Temukan ruang untuk beristirahat" : "Find your room to unwind"}</h2><div className={styles.threeColumns}>{(Object.keys(hotelRoomDetails) as HotelRoomId[]).map((roomId) => { const room = hotelRoomDetails[roomId]; return <button className={styles.roomTrigger} key={roomId} onClick={() => onRoomClick(roomId)} type="button" aria-haspopup="dialog"><div className={styles.roomThumbnail}><Image src={room.image} alt={room[locale].name} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><span>{room[locale].name}</span><small>{room.size} / {isId ? "Lihat detail kamar" : "View room details"}</small></button>; })}</div></section>
    <section className={styles.section} id="hotel-services"><span className={styles.label}>HARBORLIGHT / {isId ? "LAYANAN TAMU" : "GUEST SERVICES"}</span><h2>{isId ? "Tentang hotel & layanan" : "About the hotel & services"}</h2><p>{isId ? "Konsep hotel butik di tepi laut untuk perjalanan santai, keluarga kecil, dan perjalanan bisnis. Semua layanan di bawah adalah contoh, bukan penawaran hotel nyata." : "A coastal boutique-hotel concept for relaxed breaks, small families, and business stays. All services below are sample content, not real hotel offers."}</p><div className={styles.threeColumns}>{services.map(([title, description]) => <article className={styles.editorialItem} key={title}><h3>{title}</h3><p>{description}</p></article>)}</div><details className={styles.support}><summary>{isId ? "Informasi menginap & kebijakan contoh" : "Stay information & sample policies"}</summary><p>{isId ? "Check-in contoh mulai 15.00, check-out sebelum 11.00. Early check-in, extra bed, dan kamar aksesibel bergantung ketersediaan. Sarapan, transfer, laundry, dan pembatalan mengikuti paket yang dipilih. Demo ini tidak menerima pembayaran atau pemesanan nyata." : "Sample check-in begins at 3 pm; check-out is before 11 am. Early arrival, extra beds, and accessible rooms are subject to availability. Breakfast, transfers, laundry, and cancellation terms depend on the package. This demo accepts no real payments or bookings."}</p></details></section>
  </>;
}