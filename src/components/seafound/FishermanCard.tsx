import { useState } from "react";
import { MapPin, Star, Briefcase, MessageCircle, Clock, Package, ChevronDown, ChevronUp, X, ImagePlus } from "lucide-react";
import { Fisherman } from "@/data/mockData";
import { waLink } from "@/hooks/useStore";

export const FishermanCard = ({ f, idx = 0 }: { f: Fisherman; idx?: number }) => {
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  // Parse gallery dari JSON string
  const gallery: string[] = (() => {
    try { return f.gallery ? JSON.parse(f.gallery) : []; }
    catch { return []; }
  })();

  const hasDetail = f.description || f.departure_time || f.daily_catch || gallery.length > 0;

  return (
    <>
      <div
        className="bg-white rounded-3xl shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        style={{ animation: `fadeSlideUp 0.4s ease-out ${idx * 70}ms both` }}
      >
        {/* ── Header ── */}
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-aqua/40 bg-gray-100">
                {f.photo ? (
                  <img src={f.photo} alt={f.name} className="w-full h-full object-cover" loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-aqua/20 text-turquoise font-bold text-2xl">
                    {f.name.charAt(0)}
                  </div>
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 bg-turquoise text-navy text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                Verified
              </span>
            </div>

            <h3 className="font-display font-bold text-navy mt-4">{f.name}</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" />{f.location}
            </p>
            <div className="flex items-center gap-1 mt-2 text-xs">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-navy">{f.rating}</span>
              <span className="text-muted-foreground">({f.reviews} reviews)</span>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-secondary text-navy font-medium">
                {f.specialty}
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-secondary text-navy font-medium flex items-center gap-1">
                <Briefcase className="w-3 h-3" />{f.experience}
              </span>
            </div>

            <a
              href={waLink(f.phone, `Halo ${f.name}, saya tertarik dengan hasil tangkapan Anda di SeaFound.`)}
              target="_blank" rel="noreferrer"
              className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl gradient-aqua text-navy font-semibold text-sm hover:opacity-90 transition"
            >
              <MessageCircle className="w-4 h-4" /> Hubungi Nelayan
            </a>

            {hasDetail && (
              <button
                onClick={() => setExpanded(e => !e)}
                className="mt-3 w-full flex items-center justify-center gap-1 py-2 rounded-xl border border-border text-xs text-muted-foreground hover:border-turquoise hover:text-navy transition"
              >
                {expanded
                  ? <><ChevronUp className="w-3.5 h-3.5" /> Sembunyikan</>
                  : <><ChevronDown className="w-3.5 h-3.5" /> Lihat Detail & Galeri</>}
              </button>
            )}
          </div>
        </div>

        {/* ── Detail + Galeri (read-only, hanya tampil jika ada data) ── */}
        {expanded && hasDetail && (
          <div className="border-t border-border px-6 pb-6 pt-4 space-y-5">

            {/* Deskripsi */}
            {f.description && (
              <div>
                <p className="text-xs font-semibold text-navy mb-1">Tentang Nelayan</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            )}

            {/* Info jadwal & tangkapan */}
            {(f.departure_time || f.daily_catch) && (
              <div className="grid grid-cols-2 gap-2 text-xs">
                {f.departure_time && (
                  <div className="bg-aqua/10 rounded-xl p-3">
                    <p className="text-muted-foreground flex items-center gap-1 mb-1">
                      <Clock className="w-3 h-3" /> Jadwal Berangkat
                    </p>
                    <p className="font-semibold text-navy">{f.departure_time}</p>
                  </div>
                )}
                {f.daily_catch && (
                  <div className="bg-aqua/10 rounded-xl p-3">
                    <p className="text-muted-foreground flex items-center gap-1 mb-1">
                      <Package className="w-3 h-3" /> Rata-rata Tangkapan
                    </p>
                    <p className="font-semibold text-navy">{f.daily_catch}</p>
                  </div>
                )}
              </div>
            )}

            {/* Galeri — hanya tampil, tidak bisa diedit */}
            {gallery.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-navy mb-3">Galeri Aktivitas</p>
                <div className="grid grid-cols-3 gap-2">
                  {gallery.map((url, i) => (
                    <div
                      key={i}
                      className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-pointer"
                      onClick={() => setLightbox(url)}
                    >
                      <img
                        src={url}
                        alt={"foto " + (i + 1)}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23e5e7eb'/%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Kalau galeri kosong tapi section dibuka */}
            {gallery.length === 0 && (
              <div className="flex flex-col items-center justify-center py-5 bg-gray-50 rounded-xl text-muted-foreground text-xs gap-1">
                <ImagePlus className="w-5 h-5 opacity-30" />
                <p>Belum ada foto galeri</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-4 text-white bg-black/40 rounded-full p-2 hover:bg-black/60 transition">
            <X className="w-5 h-5" />
          </button>
          <img
            src={lightbox}
            alt="preview"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};
