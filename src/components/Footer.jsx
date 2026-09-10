import { NavLink, useLocation } from "react-router-dom";
import { IconMail, IconPhone, IconPin } from "./icons";

export default function Footer() {
  // Every page except Contact ends with <CtaBand>, which already draws its
  // own indigo → ink wave into this footer. Contact ends on a plain cream
  // section instead, so only there does the footer need to draw its own.
  const { pathname } = useLocation();
  const needsOwnWave = pathname === "/contact";

  return (
    <footer className="relative bg-ink text-cream/80 pt-20 pb-10 overflow-hidden">
      {needsOwnWave && (
        <svg
          className="absolute -top-1 left-0 w-full text-cream"
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          style={{ height: 40 }}
        >
          <path d="M0,32 C240,0 480,0 720,18 C960,36 1200,36 1440,10 L1440,40 L0,40 Z" fill="currentColor" />
        </svg>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/images/logo-mark-raw.png" alt="" loading="lazy" decoding="async" className="h-9 w-9 object-contain rounded-md" />
            <span className="font-display font-semibold text-lg text-cream">Legacy Textile Solutions</span>
          </div>
          <p className="text-sm leading-relaxed text-cream/60 max-w-sm">
            Chemical partners for textile success — pretreatment, dyeing, printing and
            finishing chemistry for manufacturers, part of Legacy Group of Industries.
          </p>
        </div>

        <div>
          <h4 className="text-cream font-semibold text-sm uppercase tracking-[0.15em] mb-4">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            <li><NavLink to="/" className="hover:text-terracotta-light transition-colors">Home</NavLink></li>
            <li><NavLink to="/about" className="hover:text-terracotta-light transition-colors">About Us</NavLink></li>
            <li><NavLink to="/services" className="hover:text-terracotta-light transition-colors">Services</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-terracotta-light transition-colors">Contact</NavLink></li>
          </ul>
        </div>

        <div>
          <h4 className="text-cream font-semibold text-sm uppercase tracking-[0.15em] mb-4">Chemistry</h4>
          <ul className="space-y-2.5 text-sm text-cream/70">
            <li>Pretreatment</li>
            <li>Dyeing</li>
            <li>Printing</li>
            <li>Finishing</li>
          </ul>
        </div>

        <div>
          <h4 className="text-cream font-semibold text-sm uppercase tracking-[0.15em] mb-4">Get in touch</h4>
          <ul className="space-y-3 text-sm text-cream/70">
            <li className="flex items-start gap-2.5">
              <IconPin className="h-4 w-4 mt-0.5 shrink-0 text-terracotta-light" />
              <span>Nadir Chowk, Ruhi Nala Road, Gajjumatta, Lahore, Pakistan</span>
            </li>
            <li className="flex items-center gap-2.5">
              <IconPhone className="h-4 w-4 shrink-0 text-terracotta-light" />
              <span>+92 323 5292333</span>
            </li>
            <li className="flex items-center gap-2.5">
              <IconMail className="h-4 w-4 shrink-0 text-terracotta-light" />
              <span>info@legacy-textiles.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-14 pt-6 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/40">
        <p>© {new Date().getFullYear()} Legacy Textile Solutions (Pvt) Ltd. All rights reserved.</p>
        <p>A part of Legacy Group of Industries</p>
      </div>
    </footer>
  );
}
