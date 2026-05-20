"use client";

import { useState, useEffect, useRef } from "react";

const MENU = [
  {
    category: "All Day Breakfast",
    emoji: "🍳",
    items: [
      { name: "Mushroom Omelette", desc: "Farm eggs, sautéed mushrooms, herbs, sourdough toast", price: 220 },
      { name: "Avocado Toast", desc: "Smashed avo, cherry tomatoes, chilli flakes, multigrain", price: 240 },
      { name: "Pancake Stack", desc: "Buttermilk pancakes, maple syrup, fresh berries", price: 260 },
    ],
  },
  {
    category: "Teas & Wellness",
    emoji: "🍵",
    items: [
      { name: "Hibiscus Bloom", desc: "Dried hibiscus, rose petals, hint of honey", price: 160 },
      { name: "Blue Pea Lemonade", desc: "Butterfly pea flower, lemon, jaggery", price: 180 },
      { name: "Lavender Chamomile", desc: "Calming herbed blend, served hot or iced", price: 170 },
      { name: "Tulasi Green", desc: "Holy basil, green tea, ginger", price: 150 },
    ],
  },
  {
    category: "Mains & Bowls",
    emoji: "🥗",
    items: [
      { name: "Buddha Bowl", desc: "Quinoa, roasted veg, tahini dressing, sesame seeds", price: 320 },
      { name: "Pesto Pasta", desc: "House-made basil pesto, parmesan, cherry tomatoes", price: 340 },
      { name: "Chicken Steak", desc: "Herb-marinated breast, seasonal sides, chimichurri", price: 420 },
      { name: "Mediterranean Egg Salad", desc: "Soft-boiled eggs, olives, cucumber, feta", price: 280 },
    ],
  },
  {
    category: "Favourites",
    emoji: "⭐",
    items: [
      { name: "Turkish Dawn", desc: "Spiced tuna, cucumber, avocado, toasted flatbread", price: 380 },
      { name: "Caesar Salad", desc: "Romaine, house Caesar dressing, croutons, parmesan", price: 300 },
      { name: "Meaty Meat Burger", desc: "Double patty, caramelised onion, special sauce, brioche", price: 460 },
    ],
  },
  {
    category: "Mocktails",
    emoji: "🍹",
    items: [
      { name: "Hibiscus Mocktail", desc: "Hibiscus, sparkling water, basil, lime", price: 200 },
      { name: "Mint Cooler", desc: "Fresh mint, lemon, soda, jaggery syrup", price: 180 },
      { name: "Watermelon Fizz", desc: "Fresh watermelon, ginger beer, chaat masala rim", price: 210 },
    ],
  },
];

const REVIEWS = [
  { name: "Ananya S.", stars: 5, text: "The Hibiscus Bloom tea is absolutely divine — I've been coming back every weekend just for that. Quiet, beautiful space too." },
  { name: "Rohan M.", stars: 5, text: "Teatings has this rare quality where the food, the vibe, and the service all match. That's hard to find in Bangalore." },
  { name: "Priya K.", stars: 4, text: "Had the Buddha Bowl and the Blue Pea Lemonade — both phenomenal. Pet-friendly too, which is a big plus for us." },
  { name: "Kartik V.", stars: 5, text: "Open mic nights here are something else. The space just transforms. Bookmarked for every time friends are visiting from out of town." },
];

const NAV = ["Menu", "Gallery", "Events", "Reviews", "Find Us"];

