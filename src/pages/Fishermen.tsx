import { FishermanCard } from "@/components/seafound/FishermanCard";
import { useFishermen } from "@/hooks/useStore";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Fishermen = () => {
  useScrollReveal();
  const { fishermen, loading } = useFishermen();

  return (
    <section className="pt-32 pb-12 container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto animate-fade-in-up">
        <h1 className="font-display font-bold text-4xl md:text-5xl text-navy">
          Profil <span className="text-gradient">Nelayan</span>
        </h1>
        <p className="text-muted-foreground mt-3">
          Bertemu dengan nelayan terverifikasi di seluruh Indonesia.
        </p>
      </div>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 shadow-card animate-pulse">
              <div className="flex flex-col items-center gap-3">
                <div className="w-24 h-24 rounded-full bg-gray-200" />
                <div className="h-4 w-32 rounded bg-gray-200" />
                <div className="h-3 w-24 rounded bg-gray-200" />
                <div className="h-9 w-full rounded-xl bg-gray-200 mt-2" />
              </div>
            </div>
          ))
        ) : fishermen.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground py-16">
            Belum ada data nelayan. Tambahkan lewat halaman Admin.
          </p>
        ) : (
          fishermen.map((f, i) => <FishermanCard key={f.id} f={f} idx={i} />)
        )}
      </div>
    </section>
  );
};
export default Fishermen;
