"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  Clock3,
  Heart,
  LayoutDashboard,
  ListTodo,
  MapPin,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import styles from "./concept-demo.module.css";

type DemoSlug = "manageflow" | "shopora" | "dinenow";

export default function ConceptDemo({ slug, locale }: { slug: DemoSlug; locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <main className={`${styles.demoPage} ${styles[`${slug}Page`]}`}>
      <PreviewBar slug={slug} locale={locale} />
      {slug === "manageflow" ? <ManageFlowDemo locale={locale} /> : null}
      {slug === "shopora" ? <ShoporaDemo locale={locale} /> : null}
      {slug === "dinenow" ? <DineNowDemo locale={locale} /> : null}
    </main>
  );
}

function PreviewBar({ slug, locale }: { slug: DemoSlug; locale: Locale }) {
  const isIndonesian = locale === "id";
  return (
    <div className={styles.previewBar}>
      <Link href={localePath(locale, `/work/${slug}`)} className={styles.previewBack}>
        <ArrowLeft size={15} />
        {isIndonesian ? "Kembali ke proyek" : "Back to project"}
      </Link>
      <div className={styles.previewCenter}>
        <span className={styles.previewDot} />
        <span>{isIndonesian ? "PRATINJAU KONSEP" : "CONCEPT PREVIEW"}</span>
        <i />
        <span>{isIndonesian ? "DEMO INTERAKTIF" : "INTERACTIVE DEMO"}</span>
      </div>
      <div className={styles.previewLanguages} aria-label={isIndonesian ? "Pilih bahasa" : "Choose language"}>
        <Link aria-current={locale === "en" ? "page" : undefined} href={localePath("en", `/demo/${slug}`)}>EN</Link>
        <Link aria-current={locale === "id" ? "page" : undefined} href={localePath("id", `/demo/${slug}`)}>ID</Link>
      </div>
    </div>
  );
}

function DemoDetailDialog({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className={styles.detailModalBackdrop}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <motion.section
          aria-label={title}
          aria-modal="true"
          className={styles.detailModal}
          onMouseDown={(event) => event.stopPropagation()}
          role="dialog"
          tabIndex={-1}
          initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        >
          <div className={styles.detailModalHeading}>
            <span>CONCEPT DETAIL</span>
            <button className={styles.detailModalClose} onClick={onClose} type="button" aria-label="Close details"><X size={19} /></button>
          </div>
          {children}
        </motion.section>
      </motion.div>
    </AnimatePresence>
  );
}

type Task = {
  id: number;
  title: string;
  project: string;
  due: string;
  done: boolean;
  priority: "Low" | "Medium" | "High";
};

const taskSets: Record<Locale, Task[]> = {
  en: [
    { id: 1, title: "Review autumn campaign assets", project: "Brand refresh", due: "Today", done: false, priority: "High" },
    { id: 2, title: "Send updated supplier brief", project: "Operations", due: "Today", done: false, priority: "Medium" },
    { id: 3, title: "Approve homepage wireframes", project: "Website redesign", due: "Tomorrow", done: true, priority: "Low" },
    { id: 4, title: "Prepare monthly team check-in", project: "People", due: "Oct 24", done: false, priority: "Low" },
  ],
  id: [
    { id: 1, title: "Tinjau materi kampanye musim gugur", project: "Penyegaran merek", due: "Hari ini", done: false, priority: "High" },
    { id: 2, title: "Kirim panduan pemasok terbaru", project: "Operasional", due: "Hari ini", done: false, priority: "Medium" },
    { id: 3, title: "Setujui wireframe beranda", project: "Desain ulang situs", due: "Besok", done: true, priority: "Low" },
    { id: 4, title: "Siapkan rapat tim bulanan", project: "Tim", due: "24 Okt", done: false, priority: "Low" },
  ],
};

