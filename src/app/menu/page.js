"use client"

// src/app/menu/page.js

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MENU_STORAGE_KEY, SEED_MENU, CATEGORY_ORDER, FILTERS, BRAND } from "@/app/lib/constants"

// ── FOOD LABEL (veg / nonveg / egg) ─────────────────────────────────────────

function FoodLabel({ type }) {
  const config = {
    veg:    { border: "#388E3C", dot: "#388E3C", clip: "none" },
    nonveg: { border: "#B71C1C", dot: "#B71C1C", clip: "polygon(50% 0%, 0% 100%, 100% 100%)" },
    egg:    { border: "#F9A825", dot: "#F9A825", clip: "none" },
  }
  const c = config[type] || config.veg
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 18, height: 18,
      border: `1.5px solid ${c.border}`,
      borderRadius: 2, flexShrink: 0,
    }}>
      <span style={{
        width: 9, height: 9, borderRadius: "50%",
        background: c.dot, clipPath: c.clip,
      }} />
    </span>
  )
}

// ── BOOKMARK ─────────────────────────────────────────────────────────────────

function BookmarkIcon({ active, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: "rgba(12,58,51,0.55)", backdropFilter: "blur(6px)",
      border: "none", borderRadius: 8, width: 32, height: 32,
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", transition: "background 0.2s",
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24"
        fill={active ? "var(--gold)" : "none"}
        stroke={active ? "var(--gold)" : "var(--cream)"}
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  )
}

// ── MENU ITEM CARD ────────────────────────────────────────────────────────────

