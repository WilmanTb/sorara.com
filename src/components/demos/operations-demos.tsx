"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Activity, ArrowLeft, BarChart3, Check, ChevronRight, Download, LayoutDashboard, Minus, Package, Plus, Receipt, Search, Settings, ShoppingBasket, ShoppingCart, Trash2, Users, X } from "lucide-react";
import { localePath, type Locale } from "@/lib/i18n";
import styles from "./operations-demos.module.css";

export type OperationsDemoSlug = "admin-dashboard" | "cashier-app";
const rupiah = (amount: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);

export default function OperationsDemo({ slug, locale }: { slug: OperationsDemoSlug; locale: Locale }) {
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  return <div className={styles.app}>
    <div className={styles.previewBar}><Link href={localePath(locale, `/work/${slug}`)}><ArrowLeft size={15} />{locale === "id" ? "Kembali ke proyek" : "Back to project"}</Link><span>{locale === "id" ? "PROYEK KONSEP / DATA CONTOH" : "CONCEPT PROJECT / SAMPLE DATA"}</span><nav aria-label="Language"><Link href={localePath("en", `/demo/${slug}`)} aria-current={locale === "en" ? "page" : undefined}>EN</Link><Link href={localePath("id", `/demo/${slug}`)} aria-current={locale === "id" ? "page" : undefined}>ID</Link></nav></div>
    {slug === "admin-dashboard" ? <AdminDashboard key={locale} locale={locale} /> : <CashierApp key={locale} locale={locale} />}
  </div>;
}

type Member = { id: number; name: string; email: string; role: "Admin" | "Editor" | "Viewer"; active: boolean };
type InventoryItem = { id: number; name: string; price: number; stock: number; published: boolean };
type Order = { id: number; customer: string; total: number; status: "Pending" | "Processing" | "Completed" };
type AdminView = "overview" | "users" | "products" | "orders" | "reports" | "activity" | "settings";

