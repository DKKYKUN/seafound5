import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { FishCard, FishCardSkeleton } from "@/components/seafound/FishCard";
import { useFish, useFishermen } from "@/hooks/useStore";
import { categories } from "@/data/mockData";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Catalog = () => {
  const { fish, loading: fishLoading } = useFish();
  const { fishermen, loading: fishermenLoading } = useFishermen();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<typeof categories[number]>("Semua");
  useScrollReveal();

  const loading = fishLoading || fishermenLoading;

  const filtered = useMemo(
    () =>
      fish.filter((f) => {
        const matchCat = cat === "Semua" || f.category === cat;
        const term = q.trim().toLowerCase();
        const matchQ =
          term === "" ||
          f.name.toLowerCase().includes(term) ||
          f.category.toLowerCase().includes(term) ||
          (f.description ?? "").toLowerCase().includes(term);
        return matchCat && matchQ;
      }),
    [fish, q, cat]
  );

  return (
    <section className="pt-32 pb-12 container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto animate-fade-in-up">
        <h1 className="font-display font-bold text-4xl md:text-5xl text-navy">
          Hasil Tangkapan <span className="text-gradient">Terbaru</span>
        </h1>
        <p className="text-muted-foreground mt-3">
          Katalog hasil laut segar langsung dari pelabuhan ke meja Anda.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="mt-10 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari nama ikan, udang, cumi..."
            className="w-full pl-11 pr-10 py-3 rounded-full bg-white border border-border focus:border-turquoise focus:ring-2 focus:ring-turquoise/30 outline-none text-sm"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-navy"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 flex-shrink-0">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all " +
                (cat === c
                  ? "bg-navy text-white shadow-sm"
                  : "bg-white border border-border text-muted-foreground hover:border-turquoise hover:text-navy")
              }
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Info hasil pencarian */}
      {!loading && q && (
        <p className="mt-4 text-sm text-muted-foreground">
          {filtered.length > 0
            ? `${filtered.length} hasil untuk "${q}"`
            : `Tidak ada hasil untuk "${q}"`}
        </p>
      )}

      {/* Grid */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <FishCardSkeleton key={i} />)
        ) : filtered.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center gap-3">
            <Search className="w-10 h-10 text-muted-foreground/40" />
            <p className="text-muted-foreground">
              {fish.length === 0
                ? "Belum ada produk. Tambahkan lewat halaman Admin."
                : q
                ? `Tidak ada hasil untuk "${q}". Coba kata kunci lain.`
                : "Tidak ada produk di kategori ini."}
            </p>
            {(q || cat !== "Semua") && (
              <button
                onClick={() => { setQ(""); setCat("Semua"); }}
                className="text-sm text-turquoise underline underline-offset-2"
              >
                Reset filter
              </button>
            )}
          </div>
        ) : (
          filtered.map((f, i) => (
            <FishCard
              key={f.id + "|" + cat + "|" + q}
              fish={f}
              fisherman={fishermen.find((x) => x.id === f.fishermanId)}
              idx={i}
            />
          ))
        )}
      </div>
    </section>
  );
};
export default Catalog;
