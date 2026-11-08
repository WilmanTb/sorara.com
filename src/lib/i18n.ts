import type { Project, ProjectCategory } from "@/lib/projects";

export type Locale = "en" | "id";

export const interfaceText = {
  en: {
    home: "Home",
    work: "Work",
    services: "Services",
    about: "About",
    contact: "Contact",
    startProject: "Start a project",
    explore: "Explore",
    selectedWork: "Selected work",
    aboutSorara: "About SORARA",
    getInTouch: "Get in touch",
    sayHello: "Tell us what you're imagining",
    contactPending: "Personal contact channels are being configured.",
    filterLabel: "Filter projects by category",
    all: "All",
    website: "Website",
    webApplication: "Web Application",
    mobileApplication: "Mobile Application",
    businessSystem: "Business System",
    conceptProject: "CONCEPT PROJECT",
    emptyTitle: "Nothing in this collection just yet.",
    emptyCopy: "Try another category to see what we are imagining.",
    showAll: "Show all projects",
    concepts: "Concept projects",
  },
  id: {
    home: "Beranda",
    work: "Karya",
    services: "Layanan",
    about: "Tentang",
    contact: "Kontak",
    startProject: "Mulai proyek",
    explore: "Jelajahi",
    selectedWork: "Karya pilihan",
    aboutSorara: "Tentang SORARA",
    getInTouch: "Hubungi kami",
    sayHello: "Ceritakan ide Anda",
    contactPending: "Kanal kontak pribadi sedang disiapkan.",
    filterLabel: "Filter proyek berdasarkan kategori",
    all: "Semua",
    website: "Situs web",
    webApplication: "Aplikasi web",
    mobileApplication: "Aplikasi seluler",
    businessSystem: "Sistem bisnis",
    conceptProject: "PROYEK KONSEP",
    emptyTitle: "Belum ada proyek di kategori ini.",
    emptyCopy: "Pilih kategori lain untuk melihat konsep kami.",
    showAll: "Tampilkan semua proyek",
    concepts: "Proyek konsep",
  },
} satisfies Record<Locale, Record<string, string>>;

const categoryText: Record<Locale, Record<ProjectCategory, string>> = {
  en: {
    Website: "Website",
    "Web Application": "Web Application",
    "Mobile Application": "Mobile Application",
    "Business System": "Business System",
  },
  id: {
    Website: "Situs web",
    "Web Application": "Aplikasi web",
    "Mobile Application": "Aplikasi seluler",
    "Business System": "Sistem bisnis",
  },
};