export default function Teatings() {
  const [activeMenu, setActiveMenu] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [waHover, setWaHover] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  const WA_NUMBER = "919666836335";
  const WA_MSG = encodeURIComponent("Hi, I'd like to reserve a table at Teatings!");

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
        --cream: #FAF9F6;
        --parchment: #E8F0EF;
        --ink: #0C3A33;
        --ink2: #1A5247;
        --muted: #4A6560;
        --gold: #D4AF37;
        --gold-light: #E8CC6A;
        --sage: #C88242;
        --rust: #A0522D;
        --border: rgba(12,58,51,0.12);
        }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--cream);
      color: var(--ink);
      overflow-x: hidden;
    }

    /* NAV */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 2rem;
      height: 64px;
      transition: background 0.4s, backdrop-filter 0.4s, border-bottom 0.4s;
    }
    .nav.scrolled {
        background: var(--cream);
        border-bottom: 0.5px solid var(--border);
    }
    .nav-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.5rem; font-weight: 600; letter-spacing: 0.04em;
      color: var(--ink); text-decoration: none;
    }
    .nav-logo span { color: var(--gold); }
    .nav-links { display: flex; gap: 2rem; list-style: none; }
    .nav-links button {
      background: none; border: none; cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 0.82rem;
      font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--ink2); transition: color 0.2s;
    }
    .nav-links button:hover { color: var(--gold); }
    .nav-book {
      background: var(--ink); color: var(--cream);
      border: none; cursor: pointer; padding: 0.55rem 1.3rem;
      font-family: 'DM Sans', sans-serif; font-size: 0.82rem;
      letter-spacing: 0.06em; font-weight: 400;
      transition: background 0.2s;
    }
    .nav-book:hover { background: var(--gold); }
    .hamburger { display: none; background: none; border: none; cursor: pointer; flex-direction: column; gap: 5px; padding: 4px; }
    .hamburger span { display: block; width: 22px; height: 1.5px; background: var(--ink); transition: all 0.3s; }

    /* HERO */
    .hero {
      min-height: 100vh;
      display: grid; grid-template-columns: 1fr 1fr;
      padding-top: 64px;
    }
    .hero-left {
      display: flex; flex-direction: column; justify-content: center;
      padding: 5rem 4rem 5rem 5rem;
      background: var(--cream);
    }
    .hero-eyebrow {
      font-size: 0.75rem; letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--gold); font-weight: 400; margin-bottom: 1.5rem;
      display: flex; align-items: center; gap: 0.75rem;
    }
    .hero-eyebrow::before {
      content: ''; display: block; width: 32px; height: 1px; background: var(--gold);
    }
    .hero-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(3rem, 5vw, 4.5rem);
      font-weight: 300; line-height: 1.1;
      color: var(--ink); margin-bottom: 1.5rem;
    }
    .hero-title em { font-style: italic; color: var(--gold); }
    .hero-sub {
      font-size: 0.95rem; color: var(--muted); line-height: 1.8;
      max-width: 380px; margin-bottom: 2.5rem;
    }
    .hero-pills {
      display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 2.5rem;
    }
    .pill {
      border: 0.5px solid var(--border); padding: 0.4rem 0.9rem;
      font-size: 0.78rem; color: var(--ink2); letter-spacing: 0.04em;
    }
    .hero-ctas { display: flex; gap: 1rem; align-items: center; }
    .btn-primary {
      background: var(--ink); color: var(--cream); border: none;
      padding: 0.85rem 2rem; font-family: 'DM Sans', sans-serif;
      font-size: 0.85rem; letter-spacing: 0.06em; cursor: pointer;
      text-decoration: none; transition: background 0.2s; display: inline-block;
    }
    .btn-primary:hover { background: var(--gold); }
    .btn-ghost {
      background: none; color: var(--ink2); border: none;
      font-family: 'DM Sans', sans-serif; font-size: 0.85rem;
      letter-spacing: 0.04em; cursor: pointer;
      text-decoration: underline; text-underline-offset: 3px;
      transition: color 0.2s;
    }
    .btn-ghost:hover { color: var(--gold); }
    .hero-stats {
      display: flex; gap: 2rem; margin-top: 3rem;
      padding-top: 2rem; border-top: 0.5px solid var(--border);
    }
    .stat-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2rem; font-weight: 300; color: var(--ink); line-height: 1;
    }
    .stat-lbl { font-size: 0.75rem; color: var(--muted); margin-top: 0.25rem; letter-spacing: 0.04em; }

    .hero-right {
      position: relative; overflow: hidden;
      background: var(--parchment);
    }
    .hero-img {
      width: 100%; height: 100%; object-fit: cover;
      filter: sepia(15%) brightness(0.92);
    }
    .hero-overlay {
      position: absolute; bottom: 2rem; left: 2rem;
      background: rgba(245,240,232,0.92); backdrop-filter: blur(8px);
      padding: 1.25rem 1.5rem;
      border-left: 3px solid var(--gold);
    }
    .hero-overlay p { font-size: 0.8rem; color: var(--ink); line-height: 1.6; }
    .hero-overlay strong { font-family: 'Cormorant Garamond', serif; font-size: 1rem; display: block; margin-bottom: 0.25rem; }
    @media (max-width: 900px) {
        .hero-overlay { display: none; }
        }

    /* SECTION COMMONS */
    .section { padding: 5rem 5vw; }
    .section-alt { background: var(--parchment); }
    .section-header { text-align: center; margin-bottom: 3.5rem; }
    .eyebrow {
      font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--gold); margin-bottom: 0.75rem; display: block;
    }
    .section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2rem, 4vw, 3rem); font-weight: 300;
      color: var(--ink); line-height: 1.2;
    }
    .section-title em { font-style: italic; }
    .section-sub { color: var(--muted); font-size: 0.9rem; margin-top: 0.75rem; line-height: 1.7; }

    /* MENU */
    .menu-tabs {
        display: flex; gap: 0; overflow-x: auto;
        border-bottom: 0.5px solid var(--border);
        margin-bottom: 2.5rem; justify-content: flex-start;
        scrollbar-width: none; -webkit-overflow-scrolling: touch;
        padding-bottom: 0;
    }
    .menu-tabs::-webkit-scrollbar { display: none; }
    .menu-tab {
        background: none; border: none; cursor: pointer;
        padding: 0.75rem 1.1rem;
        font-family: 'DM Sans', sans-serif;
        font-size: 0.78rem; letter-spacing: 0.04em; text-transform: uppercase;
        color: var(--muted); border-bottom: 2px solid transparent;
        margin-bottom: -0.5px; transition: all 0.2s; white-space: nowrap;
        flex-shrink: 0;
        }
    .menu-tab.active { color: var(--gold); border-bottom-color: var(--gold); }
    .menu-tab:hover { color: var(--ink); }
    .menu-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1px; background: var(--border);
      border: 0.5px solid var(--border);
    }
    .menu-item {
      background: var(--cream); padding: 1.75rem;
      transition: background 0.2s;
    }
    .menu-item:hover { background: var(--parchment); }
    .menu-item-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.15rem; font-weight: 400; margin-bottom: 0.4rem; color: var(--ink);
    }
    .menu-item-desc { font-size: 0.82rem; color: var(--muted); line-height: 1.6; margin-bottom: 0.75rem; }
    .menu-item-price {
      font-size: 0.9rem; font-weight: 500; color: var(--gold);
    }

    /* GALLERY */
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: auto;
      gap: 1rem;
    }
    .gallery-item {
      overflow: hidden; position: relative;
      aspect-ratio: 4/3; background: var(--parchment);
    }
    .gallery-item:first-child { grid-column: span 2; aspect-ratio: 16/9; }
    .gallery-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; filter: sepia(10%) brightness(0.9); }
    .gallery-item:hover .gallery-img { transform: scale(1.04); }
    .gallery-caption {
      position: absolute; bottom: 0; left: 0; right: 0;
      background: linear-gradient(transparent, rgba(28,26,23,0.7));
      padding: 1.5rem 1rem 0.75rem;
      color: #F5F0E8; font-size: 0.8rem; letter-spacing: 0.04em;
      font-family: 'Cormorant Garamond', serif; font-size: 0.95rem;
      opacity: 0; transition: opacity 0.3s;
    }
    .gallery-item:hover .gallery-caption { opacity: 1; }

    /* EVENTS */
    .events-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    .event-card {
      border: 0.5px solid var(--border); padding: 2rem;
      position: relative; overflow: hidden;
      transition: border-color 0.2s;
    }
    .event-card::before {
      content: ''; position: absolute; top: 0; left: 0;
      width: 3px; height: 0; background: var(--gold);
      transition: height 0.3s;
    }
    .event-card:hover::before { height: 100%; }
    .event-card:hover { border-color: var(--gold-light); }
    .event-tag {
      font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--sage); margin-bottom: 0.75rem; display: block;
    }
    .event-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.4rem; font-weight: 400; margin-bottom: 0.5rem;
    }
    .event-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.7; }
    .event-date { margin-top: 1.25rem; font-size: 0.78rem; color: var(--gold); letter-spacing: 0.06em; }

    /* REVIEWS */
    .reviews-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1.5rem;
    }
    .review-card { padding: 2rem; background: var(--cream); border: 0.5px solid var(--border); }
    .review-stars { color: var(--gold); font-size: 0.85rem; margin-bottom: 1rem; letter-spacing: 0.1em; }
    .review-text {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.05rem; font-weight: 300; font-style: italic;
      color: var(--ink); line-height: 1.7; margin-bottom: 1.25rem;
    }
    .review-name { font-size: 0.8rem; color: var(--muted); letter-spacing: 0.06em; }

    /* FIND US */
    .findus-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;
      align-items: start;
    }
    .findus-info h3 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.5rem; font-weight: 400; margin-bottom: 1.5rem;
    }
    .info-row {
      display: flex; gap: 1rem; align-items: flex-start;
      margin-bottom: 1.25rem; padding-bottom: 1.25rem;
      border-bottom: 0.5px solid var(--border);
    }
    .info-row:last-of-type { border-bottom: none; }
    .info-icon { font-size: 1rem; min-width: 20px; margin-top: 2px; }
    .info-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin-bottom: 0.2rem; }
    .info-val { font-size: 0.9rem; color: var(--ink); line-height: 1.6; }
    .info-val a { color: var(--gold); text-decoration: none; }
    .info-val a:hover { text-decoration: underline; }
    .map-embed {
      width: 100%; height: 380px; border: none;
      filter: sepia(20%) contrast(0.9);
    }

    /* FOOTER */
    footer {
      background: var(--ink); color: var(--cream);
      padding: 3rem 5vw 2rem;
    }
    .footer-grid {
      display: grid; grid-template-columns: 2fr 1fr 1fr;
      gap: 3rem; margin-bottom: 2.5rem;
    }
    .footer-brand-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.5rem; font-weight: 300; margin-bottom: 0.75rem;
    }
    .footer-brand-name span { color: var(--gold); }
    .footer-desc { font-size: 0.82rem; color: rgba(245,240,232,0.55); line-height: 1.8; max-width: 280px; }
    .footer-col h4 { font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
    .footer-col ul { list-style: none; }
    .footer-col li { margin-bottom: 0.6rem; }
    .footer-col a, .footer-col button {
      font-size: 0.82rem; color: rgba(245,240,232,0.6);
      text-decoration: none; background: none; border: none; cursor: pointer;
      font-family: 'DM Sans', sans-serif; padding: 0;
      transition: color 0.2s;
    }
    .footer-col a:hover, .footer-col button:hover { color: var(--gold); }
    .footer-bottom {
      border-top: 0.5px solid rgba(245,240,232,0.1);
      padding-top: 1.5rem; display: flex; justify-content: space-between;
      align-items: center; flex-wrap: gap;
    }
    .footer-copy { font-size: 0.78rem; color: rgba(245,240,232,0.35); }
    .footer-ig { font-size: 0.78rem; color: var(--gold); text-decoration: none; }
    .footer-ig:hover { text-decoration: underline; }

    /* WHATSAPP */
    .wa-btn {
      position: fixed; bottom: 2rem; right: 2rem; z-index: 200;
      background: #25D366; color: #fff;
      width: 56px; height: 56px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      text-decoration: none; box-shadow: 0 4px 16px rgba(37,211,102,0.35);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .wa-btn:hover { transform: scale(1.1); box-shadow: 0 6px 24px rgba(37,211,102,0.45); }
    .wa-tooltip {
      position: fixed; bottom: 2.5rem; right: 5rem; z-index: 199;
      background: var(--ink); color: var(--cream);
      font-size: 0.8rem; padding: 0.5rem 0.9rem;
      white-space: nowrap; pointer-events: none;
      opacity: 0; transition: opacity 0.2s;
    }
    .wa-tooltip.show { opacity: 1; }

    /* BOOKING MODAL */
    .modal-bg {
      position: fixed; inset: 0; z-index: 300;
      background: rgba(28,26,23,0.6); backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center;
      padding: 1rem;
    }
    .modal {
      background: var(--cream); padding: 2.5rem;
      max-width: 460px; width: 100%;
      border-top: 3px solid var(--gold);
    }
    .modal h3 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.8rem; font-weight: 300; margin-bottom: 0.5rem;
    }
    .modal p { font-size: 0.85rem; color: var(--muted); margin-bottom: 1.75rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }
    .form-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); }
    .form-input, .form-select {
      background: none; border: 0.5px solid var(--border);
      padding: 0.7rem 0.9rem; font-family: 'DM Sans', sans-serif;
      font-size: 0.88rem; color: var(--ink); outline: none;
      transition: border-color 0.2s; width: 100%;
    }
    .form-input:focus, .form-select:focus { border-color: var(--gold); }
    .form-select { appearance: none; cursor: pointer; background: var(--cream); }
    .modal-actions { display: flex; gap: 1rem; margin-top: 1.75rem; }
    .btn-cancel {
      background: none; border: 0.5px solid var(--border);
      padding: 0.75rem 1.5rem; cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 0.85rem;
      color: var(--muted); transition: border-color 0.2s;
    }
    .btn-cancel:hover { border-color: var(--ink); color: var(--ink); }
    .success-msg {
      text-align: center; padding: 1rem 0;
    }
    .success-msg .checkmark { font-size: 2.5rem; margin-bottom: 1rem; }
    .success-msg h4 { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 300; margin-bottom: 0.5rem; }
    .success-msg p { font-size: 0.85rem; color: var(--muted); }

    /* RESPONSIVE */
    @media (max-width: 900px) {
      .hero { grid-template-columns: 1fr; }
      .hero-right { min-height: 50vw; }
      .hero-left { padding: 3rem 2rem; }
      .findus-grid { grid-template-columns: 1fr; }
      .footer-grid { grid-template-columns: 1fr 1fr; }
      .nav-links, .nav-book { display: none; }
      .hamburger { display: flex; }
      .mobile-menu {
        position: fixed; inset: 0; top: 64px; z-index: 99;
        background: var(--cream); padding: 2rem;
        display: flex; flex-direction: column; gap: 1.5rem;
      }
      .mobile-menu button {
        background: none; border: none; cursor: pointer;
        font-family: 'DM Sans', sans-serif; font-size: 1.1rem;
        color: var(--ink); text-align: left; padding: 0.5rem 0;
        border-bottom: 0.5px solid var(--border);
      }
    }
    @media (max-width: 600px) {
      .gallery-grid { grid-template-columns: 1fr; }
      .gallery-item:first-child { grid-column: span 1; }
      .form-row { grid-template-columns: 1fr; }
      .footer-grid { grid-template-columns: 1fr; }
      .section { padding: 3.5rem 5vw; }
    }
  `;

  const [booking, setBooking] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "19:00", guests: "2" });

  const handleBook = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hi! I'd like to book a table at Teatings.\n\nName: ${form.name}\nPhone: ${form.phone}\nDate: ${form.date}\nTime: ${form.time}\nGuests: ${form.guests}`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
    setBookingDone(true);
  };

  const galleryImages = [
    { src: "https://cdn.shopify.com/s/files/1/0882/4468/3031/files/Frame_2147203999_1.png", caption: "Elegant dining space" },
    { src: "https://cdn.shopify.com/s/files/1/0882/4468/3031/files/Frame_2147203995_1.png", caption: "The bar" },
    { src: "https://cdn.shopify.com/s/files/1/0882/4468/3031/files/Frame_2147203996_1.png", caption: "Al fresco seating" },
    { src: "https://cdn.shopify.com/s/files/1/0882/4468/3031/files/Frame_2147203951_f46dc528-cc9d-4e39-9e5c-06273f826995.png", caption: "Details" },
    { src: "https://cdn.shopify.com/s/files/1/0882/4468/3031/files/Frame_2147203953.png", caption: "The spread" },
  ];

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a className="nav-logo" href="#" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <img src="teatings_logo.avif" alt="Teatings logo" style={{ height: "32px", width: "auto" }} />
            Teatings
        </a>
        <ul className="nav-links">
          {NAV.map((n) => (
            <li key={n}><button onClick={() => scrollTo(n.toLowerCase().replace(" ", "-"))}>{n}</button></li>
          ))}
        </ul>
        <button className="nav-book" onClick={() => { setBooking(true); setBookingDone(false); }}>Reserve a Table</button>
        <button className="hamburger" onClick={() => setNavOpen(!navOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {navOpen && (
        <div className="mobile-menu">
          {NAV.map((n) => (
            <button key={n} onClick={() => scrollTo(n.toLowerCase().replace(" ", "-"))}>{n}</button>
          ))}
          <button onClick={() => { setBooking(true); setBookingDone(false); setNavOpen(false); }} style={{ color: "var(--gold)" }}>Reserve a Table →</button>
        </div>
      )}

      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div className="hero-left">
          <p className="hero-eyebrow">HSR Layout, Bengaluru</p>
          <h1 className="hero-title">
            Tea. Eat.<br /><em>Meet.</em>
          </h1>
          <p className="hero-sub">
            A sanctuary for slow mornings, long lunches, and evenings that stretch into something worth remembering. Freshly made. Pet friendly. Always unhurried.
          </p>
          <div className="hero-pills">
            <span className="pill">🐾 Pet Friendly</span>
            <span className="pill">🚭 Non-Smoking</span>
            <span className="pill">🍳 Freshly Made</span>
            <span className="pill">9am – 11pm Daily</span>
          </div>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => { setBooking(true); setBookingDone(false); }}>Book a Table</button>
            <button className="btn-ghost" onClick={() => scrollTo("menu")}>View Menu →</button>
          </div>
          <div className="hero-stats">
            <div>
              <div className="stat-num">60K+</div>
              <div className="stat-lbl">Happy customers</div>
            </div>
            <div>
              <div className="stat-num">300+</div>
              <div className="stat-lbl">Dishes crafted</div>
            </div>
            <div>
              <div className="stat-num">6</div>
              <div className="stat-lbl">Expert chefs</div>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <img
            className="hero-img"
            src="https://cdn.shopify.com/s/files/1/0882/4468/3031/files/c3c50945592907a6476f608a34b029c45d8abdc9.png"
            alt="Teatings café interior"
          />
          <div className="hero-overlay">
            <strong>Open today until 11pm</strong>
            <p>Ground Floor, #152, 9th Main Rd<br />6th Sector, HSR Layout</p>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section className="section" id="menu">
        <div className="section-header">
          <span className="eyebrow">What we serve</span>
          <h2 className="section-title">A symphony of <em>flavours</em></h2>
          <p className="section-sub">Freshly prepared every day by our team of six chefs.</p>
        </div>
        <div className="menu-tabs">
          {MENU.map((cat, i) => (
            <button
              key={cat.category}
              className={`menu-tab${activeMenu === i ? " active" : ""}`}
              onClick={() => setActiveMenu(i)}
            >
              {cat.emoji} {cat.category}
            </button>
          ))}
        </div>
        <div className="menu-grid">
          {MENU[activeMenu].items.map((item) => (
            <div className="menu-item" key={item.name}>
              <div className="menu-item-name">{item.name}</div>
              <div className="menu-item-desc">{item.desc}</div>
              <div className="menu-item-price">₹{item.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="section section-alt" id="gallery">
        <div className="section-header">
          <span className="eyebrow">The space</span>
          <h2 className="section-title">The moodboard of <em>our world</em></h2>
          <p className="section-sub">Nestled in HSR Layout — modern elegance meets unhurried warmth.</p>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((g, i) => (
            <div className="gallery-item" key={i}>
              <img className="gallery-img" src={g.src} alt={g.caption} />
              <div className="gallery-caption">{g.caption}</div>
            </div>
          ))}
        </div>
      </section>

      {/* EVENTS */}
      <section className="section" id="events">
        <div className="section-header">
          <span className="eyebrow">What's on</span>
          <h2 className="section-title">Let's brew <em>moments</em> together</h2>
          <p className="section-sub">From open mics to tea tastings — we create moments that connect.</p>
        </div>
        <div className="events-grid">
          {[
            { tag: "Monthly · Every 2nd Friday", name: "Open Mic Night", desc: "Local voices, original stories, and the best hibiscus mocktail in HSR. Doors open at 7pm, performances from 8pm.", date: "Next: Friday, 13 June · 7pm" },
            { tag: "Weekly · Sundays", name: "Tea Tasting Session", desc: "Walk through our full range of herbed and wellness teas with a guided tasting. 90 minutes, ₹350 per person.", date: "Every Sunday · 11am" },
            { tag: "One-time · Special", name: "Monsoon Brunch", desc: "A special seasonal menu celebrating the first rains. Curated food, live acoustic sets, and limited seating.", date: "Saturday, 21 June · 10am" },
          ].map((ev) => (
            <div className="event-card" key={ev.name}>
              <span className="event-tag">{ev.tag}</span>
              <div className="event-name">{ev.name}</div>
              <div className="event-desc">{ev.desc}</div>
              <div className="event-date">{ev.date}</div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section section-alt" id="reviews">
        <div className="section-header">
          <span className="eyebrow">What people say</span>
          <h2 className="section-title">Shared with heart, <em>remembered with love</em></h2>
        </div>
        <div className="reviews-grid">
          {REVIEWS.map((r) => (
            <div className="review-card" key={r.name}>
              <div className="review-stars">{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</div>
              <div className="review-text">"{r.text}"</div>
              <div className="review-name">— {r.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FIND US */}
      <section className="section" id="find-us">
        <div className="section-header">
          <span className="eyebrow">Visit us</span>
          <h2 className="section-title">Come find <em>your table</em></h2>
        </div>
        <div className="findus-grid">
          <div className="findus-info">
            <h3>Teatings — HSR Layout</h3>
            <div className="info-row">
              <div className="info-icon">📍</div>
              <div>
                <div className="info-label">Address</div>
                <div className="info-val">Ground Floor, #152, 9th Main Road<br />6th Sector, HSR Layout<br />Bengaluru, Karnataka — 560102</div>
              </div>
            </div>
            <div className="info-row">
              <div className="info-icon">🕐</div>
              <div>
                <div className="info-label">Hours</div>
                <div className="info-val">Open every day · 9:00 AM – 11:00 PM</div>
              </div>
            </div>
            <div className="info-row">
              <div className="info-icon">📞</div>
              <div>
                <div className="info-label">Phone</div>
                <div className="info-val"><a href="tel:+919666836335">+91 96668-36335</a></div>
              </div>
            </div>
            <div className="info-row">
              <div className="info-icon">✉️</div>
              <div>
                <div className="info-label">Email</div>
                <div className="info-val"><a href="mailto:courtyard@anterafood.in">courtyard@anterafood.in</a></div>
              </div>
            </div>
            <div className="info-row">
              <div className="info-icon">📸</div>
              <div>
                <div className="info-label">Instagram</div>
                <div className="info-val"><a href="https://instagram.com/teatings_cafe" target="_blank" rel="noreferrer">@teatings_cafe</a></div>
              </div>
            </div>
            <button className="btn-primary" style={{ marginTop: "1.5rem" }} onClick={() => { setBooking(true); setBookingDone(false); }}>
              Reserve a Table
            </button>
          </div>
          <div>
            <iframe
              className="map-embed"
              title="Teatings location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8261!2d77.6382!3d12.9121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1499e7bcfe9d%3A0x1!2s152%2C+9th+Main+Rd%2C+6th+Sector%2C+HSR+Layout%2C+Bengaluru%2C+Karnataka+560102!5e0!3m2!1sen!2sin!4v1"
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">Tea<span>tings</span></div>
            <p className="footer-desc">
              A sanctuary for slow mornings and long evenings in the heart of HSR Layout. Tea. Eat. Meet.
            </p>
          </div>
          <div className="footer-col">
            <h4>Navigate</h4>
            <ul>
              {NAV.map((n) => (
                <li key={n}><button onClick={() => scrollTo(n.toLowerCase().replace(" ", "-"))}>{n}</button></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Visit</h4>
            <ul>
              <li style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.55)", lineHeight: "1.7" }}>
                #152, 9th Main Rd<br />HSR Layout, Bengaluru<br />Mon–Sun · 9am–11pm
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 Teatings. All rights reserved.</span>
          <a className="footer-ig" href="https://instagram.com/teatings_cafe" target="_blank" rel="noreferrer">@teatings_cafe ↗</a>
        </div>
      </footer>

      {/* WHATSAPP */}
      <a
        className="wa-btn"
        href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setWaHover(true)}
        onMouseLeave={() => setWaHover(false)}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
      <div className={`wa-tooltip${waHover ? " show" : ""}`}>Chat with us on WhatsApp</div>

      {/* BOOKING MODAL */}
      {booking && (
        <div className="modal-bg" onClick={(e) => { if (e.target === e.currentTarget) setBooking(false); }}>
          <div className="modal">
            {bookingDone ? (
              <div className="success-msg">
                <div className="checkmark">✓</div>
                <h4>Request sent!</h4>
                <p>We've opened WhatsApp with your details. We'll confirm your table shortly.</p>
                <button className="btn-primary" style={{ marginTop: "1.5rem" }} onClick={() => setBooking(false)}>Done</button>
              </div>
            ) : (
              <>
                <h3>Reserve a table</h3>
                <p>Fill in your details and we'll confirm on WhatsApp.</p>
                <form onSubmit={handleBook}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Your name</label>
                      <input className="form-input" required placeholder="Rohan" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone number</label>
                      <input className="form-input" required placeholder="+91 98xxx" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Date</label>
                      <input className="form-input" type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Time</label>
                      <select className="form-select" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}>
                        {["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Number of guests</label>
                    <select className="form-select" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })}>
                      {["1","2","3","4","5","6","7","8+"].map(g => (
                        <option key={g} value={g}>{g} {g === "1" ? "guest" : "guests"}</option>
                      ))}
                    </select>
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="btn-cancel" onClick={() => setBooking(false)}>Cancel</button>
                    <button type="submit" className="btn-primary" style={{ flex: 1 }}>Confirm via WhatsApp →</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}