function ManageFlowDemo({ locale }: { locale: Locale }) {
  const isIndonesian = locale === "id";
  const [tasks, setTasks] = useState(() => taskSets[locale]);
  const [view, setView] = useState<"overview" | "tasks" | "reports">("overview");
  const [filter, setFilter] = useState<"all" | "open" | "done">("all");
  const [search, setSearch] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [taskFormOpen, setTaskFormOpen] = useState(false);

  const text = isIndonesian
    ? { overview: "Ringkasan", tasks: "Tugas", reports: "Laporan", team: "Tim", workspace: "RUANG KERJA", today: "SELASA, 21 OKTOBER", greeting: "Selamat pagi, Alex", summary: "Berikut ringkasan aktivitas tim Anda.", newTask: "Tugas baru", openTasks: "Tugas terbuka", completed: "Selesai minggu ini", projects: "Proyek aktif", workload: "Beban kerja", myTasks: "Tugas tim", all: "Semua", open: "Berjalan", done: "Selesai", search: "Cari tugas...", due: "Tenggat", noTasks: "Tidak ada tugas pada tampilan ini.", add: "Tambah", cancel: "Batal", taskName: "Nama tugas", progress: "Kemajuan proyek", activity: "Aktivitas minggu ini", teamActivity: "Aktivitas tim", reportsCopy: "Ringkasan kerja tim Anda tetap terlihat jelas." }
    : { overview: "Overview", tasks: "Tasks", reports: "Reports", team: "Team", workspace: "WORKSPACE", today: "TUESDAY, OCTOBER 21", greeting: "Good morning, Alex", summary: "Here is what is happening across your team.", newTask: "New task", openTasks: "Open tasks", completed: "Completed this week", projects: "Active projects", workload: "Team workload", myTasks: "Team tasks", all: "All", open: "In progress", done: "Complete", search: "Search tasks...", due: "Due", noTasks: "No tasks in this view.", add: "Add task", cancel: "Cancel", taskName: "Task name", progress: "Project progress", activity: "This week", teamActivity: "Team activity", reportsCopy: "A clear picture of the work moving forward." };

  const visibleTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || (filter === "done" ? task.done : !task.done);
    const matchesSearch = `${task.title} ${task.project}`.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  function toggleTask(id: number) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  }

  function cycleTaskPriority(id: number) {
    const priorities: Task["priority"][] = ["Low", "Medium", "High"];
    setTasks((current) => current.map((task) => {
      if (task.id !== id) return task;
      const nextIndex = (priorities.indexOf(task.priority) + 1) % priorities.length;
      return { ...task, priority: priorities[nextIndex] };
    }));
  }

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = newTaskTitle.trim();
    if (!title) return;
    setTasks((current) => [{ id: Date.now(), title, project: isIndonesian ? "Proyek baru" : "New project", due: isIndonesian ? "Hari ini" : "Today", done: false, priority: "Medium" }, ...current]);
    setNewTaskTitle("");
    setTaskFormOpen(false);
    setView("tasks");
  }

  const navItems = [
    { key: "overview" as const, label: text.overview, icon: LayoutDashboard },
    { key: "tasks" as const, label: text.tasks, icon: ListTodo },
    { key: "reports" as const, label: text.reports, icon: BarChart3 },
  ];

  return (
    <div className={styles.manageApp}>
      <aside className={styles.manageSidebar}>
        <Link href={localePath(locale, "/work/manageflow")} className={styles.manageBrand}><span className={styles.manageBrandMark}>m.</span><span>manageflow</span></Link>
        <span className={styles.sidebarLabel}>{text.workspace}</span>
        <button className={styles.workspaceButton} type="button"><span className={styles.workspaceAvatar}>S</span><span>{isIndonesian ? "Studio Sorara" : "Sorara Studio"}</span><span className={styles.workspaceChevron}>⌄</span></button>
        <nav className={styles.manageNav} aria-label={isIndonesian ? "Navigasi demo" : "Demo navigation"}>
          {navItems.map(({ key, label, icon: Icon }) => <button className={view === key ? styles.manageNavActive : styles.manageNavItem} key={key} onClick={() => setView(key)} type="button"><Icon size={17} />{label}{key === "tasks" ? <span className={styles.navCount}>{tasks.filter((task) => !task.done).length}</span> : null}</button>)}
        </nav>
        <div className={styles.sidebarBottom}><div className={styles.sidebarHelp}>{isIndonesian ? "Ruang kerja yang tenang." : "A calmer way to work."}<span>{isIndonesian ? "Semua data hanya contoh demo." : "All data is sample demo content."}</span></div><div className={styles.sidebarUser}><span className={styles.userAvatar}>AR</span><span><b>Alex Rivera</b><small>{isIndonesian ? "Admin" : "Workspace admin"}</small></span><span className={styles.userMenu}>•••</span></div></div>
      </aside>

      <section className={styles.manageContent}>
        <header className={styles.manageTopbar}><div className={styles.breadcrumb}>{isIndonesian ? "Ruang kerja" : "Workspace"}<span>/</span><b>{navItems.find((item) => item.key === view)?.label}</b></div><div className={styles.topbarActions}><span className={styles.demoMode}><i />{isIndonesian ? "Mode demo" : "Demo mode"}</span><button className={styles.topbarAvatar} aria-label={isIndonesian ? "Profil Alex Rivera" : "Alex Rivera profile"} type="button">AR</button></div></header>

        <div className={styles.managePageContent}>
          <div className={styles.managePageHeading}><div><p>{text.today}</p><h1>{view === "overview" ? text.greeting : navItems.find((item) => item.key === view)?.label}</h1><span>{view === "overview" ? text.summary : view === "reports" ? text.reportsCopy : isIndonesian ? "Atur dan perbarui pekerjaan tim." : "Keep the team's work moving."}</span></div><button className={styles.addTaskButton} onClick={() => setTaskFormOpen((open) => !open)} type="button"><Plus size={16} />{text.newTask}</button></div>

          {view === "overview" ? <div className={styles.metricGrid}><Metric label={text.openTasks} value={String(tasks.filter((task) => !task.done).length).padStart(2, "0")} note={isIndonesian ? "Perlu ditindaklanjuti" : "Across 4 projects"} trend="+2" /><Metric label={text.completed} value="18" note={isIndonesian ? "Dibanding minggu lalu" : "vs. last week"} trend="+12%" /><Metric label={text.projects} value="06" note={isIndonesian ? "Semua sesuai rencana" : "All on track"} trend="" /></div> : null}

          {view === "reports" ? <div className={styles.reportGrid}><section className={styles.reportPanel}><div className={styles.panelHeading}><div><h2>{text.activity}</h2><p>{isIndonesian ? "Tugas yang diselesaikan" : "Tasks completed"}</p></div><span className={styles.reportTotal}>18 <small>{isIndonesian ? "tugas" : "tasks"}</small></span></div><div className={styles.chartBars}>{[38, 56, 48, 73, 62, 88, 68].map((height, index) => <div className={styles.chartColumn} key={index}><i style={{ height: `${height}%` }} /><span>{isIndonesian ? ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"][index] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}</span></div>)}</div></section><section className={styles.reportPanel}><div className={styles.panelHeading}><div><h2>{text.teamActivity}</h2><p>{isIndonesian ? "Jam fokus minggu ini" : "Focused hours this week"}</p></div><span className={styles.reportTotal}>124<small>h</small></span></div><div className={styles.teamBars}><span><i style={{ width: "82%" }} />Design <b>32h</b></span><span><i style={{ width: "67%" }} />Development <b>26h</b></span><span><i style={{ width: "51%" }} />Operations <b>19h</b></span><span><i style={{ width: "42%" }} />Strategy <b>16h</b></span></div></section></div> : null}

          {view === "overview" ? <div className={styles.manageLowerGrid}><TaskPanel tasks={tasks} visibleTasks={visibleTasks.slice(0, 3)} text={text} locale={locale} filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} onToggle={toggleTask} onCyclePriority={cycleTaskPriority} onOpenTasks={() => setView("tasks")} /><section className={styles.progressPanel}><div className={styles.panelHeading}><div><h2>{text.progress}</h2><p>{isIndonesian ? "Proyek aktif" : "Active projects"}</p></div><button className={styles.kebab} type="button" aria-label={isIndonesian ? "Opsi kemajuan proyek" : "Project progress options"}>•••</button></div><ProgressRow name="Brand refresh" value={76} color="lime" /><ProgressRow name="Website redesign" value={58} color="lavender" /><ProgressRow name="Spring launch" value={41} color="coral" /><div className={styles.workloadRow}><div><Users size={16} /><span>{text.workload}</span></div><div className={styles.avatarStack}><i>AR</i><i>JM</i><i>TK</i><span>+2</span></div></div></section></div> : null}

          {view === "tasks" ? <TaskPanel tasks={tasks} visibleTasks={visibleTasks} text={text} locale={locale} filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} onToggle={toggleTask} onCyclePriority={cycleTaskPriority} onOpenTasks={() => setView("tasks")} full /> : null}

          {taskFormOpen ? <form className={styles.newTaskForm} onSubmit={addTask}><label htmlFor="new-task">{text.taskName}</label><input id="new-task" autoFocus value={newTaskTitle} onChange={(event) => setNewTaskTitle(event.target.value)} placeholder={isIndonesian ? "Contoh: Siapkan agenda rapat" : "e.g. Prepare meeting agenda"} /><div><button className={styles.cancelButton} onClick={() => setTaskFormOpen(false)} type="button">{text.cancel}</button><button className={styles.addTaskButton} type="submit"><Plus size={15} />{text.add}</button></div></form> : null}
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value, note, trend }: { label: string; value: string; note: string; trend: string }) {
  return <article className={styles.metricCard}><span>{label}</span><div><strong>{value}</strong>{trend ? <small>{trend}</small> : null}</div><p>{note}</p></article>;
}

function TaskPanel({
  tasks,
  visibleTasks,
  text,
  locale,
  filter,
  setFilter,
  search,
  setSearch,
  onToggle,
  onCyclePriority,
  onOpenTasks,
  full = false,
}: {
  tasks: Task[];
  visibleTasks: Task[];
  text: Record<string, string>;
  locale: Locale;
  filter: "all" | "open" | "done";
  setFilter: (filter: "all" | "open" | "done") => void;
  search: string;
  setSearch: (search: string) => void;
  onToggle: (id: number) => void;
  onCyclePriority: (id: number) => void;
  onOpenTasks: () => void;
  full?: boolean;
}) {
  const isIndonesian = locale === "id";
  const priorityLabels: Record<Task["priority"], string> = isIndonesian ? { Low: "Rendah", Medium: "Sedang", High: "Tinggi" } : { Low: "Low", Medium: "Medium", High: "High" };
  const filters = [{ id: "all" as const, label: text.all }, { id: "open" as const, label: text.open }, { id: "done" as const, label: text.done }];
  const displayed = visibleTasks;

  return (
    <section className={`${styles.taskPanel} ${full ? styles.taskPanelFull : ""}`}>
      <div className={styles.panelHeading}><div><h2>{text.myTasks}</h2><p>{isIndonesian ? `${tasks.filter((task) => !task.done).length} tugas menunggu perhatian` : `${tasks.filter((task) => !task.done).length} tasks need attention`}</p></div>{!full ? <button className={styles.panelTextButton} onClick={onOpenTasks} type="button">{isIndonesian ? "Lihat semua" : "View all"}<ArrowRight size={14} /></button> : null}</div>
      <div className={styles.taskControls}><div className={styles.taskFilters}>{filters.map(({ id, label }) => <button className={filter === id ? styles.taskFilterActive : styles.taskFilter} key={id} onClick={() => setFilter(id)} type="button">{label}</button>)}</div>{full ? <label className={styles.taskSearch}><Search size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={text.search} /></label> : null}</div>
      <div className={styles.taskRows}>{displayed.length ? displayed.map((task) => <div className={styles.taskRow} key={task.id}><button className={task.done ? styles.taskCheckDone : styles.taskCheck} onClick={() => onToggle(task.id)} type="button" aria-label={task.done ? (isIndonesian ? "Tandai belum selesai" : "Mark as incomplete") : (isIndonesian ? "Tandai selesai" : "Mark complete")}>{task.done ? <Check size={12} /> : null}</button><span className={task.done ? styles.taskTitleDone : styles.taskTitle}>{task.title}<small>{task.project}</small></span><button className={styles.taskPriority} data-priority={task.priority.toLowerCase()} onClick={() => onCyclePriority(task.id)} type="button" aria-label={`${isIndonesian ? "Ubah prioritas" : "Change priority"}: ${task.title}. ${priorityLabels[task.priority]}`} title={isIndonesian ? "Klik untuk mengubah prioritas" : "Click to cycle priority"}>{priorityLabels[task.priority]}</button><span className={task.done ? styles.dueDone : styles.dueText}>{task.due}</span></div>) : <p className={styles.emptyTasks}>{text.noTasks}</p>}</div>
      <div className={styles.taskFooter}><span>{isIndonesian ? `Menampilkan ${displayed.length} dari ${tasks.length} tugas` : `Showing ${displayed.length} of ${tasks.length} tasks`}</span><span className={styles.sampleMark}>{isIndonesian ? "DATA CONTOH" : "SAMPLE DATA"}</span></div>
    </section>
  );
}

function ProgressRow({ name, value, color }: { name: string; value: number; color: "lime" | "lavender" | "coral" }) {
  return <div className={styles.progressItem}><div><span>{name}</span><b>{value}%</b></div><div className={styles.progressTrack}><i className={styles[color]} style={{ width: `${value}%` }} /></div></div>;
}

type Product = { id: string; name: string; nameId: string; category: "Living" | "Lighting" | "Objects"; priceIdr: number; image: string; imageAlt: string; color: string; description: string; descriptionId: string };

const products: Product[] = [
  { id: "chair", name: "Everyday chair", nameId: "Kursi sehari-hari", category: "Living", priceIdr: 3850000, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=85", imageAlt: "Sculptural oak chair in a softly lit living room", color: "#d8c6a9", description: "A solid oak frame and gently curved back make this an easy seat to settle into, from the first coffee to the last page of the evening.", descriptionId: "Rangka kayu ek solid dan sandaran melengkung membuat kursi ini nyaman untuk ditempati, dari kopi pagi hingga halaman terakhir di malam hari." },
  { id: "lamp", name: "Soft glow lamp", nameId: "Lampu cahaya lembut", category: "Lighting", priceIdr: 1380000, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85", imageAlt: "Warm sculptural lamp lighting a quiet room", color: "#e9d8b8", description: "A softly diffused shade and tactile base bring a little warmth to the corners where the day winds down.", descriptionId: "Kap lampu dengan cahaya lembut dan alas bertekstur menghadirkan suasana hangat di sudut tempat hari berakhir." },
  { id: "vase", name: "Sunday vessel", nameId: "Vas hari Minggu", category: "Objects", priceIdr: 870000, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=85", imageAlt: "Handmade ceramic vase with a natural matte finish", color: "#cbb9aa", description: "A hand-finished ceramic vessel with a quiet silhouette, made to hold a single stem or look lovely on its own.", descriptionId: "Vas keramik dengan siluet sederhana dan sentuhan akhir buatan tangan, cocok untuk satu tangkai bunga atau sebagai dekorasi." },
  { id: "stool", name: "Gathering stool", nameId: "Bangku kumpul", category: "Living", priceIdr: 2050000, image: "https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=800&q=85", imageAlt: "Compact wooden stool beside a reading chair", color: "#c6d6c6", description: "A compact, sturdy perch that moves easily from the hallway to an extra seat around the table.", descriptionId: "Bangku ringkas dan kokoh yang mudah dipindahkan dari lorong untuk menjadi tempat duduk tambahan di meja." },
];

function ShoporaDemo({ locale }: { locale: Locale }) {
  const isIndonesian = locale === "id";
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [cartToast, setCartToast] = useState<{ product: Product; nonce: number } | null>(null);
  const cartToastSequence = useRef(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const reduceMotion = useReducedMotion();
  const labels = isIndonesian
    ? { all: "Semua", living: "Ruang", lighting: "Pencahayaan", objects: "Objek", collection: "KOLEKSI SEHARI-HARI", heroTitle: "Barang yang baik,\nuntuk hidup sehari-hari.", heroCopy: "Objek penuh perhatian untuk ruang yang terasa lebih personal.", explore: "Jelajahi koleksi", new: "Baru di toko", shopAll: "Lihat semua", add: "Tambah ke tas", bag: "Tas belanja", empty: "Tas Anda masih kosong.", subtotal: "Subtotal", checkout: "Lanjut ke demo checkout", close: "Tutup tas", demoOrder: "Pesanan demo siap!", demoNote: "Tidak ada pembayaran atau pesanan nyata yang dibuat.", continue: "Lanjut berbelanja", concept: "TOKO KONSEP / SEMUA INTERAKSI BERSIFAT DEMO", favorites: "Favorit", added: "ditambahkan ke tas", viewBag: "Lihat tas", noFavorites: "Belum ada produk favorit." }
    : { all: "All", living: "Living", lighting: "Lighting", objects: "Objects", collection: "THE EVERYDAY EDIT", heroTitle: "Objects for\nthe way we live.", heroCopy: "Thoughtful things for spaces that feel a little more like you.", explore: "Explore the collection", new: "Recently found", shopAll: "Shop all", add: "Add to bag", bag: "Your bag", empty: "Your bag is waiting for something good.", subtotal: "Subtotal", checkout: "Continue to demo checkout", close: "Close bag", demoOrder: "Your demo order is ready.", demoNote: "No payment was collected and no real order was placed.", continue: "Keep exploring", concept: "CONCEPT STORE / ALL INTERACTIONS ARE A DEMO", favorites: "Saved", added: "added to your bag", viewBag: "View bag", noFavorites: "No favorites in this view yet." };
  const categories = [{ id: "All", label: labels.all }, { id: "Living", label: labels.living }, { id: "Lighting", label: labels.lighting }, { id: "Objects", label: labels.objects }];
  const visibleProducts = products.filter((product) => (category === "All" || product.category === category) && (!showFavorites || favorites.includes(product.id)));
  const cartItems = products.filter((product) => cart[product.id]);
  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0);
  const subtotal = cartItems.reduce((sum, product) => sum + product.priceIdr * cart[product.id], 0);

  useEffect(() => {
    if (!cartToast) return;
    const timer = window.setTimeout(() => setCartToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [cartToast]);

  function changeQuantity(id: string, delta: number) {
    setCart((current) => {
      const next = Math.max(0, (current[id] ?? 0) + delta);
      const updated = { ...current };
      if (next === 0) delete updated[id];
      else updated[id] = next;
      return updated;
    });
    setOrderPlaced(false);
  }

  function price(product: Product) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(product.priceIdr);
  }

  function formatIdr(amount: number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
  }

  function addToBag(product: Product) {
    changeQuantity(product.id, 1);
    cartToastSequence.current += 1;
    setCartToast({ product, nonce: cartToastSequence.current });
  }

  function toggleFavorite(product: Product) {
    setFavorites((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id]);
  }

  function toggleFavoritesView() {
    setShowFavorites((current) => !current);
  }

  return (
    <div className={styles.shoporaStore}>
      <header className={styles.shoporaHeader}><Link className={styles.shoporaLogo} href={localePath(locale, "/work/shopora")}>shopora<span>.</span></Link><nav aria-label={isIndonesian ? "Kategori toko" : "Shop categories"}>{categories.slice(1).map((item) => <button className={category === item.id ? styles.shopNavActive : ""} key={item.id} onClick={() => { setCategory(item.id); setShowFavorites(false); document.getElementById("shop-products")?.scrollIntoView({ behavior: "smooth" }); }} type="button">{item.label}</button>)}</nav><div className={styles.shopHeaderActions}><button className={showFavorites ? styles.favoriteHeaderActive : styles.favoriteHeader} aria-pressed={showFavorites} onClick={toggleFavoritesView} type="button" aria-label={`${labels.favorites}: ${favorites.length}`}><Heart size={16} fill={showFavorites ? "currentColor" : "none"} /><span>{labels.favorites}</span><b>{favorites.length}</b></button><button className={styles.bagButton} onClick={() => setCartOpen(true)} type="button"><ShoppingBag size={17} /><span>{labels.bag}</span><b>{cartCount}</b></button></div></header>
      <section className={styles.shopHero}><div className={styles.shopHeroCopy}><span>{labels.collection}</span><h1>{labels.heroTitle}</h1><p>{labels.heroCopy}</p><a href="#shop-products" className={styles.shopHeroLink}>{labels.explore}<ArrowRight size={16} /></a></div><div className={styles.shopHeroImage}><Image src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85" alt={isIndonesian ? "Ruang keluarga dengan perabotan yang tertata" : "A calm living space with considered furniture"} fill priority sizes="(max-width: 760px) 100vw, 58vw" /><span>SHOPORA / 001</span></div><div className={styles.shopHeroFoot}><span>SMALL-BATCH OBJECTS</span><span>MADE TO LIVE WITH</span><span>01 — 04</span></div></section>
      <section className={styles.shopProducts} id="shop-products">
        <div className={styles.shopSectionHeading}><div><span>{labels.new}</span><h2>{showFavorites ? labels.favorites : labels.shopAll}</h2></div><div className={styles.shopFilters} role="group" aria-label={isIndonesian ? "Filter produk" : "Filter products"}>{categories.map((item) => <button aria-pressed={category === item.id} className={category === item.id ? styles.shopFilterActive : ""} key={item.id} onClick={() => setCategory(item.id)} type="button">{item.label}</button>)}</div></div>
        {visibleProducts.length ? <div className={styles.productGrid}>{visibleProducts.map((product) => {
          const productName = isIndonesian ? product.nameId : product.name;
          return <article className={styles.productCard} key={product.id}>
            <div className={styles.productPhoto} style={{ backgroundColor: product.color}}>
              <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw" />
              <button className={styles.productImageTrigger} onClick={() => setSelectedProduct(product)} type="button" aria-label={isIndonesian ? `Lihat detail ${productName}` : `View details for ${productName}`} />
              <button className={favorites.includes(product.id) ? styles.productFavoriteActive : styles.productFavorite} onClick={() => toggleFavorite(product)} type="button" aria-label={`${favorites.includes(product.id) ? (isIndonesian ? "Hapus dari favorit" : "Remove from favorites") : (isIndonesian ? "Simpan ke favorit" : "Save to favorites")}: ${productName}`} aria-pressed={favorites.includes(product.id)}><Heart size={15} fill={favorites.includes(product.id) ? "currentColor" : "none"} /></button>
              <button className={styles.addProductButton} onClick={() => addToBag(product)} type="button" aria-label={`${labels.add}: ${productName}`}><Plus size={17} /></button>
            </div>
            <div className={styles.productDetails}><span>{categories.find((item) => item.id === product.category)?.label}</span><button className={styles.productNameButton} onClick={() => setSelectedProduct(product)} type="button">{productName}</button><b>{price(product)}</b></div>
          </article>;
        })}</div> : <p className={styles.shopEmptyState}>{labels.noFavorites}</p>}
        <p className={styles.shopDisclaimer}>{labels.concept}</p>
      </section>
      {selectedProduct ? <DemoDetailDialog title={isIndonesian ? selectedProduct.nameId : selectedProduct.name} onClose={() => setSelectedProduct(null)}><div className={styles.productDetailGrid}><div className={styles.detailModalImage}><Image src={selectedProduct.image} alt={selectedProduct.imageAlt} fill sizes="(max-width: 700px) 100vw, 50vw" /></div><div className={styles.productDetailCopy}><span>{categories.find((item) => item.id === selectedProduct.category)?.label} / SHOPORA</span><h2>{isIndonesian ? selectedProduct.nameId : selectedProduct.name}</h2><p>{isIndonesian ? selectedProduct.descriptionId : selectedProduct.description}</p><div className={styles.productDetailSpec}><span>{isIndonesian ? "Bahan" : "Material"}</span><b>{selectedProduct.id === "chair" ? (isIndonesian ? "Kayu ek solid" : "Solid oak") : selectedProduct.id === "lamp" ? (isIndonesian ? "Keramik & linen" : "Ceramic & linen") : selectedProduct.id === "vase" ? (isIndonesian ? "Keramik buatan tangan" : "Hand-finished ceramic") : (isIndonesian ? "Kayu solid" : "Solid wood")}</b></div><div className={styles.productDetailFooter}><strong>{price(selectedProduct)}</strong><button className={styles.checkoutButton} onClick={() => { addToBag(selectedProduct); setSelectedProduct(null); }} type="button">{labels.add}<Plus size={16} /></button></div><small className={styles.demoOnlyNote}>{labels.concept}</small></div></div></DemoDetailDialog> : null}
      <AnimatePresence mode="wait">
        {cartToast ? <motion.div className={styles.cartToast} key={cartToast.nonce} role="status" initial={reduceMotion ? false : { opacity: 0, y: -14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0, y: -10, scale: 0.98 }} transition={{ duration: reduceMotion ? 0 : 0.2 }}><span className={styles.cartToastCheck}><Check size={14} /></span><span className={styles.cartToastText}><b>{isIndonesian ? cartToast.product.nameId : cartToast.product.name} {labels.added}</b><small>{price(cartToast.product)}</small></span><button onClick={() => { setCartOpen(true); setCartToast(null); }} type="button">{labels.viewBag}<ArrowRight size={14} /></button></motion.div> : null}
      </AnimatePresence>
      {cartOpen ? <div className={styles.cartLayer}><button className={styles.cartBackdrop} onClick={() => setCartOpen(false)} type="button" aria-label={labels.close} /><aside className={styles.cartDrawer} aria-label={labels.bag}><div className={styles.cartHeading}><div><span>SHOPORA</span><h2>{labels.bag} <small>{cartCount.toString().padStart(2, "0")}</small></h2></div><button onClick={() => setCartOpen(false)} type="button" aria-label={labels.close}><X size={20} /></button></div>{orderPlaced ? <div className={styles.orderConfirmation}><span><Check size={21} /></span><h3>{labels.demoOrder}</h3><p>{labels.demoNote}</p><button className={styles.checkoutButton} onClick={() => { setCart({}); setOrderPlaced(false); setCartOpen(false); }} type="button">{labels.continue}<ArrowRight size={16} /></button></div> : cartItems.length ? <><div className={styles.cartLines}>{cartItems.map((product) => <div className={styles.cartLine} key={product.id}><div className={styles.cartThumb}><Image src={product.image} alt="" fill sizes="72px" /></div><div className={styles.cartProductInfo}><b>{isIndonesian ? product.nameId : product.name}</b><span>{price(product)}</span><div className={styles.quantityControl}><button onClick={() => changeQuantity(product.id, -1)} type="button" aria-label={isIndonesian ? "Kurangi jumlah" : "Decrease quantity"}><Minus size={13} /></button><span>{cart[product.id]}</span><button onClick={() => changeQuantity(product.id, 1)} type="button" aria-label={isIndonesian ? "Tambah jumlah" : "Increase quantity"}><Plus size={13} /></button></div></div></div>)}</div><div className={styles.cartSummary}><div><span>{labels.subtotal}</span><b>{formatIdr(subtotal)}</b></div><p>{labels.demoNote}</p><button className={styles.checkoutButton} onClick={() => setOrderPlaced(true)} type="button">{labels.checkout}<ArrowRight size={16} /></button></div></> : <div className={styles.emptyCart}><ShoppingBag size={24} /><p>{labels.empty}</p><button className={styles.textButton} onClick={() => setCartOpen(false)} type="button">{labels.continue}<ArrowRight size={15} /></button></div>}</aside></div> : null}
    </div>
  );
}

type MenuItem = { name: string; description: string; price: string; category: "Small plates" | "From the kitchen" | "Something sweet"; vegetarian: boolean; image: string; imageAlt: string; detail: string };

function DineNowDemo({ locale }: { locale: Locale }) {
  const isIndonesian = locale === "id";
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const labels = isIndonesian
    ? { navStory: "Cerita kami", navMenu: "Menu", navVisit: "Kunjungi", reserve: "Reservasi", welcome: "MEJA SUDAH DISIAPKAN", heroTitle: "Makan enak.\nWaktu bersama.", heroCopy: "Masakan musiman, suasana hangat, dan ruang untuk berkumpul.", seeMenu: "Lihat menu", menuEyebrow: "DARI DAPUR", menuTitle: "Menu hari ini", all: "Semua", starters: "Hidangan pembuka", mains: "Hidangan utama", desserts: "Hidangan penutup", visit: "Tempat untuk berkumpul", address: "18 Orchard Lane · Brooklyn, NY", hours: "Selasa—Minggu · 17.00—22.00", reservation: "Pesan meja", date: "Tanggal", time: "Waktu", guests: "Tamu", submit: "Cari meja", confirmed: "Meja demo berhasil dipesan.", confirmation: "Ini hanya pratinjau. Reservasi tidak dikirim ke restoran.", demo: "KONSEP RESTORAN / RESERVASI HANYA DEMO" }
    : { navStory: "Our story", navMenu: "Menu", navVisit: "Visit", reserve: "Reserve", welcome: "A TABLE IS WAITING", heroTitle: "Good food.\nBetter together.", heroCopy: "Seasonal plates, a warm room, and a little more time around the table.", seeMenu: "Explore the menu", menuEyebrow: "FROM THE KITCHEN", menuTitle: "A few favorites", all: "All", starters: "Small plates", mains: "From the kitchen", desserts: "Something sweet", visit: "A place to gather", address: "18 Orchard Lane · Brooklyn, NY", hours: "Tuesday—Sunday · 5—10 pm", reservation: "Make a reservation", date: "Date", time: "Time", guests: "Guests", submit: "Find a table", confirmed: "Your demo table is reserved.", confirmation: "This is only a preview. Nothing has been sent to the restaurant.", demo: "RESTAURANT CONCEPT / RESERVATIONS ARE A DEMO" };
  const [menuCategory, setMenuCategory] = useState(labels.all);
  const vegetarianLabel = "Vegetarian";
  const vegetarianOnlyLabel = isIndonesian ? "Hanya vegetarian" : "Vegetarian only";
  const menuItems: MenuItem[] = isIndonesian ? [
    { name: "Roti hangat & mentega", description: "Ragi panggang, garam laut", price: "7", category: "Small plates", vegetarian: true, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=85", imageAlt: "Roti artisan yang baru dipanggang", detail: "Roti sourdough dipanggang hingga renyah di luar dan lembut di dalam, disajikan hangat dengan mentega kultur dan sedikit garam laut." },
    { name: "Wortel panggang", description: "Yogurt rempah, madu, dill", price: "14", category: "Small plates", vegetarian: true, image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85", imageAlt: "Hidangan sayuran segar dengan rempah", detail: "Wortel musiman dipanggang perlahan, lalu disajikan dengan yogurt berbumbu, madu lokal, dill segar, dan biji panggang." },
    { name: "Ayam panggang", description: "Lemon, kentang, saus herba", price: "28", category: "From the kitchen", vegetarian: false, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1000&q=85", imageAlt: "Ayam panggang dengan kentang dan herba", detail: "Ayam panggang utuh dengan kulit keemasan, kentang renyah, lemon panggang, dan saus herba dari dapur." },
    { name: "Pasta musiman", description: "Jamur liar, parmesan, thyme", price: "25", category: "From the kitchen", vegetarian: true, image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=85", imageAlt: "Pasta dengan jamur dan taburan keju", detail: "Pasta buatan rumah dengan jamur liar, parmesan tua, thyme, dan sedikit air rebusan pasta yang kaya rasa." },
    { name: "Kue minyak zaitun", description: "Krim jeruk, buah beri", price: "12", category: "Something sweet", vegetarian: true, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85", imageAlt: "Potongan kue dengan krim dan buah", detail: "Kue minyak zaitun yang lembut dengan krim jeruk segar dan buah beri musiman." },
    { name: "Puding cokelat", description: "Garam laut, krim kocok", price: "11", category: "Something sweet", vegetarian: true, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1000&q=85", imageAlt: "Hidangan penutup cokelat dengan krim", detail: "Cokelat pekat yang lembut dengan sejumput garam laut dan krim kocok ringan." },
  ] : [
    { name: "Warm bread & butter", description: "Grilled sourdough, cultured butter", price: "7", category: "Small plates", vegetarian: true, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=85", imageAlt: "Freshly baked artisan bread", detail: "Grilled sourdough, crisp outside and soft in the middle, served warm with cultured butter and a little sea salt." },
    { name: "Roasted carrots", description: "Whipped yogurt, honey, dill", price: "14", category: "Small plates", vegetarian: true, image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85", imageAlt: "Fresh vegetables with herbs", detail: "Slow-roasted seasonal carrots with spiced whipped yogurt, local honey, fresh dill, and toasted seeds." },
    { name: "Roast chicken", description: "Lemon, potatoes, garden herbs", price: "28", category: "From the kitchen", vegetarian: false, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1000&q=85", imageAlt: "Roast chicken with potatoes and herbs", detail: "Whole roast chicken with crisp golden skin, potatoes, charred lemon, and a pan sauce from the kitchen." },
    { name: "Seasonal pasta", description: "Wild mushrooms, parmesan, thyme", price: "25", category: "From the kitchen", vegetarian: true, image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=85", imageAlt: "Pasta with mushrooms and shaved cheese", detail: "House-made pasta with wild mushrooms, aged parmesan, thyme, and a little pasta water to bring it together." },
    { name: "Olive oil cake", description: "Citrus cream, late-season berries", price: "12", category: "Something sweet", vegetarian: true, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85", imageAlt: "Slice of cake with cream and berries", detail: "A tender olive oil cake with bright citrus cream and whatever berries are best this week." },
    { name: "Chocolate pot", description: "Flaky sea salt, soft cream", price: "11", category: "Something sweet", vegetarian: true, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1000&q=85", imageAlt: "Chocolate dessert with a spoonful of cream", detail: "A rich, spoonable chocolate pudding finished with flaky salt and a cloud of soft cream." },
  ];
  const menuCategories = [labels.all, labels.starters, labels.mains, labels.desserts];
  const categoryByLabel: Record<string, MenuItem["category"] | "All"> = { [labels.all]: "All", [labels.starters]: "Small plates", [labels.mains]: "From the kitchen", [labels.desserts]: "Something sweet" };
  const filteredItems = menuItems.filter((item) => (categoryByLabel[menuCategory] === "All" || item.category === categoryByLabel[menuCategory]) && (!vegetarianOnly || item.vegetarian));

  function submitReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReservationConfirmed(true);
  }

  return (
    <div className={styles.dineSite}>
      <header className={styles.dineHeader}><Link href={localePath(locale, "/work/dinenow")} className={styles.dineLogo}>dine<span>now</span></Link><nav aria-label={isIndonesian ? "Navigasi restoran" : "Restaurant navigation"}><a href="#dine-story">{labels.navStory}</a><a href="#dine-menu">{labels.navMenu}</a><a href="#dine-visit">{labels.navVisit}</a></nav><a className={styles.dineReserveLink} href="#reservation">{labels.reserve}<ArrowRight size={15} /></a></header>
      <section className={styles.dineHero}><Image src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=90" alt={isIndonesian ? "Ruang makan DineNow yang hangat dan mengundang" : "The warm, inviting dining room at DineNow"} fill priority sizes="100vw" /><div className={styles.dineHeroShade} /><div className={styles.dineHeroCopy}><span>{labels.welcome}</span><h1>{labels.heroTitle}</h1><p>{labels.heroCopy}</p><a href="#dine-menu">{labels.seeMenu}<ArrowRight size={16} /></a></div><div className={styles.dineHeroFoot}><span>18 ORCHARD LANE</span><span>GOOD FOOD, GOOD COMPANY</span><span>EST. 2024</span></div></section>
      <section className={styles.dineStory} id="dine-story"><span>COME AS YOU ARE</span><p>{isIndonesian ? "DineNow adalah restoran lingkungan untuk malam santai, hidangan musiman, dan percakapan yang tak terburu-buru." : "DineNow is a neighborhood table for easy evenings, seasonal plates, and conversations that take their time."}</p><div className={styles.storyRule} /></section>
      <section className={styles.dineMenu} id="dine-menu">
        <div className={styles.dineSectionHeader}>
          <div><span>{labels.menuEyebrow}</span><h2>{labels.menuTitle}</h2></div>
          <div className={styles.menuFilters} role="group" aria-label={isIndonesian ? "Filter menu" : "Menu filters"}>
            {menuCategories.map((item) => <button aria-pressed={menuCategory === item} className={menuCategory === item ? styles.menuFilterActive : ""} key={item} onClick={() => setMenuCategory(item)} type="button">{item}</button>)}
            <button aria-pressed={vegetarianOnly} className={vegetarianOnly ? styles.menuFilterActive : ""} onClick={() => setVegetarianOnly((current) => !current)} type="button">{vegetarianOnlyLabel}</button>
          </div>
        </div>
        <div className={styles.menuList}>{filteredItems.map((item) => <button className={styles.menuItem} key={item.name} onClick={() => setSelectedDish(item)} type="button" aria-label={`${isIndonesian ? "Lihat detail" : "View details"}: ${item.name}`}><span className={styles.menuItemCopy}><h3>{item.name}{item.vegetarian ? <span className={styles.vegBadge}>{vegetarianLabel}</span> : null}</h3><span>{item.description}</span></span><span className={styles.menuItemPrice}>${item.price}<ArrowRight size={14} /></span></button>)}</div>
        <p className={styles.dineSampleNote}>{labels.demo}</p>
      </section>
      <section className={styles.dineVisit} id="dine-visit"><div className={styles.visitCopy}><span>{isIndonesian ? "KAMI MENUNGGU KEDATANGAN ANDA" : "WE SAVED YOU A SEAT"}</span><h2>{labels.visit}</h2><p><MapPin size={16} />{labels.address}</p><p><Clock3 size={16} />{labels.hours}</p></div><form className={styles.reservationForm} id="reservation" onSubmit={submitReservation}><span>{labels.reservation}</span>{reservationConfirmed ? <div className={styles.reservationSuccess} role="status"><Check size={18} /><div><b>{labels.confirmed}</b><small>{labels.confirmation}</small></div></div> : <><label>{labels.date}<span><CalendarDays size={15} /><input required type="date" /></span></label><div className={styles.reservationFields}><label>{labels.time}<select defaultValue="19:00"><option>17:30</option><option>18:00</option><option>18:30</option><option>19:00</option><option>19:30</option><option>20:00</option></select></label><label>{labels.guests}<select defaultValue="2"><option value="1">1 {isIndonesian ? "tamu" : "guest"}</option><option value="2">2 {isIndonesian ? "tamu" : "guests"}</option><option value="3">3 {isIndonesian ? "tamu" : "guests"}</option><option value="4">4 {isIndonesian ? "tamu" : "guests"}</option><option value="5">5+ {isIndonesian ? "tamu" : "guests"}</option></select></label></div><button className={styles.findTableButton} type="submit">{labels.submit}<ArrowRight size={16} /></button></>}</form></section>
      {selectedDish ? <DemoDetailDialog title={selectedDish.name} onClose={() => setSelectedDish(null)}><div className={styles.dishDetailGrid}><div className={styles.detailModalImage}><Image src={selectedDish.image} alt={selectedDish.imageAlt} fill sizes="(max-width: 700px) 100vw, 50vw" /></div><div className={styles.dishDetailCopy}><span>{categoryByLabel[menuCategory] === "All" ? labels.menuEyebrow : menuCategory}</span><h2>{selectedDish.name}</h2><p>{selectedDish.detail}</p><p className={styles.dishDescription}>{selectedDish.description}</p><div className={styles.dishDetailFooter}>{selectedDish.vegetarian ? <span className={styles.vegBadge}>{vegetarianLabel}</span> : <span>{isIndonesian ? "PILIHAN DAPUR" : "FROM OUR KITCHEN"}</span>}<strong>${selectedDish.price}</strong></div></div></div></DemoDetailDialog> : null}
      <footer className={styles.dineFooter}><Link href={localePath(locale, "/work/dinenow")} className={styles.dineLogo}>dine<span>now</span></Link><span>GOOD FOOD. BETTER TOGETHER.</span><span>CONCEPT PROJECT / DEMO ONLY</span></footer>
    </div>
  );
}
