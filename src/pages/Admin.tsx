import { useState } from "react";
import { toast } from "sonner";
import {
  LogOut, Plus, Trash2, Edit3, Save, X, Lock,
  Fish as FishIcon, Users, ImagePlus,
} from "lucide-react";
import { useAdmin, useFish, useFishermen, formatRp } from "@/hooks/useStore";
import { Fish, Fisherman } from "@/data/mockData";

// ─── EMPTY STATES ─────────────────────────────────────────────
const emptyFish: Omit<Fish, "id"> = {
  name: "", category: "Ikan", price: 0, stock: 0,
  unit: "kg", description: "", image: "", fishermanId: "",
};

const emptyFisherman: Omit<Fisherman, "id"> = {
  name: "", location: "", experience: "", specialty: "",
  photo: "", phone: "", rating: 5.0, reviews: 0,
  description: "", departure_time: "", daily_catch: "", gallery: "[]",
};

// ─── FISH FORM ────────────────────────────────────────────────
const FishForm = ({
  draft, setDraft, fishermen, onSave, onCancel,
}: {
  draft: Omit<Fish, "id">;
  setDraft: (d: Omit<Fish, "id">) => void;
  fishermen: Fisherman[];
  onSave: () => void;
  onCancel: () => void;
}) => (
  <div className="grid md:grid-cols-2 gap-3 p-4 bg-aqua/10 rounded-xl mt-3">
    <input placeholder="Nama Ikan" value={draft.name}
      onChange={(e) => setDraft({ ...draft, name: e.target.value })}
      className="px-3 py-2 rounded-lg border border-border text-sm" />
    <select value={draft.category}
      onChange={(e) => setDraft({ ...draft, category: e.target.value as Fish["category"] })}
      className="px-3 py-2 rounded-lg border border-border text-sm">
      {["Ikan","Udang","Cumi","Kepiting","Kerang"].map(c => <option key={c}>{c}</option>)}
    </select>
    <input type="number" placeholder="Harga (Rp)" value={draft.price || ""}
      onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
      className="px-3 py-2 rounded-lg border border-border text-sm" />
    <input type="number" placeholder="Stok" value={draft.stock || ""}
      onChange={(e) => setDraft({ ...draft, stock: Number(e.target.value) })}
      className="px-3 py-2 rounded-lg border border-border text-sm" />
    <input placeholder="Satuan (kg / ekor / ikat)" value={draft.unit}
      onChange={(e) => setDraft({ ...draft, unit: e.target.value })}
      className="px-3 py-2 rounded-lg border border-border text-sm" />
    <select value={draft.badge ?? ""}
      onChange={(e) => setDraft({ ...draft, badge: (e.target.value as Fish["badge"]) || undefined })}
      className="px-3 py-2 rounded-lg border border-border text-sm">
      <option value="">Tanpa Badge</option>
      <option value="Fresh Today">Fresh Today</option>
      <option value="Best Seller">Best Seller</option>
      <option value="Limited Stock">Limited Stock</option>
    </select>
    <input placeholder="URL Gambar Ikan" value={draft.image}
      onChange={(e) => setDraft({ ...draft, image: e.target.value })}
      className="px-3 py-2 rounded-lg border border-border text-sm md:col-span-2" />
    {draft.image && (
      <div className="md:col-span-2">
        <p className="text-xs text-muted-foreground mb-1">Preview:</p>
        <img src={draft.image} alt="preview"
          className="w-20 h-20 object-cover rounded-lg border border-border"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      </div>
    )}
    <select value={draft.fishermanId}
      onChange={(e) => setDraft({ ...draft, fishermanId: e.target.value })}
      className="px-3 py-2 rounded-lg border border-border text-sm md:col-span-2">
      <option value="">-- Pilih Nelayan --</option>
      {fishermen.map(f => <option key={f.id} value={f.id}>{f.name} — {f.location}</option>)}
    </select>
    <textarea placeholder="Deskripsi ikan" value={draft.description}
      onChange={(e) => setDraft({ ...draft, description: e.target.value })}
      className="px-3 py-2 rounded-lg border border-border text-sm md:col-span-2 resize-none" rows={2} />
    <div className="flex gap-2 md:col-span-2">
      <button onClick={onSave}
        className="flex-1 py-2.5 rounded-lg gradient-aqua text-navy font-semibold text-sm flex items-center justify-center gap-1">
        <Save className="w-4 h-4" /> Simpan
      </button>
      <button onClick={onCancel}
        className="flex-1 py-2.5 rounded-lg bg-white border border-border text-sm flex items-center justify-center gap-1">
        <X className="w-4 h-4" /> Batal
      </button>
    </div>
  </div>
);

