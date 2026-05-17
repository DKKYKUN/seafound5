import { Heart, Globe, Sparkles, TrendingUp } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const About = () => {
  useScrollReveal();
  return (
    <section className="pt-32 pb-12 container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
        <h1 className="font-display font-bold text-4xl md:text-5xl text-navy">Tentang <span className="text-gradient">SeaFound</span></h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Kami percaya bahwa hasil laut Indonesia layak dihargai dengan adil — baik bagi nelayan yang menangkap, maupun pembeli yang menikmati.
        </p>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {[
          { icon: Heart, t: "Filosofi", d: "Menghormati laut, menghormati nelayan. Setiap tangkapan adalah hasil kerja keras yang patut dihargai." },
          { icon: Globe, t: "Tujuan Platform", d: "Menjadi jembatan transparan antara nelayan tradisional dan pembeli modern di seluruh Indonesia." },
          { icon: Sparkles, t: "Dampak Sosial", d: "Memberdayakan ribuan keluarga nelayan dengan pendapatan yang lebih adil dan akses pasar yang luas." },
          { icon: TrendingUp, t: "Tentang Proyek", d: "SeaFound adalah inisiatif teknologi yang mendigitalisasi rantai pasok hasil laut Indonesia." },
        ].map((s, i) => (
          <div key={s.t} className="bg-white rounded-2xl p-7 shadow-card scroll-reveal" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="w-12 h-12 rounded-xl gradient-aqua flex items-center justify-center mb-4">
              <s.icon className="w-6 h-6 text-navy"/>
            </div>
            <h3 className="font-display font-bold text-navy text-xl">{s.t}</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-navy rounded-3xl p-10 md:p-14 text-white text-center max-w-5xl mx-auto scroll-reveal relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-turquoise/30 blur-3xl"/>
        <h2 className="font-display font-bold text-3xl relative">Visi Kami</h2>
        <p className="text-white/70 mt-4 max-w-2xl mx-auto relative">
          Menjadikan Indonesia sebagai pusat marketplace hasil laut paling transparan dan adil di Asia Tenggara, dengan nelayan sebagai pahlawan utamanya.
        </p>
      </div>
    </section>
  );
};
export default About;
