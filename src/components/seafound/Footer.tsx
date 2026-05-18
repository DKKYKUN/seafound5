import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Fish } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const Footer = () => (
  <footer className="container mx-auto px-4 pb-8 mt-20">
    <div className="bg-navy text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
      {/* wave dekorasi */}
      <svg className="absolute bottom-0 inset-x-0 opacity-10" viewBox="0 0 1200 80" preserveAspectRatio="none">
        <path d="M0,40 C300,80 600,0 900,40 C1050,60 1150,30 1200,40 L1200,80 L0,80 Z" fill="hsl(var(--turquoise))"/>
      </svg>

      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Logo light />
          <p className="text-white/70 text-sm mt-4 leading-relaxed max-w-xs">
            Marketplace hasil laut segar yang menghubungkan nelayan Indonesia langsung dengan pembeli.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-turquoise/30 flex items-center justify-center transition">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-turquoise/30 flex items-center justify-center transition">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-turquoise/30 flex items-center justify-center transition">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Menu */}
        <div>
          <h4 className="font-display font-semibold mb-4 text-white">Menu</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li><Link to="/" className="hover:text-turquoise transition">Home</Link></li>
            <li><Link to="/catalog" className="hover:text-turquoise transition">Catalog</Link></li>
            <li><Link to="/fishermen" className="hover:text-turquoise transition">Nelayan</Link></li>
            <li><Link to="/about" className="hover:text-turquoise transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-turquoise transition">Contact</Link></li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h4 className="font-display font-semibold mb-4 text-white">Kontak</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <Phone className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>+62 895-4283-66663</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>hello@seafound.id</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>Bengkulu, Indonesia</span>
            </li>
          </ul>
        </div>

        {/* Tentang */}
        <div>
          <h4 className="font-display font-semibold mb-4 text-white">Tentang SeaFound</h4>
          <p className="text-sm text-white/70 leading-relaxed">
            Platform digital yang memudahkan transaksi hasil laut. Kami berkomitmen mendukung
            kesejahteraan nelayan lokal Indonesia.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-turquoise font-medium">
            <Fish className="w-3.5 h-3.5" />
            <span>100% Nelayan Terverifikasi</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
        <span>© {new Date().getFullYear()} SeaFound. All Rights Reserved.</span>
        <span>Dibuat untuk nelayan Indonesia</span>
      </div>
    </div>
  </footer>
);
