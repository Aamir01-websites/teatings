"use client"

// src/app/admin/page.js

import { useEffect, useState } from "react"
import Link from "next/link"
import { MENU_STORAGE_KEY, SEED_MENU, CATEGORY_ORDER, FILTERS } from "@/app/lib/constants"

const EMPTY_ITEM = {
  name: "", price: "", description: "",
  label: "veg", category: CATEGORY_ORDER[0], filters: [], img: "",
}

function LabelDot({ type }) {
  const colors = { veg: "#388E3C", nonveg: "#B71C1C", egg: "#F9A825" }
  return (
    <span style={{
      display: "inline-block", width: 10, height: 10,
      borderRadius: "50%", background: colors[type] || "#ccc",
      marginRight: 5, flexShrink: 0,
    }} />
  )
}

// ── MOBILE CARD (replaces table row on small screens) ────────────────────────

function ItemCard({ item, onEdit, onDelete }) {
  return (
    <div style={{
      padding: "14px 16px",
      borderBottom: "0.5px solid var(--border)",
      display: "flex", flexDirection: "column", gap: 6,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <LabelDot type={item.label} />
          <span style={{ fontWeight: 500, color: "var(--ink)", fontSize: 14, fontFamily: "var(--font-display)" }}>
            {item.name}
          </span>
        </div>
        <span style={{ color: "var(--gold)", fontWeight: 500, fontSize: 14, fontFamily: "var(--font-body)" }}>
          ₹{item.price}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-body)" }}>
            {item.category}
          </span>
          {item.filters?.length > 0 && (
            <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-body)" }}>
              {item.filters.join(" · ")}
            </span>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => onEdit(item)} style={{
            background: "var(--parchment)", border: "0.5px solid var(--border)",
            borderRadius: 6, padding: "5px 14px", cursor: "pointer",
            fontSize: 12, color: "var(--ink)", fontFamily: "var(--font-body)",
          }}>
            Edit
          </button>
          <button onClick={() => onDelete(item.id)} style={{
            background: "none", border: "0.5px solid rgba(180,30,30,0.25)",
            borderRadius: 6, padding: "5px 14px", cursor: "pointer",
            fontSize: 12, color: "#B41E1E", fontFamily: "var(--font-body)",
          }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

// ── DESKTOP ROW ───────────────────────────────────────────────────────────────

function ItemRow({ item, onEdit, onDelete }) {
  return (
    <div className="item-row">
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <LabelDot type={item.label} />
        <span style={{ fontWeight: 500, color: "var(--ink)", fontSize: 14 }}>{item.name}</span>
      </div>
      <span style={{ color: "var(--muted)", fontSize: 13 }}>{item.category}</span>
      <span style={{ color: "var(--gold)", fontWeight: 500, fontSize: 14 }}>₹{item.price}</span>
      <span style={{ color: "var(--muted)", fontSize: 12 }}>{item.filters?.join(", ") || "—"}</span>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => onEdit(item)} style={{
          background: "var(--parchment)", border: "0.5px solid var(--border)",
          borderRadius: 6, padding: "5px 12px", cursor: "pointer",
          fontSize: 12, color: "var(--ink)", fontFamily: "var(--font-body)",
        }}>Edit</button>
        <button onClick={() => onDelete(item.id)} style={{
          background: "none", border: "0.5px solid rgba(180,30,30,0.25)",
          borderRadius: 6, padding: "5px 12px", cursor: "pointer",
          fontSize: 12, color: "#B41E1E", fontFamily: "var(--font-body)",
        }}>Delete</button>
      </div>
    </div>
  )
}

// ── FORM MODAL ────────────────────────────────────────────────────────────────

function ItemForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY_ITEM)
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))
  const toggleFilter = (f) =>
    set("filters", form.filters.includes(f)
      ? form.filters.filter(x => x !== f)
      : [...form.filters, f])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.price || !form.category) return
    onSave({ ...form, price: Number(form.price) })
  }

  const inputStyle = {
    width: "100%", padding: "0.6rem 0.8rem",
    border: "0.5px solid var(--border)", borderRadius: 8,
    fontSize: 14, fontFamily: "var(--font-body)",
    color: "var(--ink)", background: "var(--cream)", outline: "none",
  }
  const labelStyle = {
    fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em",
    color: "var(--muted)", fontFamily: "var(--font-body)",
    marginBottom: 4, display: "block",
  }

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onCancel() }} style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(12,58,51,0.35)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1rem",
    }}>
      <div style={{
        background: "var(--cream)", borderRadius: 16,
        padding: "1.5rem", width: "100%", maxWidth: 500,
        maxHeight: "90vh", overflowY: "auto",
        borderTop: "3px solid var(--gold)",
      }}>
        <h2 style={{
          fontFamily: "var(--font-display)", fontWeight: 300,
          fontSize: "1.5rem", color: "var(--ink)", marginBottom: "1.25rem",
        }}>
          {initial ? "Edit item" : "Add new item"}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={labelStyle}>Item name *</label>
            <input style={inputStyle} required value={form.name}
              onChange={e => set("name", e.target.value)} placeholder="e.g. Mushroom Omelette" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>Price (₹) *</label>
              <input style={inputStyle} required type="number" min="0" value={form.price}
                onChange={e => set("price", e.target.value)} placeholder="220" />
            </div>
            <div>
              <label style={labelStyle}>Category *</label>
              <select style={{ ...inputStyle, cursor: "pointer" }} value={form.category}
                onChange={e => set("category", e.target.value)}>
                {CATEGORY_ORDER.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Description</label>
            <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 72 }}
              value={form.description}
              onChange={e => set("description", e.target.value)}
              placeholder="Short description of the dish..." />
          </div>

          <div>
            <label style={labelStyle}>Food type</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["veg", "nonveg", "egg"].map(l => {
                const active = form.label === l
                return (
                  <button key={l} type="button" onClick={() => set("label", l)} style={{
                    padding: "6px 14px", borderRadius: 50, fontSize: 12, cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    border: active ? "1.5px solid var(--ink)" : "0.5px solid var(--border)",
                    background: active ? "var(--ink)" : "transparent",
                    color: active ? "var(--cream)" : "var(--muted)",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <LabelDot type={l} />{l}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label style={labelStyle}>Filters</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {FILTERS.map(f => {
                const active = form.filters.includes(f)
                return (
                  <button key={f} type="button" onClick={() => toggleFilter(f)} style={{
                    padding: "5px 14px", borderRadius: 50, fontSize: 12,
                    cursor: "pointer", fontFamily: "var(--font-body)",
                    border: active ? "1.5px solid var(--gold)" : "0.5px solid var(--border)",
                    background: active ? "var(--gold)" : "transparent",
                    color: active ? "var(--ink)" : "var(--muted)",
                    fontWeight: active ? 500 : 400,
                  }}>{f}</button>
                )
              })}
            </div>
          </div>

          <div>
            <label style={labelStyle}>Image path</label>
            <input style={inputStyle} value={form.img}
              onChange={e => set("img", e.target.value)}
              placeholder="/images/my-dish.jpg" />
            <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 4, fontFamily: "var(--font-body)" }}>
              Place image in <code style={{ background: "var(--parchment)", padding: "1px 5px", borderRadius: 4 }}>/public/images/</code> and enter path here.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button type="button" onClick={onCancel} style={{
              flex: 1, padding: "0.75rem", border: "0.5px solid var(--border)",
              borderRadius: 8, background: "none", cursor: "pointer",
              fontSize: 14, color: "var(--muted)", fontFamily: "var(--font-body)",
            }}>Cancel</button>
            <button type="submit" style={{
              flex: 2, padding: "0.75rem",
              background: "var(--ink)", color: "var(--cream)",
              border: "none", borderRadius: 8, cursor: "pointer",
              fontSize: 14, fontWeight: 500, fontFamily: "var(--font-body)",
            }}>{initial ? "Save changes" : "Add item"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── MAIN ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [items, setItems] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [filterCat, setFilterCat] = useState("All")
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(MENU_STORAGE_KEY)
      const data = raw ? JSON.parse(raw) : null
      setItems(data && data.length > 0 ? data : SEED_MENU)
    } catch { setItems(SEED_MENU) }
    setLoaded(true)
  }, [])

  const persist = (next) => {
    setItems(next)
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(next))
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const handleSave = (formData) => {
    if (editTarget) {
      persist(items.map(i => i.id === editTarget.id ? { ...formData, id: editTarget.id } : i))
      showToast("Item updated")
    } else {
      persist([...items, { ...formData, id: Date.now() }])
      showToast("Item added")
    }
    setShowForm(false)
    setEditTarget(null)
  }

  const handleEdit = (item) => { setEditTarget(item); setShowForm(true) }
  const handleDelete = (id) => {
    if (!confirm("Delete this item?")) return
    persist(items.filter(i => i.id !== id))
    showToast("Item deleted")
  }
  const handleReset = () => {
    if (!confirm("Reset menu to default seed data? This cannot be undone.")) return
    persist(SEED_MENU)
    showToast("Menu reset to defaults")
  }

  const cats = ["All", ...CATEGORY_ORDER]
  const visible = filterCat === "All" ? items : items.filter(i => i.category === filterCat)

  return (
    <>
      <style>{`
        .admin-tab {
          flex-shrink: 0; background: none; border: none; cursor: pointer;
          padding: 0.65rem 1rem; font-family: var(--font-body);
          font-size: 0.78rem; letter-spacing: 0.04em; text-transform: uppercase;
          color: var(--muted); border-bottom: 2px solid transparent;
          margin-bottom: -0.5px; transition: color 0.2s, border-color 0.2s;
          white-space: nowrap;
        }
        .admin-tab.active { color: var(--gold); border-bottom-color: var(--gold); }
        .admin-tab:hover { color: var(--ink); }

        @keyframes slideIn {
          from { transform: translateY(10px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        .toast {
          position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
          background: var(--ink); color: var(--cream);
          padding: 0.65rem 1.4rem; border-radius: 50px;
          font-size: 13px; font-family: var(--font-body);
          z-index: 300; animation: slideIn 0.2s ease; white-space: nowrap;
        }

        /* desktop table row */
        .item-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr auto;
          gap: 12px; align-items: center;
          padding: 12px 16px;
          border-bottom: 0.5px solid var(--border);
          font-family: var(--font-body);
        }
        .item-row-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr auto;
          gap: 12px; padding: 10px 16px;
          border-bottom: 0.5px solid var(--border);
          font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--muted); font-family: var(--font-body);
        }

        /* nav buttons — icon only on very small screens */
        .nav-view-menu-text { display: inline; }
        .nav-add-text { display: inline; }

        @media (max-width: 480px) {
          .nav-view-menu-text { display: none; }
          .nav-add-text { display: none; }
          .nav-icon-btn { padding: 8px 12px !important; }
        }

        /* switch between table and card layout */
        .desktop-table { display: block; }
        .mobile-cards  { display: none; }

        @media (max-width: 640px) {
          .desktop-table { display: none; }
          .mobile-cards  { display: block; }
        }
      `}</style>

      <div style={{
        minHeight: "100vh", background: "var(--cream)",
        fontFamily: "var(--font-body)", paddingBottom: 48,
      }}>

        {/* ── NAV ── */}
        <nav style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 1.25rem", height: 64,
          background: "var(--cream)",
          borderBottom: "0.5px solid var(--border)",
          position: "sticky", top: 0, zIndex: 50,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <span style={{
                fontFamily: "var(--font-display)", fontSize: "1.3rem",
                fontWeight: 600, color: "var(--ink)", letterSpacing: "0.02em",
              }}>
                Tea<span style={{ color: "var(--gold)" }}>tings</span>
              </span>
            </Link>
            <span style={{
              fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
              color: "var(--muted)", borderLeft: "0.5px solid var(--border)", paddingLeft: 12,
            }}>
              Admin
            </span>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <Link href="/menu" className="nav-icon-btn" style={{
              padding: "8px 16px", borderRadius: 50,
              border: "0.5px solid var(--border)",
              fontSize: 12, color: "var(--ink)",
              textDecoration: "none", fontFamily: "var(--font-body)",
              display: "flex", alignItems: "center", gap: 4,
            }}>
              {/* menu icon fallback for mobile */}
              <span style={{ fontSize: 14 }}>☰</span>
              <span className="nav-view-menu-text">View Menu</span>
            </Link>
            <button onClick={() => { setEditTarget(null); setShowForm(true) }}
              className="nav-icon-btn"
              style={{
                background: "var(--ink)", color: "var(--cream)",
                border: "none", borderRadius: 50,
                padding: "8px 18px", fontSize: 12,
                fontWeight: 500, cursor: "pointer",
                fontFamily: "var(--font-body)",
                display: "flex", alignItems: "center", gap: 4,
              }}>
              <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
              <span className="nav-add-text">Add item</span>
            </button>
          </div>
        </nav>

        {/* ── PAGE HEADER ── */}
        <div style={{ padding: "1.75rem 1.25rem 1rem" }}>
          <span style={{
            fontSize: "0.72rem", letterSpacing: "0.18em",
            textTransform: "uppercase", color: "var(--gold)",
            fontFamily: "var(--font-body)",
          }}>
            Menu management
          </span>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 300,
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "var(--ink)",
            marginTop: "0.3rem",
          }}>
            {loaded ? items.length : "—"} items in your menu
          </h1>
        </div>

        {/* ── CATEGORY TABS ── */}
        <div style={{
          display: "flex", gap: 0, overflowX: "auto",
          borderBottom: "0.5px solid var(--border)",
          padding: "0 1.25rem", scrollbarWidth: "none",
        }}>
          {cats.map(cat => (
            <button key={cat}
              className={`admin-tab${filterCat === cat ? " active" : ""}`}
              onClick={() => setFilterCat(cat)}>
              {cat}
            </button>
          ))}
        </div>

        {/* ── TABLE / CARDS ── */}
        <div style={{ padding: "1.25rem" }}>
          <div style={{
            background: "#fff", borderRadius: 12,
            border: "0.5px solid var(--border)", overflow: "hidden",
          }}>

            {/* Desktop table */}
            <div className="desktop-table">
              <div className="item-row-header">
                <span>Name</span><span>Category</span>
                <span>Price</span><span>Filters</span><span></span>
              </div>
              {!loaded ? (
                <div style={{ padding: "2rem", textAlign: "center", color: "var(--muted)", fontSize: 14 }}>Loading…</div>
              ) : visible.length === 0 ? (
                <div style={{ padding: "2rem", textAlign: "center", color: "var(--muted)", fontSize: 14 }}>No items in this category.</div>
              ) : (
                visible.map(item => (
                  <ItemRow key={item.id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
                ))
              )}
            </div>

            {/* Mobile cards */}
            <div className="mobile-cards">
              {!loaded ? (
                <div style={{ padding: "2rem", textAlign: "center", color: "var(--muted)", fontSize: 14 }}>Loading…</div>
              ) : visible.length === 0 ? (
                <div style={{ padding: "2rem", textAlign: "center", color: "var(--muted)", fontSize: 14 }}>No items in this category.</div>
              ) : (
                visible.map(item => (
                  <ItemCard key={item.id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
                ))
              )}
            </div>
          </div>

          {/* Danger zone */}
          <div style={{
            marginTop: "1.5rem", padding: "1.25rem",
            border: "0.5px solid rgba(180,30,30,0.2)", borderRadius: 12,
          }}>
            <p style={{ fontSize: 12, color: "#B41E1E", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
              Danger zone
            </p>
            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 12, lineHeight: 1.6 }}>
              Reset the entire menu back to the default seed data. This will overwrite all your changes.
            </p>
            <button onClick={handleReset} style={{
              background: "none", border: "0.5px solid rgba(180,30,30,0.35)",
              color: "#B41E1E", borderRadius: 8, padding: "8px 18px",
              fontSize: 13, cursor: "pointer", fontFamily: "var(--font-body)",
            }}>
              Reset to defaults
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <ItemForm
          initial={editTarget}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditTarget(null) }}
        />
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  )
}
