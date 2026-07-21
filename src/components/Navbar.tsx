"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#" },
  { label: "Serviços", href: "#solucao" },
  { label: "Funil", href: "#funil" },
  { label: "Metodologia", href: "#como-funciona" },
  { label: "Para Quem", href: "#para-quem" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Menu appears after 50px of scroll
      setVisible(y > 50);

      // Background fades in from 50px to 800px, reaching solid at 800px
      const progress = Math.min(Math.max((y - 50) / 750, 0), 1);
      setBgOpacity(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300"
      style={{
        background: `rgba(0, 4, 10, ${bgOpacity * 0.95})`,
        backdropFilter: `blur(${bgOpacity * 12}px)`,
        WebkitBackdropFilter: `blur(${bgOpacity * 12}px)`,
        borderColor: `rgba(255, 255, 255, ${bgOpacity * 0.08})`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display text-xl font-bold text-text-primary">
          VS <span className="text-accent-blue">Growth</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center gap-1 bg-bg-card/60 border border-border-default rounded-full px-2 py-1.5">
            {links.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-elevated px-4 py-1.5 rounded-full transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <a
          href="#cta"
          className="hidden md:inline-flex border border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white text-sm font-semibold px-5 py-2 rounded-full transition-all"
        >
          Contato
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-text-primary"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-t border-border-default px-6 py-4 flex flex-col gap-4"
        >
          {links.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={() => setMobileOpen(false)}
            className="border border-accent-blue text-accent-blue text-sm font-semibold px-5 py-2.5 rounded-full text-center transition-colors"
          >
            Contato
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