function AdminDashboard({ locale }: { locale: Locale }) {
  const isId = locale === "id";
  const [view, setView] = useState<AdminView>("overview");
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: "Alex Morgan", email: "alex@example.com", role: "Admin", active: true },
    { id: 2, name: "Dina Putri", email: "dina@example.com", role: "Editor", active: true },
    { id: 3, name: "Sam Lee", email: "sam@example.com", role: "Viewer", active: false },
  ]);
  const [items, setItems] = useState<InventoryItem[]>([
    { id: 1, name: "Canvas backpack", price: 425000, stock: 32, published: true },
    { id: 2, name: "Everyday notebook", price: 65000, stock: 8, published: true },
    { id: 3, name: "Desk organizer", price: 185000, stock: 0, published: false },
  ]);
  const [orders, setOrders] = useState<Order[]>([
    { id: 1041, customer: "Rina S.", total: 490000, status: "Completed" },
    { id: 1042, customer: "Arif P.", total: 185000, status: "Processing" },
    { id: 1043, customer: "Nadia W.", total: 425000, status: "Pending" },
  ]);
  const [logs, setLogs] = useState<string[]>([isId ? "Data contoh dimuat" : "Sample workspace loaded"]);
  const [form, setForm] = useState<"member" | "product" | null>(null);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPrice, setFormPrice] = useState("65000");
  const [formStock, setFormStock] = useState("10");
  const [message, setMessage] = useState("");
  const [workspaceName, setWorkspaceName] = useState("Northstar workspace");
  const [notifications, setNotifications] = useState(true);
  const labels = isId ? { overview: "Ringkasan", users: "Pengguna", products: "Produk", orders: "Pesanan", reports: "Laporan", activity: "Aktivitas", settings: "Pengaturan" } : { overview: "Overview", users: "Users", products: "Products", orders: "Orders", reports: "Reports", activity: "Activity", settings: "Settings" };
  const menus = [
    { key: "overview", icon: LayoutDashboard }, { key: "users", icon: Users }, { key: "products", icon: Package }, { key: "orders", icon: ShoppingCart }, { key: "reports", icon: BarChart3 }, { key: "activity", icon: Activity }, { key: "settings", icon: Settings },
  ] as const;
  const statusLabel = (status: Order["status"]) => isId ? { Pending: "Menunggu", Processing: "Diproses", Completed: "Selesai" }[status] : status;
  const revenue = orders.filter((order) => order.status === "Completed").reduce((sum, order) => sum + order.total, 0);
  function log(action: string) { setLogs((current) => [action, ...current]); setMessage(action); }
  function goTo(nextView: AdminView) { setView(nextView); setSearch(""); setForm(null); setMessage(""); }
  function openForm(kind: "member" | "product") { setForm(kind); setFormName(""); setFormEmail(""); setMessage(""); }
  function submitItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = formName.trim();
    if (!name) return;
    if (form === "member") {
      const email = formEmail.trim().toLowerCase();
      if (members.some((member) => member.email.toLowerCase() === email)) { setMessage(isId ? "Email sudah digunakan." : "Email already exists."); return; }
      setMembers((current) => [...current, { id: Math.max(0, ...current.map((item) => item.id)) + 1, name, email, role: "Viewer", active: true }]);
    } else {
      const price = Number(formPrice); const stock = Number(formStock);
      if (!Number.isInteger(price) || price < 0 || !Number.isInteger(stock) || stock < 0) return;
      setItems((current) => [...current, { id: Math.max(0, ...current.map((item) => item.id)) + 1, name, price, stock, published: false }]);
    }
    log(`${isId ? "Ditambahkan" : "Added"}: ${name}`); setForm(null);
  }
  function exportOrders() {
    const csv = ["Order,Customer,Total IDR,Status", ...orders.map((order) => `${order.id},${order.customer},${order.total},${order.status}`)].join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "sample-orders.csv"; link.click(); URL.revokeObjectURL(url);
    log(isId ? "Laporan contoh diekspor" : "Sample report exported");
  }
  const query = search.trim().toLowerCase();
  return <main className={styles.adminLayout}>
    <aside className={styles.sidebar}><div className={styles.brand}><span>N</span><b>Northstar<small>ADMIN DASHBOARD</small></b></div><span className={styles.mono}>{isId ? "RUANG KERJA CONTOH" : "SAMPLE WORKSPACE"}</span><nav aria-label={isId ? "Menu dasbor" : "Dashboard menus"}>{menus.map(({ key, icon: Icon }) => <button key={key} className={view === key ? styles.activeMenu : ""} aria-current={view === key ? "page" : undefined} onClick={() => goTo(key)} type="button"><Icon size={17} />{labels[key]}{key === "orders" ? <small>{orders.length}</small> : null}</button>)}</nav><p className={styles.sidebarNote}>{isId ? "Demo lokal. Bukan panel admin SORARA dan tidak memiliki autentikasi sungguhan." : "Local demo. Not SORARA's admin panel; no real authentication or permissions."}</p></aside>
    <section className={styles.workspace}><header className={styles.topbar}><span>{workspaceName} <ChevronRight size={14} /> {labels[view]}</span><span className={styles.avatar}>AM</span></header><div className={styles.content}>
      <div className={styles.pageHeading}><div><span className={styles.mono}>NORTHSTAR / {isId ? "DATA CONTOH" : "SAMPLE DATA"}</span><h1>{labels[view]}</h1><p>{isId ? "Kelola tim, katalog, dan operasional di satu tempat." : "Your team, catalog, and operations in one place."}</p></div>{view === "users" || view === "products" ? <button className={styles.primary} type="button" onClick={() => openForm(view === "users" ? "member" : "product")}><Plus size={16} />{isId ? "Tambah baru" : "Add new"}</button> : null}{view === "reports" ? <button className={styles.primary} onClick={exportOrders} type="button"><Download size={16} />{isId ? "Ekspor CSV" : "Export CSV"}</button> : null}</div>
      {message ? <p className={styles.feedback} role="status">{message}</p> : null}
      {form ? <form className={styles.inlineForm} onSubmit={submitItem}><h2>{isId ? "Tambah data contoh" : "Add sample record"}</h2><label>{isId ? "Nama" : "Name"}<input required maxLength={80} value={formName} onChange={(event) => setFormName(event.target.value)} /></label>{form === "member" ? <label>Email<input required type="email" value={formEmail} onChange={(event) => setFormEmail(event.target.value)} /></label> : <><label>{isId ? "Harga IDR" : "Price IDR"}<input required type="number" min="0" step="1" max="100000000" value={formPrice} onChange={(event) => setFormPrice(event.target.value)} /></label><label>{isId ? "Stok" : "Stock"}<input required type="number" min="0" step="1" max="100000" value={formStock} onChange={(event) => setFormStock(event.target.value)} /></label></>}<div className={styles.actions}><button className={styles.secondary} onClick={() => setForm(null)} type="button">{isId ? "Batal" : "Cancel"}</button><button className={styles.primary} type="submit">{isId ? "Simpan" : "Save"}</button></div></form> : null}
      {view === "overview" || view === "reports" ? <div className={styles.metrics}><article><span>{isId ? "Pendapatan selesai" : "Completed revenue"}</span><strong>{rupiah(revenue)}</strong><small>{isId ? "Dari pesanan contoh" : "From sample orders"}</small></article><article><span>{isId ? "Pengguna aktif" : "Active users"}</span><strong>{members.filter((member) => member.active).length}</strong><small>{members.length} {isId ? "total pengguna" : "total users"}</small></article><article><span>{isId ? "Produk terbit" : "Published products"}</span><strong>{items.filter((item) => item.published).length}</strong><small>{items.filter((item) => item.stock < 10).length} {isId ? "stok rendah" : "low stock"}</small></article><article><span>{isId ? "Pesanan" : "Orders"}</span><strong>{orders.length}</strong><small>{orders.filter((order) => order.status !== "Completed").length} {isId ? "perlu diproses" : "need attention"}</small></article></div> : null}
      {view === "overview" ? <><div className={styles.overviewGrid}><section className={styles.panel}><h2>{isId ? "Distribusi pesanan" : "Order distribution"}</h2>{(["Pending", "Processing", "Completed"] as const).map((status) => <div className={styles.barRow} key={status}><span>{statusLabel(status)}</span><div><i style={{ width: `${orders.filter((order) => order.status === status).length / Math.max(orders.length, 1) * 100}%` }} /></div><b>{orders.filter((order) => order.status === status).length}</b></div>)}</section><section className={styles.panel}><h2>{isId ? "Perlu perhatian" : "Needs attention"}</h2>{items.filter((item) => item.stock < 10).map((item) => <div className={styles.notice} key={item.id}><Package size={16} /><span>{item.name}</span><b>{item.stock} {isId ? "tersisa" : "left"}</b></div>)}<button className={styles.textButton} onClick={() => goTo("products")} type="button">{isId ? "Kelola inventaris" : "Manage inventory"}<ChevronRight size={15} /></button></section></div><section className={styles.panel}><h2>{isId ? "Aktivitas terakhir" : "Latest activity"}</h2>{logs.slice(0, 4).map((entry, index) => <p className={styles.log} key={`${entry}-${index}`}><Activity size={14} />{entry}</p>)}</section></> : null}
      {view === "users" || view === "products" || view === "orders" ? <label className={styles.search}><Search size={16} /><input aria-label={isId ? "Cari data" : "Search records"} placeholder={isId ? "Cari data..." : "Search records..."} value={search} onChange={(event) => setSearch(event.target.value)} /></label> : null}
      {view === "users" ? <div className={styles.tableScroll}><table><thead><tr><th>{isId ? "Pengguna" : "User"}</th><th>Email</th><th>{isId ? "Peran demo" : "Demo role"}</th><th>Status</th><th>{isId ? "Aksi" : "Actions"}</th></tr></thead><tbody>{members.filter((member) => `${member.name} ${member.email}`.toLowerCase().includes(query)).map((member) => <tr key={member.id}><td>{member.name}</td><td>{member.email}</td><td><select aria-label={`${isId ? "Peran" : "Role"}: ${member.name}`} value={member.role} onChange={(event) => { const role = event.target.value as Member["role"]; setMembers((current) => current.map((item) => item.id === member.id ? { ...item, role } : item)); log(`${member.name}: ${role}`); }}><option>Admin</option><option>Editor</option><option>Viewer</option></select></td><td><button className={member.active ? styles.pill : styles.mutedPill} onClick={() => { setMembers((current) => current.map((item) => item.id === member.id ? { ...item, active: !item.active } : item)); log(`${member.name}: ${member.active ? "inactive" : "active"}`); }} type="button">{member.active ? (isId ? "Aktif" : "Active") : (isId ? "Nonaktif" : "Inactive")}</button></td><td><button className={styles.iconButton} aria-label={`${isId ? "Hapus pengguna" : "Delete user"}: ${member.name}`} title={isId ? "Hapus pengguna contoh" : "Delete sample user"} onClick={() => { setMembers((current) => current.filter((item) => item.id !== member.id)); log(`${isId ? "Dihapus" : "Deleted"}: ${member.name}`); }} type="button"><Trash2 size={16} /></button></td></tr>)}</tbody></table>{members.filter((member) => `${member.name} ${member.email}`.toLowerCase().includes(query)).length === 0 ? <p className={styles.empty}>{isId ? "Tidak ada pengguna." : "No users found."}</p> : null}</div> : null}
      {view === "products" ? <div className={styles.tableScroll}><table><thead><tr><th>{isId ? "Produk" : "Product"}</th><th>IDR</th><th>{isId ? "Stok" : "Stock"}</th><th>Status</th><th>{isId ? "Aksi" : "Actions"}</th></tr></thead><tbody>{items.filter((item) => item.name.toLowerCase().includes(query)).map((item) => <tr key={item.id}><td>{item.name}</td><td>{rupiah(item.price)}</td><td><input className={styles.stockInput} type="number" min="0" max="100000" step="1" value={item.stock} aria-label={`${isId ? "Stok" : "Stock"}: ${item.name}`} onChange={(event) => { const stock = Number(event.target.value); if (Number.isInteger(stock) && stock >= 0 && stock <= 100000) setItems((current) => current.map((product) => product.id === item.id ? { ...product, stock } : product)); }} /></td><td><button className={item.published ? styles.pill : styles.mutedPill} onClick={() => { setItems((current) => current.map((product) => product.id === item.id ? { ...product, published: !product.published } : product)); log(`${item.name}: ${item.published ? "draft" : "published"}`); }} type="button">{item.published ? (isId ? "Terbit" : "Published") : (isId ? "Draf" : "Draft")}</button></td><td><button className={styles.iconButton} aria-label={`${isId ? "Hapus produk" : "Delete product"}: ${item.name}`} title={isId ? "Hapus produk contoh" : "Delete sample product"} onClick={() => { setItems((current) => current.filter((product) => product.id !== item.id)); log(`${isId ? "Dihapus" : "Deleted"}: ${item.name}`); }} type="button"><Trash2 size={16} /></button></td></tr>)}</tbody></table>{items.filter((item) => item.name.toLowerCase().includes(query)).length === 0 ? <p className={styles.empty}>{isId ? "Tidak ada produk." : "No products found."}</p> : null}</div> : null}
      {view === "orders" || view === "reports" ? <div className={styles.tableScroll}><table><thead><tr><th>{isId ? "Pesanan" : "Order"}</th><th>{isId ? "Pelanggan" : "Customer"}</th><th>Total IDR</th><th>Status</th></tr></thead><tbody>{orders.filter((order) => `${order.id} ${order.customer}`.toLowerCase().includes(query)).map((order) => <tr key={order.id}><td>#{order.id}</td><td>{order.customer}</td><td>{rupiah(order.total)}</td><td>{view === "orders" ? <select aria-label={`Status: ${order.id}`} value={order.status} onChange={(event) => { const status = event.target.value as Order["status"]; setOrders((current) => current.map((item) => item.id === order.id ? { ...item, status } : item)); log(`#${order.id}: ${statusLabel(status)}`); }}>{(["Pending", "Processing", "Completed"] as const).map((status) => <option key={status} value={status}>{statusLabel(status)}</option>)}</select> : statusLabel(order.status)}</td></tr>)}</tbody></table>{orders.filter((order) => `${order.id} ${order.customer}`.toLowerCase().includes(query)).length === 0 ? <p className={styles.empty}>{isId ? "Tidak ada pesanan." : "No orders found."}</p> : null}</div> : null}
      {view === "activity" ? <section className={styles.panel}><h2>{isId ? "Log aktivitas sesi" : "Session activity log"}</h2>{logs.map((entry, index) => <p className={styles.log} key={`${entry}-${index}`}><span className={styles.mono}>#{String(logs.length - index).padStart(3, "0")}</span>{entry}</p>)}</section> : null}
      {view === "settings" ? <form className={styles.inlineForm} onSubmit={(event) => { event.preventDefault(); if (!workspaceName.trim()) return; log(isId ? "Pengaturan demo tersimpan" : "Demo settings saved"); }}><h2>{isId ? "Pengaturan ruang kerja" : "Workspace settings"}</h2><label>{isId ? "Nama ruang kerja" : "Workspace name"}<input required maxLength={60} value={workspaceName} onChange={(event) => setWorkspaceName(event.target.value)} /></label><label className={styles.checkboxLabel}><input type="checkbox" checked={notifications} onChange={(event) => setNotifications(event.target.checked)} />{isId ? "Notifikasi demo" : "Demo notifications"}</label><p>{isId ? "Pengaturan berlaku pada sesi ini saja. Tidak ada email atau notifikasi yang dikirim." : "Settings apply to this session only. No emails or notifications are sent."}</p><button className={styles.primary} type="submit"><Check size={16} />{isId ? "Simpan pengaturan" : "Save settings"}</button></form> : null}
    </div></section>
  </main>;
}

type StoreMode = "minimarket" | "coffee" | "store";
type POSProduct = { id: string; en: string; idName: string; mode: StoreMode; category: string; price: number; stock: number; image: string };

function ProductDetailDialog({ product, locale, stock, canAdd, onClose, onAdd }: { product: POSProduct; locale: Locale; stock: number; canAdd: boolean; onClose: () => void; onAdd: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isId = locale === "id";
  const category = isId ? { Drinks: "Minuman", Food: "Makanan", Accessories: "Aksesori", Stationery: "Alat tulis" }[product.category] ?? product.category : product.category;
  const mode = isId ? { minimarket: "Minimarket", coffee: "Kedai kopi", store: "Toko" }[product.mode] : { minimarket: "Minimarket", coffee: "Coffee shop", store: "Store" }[product.mode];

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, []);

  return <dialog ref={dialogRef} className={styles.productDialog} aria-labelledby="pos-product-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose(); } }}>
    <button className={styles.productDialogClose} type="button" onClick={onClose} aria-label={isId ? "Tutup detail produk" : "Close product details"}><X size={20} /></button>
    <div className={styles.productDialogPhoto}><Image src={product.image} alt={isId ? product.idName : product.en} fill sizes="(max-width: 700px) 100vw, 45vw" /></div>
    <div className={styles.productDialogInfo}><span className={styles.mono}>{product.id} / {mode}</span><h2 id="pos-product-title">{isId ? product.idName : product.en}</h2><p>{category}</p><strong className={styles.productDialogPrice}>{rupiah(product.price)}</strong><dl><div><dt>{isId ? "Kategori" : "Category"}</dt><dd>{category}</dd></div><div><dt>{isId ? "Stok tersedia" : "Available stock"}</dt><dd>{stock}</dd></div></dl><button className={styles.productDialogAdd} type="button" disabled={!canAdd} onClick={onAdd}><Plus size={17} />{isId ? "Tambah ke keranjang" : "Add to basket"}</button></div>
  </dialog>;
}

const posProducts: POSProduct[] = [
  { id: "M001", en: "Mineral water", idName: "Air mineral", mode: "minimarket", category: "Drinks", price: 6000, stock: 24, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=450&q=80" },
  { id: "M002", en: "Fresh milk", idName: "Susu segar", mode: "minimarket", category: "Drinks", price: 18000, stock: 12, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=450&q=80" },
  { id: "M003", en: "Sourdough bread", idName: "Roti sourdough", mode: "minimarket", category: "Food", price: 32000, stock: 8, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=450&q=80" },
  { id: "M004", en: "Bananas", idName: "Pisang", mode: "minimarket", category: "Food", price: 15000, stock: 15, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=450&q=80" },
  { id: "C001", en: "Cappuccino", idName: "Cappuccino", mode: "coffee", category: "Drinks", price: 28000, stock: 30, image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=450&q=80" },
  { id: "C002", en: "Iced latte", idName: "Es latte", mode: "coffee", category: "Drinks", price: 32000, stock: 30, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=450&q=80" },
  { id: "C003", en: "Butter croissant", idName: "Croissant mentega", mode: "coffee", category: "Food", price: 22000, stock: 10, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=450&q=80" },
  { id: "C004", en: "Chocolate cake", idName: "Kue cokelat", mode: "coffee", category: "Food", price: 35000, stock: 6, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=450&q=80" },
  { id: "S001", en: "Canvas backpack", idName: "Tas kanvas", mode: "store", category: "Accessories", price: 425000, stock: 8, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=450&q=80" },
  { id: "S002", en: "Everyday notebook", idName: "Buku catatan", mode: "store", category: "Stationery", price: 65000, stock: 20, image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=450&q=80" },
  { id: "S003", en: "Desk lamp", idName: "Lampu meja", mode: "store", category: "Accessories", price: 185000, stock: 5, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=450&q=80" },
];
type Sale = { number: number; store: string; lines: { name: string; quantity: number; total: number }[]; subtotal: number; discount: number; total: number; method: string; paid: number; change: number };

function CashierApp({ locale }: { locale: Locale }) {
  const isId = locale === "id";
  const [mode, setMode] = useState<StoreMode>("minimarket");
  const [stock, setStock] = useState(() => Object.fromEntries(posProducts.map((product) => [product.id, product.stock])));
  const [basket, setBasket] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [discountPercent, setDiscountPercent] = useState("0");
  const [method, setMethod] = useState<"cash" | "digital">("cash");
  const [cash, setCash] = useState("");
  const [error, setError] = useState("");
  const [addedNotice, setAddedNotice] = useState("");
  const [history, setHistory] = useState<Sale[]>([]);
  const [receipt, setReceipt] = useState<Sale | null>(null);
  const [detailProduct, setDetailProduct] = useState<POSProduct | null>(null);
  const [view, setView] = useState<"sale" | "history">("sale");
  const noticeTimer = useRef<number | null>(null);
  const receiptRef = useRef<HTMLElement | null>(null);
  const scrollReceiptAfterSale = useRef(false);
  useEffect(() => () => {
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
  }, []);
  useEffect(() => {
    if (!receipt || !scrollReceiptAfterSale.current) return;
    scrollReceiptAfterSale.current = false;
    if (window.matchMedia("(max-width: 700px)").matches) {
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      receiptRef.current?.scrollIntoView({ behavior, block: "start" });
    }
  }, [receipt]);
  const modeLabels = { minimarket: "Minimarket", coffee: isId ? "Kedai kopi" : "Coffee shop", store: isId ? "Toko" : "Store" };
  const categoryLabels: Record<string, string> = isId ? { All: "Semua", Drinks: "Minuman", Food: "Makanan", Accessories: "Aksesori", Stationery: "Alat tulis" } : { All: "All", Drinks: "Drinks", Food: "Food", Accessories: "Accessories", Stationery: "Stationery" };
  const name = (product: POSProduct) => isId ? product.idName : product.en;
  const catalog = posProducts.filter((product) => product.mode === mode);
  const categories = ["All", ...new Set(catalog.map((product) => product.category))];
  const visible = catalog.filter((product) => (category === "All" || category === product.category) && `${name(product)} ${product.id}`.toLowerCase().includes(search.toLowerCase()));
  const lines = posProducts.filter((product) => basket[product.id] > 0);
  const count = Object.values(basket).reduce((sum, quantity) => sum + quantity, 0);
  const subtotal = lines.reduce((sum, product) => sum + product.price * basket[product.id], 0);
  const discountValid = Number.isFinite(Number(discountPercent)) && Number(discountPercent) >= 0 && Number(discountPercent) <= 100;
  const discount = discountValid ? Math.round(subtotal * Number(discountPercent) / 100) : 0;
  const total = subtotal - discount;
  const paid = method === "digital" ? total : Number(cash);
  const paymentValid = method === "digital" || (cash.trim() !== "" && Number.isSafeInteger(paid) && paid >= total);
  const ready = lines.length > 0 && discountValid && paymentValid;
  function add(product: POSProduct) {
    if ((basket[product.id] ?? 0) >= stock[product.id]) { setError(isId ? "Stok tidak mencukupi." : "Not enough stock."); return; }
    setBasket((current) => ({ ...current, [product.id]: (current[product.id] ?? 0) + 1 })); setError("");
    setAddedNotice(isId ? `${name(product)} ditambahkan ke keranjang.` : `${name(product)} added to basket.`);
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setAddedNotice(""), 2400);
  }
  function reduce(id: string) { setBasket((current) => { const next = { ...current }; if (next[id] > 1) next[id] -= 1; else delete next[id]; return next; }); }
  function changeMode(next: StoreMode) { setMode(next); setBasket({}); setCash(""); setDiscountPercent("0"); setSearch(""); setCategory("All"); setError(""); setReceipt(null); }
  function completeSale(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready) { setError(isId ? "Periksa keranjang, diskon, dan uang diterima." : "Check the basket, discount, and amount received."); return; }
    if (lines.some((product) => basket[product.id] > stock[product.id])) { setError(isId ? "Stok tidak mencukupi." : "Not enough stock."); return; }
    const sale: Sale = { number: history.length + 1, store: modeLabels[mode], lines: lines.map((product) => ({ name: name(product), quantity: basket[product.id], total: product.price * basket[product.id] })), subtotal, discount, total, method: method === "cash" ? (isId ? "Tunai" : "Cash") : "Digital (demo)", paid, change: paid - total };
    setStock((current) => { const next = { ...current }; lines.forEach((product) => { next[product.id] -= basket[product.id]; }); return next; });
    setHistory((current) => [sale, ...current]); scrollReceiptAfterSale.current = true; setReceipt(sale); setBasket({}); setCash(""); setDiscountPercent("0"); setError("");
  }
  return <main className={styles.posApp}>
    <header className={styles.posHeader}><div className={styles.brand}><span><ShoppingBasket size={22} /></span><b>Counterpoint<small>CASHIER APP</small></b></div><nav aria-label={isId ? "Menu kasir" : "Cashier menus"}><button className={view === "sale" ? styles.activeTab : ""} onClick={() => setView("sale")} type="button"><ShoppingCart size={16} />{isId ? "Kasir" : "Register"}</button><button className={view === "history" ? styles.activeTab : ""} onClick={() => setView("history")} type="button"><Receipt size={16} />{isId ? "Riwayat" : "History"}<small>{history.length}</small></button></nav><span className={styles.demoNotice}>{isId ? "SIMULASI / TANPA PEMBAYARAN NYATA" : "SIMULATION / NO REAL PAYMENTS"}</span></header>
    {addedNotice ? <div className={styles.addedNotice} role="status"><Check size={17} aria-hidden="true" />{addedNotice}</div> : null}
    {receipt ? <section ref={receiptRef} className={styles.receipt} aria-label={isId ? "Struk demo" : "Demo receipt"}><div className={styles.pageHeading}><div><span className={styles.mono}>{receipt.store} / #{String(receipt.number).padStart(4, "0")}</span><h2>{isId ? "Transaksi demo selesai" : "Demo sale complete"}</h2></div><button className={styles.secondary} onClick={() => setReceipt(null)} type="button">{isId ? "Tutup struk" : "Close receipt"}</button></div>{receipt.lines.map((line, index) => <div className={styles.totalRow} key={index}><span>{line.quantity} × {line.name}</span><b>{rupiah(line.total)}</b></div>)}<hr /><div className={styles.totalRow}><span>Subtotal</span><b>{rupiah(receipt.subtotal)}</b></div><div className={styles.totalRow}><span>{isId ? "Diskon" : "Discount"}</span><b>-{rupiah(receipt.discount)}</b></div><div className={styles.totalRow}><strong>Total</strong><strong>{rupiah(receipt.total)}</strong></div><div className={styles.totalRow}><span>{receipt.method}</span><b>{rupiah(receipt.paid)}</b></div><div className={styles.totalRow}><span>{isId ? "Kembalian" : "Change"}</span><b>{rupiah(receipt.change)}</b></div><p role="status">{isId ? "Struk contoh. Tidak ada pembayaran diproses atau pesanan dikirim." : "Sample receipt. No payment processed or order submitted."}</p></section> : null}
    {view === "history" ? <section className={styles.content}><div className={styles.pageHeading}><div><h1>{isId ? "Riwayat transaksi" : "Sales history"}</h1><p>{isId ? "Transaksi simulasi sesi ini." : "Simulated transactions from this session."}</p></div></div>{history.length ? <div className={styles.tableScroll}><table><thead><tr><th>#</th><th>{isId ? "Toko" : "Store"}</th><th>Total</th><th>{isId ? "Pembayaran" : "Payment"}</th><th>{isId ? "Struk" : "Receipt"}</th></tr></thead><tbody>{history.map((sale) => <tr key={sale.number}><td>{sale.number}</td><td>{sale.store}</td><td>{rupiah(sale.total)}</td><td>{sale.method}</td><td><button className={styles.iconButton} type="button" title={isId ? "Lihat struk" : "View receipt"} aria-label={`${isId ? "Lihat struk" : "View receipt"}: ${sale.number}`} onClick={() => setReceipt(sale)}><Receipt size={18} /></button></td></tr>)}</tbody></table></div> : <p className={styles.empty}>{isId ? "Belum ada transaksi." : "No sales yet."}</p>}</section> : <div className={styles.posLayout}>
      <section className={styles.catalog}><div className={styles.pageHeading}><div><span className={styles.mono}>{isId ? "PILIH PRODUK" : "SELECT PRODUCTS"}</span><h1>{modeLabels[mode]}</h1></div><label className={styles.modeSelect}>{isId ? "Jenis toko" : "Store type"}<select aria-label={isId ? "Jenis toko" : "Store type"} value={mode} onChange={(event) => changeMode(event.target.value as StoreMode)}>{(Object.keys(modeLabels) as StoreMode[]).map((item) => <option key={item} value={item}>{modeLabels[item]}</option>)}</select></label></div><form className={styles.search} onSubmit={(event) => { event.preventDefault(); const exact = catalog.find((product) => product.id.toLowerCase() === search.trim().toLowerCase()); if (exact) { add(exact); setSearch(""); } else setError(isId ? "Kode produk tidak ditemukan." : "Product code not found."); }}><Search size={16} /><input aria-label={isId ? "Cari produk atau kode" : "Search products or code"} placeholder={isId ? "Cari nama atau kode (M001)..." : "Search name or code (M001)..."} value={search} onChange={(event) => setSearch(event.target.value)} /><button className={styles.iconButton} type="submit" title={isId ? "Tambah berdasarkan kode" : "Add by code"} aria-label={isId ? "Tambah berdasarkan kode" : "Add by code"}><Plus size={16} /></button></form><div className={styles.categories} role="group" aria-label={isId ? "Kategori produk" : "Product categories"}>{categories.map((item) => <button key={item} className={category === item ? styles.activeTab : ""} aria-pressed={category === item} type="button" onClick={() => setCategory(item)}>{categoryLabels[item]}</button>)}</div><div className={styles.posProducts}>{visible.map((product) => <article key={product.id} className={styles.posProduct}><button className={styles.productDetailButton} type="button" aria-haspopup="dialog" aria-label={`${isId ? "Detail produk" : "View product details"}: ${name(product)}`} onClick={() => setDetailProduct(product)}><div className={styles.productPhoto}><Image src={product.image} alt={name(product)} fill sizes="(max-width: 600px) 50vw, 25vw" /></div><small>{product.id} / {stock[product.id]} {isId ? "tersedia" : "in stock"}</small><strong>{name(product)}</strong><b>{rupiah(product.price)}</b></button><button className={styles.productAdd} type="button" title={isId ? "Tambah ke keranjang" : "Add to basket"} aria-label={`${isId ? "Tambah" : "Add"}: ${name(product)}`} disabled={stock[product.id] === 0 || (basket[product.id] ?? 0) >= stock[product.id]} onClick={() => add(product)}><Plus size={18} /></button></article>)}</div>{visible.length === 0 ? <p className={styles.empty}>{isId ? "Produk tidak ditemukan." : "No matching products."}</p> : null}</section>
      <form className={styles.basket} onSubmit={completeSale}><div className={styles.basketHeading}><div><h2>{isId ? "Transaksi saat ini" : "Current sale"}</h2><span>{count} {isId ? "barang" : "items"}</span></div><button className={styles.iconButton} disabled={count === 0} title={isId ? "Kosongkan keranjang" : "Clear basket"} aria-label={isId ? "Kosongkan keranjang" : "Clear basket"} type="button" onClick={() => { setBasket({}); setCash(""); setError(""); }}><Trash2 size={17} /></button></div><div className={styles.basketLines}>{lines.length ? lines.map((product) => <div className={styles.basketLine} key={product.id}><div><b>{name(product)}</b><small>{rupiah(product.price)}</small></div><div className={styles.quantity}><button className={styles.iconButton} type="button" aria-label={`${isId ? "Kurangi" : "Decrease"}: ${name(product)}`} onClick={() => reduce(product.id)}><Minus size={14} /></button><span>{basket[product.id]}</span><button className={styles.iconButton} type="button" aria-label={`${isId ? "Tambah jumlah" : "Increase"}: ${name(product)}`} disabled={basket[product.id] >= stock[product.id]} onClick={() => add(product)}><Plus size={14} /></button></div><strong>{rupiah(product.price * basket[product.id])}</strong></div>) : <p className={styles.empty}>{isId ? "Pilih produk untuk memulai." : "Select a product to start."}</p>}</div><div className={styles.totalRow}><span>Subtotal</span><b>{rupiah(subtotal)}</b></div><label className={styles.totalRow}>{isId ? "Diskon (%)" : "Discount (%)"}<input type="number" min="0" max="100" step="0.1" value={discountPercent} onChange={(event) => setDiscountPercent(event.target.value)} /></label><div className={styles.grandTotal}><strong>Total IDR</strong><strong>{rupiah(total)}</strong></div><fieldset className={styles.paymentMethods}><legend>{isId ? "Pembayaran demo" : "Demo payment"}</legend><label><input type="radio" name="payment-method" checked={method === "cash"} onChange={() => setMethod("cash")} />{isId ? "Tunai" : "Cash"}</label><label><input type="radio" name="payment-method" checked={method === "digital"} onChange={() => setMethod("digital")} />Digital (demo)</label></fieldset>{method === "cash" ? <label className={styles.cashInput}>{isId ? "Uang diterima (IDR)" : "Amount received (IDR)"}<input type="number" min="0" max="1000000000" step="1" value={cash} onChange={(event) => setCash(event.target.value)} /><button className={styles.textButton} type="button" onClick={() => setCash(String(total))}>{isId ? "Uang pas" : "Exact amount"}</button></label> : null}<div className={styles.totalRow}><span>{isId ? "Kembalian" : "Change"}</span><b>{rupiah(paymentValid ? Math.max(0, paid - total) : 0)}</b></div>{error ? <p className={styles.error} role="alert">{error}</p> : null}<button className={styles.checkout} disabled={!ready} type="submit"><Check size={17} />{isId ? "Selesaikan transaksi demo" : "Complete demo sale"}</button><p className={styles.safety}>{isId ? "Data hanya pada sesi ini. Tanpa pembayaran nyata. Pergantian jenis toko mengosongkan keranjang." : "Session-only sample data. No real payment. Switching store types clears the basket."}</p></form>
    </div>}
    {detailProduct ? <ProductDetailDialog product={detailProduct} locale={locale} stock={stock[detailProduct.id]} canAdd={stock[detailProduct.id] > (basket[detailProduct.id] ?? 0)} onClose={() => setDetailProduct(null)} onAdd={() => { add(detailProduct); setDetailProduct(null); }} /> : null}
  </main>;
}