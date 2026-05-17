import { Link } from "react-router-dom";
import { ArrowRight, Fish as FishIcon, ShieldCheck, Users, Truck } from "lucide-react";
import { WaveBackground } from "@/components/seafound/WaveBackground";
import { FishCard } from "@/components/seafound/FishCard";
import { useFish, useFishermen } from "@/hooks/useStore";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Home = () => {
  useScrollReveal();
  const { fish } = useFish();
  const { fishermen } = useFishermen();
  const featured = fish.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-32 overflow-hidden gradient-soft">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-aqua/30 blur-3xl animate-float" />
        <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-turquoise/20 blur-3xl animate-float" style={{ animationDelay: "1s" }}/>

        <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-aqua/40 text-xs font-semibold text-navy">
              <span className="w-1.5 h-1.5 rounded-full bg-turquoise animate-pulse"/> Marketplace Hasil Laut #1
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl text-navy leading-tight mt-5">
              Hubungkan Nelayan <br /> Langsung dengan <span className="text-gradient">Pembeli</span>
            </h1>
            <p className="text-muted-foreground mt-5 text-base md:text-lg max-w-lg">
              Platform digital transparan untuk membeli hasil tangkapan laut segar secara realtime. Adil untuk nelayan, segar untuk Anda.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/catalog" className="px-6 py-3.5 rounded-full gradient-aqua text-navy font-semibold text-sm shadow-glow hover:scale-105 transition flex items-center gap-2">
                Lihat Hasil Laut <ArrowRight className="w-4 h-4"/>
              </Link>
              <Link to="/fishermen" className="px-6 py-3.5 rounded-full bg-white border border-border text-navy font-semibold text-sm hover:border-turquoise transition">
                Hubungi Nelayan
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-10 max-w-md">
              {[
                { v: "150+", l: "Nelayan" },
                { v: "10k+", l: "Pesanan" },
                { v: "4.9★", l: "Rating" },
              ].map(s => (
                <div key={s.l} className="text-center">
                  <div className="font-display font-bold text-navy text-2xl">{s.v}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-scale-in">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 gradient-ocean rounded-[3rem] rotate-6 opacity-90"/>
              <img src="https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&h=800&fit=crop"
                alt="Fresh seafood"
                className="relative w-full h-full object-cover rounded-[3rem] shadow-soft animate-float"/>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-soft flex items-center gap-3 animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="w-10 h-10 rounded-full gradient-aqua flex items-center justify-center"><FishIcon className="w-5 h-5 text-navy"/></div>
                <div>
                  <p className="text-xs text-muted-foreground">Fresh Today</p>
                  <p className="font-display font-bold text-navy text-sm">{fish.length}+ Items</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-soft animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex -space-x-2">
                  {fishermen.slice(0, 3).map(f => (
                    <img key={f.id} src={f.photo} alt="" className="w-8 h-8 rounded-full ring-2 ring-white object-cover"/>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">+{fishermen.length} Nelayan Aktif</p>
              </div>
            </div>
          </div>
        </div>
        <WaveBackground />
      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12 scroll-reveal">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-navy">Kenapa SeaFound?</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Transparan, adil, dan langsung dari sumbernya.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: FishIcon, t: "Hasil Laut Segar", d: "Tangkapan harian dari nelayan terverifikasi." },
            { icon: ShieldCheck, t: "Transaksi Aman", d: "Kontak langsung tanpa perantara mahal." },
            { icon: Users, t: "Berdayakan Nelayan", d: "Pendapatan adil untuk komunitas pesisir." },
            { icon: Truck, t: "Pengiriman Cepat", d: "Estimasi 1-2 hari ke kota Anda." },
          ].map((f, i) => (
            <div key={f.t} className="bg-white rounded-2xl p-6 shadow-card hover:shadow-soft hover:-translate-y-1 transition scroll-reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="w-12 h-12 rounded-xl gradient-aqua flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-navy"/>
              </div>
              <h3 className="font-display font-semibold text-navy">{f.t}</h3>
              <p className="text-sm text-muted-foreground mt-1.5">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED CATCH */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-b from-aqua/10 to-transparent rounded-3xl">
        <div className="flex items-end justify-between mb-10 scroll-reveal">
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-navy">Hasil Tangkapan Terbaru</h2>
            <p className="text-muted-foreground mt-2">Pilihan terbaik minggu ini</p>
          </div>
          <Link to="/catalog" className="hidden md:flex items-center gap-1 text-turquoise font-semibold text-sm hover:gap-2 transition-all">
            Lihat Semua <ArrowRight className="w-4 h-4"/>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {featured.map((f, i) => (
            <FishCard key={f.id} fish={f} fisherman={fishermen.find(x => x.id === f.fishermanId)} idx={i}/>
          ))}
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-navy rounded-3xl p-8 md:p-14 text-white grid md:grid-cols-2 gap-10 items-center relative overflow-hidden scroll-reveal">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-turquoise/30 blur-3xl"/>
          <div className="relative">
            <h2 className="font-display font-bold text-3xl md:text-4xl">Tentang <span className="text-turquoise">SeaFound</span></h2>
            <p className="text-white/70 mt-4 leading-relaxed">
              SeaFound lahir dari semangat memberdayakan nelayan tradisional Indonesia. Kami percaya teknologi dapat menjembatani jurang antara hasil laut segar dan meja makan Anda — dengan harga adil dan transparan.
            </p>
            <Link to="/about" className="inline-flex mt-6 items-center gap-2 px-5 py-3 rounded-full bg-white text-navy font-semibold text-sm hover:bg-aqua transition">
              Pelajari Lebih Lanjut <ArrowRight className="w-4 h-4"/>
            </Link>
          </div>
          <div className="relative grid grid-cols-2 gap-3">
            {fishermen.slice(0, 4).map((f, i) => (
              <img key={f.id} src={f.photo} alt={f.name}
                className={`w-full h-40 object-cover rounded-2xl shadow-soft ${i % 2 ? "translate-y-6" : ""}`}/>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
