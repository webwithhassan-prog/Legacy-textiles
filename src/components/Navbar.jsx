import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { gsap, Observer } from "../lib/gsap";
import {
  IconArrowRight,
  IconClose,
  IconDroplet,
  IconFlask,
  IconMail,
  IconMenu,
  IconPhone,
  IconSparkle,
  IconSwatches,
} from "./icons";
import Magnetic from "./Magnetic";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const SERVICES_MENU = [
  { icon: IconFlask, title: "Pretreatment", color: "#7fa9b8", slug: "pretreatment", desc: "Scouring, bleaching & desizing" },
  { icon: IconDroplet, title: "Dyeing", color: "#0f8f86", slug: "dyeing", desc: "Vivid, wash-fast colour" },
  { icon: IconSwatches, title: "Printing", color: "#c22a63", slug: "printing", desc: "Sharp, durable definition" },
  { icon: IconSparkle, title: "Finishing", color: "#d69a2d", slug: "finishing", desc: "Softeners & performance coats" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const dropdownRef = useRef(null);
  const closeTimer = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Unified wheel/touch/scroll direction detection (works the same on
  // trackpad, mouse wheel and mobile touch) — slide the bar out of view on
  // the way down, bring it straight back on the way up.
  useEffect(() => {
    const observer = Observer.create({
      type: "wheel,touch,scroll",
      tolerance: 8,
      onUp: () => {
        gsap.to(headerRef.current, { y: 0, duration: 0.4, ease: "power2.out" });
      },
      onDown: () => {
        if (open || servicesOpen || window.scrollY < 140) return;
        gsap.to(headerRef.current, { y: "-100%", duration: 0.4, ease: "power2.out" });
      },
    });
    return () => observer.kill();
  }, [open, servicesOpen]);

  useEffect(() => {
    if (!menuRef.current) return;
    if (open) {
      gsap.set(menuRef.current, { display: "flex" });
      gsap.fromTo(menuRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(
        menuRef.current.querySelectorAll(".mnav-item"),
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06, delay: 0.1, ease: "power3.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        autoAlpha: 0,
        duration: 0.25,
        onComplete: () => gsap.set(menuRef.current, { display: "none" }),
      });
    }
  }, [open]);

  useEffect(() => {
    if (!dropdownRef.current) return;
    if (servicesOpen) {
      gsap.set(dropdownRef.current, { display: "block" });
      gsap.fromTo(
        dropdownRef.current,
        { autoAlpha: 0, y: -8 },
        { autoAlpha: 1, y: 0, duration: 0.25, ease: "power2.out" }
      );
    } else {
      gsap.to(dropdownRef.current, {
        autoAlpha: 0,
        y: -8,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => gsap.set(dropdownRef.current, { display: "none" }),
      });
    }
  }, [servicesOpen]);

  const openServices = () => {
    clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeServicesDelayed = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const goToService = (slug) => {
    setServicesOpen(false);
    navigate(`/services#${slug}`);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 inset-x-0 z-50 bg-cream/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_0_0_rgba(23,21,31,0.08)]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-6 px-6 lg:px-10 h-20">
        <NavLink to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <img
            src="/images/logo-mark-raw.png"
            alt="Legacy Textile Solutions mark"
            className="h-10 w-10 object-contain rounded-md transition-transform duration-500 group-hover:rotate-[8deg]"
          />
          <span className="leading-tight hidden sm:block">
            <span className="block font-display font-semibold text-lg text-ink tracking-tight">
              Legacy Textile
            </span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-indigo/70 -mt-0.5">
              Smart Chemical Solutions
            </span>
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center justify-center gap-9">
          <NavLink to="/" end className={({ isActive }) => navLinkClass(isActive)}>
            {({ isActive }) => <NavLabel active={isActive}>Home</NavLabel>}
          </NavLink>

          <div
            className="relative"
            onMouseEnter={openServices}
            onMouseLeave={closeServicesDelayed}
          >
            <NavLink
              to="/services"
              className={({ isActive }) => navLinkClass(isActive) + " inline-flex items-center gap-1.5"}
              onClick={() => setServicesOpen(false)}
              onFocus={openServices}
            >
              {({ isActive }) => (
                <>
                  <NavLabel active={isActive}>Services</NavLabel>
                  <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor">
                    <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </NavLink>

            <div
              ref={dropdownRef}
              onMouseEnter={openServices}
              onMouseLeave={closeServicesDelayed}
              style={{ display: "none", opacity: 0 }}
              className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[420px]"
            >
              <div className="rounded-[1.75rem] bg-white shadow-2xl ring-1 ring-ink/8 p-3 grid grid-cols-2 gap-2">
                {SERVICES_MENU.map(({ icon: Icon, title, color, slug, desc }) => (
                  <button
                    key={slug}
                    onClick={() => goToService(slug)}
                    className="group flex flex-col items-start gap-2.5 rounded-2xl p-3.5 text-left hover:bg-cream transition-colors"
                  >
                    <span
                      className="h-10 w-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${color}1a`, color }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-display font-semibold text-sm text-ink">{title}</span>
                      <span className="block text-xs text-ink/50 mt-0.5">{desc}</span>
                    </span>
                  </button>
                ))}
              </div>
              <NavLink
                to="/services"
                onClick={() => setServicesOpen(false)}
                className="mt-2 flex items-center justify-between rounded-2xl bg-indigo text-cream text-sm font-semibold px-5 py-3.5 hover:bg-indigo-dark transition-colors"
              >
                See the full chemistry range
                <IconArrowRight className="h-4 w-4" />
              </NavLink>
            </div>
          </div>

          {LINKS.filter((l) => l.to !== "/").map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => navLinkClass(isActive)}>
              {({ isActive }) => <NavLabel active={isActive}>{l.label}</NavLabel>}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Magnetic strength={0.3} className="hidden md:inline-block">
            <NavLink
              to="/contact"
              className="inline-flex rounded-full bg-ink text-cream text-sm font-semibold px-5 py-2.5 hover:bg-indigo-dark transition-colors"
            >
              Get a Quote
            </NavLink>
          </Magnetic>

          <button
            className="md:hidden text-ink p-2 -mr-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* full-screen mobile overlay — portaled to <body> because <header>'s
          own backdrop-blur makes it a containing block for its position:fixed
          descendants (same effect as a transform would), which collapsed
          this panel's top/bottom to the same line instead of the viewport */}
      {createPortal(
        <div
          ref={menuRef}
          className="md:hidden hidden fixed top-20 right-0 bottom-0 left-0 z-[60] bg-cream flex-col"
          style={{ opacity: 0 }}
        >
        <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col">
          <nav className="flex flex-col gap-1">
            {LINKS.slice(0, 1).map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `mnav-item font-display font-semibold text-3xl py-3.5 border-b border-ink/8 ${
                    isActive ? "text-terracotta" : "text-ink"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}

            <NavLink
              to="/services"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `mnav-item font-display font-semibold text-3xl py-3.5 border-b border-ink/8 ${
                  isActive ? "text-terracotta" : "text-ink"
                }`
              }
            >
              Services
            </NavLink>

            <div className="mnav-item grid grid-cols-2 gap-2 py-4">
              {SERVICES_MENU.map(({ icon: Icon, title, color, slug }) => (
                <button
                  key={slug}
                  onClick={() => {
                    setOpen(false);
                    navigate(`/services#${slug}`);
                  }}
                  className="flex items-center gap-2.5 rounded-xl bg-white ring-1 ring-ink/5 px-3 py-2.5 text-left"
                >
                  <span className="h-8 w-8 shrink-0 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}1a`, color }}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-ink/80">{title}</span>
                </button>
              ))}
            </div>

            {LINKS.slice(1).map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `mnav-item font-display font-semibold text-3xl py-3.5 border-b border-ink/8 ${
                    isActive ? "text-terracotta" : "text-ink"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className="mnav-item mt-8 text-center rounded-full bg-ink text-cream text-base font-semibold px-6 py-4"
          >
            Get a Quote
          </NavLink>

          <div className="mnav-item mt-auto pt-10 flex flex-col gap-3 text-sm text-ink/60">
            <a href="tel:+923235292333" className="flex items-center gap-2.5">
              <IconPhone className="h-4 w-4 text-terracotta shrink-0" /> +92 323 5292333
            </a>
            <a href="mailto:info@legacy-textiles.com" className="flex items-center gap-2.5">
              <IconMail className="h-4 w-4 text-terracotta shrink-0" /> info@legacy-textiles.com
            </a>
          </div>
        </div>
        </div>,
        document.body
      )}
    </header>
  );
}

function navLinkClass(isActive) {
  return `relative text-sm font-semibold tracking-wide py-2 transition-colors ${
    isActive ? "text-terracotta" : "text-ink/70 hover:text-ink"
  }`;
}

function NavLabel({ active, children }) {
  return (
    <>
      {children}
      <span
        className={`absolute left-0 -bottom-0.5 h-[2px] bg-terracotta transition-all duration-300 ${
          active ? "w-full" : "w-0"
        }`}
      />
    </>
  );
}
