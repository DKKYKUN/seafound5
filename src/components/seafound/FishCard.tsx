import { useState, useEffect } from "react";
import { MapPin, MessageCircle, Fish as FishIcon } from "lucide-react";
import { Fish, Fisherman } from "@/data/mockData";
import { formatRp, waLink } from "@/hooks/useStore";

export const FishCard = ({
  fish,
  fisherman,
  idx = 0,
}: {
  fish: Fish;
  fisherman?: Fisherman;
  idx?: number;
}) => {
  const [imgOk, setImgOk] = useState<boolean | null>(null);

  useEffect(() => {
    const src = fish.image ? fish.image.trim() : "";
    if (!src) { setImgOk(false); return; }
    setImgOk(null);
    const img = new Image();
    img.onload  = () => setImgOk(true);
    img.onerror = () => setImgOk(false);
    img.src = src;
    return () => { img.onload = null; img.onerror = null; };
  }, [fish.image]);

  const imgSrc = fish.image ? fish.image.trim() : "";

  const badgeColor =
    fish.badge === "Best Seller" ? "bg-turquoise text-navy" :
    fish.badge === "Limited Stock" ? "bg-red-500 text-white" :
    "bg-navy text-white";

  const waMsg = "Halo " + (fisherman ? fisherman.name : "Nelayan") +
    ", saya ingin pesan " + fish.name +
    " (" + formatRp(fish.price) + "/" + fish.unit + ") dari SeaFound.";
  const waHref = waLink(fisherman ? fisherman.phone : "6281234567890", waMsg);

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-soft hover:-translate-y-1 transition-all duration-300"
      style={{
        animation: `fadeSlideUp 0.4s ease-out ${idx * 50}ms both`,
      }}
    >
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {/* Loading skeleton */}
        {imgOk === null && imgSrc && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        {/* Gambar berhasil */}
        {imgOk === true && (
          <img
            src={imgSrc}
            alt={fish.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}

        {/* Fallback */}
        {imgOk === false && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-aqua/20 gap-2">
            <FishIcon className="w-12 h-12 text-turquoise/50" />
            <span className="text-xs text-muted-foreground">Tidak ada gambar</span>
          </div>
        )}

        {fish.badge && (
          <span className={"absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-semibold " + badgeColor}>
            {fish.badge}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-display font-semibold text-navy text-base leading-tight">{fish.name}</h3>
        <p className="text-turquoise font-bold mt-1">
          {formatRp(fish.price)}{" "}
          <span className="text-xs text-muted-foreground font-normal">/ {fish.unit}</span>
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
          <span>Stok: <strong className="text-navy">{fish.stock} {fish.unit}</strong></span>
          {fisherman && (
            <span className="flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3" />
              {fisherman.location.split(",")[0]}
            </span>
          )}
        </div>
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl gradient-aqua text-navy font-semibold text-sm hover:opacity-90 transition"
        >
          <MessageCircle className="w-4 h-4" /> Order via WhatsApp
        </a>
      </div>
    </div>
  );
};

export const FishCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-card">
    <div className="aspect-square bg-gray-200 animate-pulse" />
    <div className="p-4 space-y-2">
      <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
      <div className="h-4 w-1/2 rounded bg-gray-200 animate-pulse" />
      <div className="h-9 w-full rounded-xl mt-3 bg-gray-200 animate-pulse" />
    </div>
  </div>
);