function MenuCard({ item }) {
  const [bookmarked, setBookmarked] = useState(false)

  return (
    <div style={{
      display: "flex", gap: 12,
      background: "#fff",
      borderRadius: 16, padding: 14,
      border: "1px solid var(--border)",
      boxShadow: "0 2px 16px rgba(12,58,51,0.06)",
      transition: "box-shadow 0.2s",
    }}>
      {/* LEFT */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
        <FoodLabel type={item.label} />
        <p style={{
          fontSize: 15, fontWeight: 600, color: "var(--ink)", lineHeight: 1.3,
          fontFamily: "var(--font-display)", marginTop: 2,
        }}>
          {item.name}
        </p>
        <p style={{
          fontSize: 14, fontWeight: 600, color: "var(--gold)",
          fontFamily: "var(--font-body)",
        }}>
          ₹{item.price}
        </p>
        <p style={{
          fontSize: 12, color: "var(--muted)", lineHeight: 1.5,
          fontFamily: "var(--font-body)",
        }}>
          {item.description}
        </p>
      </div>

      {/* RIGHT */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{
          width: 100, height: 100, borderRadius: 12,
          overflow: "hidden", background: "var(--parchment)", position: "relative",
        }}>
          <Image src={item.img} alt={item.name} fill style={{ objectFit: "cover" }} />
        </div>
        <div style={{ position: "absolute", top: 6, right: 6 }}>
          <BookmarkIcon active={bookmarked} onClick={() => setBookmarked(b => !b)} />
        </div>
      </div>
    </div>
  )
}

// ── SKELETON CARD ─────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div style={{
      display: "flex", gap: 12, background: "#fff",
      borderRadius: 16, padding: 14, border: "1px solid var(--border)",
    }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ width: 18, height: 18, borderRadius: 2, background: "var(--parchment)" }} />
        <div style={{ width: "60%", height: 16, borderRadius: 4, background: "var(--parchment)" }} />
        <div style={{ width: "25%", height: 14, borderRadius: 4, background: "var(--parchment)" }} />
        <div style={{ width: "90%", height: 12, borderRadius: 4, background: "var(--parchment)" }} />
      </div>
      <div style={{ width: 100, height: 100, borderRadius: 12, background: "var(--parchment)", flexShrink: 0 }} />
    </div>
  )
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)   // index into tabs
  const [activeFilters, setActiveFilters] = useState([])

  // Load from localStorage, seed if empty
  useEffect(() => {
    try {
      const raw = localStorage.getItem(MENU_STORAGE_KEY)
      const data = raw ? JSON.parse(raw) : null
      if (data && Array.isArray(data) && data.length > 0) {
        setMenuItems(data)
      } else {
        localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(SEED_MENU))
        setMenuItems(SEED_MENU)
      }
    } catch {
      setMenuItems(SEED_MENU)
    }
    setLoaded(true)
  }, [])

  // Build tabs from CATEGORY_ORDER, prepend "All"
  const tabs = ["All", ...CATEGORY_ORDER]

  const toggleFilter = (f) =>
    setActiveFilters(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    )

  const filtered = menuItems.filter(item => {
    const catMatch = activeCategory === 0 || item.category === tabs[activeCategory]
    const filterMatch =
      activeFilters.length === 0 ||
      activeFilters.every(f => item.filters?.includes(f))
    return catMatch && filterMatch
  })

  const WA_BOOK = `https://wa.me/${BRAND.phone}?text=${BRAND.waMessage}`

  return (
    <>
      <style>{`
        .menu-tab-row {
          display: flex;
          gap: 0;
          overflow-x: auto;
          border-bottom: 0.5px solid var(--border);
          padding-bottom: 0;
        }
        .menu-tab-row.hide-scrollbar { scrollbar-width: none; }
        .menu-tab-row.hide-scrollbar::-webkit-scrollbar { display: none; }

        .m-tab {
          flex-shrink: 0;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.75rem 1.1rem;
          font-family: var(--font-body);
          font-size: 0.78rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--muted);
          border-bottom: 2px solid transparent;
          margin-bottom: -0.5px;
          transition: color 0.2s, border-color 0.2s;
          white-space: nowrap;
          -webkit-tap-highlight-color: transparent;
        }
        .m-tab.active {
          color: var(--gold);
          border-bottom-color: var(--gold);
        }
        .m-tab:hover { color: var(--ink); }

        .filter-pill {
          flex-shrink: 0;
          white-space: nowrap;
          border: none;
          cursor: pointer;
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 12px;
          font-family: var(--font-body);
          transition: all 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .filter-pill:active { transform: scale(0.95); }

        .menu-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .skeleton { animation: pulse 1.5s ease-in-out infinite; }
      `}</style>

      <div style={{
        maxWidth: "100vw", margin: "0 auto",
        minHeight: "100vh", background: "var(--cream)",
        paddingBottom: 48,
      }}>

        {/* ── NAV ── */}
        <nav style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 1.25rem", height: 64,
          background: "var(--cream)",
          position: "sticky", top: 0, zIndex: 50,
          borderBottom: "0.5px solid var(--border)",
        }}>
          <Link href="/" style={{
            display: "flex", alignItems: "center", gap: 8, textDecoration: "none",
          }}>
            <img src="/teatings_logo.avif" alt="Teatings logo" height={30} style={{ width: "auto" }} />
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.4rem", fontWeight: 600,
              color: "var(--ink)", letterSpacing: "0.02em",
            }}>
              Tea<span style={{ color: "var(--gold)" }}>tings</span>
            </span>
          </Link>

          <a href={WA_BOOK} target="_blank" rel="noreferrer" style={{
            background: "var(--ink)", color: "var(--cream)",
            border: "none", borderRadius: 50,
            padding: "9px 18px", fontSize: 12,
            fontWeight: 500, letterSpacing: "0.04em",
            cursor: "pointer", fontFamily: "var(--font-body)",
            textDecoration: "none", whiteSpace: "nowrap",
          }}>
            Book a Table
          </a>
        </nav>

        {/* ── PAGE HEADER ── */}
        <div style={{ padding: "2rem 1.25rem 0" }}>
          <span style={{
            fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase",
            color: "var(--gold)", fontFamily: "var(--font-body)",
          }}>
            Our menu
          </span>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 6vw, 2.8rem)",
            fontWeight: 300, lineHeight: 1.15,
            color: "var(--ink)", marginTop: "0.4rem", marginBottom: "1.5rem",
          }}>
            A symphony of <em style={{ fontStyle: "italic", color: "var(--gold)" }}>flavours</em>
          </h1>
        </div>

        {/* ── STICKY: TABS + FILTERS ── */}
        <div style={{
          position: "sticky", top: 64, zIndex: 40,
          background: "var(--cream)",
          borderBottom: "0.5px solid var(--border)",
        }}>
          {/* Category tabs — homepage style */}
          <div className="menu-tab-row hide-scrollbar">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                className={`m-tab${activeCategory === i ? " active" : ""}`}
                onClick={() => setActiveCategory(i)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div style={{
            display: "flex", gap: 8, overflowX: "auto", padding: "10px 1.25rem",
            scrollbarWidth: "none",
          }}>
            {FILTERS.map(f => {
              const active = activeFilters.includes(f)
              return (
                <button
                  key={f}
                  className="filter-pill"
                  onClick={() => toggleFilter(f)}
                  style={{
                    background: active ? "var(--gold)" : "transparent",
                    color: active ? "var(--ink)" : "var(--muted)",
                    border: active
                      ? "1.5px solid var(--gold)"
                      : "1.5px solid var(--border)",
                    fontWeight: active ? 500 : 400,
                  }}
                >
                  {f}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── MENU LIST ── */}
        <div style={{ padding: "1.25rem 1.25rem 0" }}>
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", marginBottom: 14,
          }}>
            <h3 style={{
              fontSize: 16, fontWeight: 600, color: "var(--ink)",
              fontFamily: "var(--font-display)",
            }}>
              {activeCategory === 0 ? "All Items" : tabs[activeCategory]}
            </h3>
            <span style={{
              fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-body)",
            }}>
              {loaded ? `${filtered.length} items` : "—"}
            </span>
          </div>

          {!loaded ? (
            <div className="menu-list skeleton">
              {[1, 2, 3, 4].map(n => <SkeletonCard key={n} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "48px 0",
              color: "var(--muted)", fontSize: 14,
              fontFamily: "var(--font-body)",
            }}>
              No items match this filter.
            </div>
          ) : (
            <div className="menu-list">
              {filtered.map(item => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