// ─── FISHERMAN FORM ───────────────────────────────────────────
const FishermanForm = ({
  draft, setDraft, onSave, onCancel,
}: {
  draft: Omit<Fisherman, "id">;
  setDraft: (d: Omit<Fisherman, "id">) => void;
  onSave: () => void;
  onCancel: () => void;
}) => {
  const [galleryUrl, setGalleryUrl] = useState("");

  const gallery: string[] = (() => {
    try { return draft.gallery ? JSON.parse(draft.gallery) : []; }
    catch { return []; }
  })();

  const addGallery = () => {
    const u = galleryUrl.trim();
    if (!u) return;
    const updated = [...gallery, u];
    setDraft({ ...draft, gallery: JSON.stringify(updated) });
    setGalleryUrl("");
  };

  const removeGallery = (i: number) => {
    const updated = gallery.filter((_, idx) => idx !== i);
    setDraft({ ...draft, gallery: JSON.stringify(updated) });
  };

  return (
    <div className="grid md:grid-cols-2 gap-3 p-4 bg-aqua/10 rounded-xl mt-3">
      {/* Data dasar */}
      <input placeholder="Nama Nelayan *" value={draft.name}
        onChange={(e) => setDraft({ ...draft, name: e.target.value })}
        className="px-3 py-2 rounded-lg border border-border text-sm" />
      <input placeholder="Lokasi (contoh: Pelabuhan Jimbaran, Bali)" value={draft.location}
        onChange={(e) => setDraft({ ...draft, location: e.target.value })}
        className="px-3 py-2 rounded-lg border border-border text-sm" />
      <input placeholder="Pengalaman (contoh: 10+ Tahun)" value={draft.experience}
        onChange={(e) => setDraft({ ...draft, experience: e.target.value })}
        className="px-3 py-2 rounded-lg border border-border text-sm" />
      <input placeholder="Spesialisasi (contoh: Deep Sea Fishing)" value={draft.specialty}
        onChange={(e) => setDraft({ ...draft, specialty: e.target.value })}
        className="px-3 py-2 rounded-lg border border-border text-sm" />
      <input placeholder="No. WhatsApp * (contoh: 6281234567890)" value={draft.phone}
        onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
        className="px-3 py-2 rounded-lg border border-border text-sm" />
      <input type="number" placeholder="Rating (1-5)" value={draft.rating || ""}
        min={1} max={5} step={0.1}
        onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })}
        className="px-3 py-2 rounded-lg border border-border text-sm" />
      <input placeholder="URL Foto Profil Nelayan" value={draft.photo}
        onChange={(e) => setDraft({ ...draft, photo: e.target.value })}
        className="px-3 py-2 rounded-lg border border-border text-sm md:col-span-2" />
      {draft.photo && (
        <div className="md:col-span-2">
          <p className="text-xs text-muted-foreground mb-1">Preview foto profil:</p>
          <img src={draft.photo} alt="preview"
            className="w-16 h-16 object-cover rounded-full border border-border"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        </div>
      )}

      {/* Deskripsi */}
      <div className="md:col-span-2">
        <p className="text-xs font-semibold text-navy mb-1">Tentang Nelayan</p>
        <textarea placeholder="Deskripsi singkat tentang nelayan..."
          value={draft.description ?? ""}
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-border text-sm resize-none" rows={3} />
      </div>

      {/* Jadwal & tangkapan */}
      <div>
        <p className="text-xs font-semibold text-navy mb-1">Jadwal Berangkat</p>
        <input placeholder="contoh: 03:00 AM" value={draft.departure_time ?? ""}
          onChange={(e) => setDraft({ ...draft, departure_time: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-border text-sm" />
      </div>
      <div>
        <p className="text-xs font-semibold text-navy mb-1">Rata-rata Tangkapan/Hari</p>
        <input placeholder="contoh: 200-300 kg/hari" value={draft.daily_catch ?? ""}
          onChange={(e) => setDraft({ ...draft, daily_catch: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-border text-sm" />
      </div>

      {/* Galeri Aktivitas */}
      <div className="md:col-span-2">
        <p className="text-xs font-semibold text-navy mb-2">Galeri Aktivitas</p>
        {gallery.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mb-3">
            {gallery.map((url, i) => (
              <div key={i} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img src={url} alt={"foto " + (i + 1)}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23e5e7eb'/%3E%3C/svg%3E"; }} />
                <button onClick={() => removeGallery(i)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input value={galleryUrl}
            onChange={(e) => setGalleryUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addGallery()}
            placeholder="Paste URL foto galeri lalu Enter atau klik Tambah..."
            className="flex-1 px-3 py-2 rounded-lg border border-border text-xs focus:border-turquoise outline-none" />
          <button onClick={addGallery}
            className="px-3 py-2 rounded-lg gradient-aqua text-navy font-semibold text-xs flex items-center gap-1 hover:opacity-90 transition">
            <ImagePlus className="w-3.5 h-3.5" /> Tambah
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1">
          Gunakan URL langsung dari Imgbb, Google Drive (share link), atau Unsplash
        </p>
      </div>

      <div className="flex gap-2 md:col-span-2">
        <button onClick={onSave}
          className="flex-1 py-2.5 rounded-lg gradient-aqua text-navy font-semibold text-sm flex items-center justify-center gap-1">
          <Save className="w-4 h-4" /> Simpan
        </button>
        <button onClick={onCancel}
          className="flex-1 py-2.5 rounded-lg bg-white border border-border text-sm flex items-center justify-center gap-1">
          <X className="w-4 h-4" /> Batal
        </button>
      </div>
    </div>
  );
};

// ─── LOGIN ────────────────────────────────────────────────────
const AdminLogin = () => {
  const { login } = useAdmin();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(u, p)) toast.success("Selamat datang admin!");
    else toast.error("Username atau password salah");
  };
  return (
    <section className="pt-32 pb-12 container mx-auto px-4 min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white rounded-3xl p-8 md:p-10 shadow-soft w-full max-w-md animate-scale-in">
        <div className="w-14 h-14 rounded-2xl gradient-aqua flex items-center justify-center mx-auto">
          <Lock className="w-7 h-7 text-navy" />
        </div>
        <h1 className="font-display font-bold text-2xl text-navy text-center mt-5">Admin Login</h1>
        <p className="text-center text-xs text-muted-foreground mt-1">Username: · Password: </p>
        <div className="mt-6 space-y-4">
          <input value={u} onChange={(e) => setU(e.target.value)} placeholder="Username"
            className="w-full px-4 py-3 rounded-xl border border-border focus:border-turquoise outline-none text-sm" />
          <input type="password" value={p} onChange={(e) => setP(e.target.value)} placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-border focus:border-turquoise outline-none text-sm" />
          <button className="w-full py-3.5 rounded-xl gradient-aqua text-navy font-semibold shadow-glow hover:opacity-90 transition">
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

// ─── MAIN ADMIN ───────────────────────────────────────────────
const Admin = () => {
  const { isAdmin, logout } = useAdmin();
  const { fish, add: addFish, update: updateFish, remove: removeFish } = useFish();
  const { fishermen, add: addFisherman, update: updateFisherman, remove: removeFisherman } = useFishermen();

  const [tab, setTab] = useState<"fish" | "fishermen">("fish");

  const [editingFish, setEditingFish] = useState<string | null>(null);
  const [fishDraft, setFishDraft] = useState<Omit<Fish, "id">>(emptyFish);
  const [showAddFish, setShowAddFish] = useState(false);

  const [editingFisherman, setEditingFisherman] = useState<string | null>(null);
  const [fishermanDraft, setFishermanDraft] = useState<Omit<Fisherman, "id">>(emptyFisherman);
  const [showAddFisherman, setShowAddFisherman] = useState(false);

  if (!isAdmin) return <AdminLogin />;

  const startEditFish = (f: Fish) => { setEditingFish(f.id); setFishDraft({ ...f }); setShowAddFish(false); };
  const saveEditFish = async () => {
    if (!editingFish) return;
    await updateFish(editingFish, fishDraft);
    setEditingFish(null);
    toast.success("Ikan diperbarui");
  };
  const submitAddFish = async () => {
    if (!fishDraft.name) { toast.error("Nama ikan wajib diisi"); return; }
    await addFish(fishDraft);
    setFishDraft(emptyFish);
    setShowAddFish(false);
    toast.success("Ikan berhasil ditambahkan");
  };

  const startEditFisherman = (f: Fisherman) => {
    setEditingFisherman(f.id);
    setFishermanDraft({ ...f, gallery: f.gallery || "[]" });
    setShowAddFisherman(false);
  };
  const saveEditFisherman = async () => {
    if (!editingFisherman) return;
    await updateFisherman(editingFisherman, fishermanDraft);
    setEditingFisherman(null);
    toast.success("Data nelayan diperbarui");
  };
  const submitAddFisherman = async () => {
    if (!fishermanDraft.name) { toast.error("Nama nelayan wajib diisi"); return; }
    if (!fishermanDraft.phone) { toast.error("No. WhatsApp wajib diisi"); return; }
    await addFisherman(fishermanDraft);
    setFishermanDraft(emptyFisherman);
    setShowAddFisherman(false);
    toast.success("Nelayan berhasil ditambahkan");
  };

  return (
    <section className="pt-28 pb-12 container mx-auto px-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-3xl text-navy">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Kelola hasil laut dan nelayan SeaFound</p>
        </div>
        <button onClick={logout}
          className="px-4 py-2 rounded-xl bg-white border border-border text-sm flex items-center gap-2 hover:border-destructive hover:text-destructive transition">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {/* Tab */}
      <div className="mt-6 flex gap-2">
        {[
          { k: "fish", label: "Hasil Laut", icon: FishIcon },
          { k: "fishermen", label: "Nelayan", icon: Users },
        ].map(t => (
          <button key={t.k} onClick={() => setTab(t.k as "fish" | "fishermen")}
            className={"px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition " +
              (tab === t.k ? "bg-navy text-white" : "bg-white border border-border text-muted-foreground")}>
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB FISH ── */}
      {tab === "fish" && (
        <div className="mt-6">
          <button onClick={() => { setShowAddFish(true); setFishDraft(emptyFish); setEditingFish(null); }}
            className="px-4 py-2.5 rounded-xl gradient-aqua text-navy font-semibold text-sm flex items-center gap-2 shadow-glow">
            <Plus className="w-4 h-4" /> Tambah Ikan
          </button>
          {showAddFish && (
            <FishForm draft={fishDraft} setDraft={setFishDraft} fishermen={fishermen}
              onSave={submitAddFish} onCancel={() => setShowAddFish(false)} />
          )}
          <div className="mt-6 bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted text-navy text-left">
                  <tr>
                    <th className="px-4 py-3">Gambar</th>
                    <th className="px-4 py-3">Nama</th>
                    <th className="px-4 py-3">Kategori</th>
                    <th className="px-4 py-3">Harga</th>
                    <th className="px-4 py-3">Stok</th>
                    <th className="px-4 py-3">Nelayan</th>
                    <th className="px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {fish.length === 0 && (
                    <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                      Belum ada data ikan. Klik "Tambah Ikan".
                    </td></tr>
                  )}
                  {fish.map(f => (
                    <tr key={f.id} className="border-t border-border">
                      <td className="px-4 py-3">
                        {f.image ? (
                          <img src={f.image} className="w-12 h-12 rounded-lg object-cover" alt={f.name}
                            onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect width='48' height='48' fill='%23e5e7eb'/%3E%3C/svg%3E"; }} />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                            <FishIcon className="w-5 h-5 text-muted-foreground" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium text-navy">{f.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{f.category}</td>
                      <td className="px-4 py-3 text-turquoise font-semibold">{formatRp(f.price)}</td>
                      <td className="px-4 py-3">{f.stock} {f.unit}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {fishermen.find(x => x.id === f.fishermanId)?.name ?? "-"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex gap-1">
                          <button onClick={() => startEditFish(f)}
                            className="p-2 rounded-lg hover:bg-aqua/20 text-navy">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button onClick={async () => { await removeFish(f.id); toast.success("Ikan dihapus"); }}
                            className="p-2 rounded-lg hover:bg-destructive/10 text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {editingFish && (
              <div className="p-4 border-t border-border">
                <p className="text-sm font-semibold text-navy mb-1">Edit Ikan</p>
                <FishForm draft={fishDraft} setDraft={setFishDraft} fishermen={fishermen}
                  onSave={saveEditFish} onCancel={() => setEditingFish(null)} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB FISHERMEN ── */}
      {tab === "fishermen" && (
        <div className="mt-6">
          <button onClick={() => { setShowAddFisherman(true); setFishermanDraft(emptyFisherman); setEditingFisherman(null); }}
            className="px-4 py-2.5 rounded-xl gradient-aqua text-navy font-semibold text-sm flex items-center gap-2 shadow-glow">
            <Plus className="w-4 h-4" /> Tambah Nelayan
          </button>
          {showAddFisherman && (
            <FishermanForm draft={fishermanDraft} setDraft={setFishermanDraft}
              onSave={submitAddFisherman} onCancel={() => setShowAddFisherman(false)} />
          )}

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fishermen.length === 0 && (
              <p className="col-span-full text-center text-muted-foreground py-8">
                Belum ada data nelayan. Klik "Tambah Nelayan".
              </p>
            )}
            {fishermen.map(f => {
              const gallery: string[] = (() => {
                try { return f.gallery ? JSON.parse(f.gallery) : []; } catch { return []; }
              })();
              return (
                <div key={f.id} className="bg-white rounded-2xl p-5 shadow-card">
                  <div className="flex gap-4 items-start">
                    {f.photo ? (
                      <img src={f.photo} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" alt={f.name}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                        <Users className="w-7 h-7 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-semibold text-navy truncate">{f.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{f.location}</p>
                      <p className="text-xs text-turquoise mt-1">{f.specialty} · {f.experience}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">WA: {f.phone}</p>
                      {gallery.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-0.5">{gallery.length} foto galeri</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => startEditFisherman(f)}
                      className="flex-1 py-2 rounded-lg border border-border text-sm flex items-center justify-center gap-1 hover:bg-aqua/10 text-navy transition">
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button onClick={async () => { await removeFisherman(f.id); toast.success("Nelayan dihapus"); }}
                      className="flex-1 py-2 rounded-lg border border-destructive/30 text-sm flex items-center justify-center gap-1 hover:bg-destructive/10 text-destructive transition">
                      <Trash2 className="w-3.5 h-3.5" /> Hapus
                    </button>
                  </div>
                  {editingFisherman === f.id && (
                    <FishermanForm draft={fishermanDraft} setDraft={setFishermanDraft}
                      onSave={saveEditFisherman} onCancel={() => setEditingFisherman(null)} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
export default Admin;
