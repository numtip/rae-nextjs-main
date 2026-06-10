"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { mainNav } from "@/data/navigation";
import type { Locale } from "@/lib/locale";
import PageContainer from "@/components/layout/PageContainer";
import NavItem from "./NavItem";

type Props = {
  locale: Locale;
  ariaLabel: string;
};

export default function MobileNav({ locale, ariaLabel }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const label = locale === "th" ? "เปิด/ปิดเมนู" : "Toggle menu";

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <div className="mobile-nav">
      <button
        type="button"
        className="mobile-nav-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (locale === "th" ? "ปิด" : "Close") : locale === "th" ? "เมนู" : "Menu"}
      </button>
      <div
        id={panelId}
        className={`mobile-nav-panel${open ? " is-open" : ""}`}
        hidden={!open}
      >
        <PageContainer>
          <nav aria-label={ariaLabel}>
            <ul className="nav-list">
              {mainNav.map((item) => (
                <li key={item.path}>
                  <NavItem
                    locale={locale}
                    path={item.path}
                    label={item.label[locale]}
                    onNavigate={close}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </PageContainer>
      </div>
    </div>
  );
}
