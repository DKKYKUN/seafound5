import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send, MessageCircle } from "lucide-react";
import { waLink } from "@/hooks/useStore";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error("Lengkapi semua field"); return; }
    toast.success("Pesan terkirim! Kami akan menghubungi Anda segera.");
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <section className="pt-32 pb-12 container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto animate-fade-in-up">
        <h1 className="font-display font-bold text-4xl md:text-5xl text-navy">Hubungi <span className="text-gradient">Kami</span></h1>
        <p className="text-muted-foreground mt-3">Punya pertanyaan? Tim SeaFound siap membantu.</p>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="space-y-5">
          {[
            { icon: Phone, t: "WhatsApp Admin", v: "+62 812 3456 789", href: waLink("6281234567890", "Halo SeaFound, saya butuh bantuan.") },
            { icon: Mail, t: "Email", v: "hello@seafound.id", href: "mailto:hello@seafound.id" },
            { icon: MapPin, t: "Lokasi", v: "Bengkulu, Indonesia", href: "#" },
          ].map(c => (
            <a key={c.t} href={c.href} target="_blank" rel="noreferrer"
              className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-card hover:shadow-soft hover:-translate-y-0.5 transition">
              <div className="w-12 h-12 rounded-xl gradient-aqua flex items-center justify-center"><c.icon className="w-5 h-5 text-navy"/></div>
              <div>
                <p className="text-xs text-muted-foreground">{c.t}</p>
                <p className="font-display font-semibold text-navy">{c.v}</p>
              </div>
            </a>
          ))}
          <a href={waLink("6281234567890", "Halo SeaFound!")} target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#25D366] text-white font-semibold shadow-card hover:opacity-90 transition">
            <MessageCircle className="w-5 h-5"/> Chat WhatsApp Sekarang
          </a>
        </div>

        <form onSubmit={submit} className="bg-white rounded-2xl p-7 shadow-card space-y-4">
          <div>
            <label className="text-xs font-medium text-navy">Nama Lengkap</label>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:border-turquoise focus:ring-2 focus:ring-turquoise/30 outline-none text-sm"/>
          </div>
          <div>
            <label className="text-xs font-medium text-navy">Email</label>
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:border-turquoise focus:ring-2 focus:ring-turquoise/30 outline-none text-sm"/>
          </div>
          <div>
            <label className="text-xs font-medium text-navy">Pesan</label>
            <textarea rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
              className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:border-turquoise focus:ring-2 focus:ring-turquoise/30 outline-none text-sm resize-none"/>
          </div>
          <button className="w-full py-3.5 rounded-xl gradient-aqua text-navy font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition shadow-glow">
            <Send className="w-4 h-4"/> Kirim Pesan
          </button>
        </form>
      </div>
    </section>
  );
};
export default Contact;