const indonesianProjectCopy: Record<string, Partial<Project>> = {
  shopora: {
    shortDescription: "Cara yang lebih hangat dan terkurasi untuk menemukan barang yang layak disimpan.",
    overview: "Shopora adalah konsep toko daring yang menghadirkan produk rumah independen dengan pengalaman istimewa. Cerita editorial, katalog yang mudah dijelajahi, dan alur pembayaran yang sederhana membuat produk tetap menjadi fokus.",
    problem: "Belanja daring sering terasa seperti memilah rak tanpa ujung. Toko independen membutuhkan pengalaman digital yang terasa terkurasi tanpa membuat kebutuhan dasar sulit ditemukan.",
    solution: "Kami membayangkan toko daring yang percaya diri dan tenang, dengan cerita produk yang kuat, jalur katalog yang jelas, dan proses pembayaran yang praktis.",
    features: ["Katalog produk pilihan", "Halaman detail produk editorial", "Konsep keranjang dan pembayaran", "Konsep tampilan pengelolaan pesanan"],
    imageAlt: "Koleksi pakaian dan aksesori bernuansa netral yang ditata dengan cermat",
  },
  manageflow: {
    shortDescription: "Pusat kendali yang lebih tenang untuk berbagai aktivitas bisnis yang terus berkembang.",
    overview: "ManageFlow adalah konsep ruang kerja pengelolaan bisnis yang menyatukan tugas, aktivitas tim, dan laporan dalam satu tampilan yang jelas. Tujuannya mengubah kesibukan operasional menjadi gambaran yang membantu menentukan prioritas.",
    problem: "Saat tim berkembang, informasi tersebar di spreadsheet, pesan, dan berbagai alat yang tidak saling terhubung. Gambaran utuh makin sulit dilihat dan pekerjaan kecil lebih mudah terlewat.",
    solution: "Dasbor yang terarah membantu memperjelas prioritas, menghubungkan alur kerja harian, dan menyajikan laporan yang mudah dipahami.",
    features: ["Ringkasan metrik bisnis", "Pelacakan alur kerja dan tugas", "Ikhtisar aktivitas tim", "Konsep dasbor pelaporan"],
    imageAlt: "Meja kerja rapi dengan laptop yang menampilkan grafik analitik",
  },
  dinenow: {
    shortDescription: "Restoran lingkungan yang punya ruang lebih untuk membangkitkan selera.",
    overview: "DineNow adalah konsep situs restoran lingkungan yang mengutamakan makanan lezat dan kebersamaan. Menu, reservasi, dan informasi kunjungan disatukan dalam satu tempat yang mengundang.",
    problem: "Situs restoran seharusnya membuat orang ingin datang sekaligus memudahkan mereka merencanakan kunjungan. Namun, menu, jam buka, dan reservasi sering sulit ditemukan atau tidak diperbarui.",
    solution: "Pengalaman editorial yang mengutamakan foto memberi ruang bagi hidangan, sambil menjaga reservasi, lokasi, dan jam buka tetap mudah dijangkau.",
    features: ["Halaman utama restoran", "Tampilan menu", "Konsep antarmuka reservasi", "Informasi lokasi dan kontak"],
    imageAlt: "Ruang makan restoran dengan pencahayaan hangat, siap menyambut tamu",
  },
  "gather-church": {
    shortDescription: "Ruang digital yang ramah untuk gereja lokal dan komunitasnya.",
    overview: "Gather Church adalah konsep situs fiktif untuk membantu jemaat menyambut pengunjung baru dan tetap terhubung. Informasi ibadah, acara, dan khotbah hadir dalam satu ruang digital yang tenang dan mudah diakses.",
    problem: "Orang yang ingin mengunjungi gereja biasanya membutuhkan jawaban sederhana: kapan harus datang, apa yang akan mereka temui, dan di mana menemukan komunitas. Informasi ini sering tersebar di berbagai halaman dan media sosial.",
    solution: "Situs yang hangat dan aksesibel menyatukan informasi kunjungan, acara komunitas, kelompok pelayanan, dan khotbah untuk pengunjung baru maupun jemaat.",
    features: ["Jadwal ibadah dan panduan kunjungan pertama", "Kalender acara komunitas", "Perpustakaan khotbah dan media", "Direktori pelayanan dan kelompok komunitas"],
    imageAlt: "Cahaya matahari menerangi bagian dalam gereja",
  },
  "brightpath-school": {
    shortDescription: "Langkah awal yang ceria dan jelas untuk mengenal komunitas sekolah.",
    overview: "Brightpath School adalah konsep situs sekolah fiktif yang membantu keluarga mengenal pendekatan belajar, pendaftaran, kalender, dan sumber daya orang tua dalam satu tempat yang ramah.",
    problem: "Keluarga membutuhkan informasi sekolah yang tepercaya saat membandingkan pilihan. Namun, informasi penerimaan, kehidupan sekolah, dan kalender sering tersebar di berbagai halaman dan dokumen.",
    solution: "Situs yang ramah dan teratur memberi keluarga jalur yang jelas menuju informasi pendaftaran, serta satu tempat tepercaya untuk kabar dan sumber daya bagi keluarga yang sudah bergabung.",
    features: ["Informasi penerimaan dan pendaftaran", "Kalender sekolah dan pengumuman", "Pendekatan belajar dan gambaran kampus", "Pusat sumber daya orang tua dan siswa"],
    imageAlt: "Ruang kelas yang terang dan siap digunakan untuk belajar",
  },
  "harborlight-hotel": {
    shortDescription: "Tempat menginap yang tenang dan hangat untuk menikmati waktu di tepi laut.",
    overview: "Harborlight Hotel adalah konsep situs hotel butik fiktif yang membuat perencanaan liburan terasa setenang pengalaman menginapnya. Tamu dapat menjelajahi kamar, fasilitas, dan pratinjau ketersediaan dalam satu pengalaman yang nyaman.",
    problem: "Situs hotel sering menyulitkan calon tamu untuk membandingkan kamar, memahami fasilitas, atau membayangkan pengalaman menginap sebelum memesan.",
    solution: "Situs editorial yang hangat memadukan detail kamar dan fasilitas yang jelas dengan pratinjau ketersediaan dan informasi menginap yang mudah ditemukan.",
    features: ["Jelajahi kamar dan suite", "Informasi fasilitas dan pengalaman menginap", "Pratinjau ketersediaan berdasarkan tanggal dan tamu", "Konsep pemesanan dengan konfirmasi demo"],
    imageAlt: "Halaman hotel butik yang tenang dengan kolam renang",
  },
};

export function localeFromPath(pathname: string): Locale {
  return pathname === "/id" || pathname.startsWith("/id/") ? "id" : "en";
}

export function localePath(locale: Locale, pathname: string): string {
  const canonicalPath = pathname === "/id" ? "/" : pathname.startsWith("/id/") ? pathname.slice(3) : pathname;
  const path = canonicalPath === "/" ? "" : canonicalPath;
  return locale === "id" ? `/id${path}` : path || "/";
}

export function categoryLabel(locale: Locale, category: ProjectCategory): string {
  return categoryText[locale][category];
}

export function projectCopy(locale: Locale, project: Project): Project {
  if (locale === "en") return project;
  return { ...project, ...indonesianProjectCopy[project.slug] };
}
