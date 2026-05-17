import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Fish, Fisherman } from "@/data/mockData";

// ─── FISH ─────────────────────────────────────────────────────
export function useFish() {
  const [fish, setFish] = useState<Fish[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFish = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("fish").select("*").order("created_at", { ascending: false });
    if (error) { console.error(error.message); setLoading(false); return; }
    setFish((data || []).map((row: any) => ({
      id:          String(row.id),
      name:        row.name ?? "",
      category:    row.category ?? "Ikan",
      price:       Number(row.price) || 0,
      stock:       Number(row.stock) || 0,
      unit:        row.unit ?? "kg",
      description: row.description ?? "",
      image:       row.image ?? "",
      fishermanId: row.fisherman_id ?? "",
      badge:       row.badge ?? undefined,
    })));
    setLoading(false);
  }, []);

  useEffect(() => { fetchFish(); }, [fetchFish]);

  const add = useCallback(async (f: Omit<Fish, "id">) => {
    const { error } = await supabase.from("fish").insert({
      name: f.name, category: f.category, price: f.price, stock: f.stock,
      unit: f.unit, description: f.description, image: f.image,
      fisherman_id: f.fishermanId, badge: f.badge ?? null,
    });
    if (error) { console.error(error.message); return; }
    await fetchFish();
  }, [fetchFish]);

  const update = useCallback(async (id: string, patch: Partial<Fish>) => {
    const p: Record<string, any> = {};
    if (patch.name        !== undefined) p.name         = patch.name;
    if (patch.category    !== undefined) p.category     = patch.category;
    if (patch.price       !== undefined) p.price        = patch.price;
    if (patch.stock       !== undefined) p.stock        = patch.stock;
    if (patch.unit        !== undefined) p.unit         = patch.unit;
    if (patch.description !== undefined) p.description  = patch.description;
    if (patch.image       !== undefined) p.image        = patch.image;
    if (patch.fishermanId !== undefined) p.fisherman_id = patch.fishermanId;
    if (patch.badge       !== undefined) p.badge        = patch.badge ?? null;
    const { error } = await supabase.from("fish").update(p).eq("id", id);
    if (error) { console.error(error.message); return; }
    await fetchFish();
  }, [fetchFish]);

  const remove = useCallback(async (id: string) => {
    const { error } = await supabase.from("fish").delete().eq("id", id);
    if (error) { console.error(error.message); return; }
    await fetchFish();
  }, [fetchFish]);

  return { fish, loading, add, update, remove };
}

// ─── FISHERMEN ────────────────────────────────────────────────
export function useFishermen() {
  const [fishermen, setFishermen] = useState<Fisherman[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFishermen = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("fishermen").select("*").order("created_at", { ascending: false });
    if (error) { console.error(error.message); setLoading(false); return; }
    setFishermen((data || []).map((row: any) => ({
      id:             String(row.id),
      name:           row.name ?? "",
      location:       row.location ?? "",
      experience:     row.experience ?? "",
      specialty:      row.specialty ?? "",
      photo:          row.photo ?? "",
      phone:          row.phone ?? "",
      rating:         Number(row.rating) || 0,
      reviews:        Number(row.reviews) || 0,
      description:    row.description ?? "",
      departure_time: row.departure_time ?? "",
      daily_catch:    row.daily_catch ?? "",
      gallery:        row.gallery ?? "",
    })));
    setLoading(false);
  }, []);

  useEffect(() => { fetchFishermen(); }, [fetchFishermen]);

  const add = useCallback(async (f: Omit<Fisherman, "id">) => {
    const { error } = await supabase.from("fishermen").insert({
      name: f.name, location: f.location, experience: f.experience,
      specialty: f.specialty, photo: f.photo, phone: f.phone,
      rating: f.rating, reviews: f.reviews,
      description: f.description ?? "",
      departure_time: f.departure_time ?? "",
      daily_catch: f.daily_catch ?? "",
      gallery: f.gallery ?? "",
    });
    if (error) { console.error(error.message); return; }
    await fetchFishermen();
  }, [fetchFishermen]);

  const update = useCallback(async (id: string, patch: Partial<Fisherman>) => {
    const p: Record<string, any> = {};
    if (patch.name           !== undefined) p.name           = patch.name;
    if (patch.location       !== undefined) p.location       = patch.location;
    if (patch.experience     !== undefined) p.experience     = patch.experience;
    if (patch.specialty      !== undefined) p.specialty      = patch.specialty;
    if (patch.photo          !== undefined) p.photo          = patch.photo;
    if (patch.phone          !== undefined) p.phone          = patch.phone;
    if (patch.rating         !== undefined) p.rating         = patch.rating;
    if (patch.reviews        !== undefined) p.reviews        = patch.reviews;
    if (patch.description    !== undefined) p.description    = patch.description;
    if (patch.departure_time !== undefined) p.departure_time = patch.departure_time;
    if (patch.daily_catch    !== undefined) p.daily_catch    = patch.daily_catch;
    if (patch.gallery        !== undefined) p.gallery        = patch.gallery;
    const { error } = await supabase.from("fishermen").update(p).eq("id", id);
    if (error) { console.error(error.message); return; }
    await fetchFishermen();
  }, [fetchFishermen]);

  const remove = useCallback(async (id: string) => {
    const { error } = await supabase.from("fishermen").delete().eq("id", id);
    if (error) { console.error(error.message); return; }
    await fetchFishermen();
  }, [fetchFishermen]);

  return { fishermen, loading, add, update, remove };
}

// ─── ADMIN ────────────────────────────────────────────────────
const ADMIN_KEY = "seafound_admin";
export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState<boolean>(() =>
    typeof window !== "undefined" && localStorage.getItem(ADMIN_KEY) === "true"
  );
  const login = (u: string, p: string) => {
    if (u === "admin" && p === "admin123") { localStorage.setItem(ADMIN_KEY, "true"); setIsAdmin(true); return true; }
    return false;
  };
  const logout = () => { localStorage.removeItem(ADMIN_KEY); setIsAdmin(false); };
  return { isAdmin, login, logout };
}

export const formatRp = (n: number) => "Rp " + n.toLocaleString("id-ID");
export const waLink = (phone: string, msg: string) =>
  "https://wa.me/" + phone + "?text=" + encodeURIComponent(msg);
