import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { gsap, Observer } from "../lib/gsap";
import { IconClose, IconMenu } from "./icons";
import Magnetic from "./Magnetic";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const headerRef = useRef(null);

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
        if (open || window.scrollY < 140) return;
        gsap.to(headerRef.current, { y: "-100%", duration: 0.4, ease: "power2.out" });
      },
    });
    return () => observer.kill();
  }, [open]);

  useEffect(() => {
    if (!menuRef.current) return;
    if (open) {
      gsap.set(menuRef.current, { display: "flex" });
      gsap.fromTo(
        menuRef.current,
        { autoAlpha: 0, y: -12 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        menuRef.current.querySelectorAll("a"),
        { autoAlpha: 0, y: -8 },
        { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.06, delay: 0.05 }
      );
    } else {
      gsap.to(menuRef.current, {
        autoAlpha: 0,
        y: -12,
        duration: 0.25,
        onComplete: () => gsap.set(menuRef.current, { display: "none" }),
      });
    }
  }, [open]);

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
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `relative text-sm font-semibold tracking-wide py-2 transition-colors ${
                  isActive ? "text-terracotta" : "text-ink/70 hover:text-ink"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-[2px] bg-terracotta transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </>
              )}
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

      <div
        ref={menuRef}
        className="md:hidden hidden flex-col gap-1 bg-cream/98 backdrop-blur-md border-t border-ink/10 px-6 py-4"
        style={{ opacity: 0 }}
      >
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/"}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `py-3 text-base font-semibold border-b border-ink/5 ${
                isActive ? "text-terracotta" : "text-ink/85"
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
        <NavLink
          to="/contact"
          onClick={() => setOpen(false)}
          className="mt-3 text-center rounded-full bg-ink text-cream text-sm font-semibold px-5 py-3"
        >
          Get a Quote
        </NavLink>
      </div>
    </header>
  );
}
