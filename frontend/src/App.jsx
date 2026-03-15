import { useState, useEffect, useRef, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navigation from "./components/sections/Navigation";
import Hero from "./components/sections/Hero";
import Marquee from "./components/sections/Marquee";
import Manifesto from "./components/sections/Manifesto";
import Gap from "./components/sections/Gap";
import Pillars from "./components/sections/Pillars";
import Sectors from "./components/sections/Sectors";
import Capabilities from "./components/sections/Capabilities";
import Serve from "./components/sections/Serve";
import Approach from "./components/sections/Approach";
import ResolveDepth from "./components/sections/ResolveDepth";
import Intelligence from "./components/sections/Intelligence";
import Geography from "./components/sections/Geography";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import NewsSection from "./components/sections/NewsSection";
import ServicesSection from "./components/sections/ServicesSection";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminNews from "./components/admin/AdminNews";
import AdminBlogs from "./components/admin/AdminBlogs";
import AdminServices from "./components/admin/AdminServices";
import AdminLogin from "./components/admin/AdminLogin";
import { useScrollReveal } from "./hooks/useUtils";
import "./App.css";

/* ─── CSS-in-JS styles injected once ─── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Fira+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
html { scroll-behavior:smooth; font-size:16px; -webkit-font-smoothing:antialiased; margin-top:0; }
body { background:var(--ch); color:var(--text); font-family:var(--body); overflow-x:hidden; cursor:none; margin-top:0; padding-top:0; }
img { display:block; width:100%; height:100%; object-fit:cover; }
a { text-decoration:none; color:inherit; }
button,input,select,textarea { font:inherit; outline:none; }

/* NOISE */
.mg-noise::after {
  content:''; position:fixed; inset:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity:0.022; pointer-events:none; z-index:9000;
}

/* CURSOR */
.mg-cur-dot, .mg-cur-ring {
  position:fixed; border-radius:50%; pointer-events:none; z-index:9999;
  transform:translate(-50%,-50%);
}
.mg-cur-dot { width:5px; height:5px; background:var(--brass2); top:0; left:0; transition:opacity .3s; }
.mg-cur-ring {
  width:30px; height:30px; border:1px solid rgba(184,150,74,0.45); top:0; left:0;
  transition:width .3s var(--ease),height .3s var(--ease),border-color .3s;
}
.mg-hovering .mg-cur-ring { width:48px; height:48px; border-color:var(--brass2); }

/* LOADER */
.mg-loader {
  position:fixed; inset:0; z-index:8000; background:var(--ch);
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  transition:opacity 1s var(--ease),visibility 1s;
}
.mg-loader.out { opacity:0; visibility:hidden; pointer-events:none; }
.mg-loader-photo { position:absolute; inset:0; opacity:0; animation:ldPhoto 2.5s var(--ease) 0.3s forwards; }
.mg-loader-photo img { width:100%; height:100%; object-fit:cover; filter:brightness(0.25); }
.mg-loader-overlay { position:absolute; inset:0; background:linear-gradient(180deg,rgba(12,11,9,0.5) 0%,rgba(12,11,9,0.85) 100%); }
.mg-loader-content { position:relative; z-index:1; text-align:center; display:flex; flex-direction:column; align-items:center; gap:20px; }
.mg-loader-name {
  font-family:var(--serif); font-size:clamp(2.5rem,6vw,5rem); font-weight:300;
  letter-spacing:0.22em; text-transform:uppercase; color:var(--text); overflow:hidden;
}
.mg-loader-name-inner { display:block; animation:ldSlide 1s var(--ease) 0.6s both; }
.mg-loader-sub {
  font-family:var(--mono); font-size:0.6rem; letter-spacing:0.25em; text-transform:uppercase;
  color:var(--brass); opacity:0; animation:ldFade 0.8s ease 1.4s forwards;
}
.mg-loader-bar-wrap { width:180px; height:1px; background:rgba(237,232,224,0.1); position:relative; overflow:hidden; }
.mg-loader-bar-fill {
  position:absolute; left:0; top:0; height:100%; background:var(--brass2);
  animation:ldBar 1.8s var(--ease) 0.8s forwards; width:0;
}
@keyframes ldPhoto { from{opacity:0} to{opacity:1} }
@keyframes ldSlide { from{transform:translateY(100%)} to{transform:translateY(0)} }
@keyframes ldFade  { from{opacity:0} to{opacity:1} }
@keyframes ldBar   { from{width:0} to{width:100%} }
@keyframes fadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
@keyframes slideUp { to{transform:translateY(0)} }
@keyframes mq      { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

/* NAV */
.mg-nav {
  position:fixed; top:0; left:0; right:0; z-index:500; padding:32px 72px 26px;
  display:flex; align-items:center; justify-content:space-between;
  transition:all .5s var(--ease);
}
.mg-nav.scrolled {
  padding:18px 72px; background:rgba(12,11,9,0.97);
  border-bottom:1px solid rgba(200,191,176,0.07); backdrop-filter:blur(14px);
}
.mg-nav-brand {
  font-family:var(--serif); font-size:1.2rem; font-weight:400; letter-spacing:0.16em;
  text-transform:uppercase; color:var(--text); display:flex; align-items:center; gap:5px; cursor:pointer;
}
.mg-nav-brand-mark { width:6px; height:6px; background:var(--brass2); border-radius:50%; margin-top:1px; }
.mg-nav-links { display:flex; gap:32px; list-style:none; align-items:center; }
.mg-nav-links a {
  font-family:var(--mono); font-size:0.62rem; letter-spacing:0.18em; text-transform:uppercase;
  color:var(--textD); transition:color .3s; cursor:pointer;
}
.mg-nav-links a:hover { color:var(--brass2); }
.mg-nav-cta {
  font-family:var(--mono); font-size:0.62rem; letter-spacing:0.18em; text-transform:uppercase;
  color:var(--brass2); border:1px solid var(--brass-dim); padding:10px 22px; transition:all .3s; cursor:pointer;
}
.mg-nav-cta:hover { background:var(--brass2); color:var(--ch); }
.mg-nav-burger { display:none; flex-direction:column; gap:5px; cursor:pointer; padding:4px; }
.mg-nav-burger span { display:block; width:24px; height:1px; background:var(--text); transition:all .3s; }
.mg-nav-mobile {
  display:none; position:fixed; inset:0; background:var(--ch2); z-index:490;
  flex-direction:column; align-items:center; justify-content:center; gap:40px;
}
.mg-nav-mobile.open { display:flex; }
.mg-nav-mobile a {
  font-family:var(--serif); font-size:2rem; font-weight:300; color:var(--textD); transition:color .3s; cursor:pointer;
}
.mg-nav-mobile a:hover { color:var(--brass2); }

/* SHARED */
.mg-container { max-width:1440px; margin:0 auto; padding:0 72px; }
.mg-sec-label {
  display:inline-flex; align-items:center; gap:14px; font-family:var(--mono);
  font-size:0.58rem; font-weight:500; letter-spacing:0.32em; text-transform:uppercase;
  color:var(--brass); margin-bottom:18px;
}
.mg-sec-label::before { content:''; width:28px; height:1px; background:var(--brass); opacity:.5; }
.mg-sec-h { font-family:var(--serif); font-size:clamp(2.8rem,5vw,5.2rem); font-weight:300; line-height:1.04; color:var(--text); }
.mg-sec-h em { font-style:italic; color:var(--brass3); }
.mg-rv { opacity:0; transform:translateY(26px); transition:opacity .9s var(--ease),transform .9s var(--ease); }
.mg-rv.in { opacity:1; transform:translateY(0); }

/* HERO */
.mg-hero { min-height:100vh; display:grid; grid-template-columns:1fr 1fr; overflow:hidden; }
.mg-hero-left {
  position:relative; z-index:1; display:flex; flex-direction:column;
  justify-content:flex-end; padding:0 64px 80px; background:var(--ch);
}
.mg-hero-right { position:relative; overflow:hidden; }
.mg-hero-photo { position:absolute; inset:0; }
.mg-hero-photo img { filter:brightness(0.45); transition:transform 8s ease; }
.mg-hero:hover .mg-hero-photo img { transform:scale(1.04); }
.mg-hero-photo-overlay { position:absolute; inset:0; background:linear-gradient(90deg,var(--ch) 0%,transparent 30%); }
.mg-hero-canvas { position:absolute; inset:0; z-index:1; opacity:0.6; }
.mg-hero-badge {
  position:absolute; bottom:40px; right:40px; z-index:2;
  border:1px solid rgba(200,191,176,0.2); padding:14px 20px;
  background:rgba(12,11,9,0.7); backdrop-filter:blur(8px);
}
.mg-hero-badge-l { font-family:var(--mono); font-size:0.56rem; letter-spacing:0.22em; text-transform:uppercase; color:var(--textF); margin-bottom:4px; }
.mg-hero-badge-v { font-family:var(--serif); font-size:0.95rem; font-weight:400; color:var(--stone2); }
.mg-hero-eyebrow {
  font-family:var(--mono); font-size:0.6rem; letter-spacing:0.32em; text-transform:uppercase;
  color:var(--brass); margin-bottom:28px; display:flex; align-items:center; gap:16px;
  opacity:0; animation:fadeUp .8s var(--ease) 1.8s forwards;
}
.mg-hero-eyebrow::before { content:''; width:36px; height:1px; background:var(--brass); opacity:.6; }
.mg-hero-h1 { font-family:var(--serif); font-size:clamp(3rem,5.5vw,6rem); font-weight:300; line-height:1.02; margin-bottom:28px; }
.mg-hero-h1-line { display:block; overflow:hidden; }
.mg-hero-h1-inner { display:block; transform:translateY(110%); animation:slideUp .9s var(--ease) both; }
.mg-hero-h1-line:nth-child(1) .mg-hero-h1-inner { animation-delay:1.9s; }
.mg-hero-h1-line:nth-child(2) .mg-hero-h1-inner { animation-delay:2.05s; }
.mg-hero-h1-line:nth-child(3) .mg-hero-h1-inner { animation-delay:2.2s; }
.mg-hero-h1 em { font-style:italic; color:var(--brass3); }
.mg-hero-body { font-size:1rem; color:var(--textD); line-height:1.8; max-width:520px; margin-bottom:44px; opacity:0; animation:fadeUp .8s var(--ease) 2.35s forwards; }
.mg-hero-stats { display:flex; gap:0; margin-bottom:44px; opacity:0; animation:fadeUp .8s var(--ease) 2.5s forwards; }
.mg-hero-stat { padding:16px 28px; border:1px solid rgba(200,191,176,0.12); text-align:center; }
.mg-hero-stat+.mg-hero-stat { border-left:none; }
.mg-hero-stat-n { font-family:var(--serif); font-size:1.5rem; font-weight:300; color:var(--brass2); display:block; line-height:1; }
.mg-hero-stat-l { font-family:var(--mono); font-size:0.52rem; letter-spacing:0.16em; text-transform:uppercase; color:var(--textF); margin-top:5px; display:block; }
.mg-hero-ctas { display:flex; gap:14px; opacity:0; animation:fadeUp .8s var(--ease) 2.65s forwards; }

/* BUTTONS */
.mg-btn-brass {
  display:inline-flex; align-items:center; gap:10px; font-family:var(--mono);
  font-size:0.65rem; font-weight:500; letter-spacing:0.2em; text-transform:uppercase;
  color:var(--ch); background:var(--brass2); padding:14px 30px;
  position:relative; overflow:hidden; transition:color .3s; cursor:pointer; border:none;
}
.mg-btn-brass::before {
  content:''; position:absolute; inset:0; background:var(--brass3);
  transform:translateX(-100%) skewX(-6deg); transition:transform .4s var(--ease);
}
.mg-btn-brass:hover::before { transform:translateX(0) skewX(0); }
.mg-btn-brass span { position:relative; z-index:1; }
.mg-btn-outline {
  display:inline-block; font-family:var(--mono); font-size:0.65rem; letter-spacing:0.2em;
  text-transform:uppercase; color:var(--textD); border:1px solid rgba(200,191,176,0.2);
  padding:14px 30px; transition:all .3s; cursor:pointer;
}
.mg-btn-outline:hover { border-color:var(--brass-dim); color:var(--brass2); }

/* MARQUEE */
.mg-marquee { padding:20px 0; border-top:1px solid rgba(200,191,176,0.08); border-bottom:1px solid rgba(200,191,176,0.08); background:var(--ch2); overflow:hidden; }
.mg-mq-track { display:flex; width:max-content; animation:mq 45s linear infinite; }
.mg-mq-track:hover { animation-play-state:paused; }
.mg-mq-item { display:flex; align-items:center; padding:0 48px; border-right:1px solid rgba(200,191,176,0.08); flex-shrink:0; }
.mg-mq-glyph { width:4px; height:4px; background:var(--brass); transform:rotate(45deg); margin-right:18px; flex-shrink:0; }
.mg-mq-text { font-family:var(--mono); font-size:0.62rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--textF); white-space:nowrap; }

/* MANIFESTO */
.mg-manifesto { padding:130px 0; background:var(--ch); overflow:hidden; }
.mg-manifesto-grid { display:grid; grid-template-columns:1fr 1fr; min-height:600px; }
.mg-manifesto-left { padding:80px 80px 80px 0; position:relative; display:flex; flex-direction:column; justify-content:center; }
.mg-manifesto-wm {
  position:absolute; left:-40px; top:50%; transform:translateY(-50%);
  font-family:var(--serif); font-size:20rem; font-weight:300; font-style:italic;
  color:transparent; -webkit-text-stroke:1px rgba(184,150,74,0.05); line-height:1;
  pointer-events:none; user-select:none; z-index:0;
}
.mg-manifesto-content { position:relative; z-index:1; }
.mg-manifesto-quote {
  font-family:var(--serif); font-size:clamp(1.5rem,2.5vw,2.4rem); font-weight:300;
  font-style:italic; color:var(--brass3); line-height:1.3; margin-bottom:40px;
  position:relative; padding-left:28px;
}
.mg-manifesto-quote::before { content:''; position:absolute; left:0; top:0; bottom:0; width:2px; background:var(--brass2); opacity:.5; }
.mg-manifesto-cols { display:grid; grid-template-columns:1fr 1fr; gap:32px; margin-top:32px; }
.mg-manifesto-col-text { font-family:var(--body); font-size:0.95rem; color:var(--textD); line-height:1.82; }
.mg-manifesto-right { position:relative; overflow:hidden; }
.mg-manifesto-photo { position:absolute; inset:0; }
.mg-manifesto-photo-fade { position:absolute; inset:0; background:linear-gradient(270deg,transparent 60%,var(--ch) 100%); }

/* GAP */
.mg-gap { padding:100px 0; background:var(--ch2); border-top:1px solid rgba(200,191,176,0.06); }
.mg-gap-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; background:rgba(200,191,176,0.06); margin-top:60px; }
.mg-gap-card { background:var(--ch3); padding:52px 44px; position:relative; overflow:hidden; transition:background .4s; }
.mg-gap-card:hover { background:var(--ch4); }
.mg-gap-card-num { font-family:var(--serif); font-size:5rem; font-weight:300; font-style:italic; color:rgba(184,150,74,0.1); line-height:1; margin-bottom:24px; transition:color .4s; }
.mg-gap-card:hover .mg-gap-card-num { color:rgba(184,150,74,0.2); }
.mg-gap-card-t { font-family:var(--serif); font-size:1.4rem; font-weight:400; color:var(--text); margin-bottom:14px; line-height:1.2; }
.mg-gap-card-d { font-family:var(--body); font-size:0.9rem; color:var(--textF); line-height:1.75; }
.mg-gap-card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:2px;
  background:var(--brass2); transform:scaleX(0); transform-origin:left; transition:transform .5s var(--ease);
}
.mg-gap-card:hover::before { transform:scaleX(1); }

/* PILLARS */
.mg-pillars { padding:130px 0; background:var(--ch); }
.mg-pillars-intro { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:end; margin-bottom:72px; }
.mg-pillars-intro-r { font-family:var(--body); font-size:1rem; color:var(--textD); line-height:1.85; }
.mg-pillars-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; background:rgba(200,191,176,0.06); }
.mg-pillars-grid-row2 { grid-template-columns:1fr 1fr; }
.mg-pillar-card { position:relative; overflow:hidden; min-height:520px; display:flex; flex-direction:column; justify-content:flex-end; }
.mg-pillar-photo { position:absolute; inset:0; transition:transform .6s var(--ease); }
.mg-pillar-photo img { filter:brightness(0.35); }
.mg-pillar-card:hover .mg-pillar-photo { transform:scale(1.04); }
.mg-pillar-overlay { position:absolute; inset:0; background:linear-gradient(0deg,rgba(12,11,9,0.92) 0%,rgba(12,11,9,0.4) 60%,transparent 100%); }
.mg-pillar-content { position:relative; z-index:1; padding:44px; }
.mg-pillar-num { font-family:var(--mono); font-size:0.58rem; letter-spacing:0.28em; color:var(--brass); margin-bottom:12px; }
.mg-pillar-tag { display:inline-block; font-family:var(--mono); font-size:0.54rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--brass2); border:1px solid rgba(184,150,74,0.3); padding:4px 10px; margin-bottom:16px; }
.mg-pillar-name { font-family:var(--serif); font-size:2rem; font-weight:300; color:var(--text); margin-bottom:12px; line-height:1.1; }
.mg-pillar-desc { font-family:var(--body); font-size:0.88rem; color:var(--textD); line-height:1.7; margin-bottom:20px; max-height:0; overflow:hidden; transition:max-height .5s var(--ease),opacity .4s; opacity:0; }
.mg-pillar-card:hover .mg-pillar-desc { max-height:200px; opacity:1; }
.mg-pillar-deliverables { list-style:none; display:flex; flex-direction:column; gap:5px; max-height:0; overflow:hidden; transition:max-height .5s var(--ease) .05s,opacity .4s .05s; opacity:0; }
.mg-pillar-card:hover .mg-pillar-deliverables { max-height:200px; opacity:1; }
.mg-pillar-deliverables li { font-family:var(--mono); font-size:0.6rem; color:var(--stone); display:flex; align-items:flex-start; gap:8px; }
.mg-pillar-deliverables li::before { content:''; display:block; width:14px; height:1px; background:var(--brass); flex-shrink:0; margin-top:7px; }
.mg-pillar-card.resolve-card { background:var(--resolve); }
.mg-pillar-card.resolve-card .mg-pillar-photo img { filter:brightness(0.2); }
.mg-pillar-card.resolve-card .mg-pillar-overlay { background:linear-gradient(0deg,rgba(10,10,8,0.97) 0%,rgba(10,10,8,0.6) 55%,transparent 100%); }
.mg-pillar-card.resolve-card .mg-pillar-name { color:var(--stone2); }
.mg-pillar-card.resolve-card .mg-pillar-tag { color:var(--resolve-acc2); border-color:rgba(196,80,58,0.4); }
.mg-pillar-card.resolve-card .mg-pillar-num { color:var(--resolve-acc); }
.mg-pillar-card.resolve-card .mg-pillar-deliverables li::before { background:var(--resolve-acc); }
.mg-pillar-card.resolve-card .mg-pillar-deliverables li { color:var(--stone); }
.mg-pillar-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:var(--brass2); transform:scaleX(0); transform-origin:left; transition:transform .5s var(--ease); z-index:2; }
.mg-pillar-card:hover::before { transform:scaleX(1); }
.mg-pillar-card.resolve-card::before { background:var(--resolve-acc2); }

/* SECTORS */
.mg-sectors { padding:130px 0; background:var(--ch2); border-top:1px solid rgba(200,191,176,0.06); }
.mg-sectors-head { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:end; margin-bottom:60px; }
.mg-sectors-r { font-family:var(--body); font-size:1rem; color:var(--textD); line-height:1.85; }
.mg-sectors-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:2px; background:rgba(200,191,176,0.06); }
.mg-sector-item { position:relative; overflow:hidden; min-height:280px; display:flex; flex-direction:column; justify-content:flex-end; }
.mg-sector-photo { position:absolute; inset:0; transition:transform .6s var(--ease); }
.mg-sector-photo img { filter:brightness(0.3); }
.mg-sector-item:hover .mg-sector-photo { transform:scale(1.05); }
.mg-sector-grad { position:absolute; inset:0; background:linear-gradient(0deg,rgba(12,11,9,.92) 0%,transparent 60%); }
.mg-sector-content { position:relative; z-index:1; padding:28px; }
.mg-sector-name { font-family:var(--serif); font-size:1.2rem; font-weight:400; color:var(--text); margin-bottom:5px; }
.mg-sector-sub { font-family:var(--mono); font-size:0.56rem; letter-spacing:0.15em; color:var(--textF); }

/* CAPABILITIES */
.mg-capabilities { padding:130px 0; background:var(--ch); }
.mg-caps-head { text-align:center; margin-bottom:56px; }
.mg-tabs-nav { display:flex; gap:2px; background:rgba(200,191,176,0.06); margin-bottom:2px; flex-wrap:wrap; }
.mg-tab-btn {
  flex:1; min-width:150px; font-family:var(--mono); font-size:0.6rem; letter-spacing:0.16em;
  text-transform:uppercase; color:var(--textF); padding:16px 20px; background:var(--ch3);
  border:none; cursor:pointer; transition:all .3s; text-align:center; border-bottom:2px solid transparent;
}
.mg-tab-btn.active { color:var(--brass2); background:var(--ch4); border-bottom-color:var(--brass2); }
.mg-tab-btn:hover { color:var(--textD); }
.mg-tab-panel { display:none; background:var(--ch3); padding:60px; }
.mg-tab-panel.active { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start; }
.mg-tab-panel-h { font-family:var(--serif); font-size:2rem; font-weight:300; color:var(--text); margin-bottom:16px; grid-column:1/-1; }
.mg-tab-panel-body { font-family:var(--body); font-size:0.95rem; color:var(--textD); line-height:1.85; }
.mg-tab-panel-list { display:flex; flex-direction:column; gap:10px; }
.mg-tab-panel-li { display:flex; align-items:flex-start; gap:12px; font-family:var(--body); font-size:0.9rem; color:var(--textD); line-height:1.6; }
.mg-tab-panel-li::before { content:''; display:block; width:18px; height:1px; background:var(--brass); flex-shrink:0; margin-top:11px; }

/* SERVE */
.mg-serve { padding:130px 0; background:var(--ch2); border-top:1px solid rgba(200,191,176,0.06); }
.mg-serve-head { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:end; margin-bottom:60px; }
.mg-serve-r { font-family:var(--body); font-size:1rem; color:var(--textD); line-height:1.85; }
.mg-serve-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; background:rgba(200,191,176,0.06); }
.mg-serve-card { background:var(--ch3); padding:48px 40px; position:relative; overflow:hidden; transition:background .4s; }
.mg-serve-card:hover { background:var(--ch4); }
.mg-serve-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:var(--brass); transform:scaleX(0); transform-origin:left; transition:transform .5s var(--ease); }
.mg-serve-card:hover::before { transform:scaleX(1); }
.mg-serve-icon { width:40px; height:40px; margin-bottom:20px; opacity:.4; transition:opacity .3s; }
.mg-serve-card:hover .mg-serve-icon { opacity:.8; }
.mg-serve-t { font-family:var(--serif); font-size:1.3rem; font-weight:400; color:var(--text); margin-bottom:10px; }
.mg-serve-d { font-family:var(--body); font-size:0.88rem; color:var(--textF); line-height:1.72; margin-bottom:20px; }
.mg-serve-quote { font-family:var(--serif); font-size:0.92rem; font-style:italic; color:var(--stone); border-left:2px solid rgba(184,150,74,0.3); padding-left:16px; line-height:1.55; }

/* APPROACH */
.mg-approach { padding:130px 0; background:var(--ch); }
.mg-approach-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; margin-top:60px; }
.mg-approach-photo { position:relative; height:600px; overflow:hidden; }
.mg-approach-photo img { filter:brightness(0.55); }
.mg-approach-steps { display:flex; flex-direction:column; gap:0; padding-left:32px; border-left:1px solid rgba(200,191,176,0.1); }
.mg-approach-step { padding:32px 0; border-bottom:1px solid rgba(200,191,176,0.07); position:relative; }
.mg-approach-step::before { content:''; position:absolute; left:-33px; top:36px; width:9px; height:9px; border-radius:50%; background:var(--ch3); border:1px solid var(--brass-dim); transition:all .3s; }
.mg-approach-step:hover::before { background:var(--brass2); border-color:var(--brass2); }
.mg-approach-step-n { font-family:var(--mono); font-size:0.58rem; letter-spacing:0.22em; color:var(--brass); margin-bottom:6px; }
.mg-approach-step-t { font-family:var(--serif); font-size:1.25rem; font-weight:400; color:var(--text); margin-bottom:8px; transition:color .3s; }
.mg-approach-step:hover .mg-approach-step-t { color:var(--brass3); }
.mg-approach-step-d { font-family:var(--body); font-size:0.87rem; color:var(--textF); line-height:1.7; }
.mg-approach-track { display:inline-flex; align-items:center; gap:8px; font-family:var(--mono); font-size:0.54rem; letter-spacing:0.18em; text-transform:uppercase; color:var(--textF); margin-top:8px; padding:4px 10px; border:1px solid rgba(200,191,176,0.08); }

/* RESOLVE DEPTH */
.mg-resolve-depth { padding:130px 0; background:var(--resolve); border-top:2px solid var(--resolve-acc); }
.mg-resolve-grid { display:grid; grid-template-columns:1fr 1fr; min-height:700px; margin-top:60px; }
.mg-resolve-photo { position:relative; overflow:hidden; }
.mg-resolve-photo img { filter:brightness(0.4); }
.mg-resolve-photo-overlay { position:absolute; inset:0; background:linear-gradient(90deg,transparent 70%,var(--resolve) 100%); }
.mg-resolve-right { padding:60px 0 60px 72px; display:flex; flex-direction:column; gap:0; }
.mg-resolve-service { padding:32px 0; border-bottom:1px solid rgba(255,255,255,0.06); position:relative; }
.mg-resolve-service:last-child { border-bottom:none; }
.mg-resolve-service-num { font-family:var(--mono); font-size:0.56rem; letter-spacing:0.22em; color:var(--resolve-acc); margin-bottom:8px; }
.mg-resolve-service-t { font-family:var(--serif); font-size:1.4rem; font-weight:400; color:var(--stone2); margin-bottom:10px; }
.mg-resolve-service-d { font-family:var(--body); font-size:0.9rem; color:rgba(200,191,176,0.5); line-height:1.78; }
.mg-resolve-bar { width:0; height:1px; background:var(--resolve-acc); margin-top:16px; transition:width .5s var(--ease); }
.mg-resolve-service:hover .mg-resolve-bar { width:80px; }

/* INTELLIGENCE */
.mg-intelligence { padding:130px 0; background:var(--ch2); border-top:1px solid rgba(200,191,176,0.06); }
.mg-intel-head { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:end; margin-bottom:60px; }
.mg-intel-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:2px; background:rgba(200,191,176,0.06); }
.mg-intel-card { position:relative; overflow:hidden; min-height:360px; display:flex; flex-direction:column; justify-content:flex-end; }
.mg-intel-photo { position:absolute; inset:0; transition:transform .6s var(--ease); }
.mg-intel-photo img { filter:brightness(0.25); }
.mg-intel-card:hover .mg-intel-photo { transform:scale(1.05); }
.mg-intel-grad { position:absolute; inset:0; background:linear-gradient(0deg,rgba(12,11,9,.97) 0%,transparent 60%); }
.mg-intel-content { position:relative; z-index:1; padding:28px; }
.mg-intel-cat { font-family:var(--mono); font-size:0.56rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--brass); margin-bottom:8px; }
.mg-intel-t { font-family:var(--serif); font-size:1.05rem; font-weight:400; color:var(--text); line-height:1.35; margin-bottom:10px; }
.mg-intel-arrow { font-family:var(--mono); font-size:0.58rem; color:var(--brass); opacity:0; transition:opacity .3s; margin-top:8px; }
.mg-intel-card:hover .mg-intel-arrow { opacity:1; }

/* GEOGRAPHY */
.mg-geo-grid { display:grid; grid-template-columns:repeat(4,1fr); height:500px; }
.mg-geo-city { position:relative; overflow:hidden; cursor:pointer; }
.mg-geo-city-photo { position:absolute; inset:0; transition:transform .7s var(--ease); }
.mg-geo-city-photo img { filter:brightness(0.3); }
.mg-geo-city:hover .mg-geo-city-photo { transform:scale(1.06); }
.mg-geo-city-overlay { position:absolute; inset:0; background:linear-gradient(0deg,rgba(12,11,9,.85) 0%,transparent 50%); transition:background .4s; }
.mg-geo-city:hover .mg-geo-city-overlay { background:linear-gradient(0deg,rgba(12,11,9,.92) 0%,rgba(12,11,9,.3) 50%,transparent 100%); }
.mg-geo-city-content { position:absolute; bottom:0; left:0; right:0; padding:28px 24px; z-index:1; }
.mg-geo-status { font-family:var(--mono); font-size:0.54rem; letter-spacing:0.22em; text-transform:uppercase; color:var(--brass); margin-bottom:6px; }
.mg-geo-name { font-family:var(--serif); font-size:1.6rem; font-weight:300; color:var(--text); }
.mg-geo-desc { font-family:var(--body); font-size:0.82rem; color:var(--textD); line-height:1.6; max-height:0; overflow:hidden; transition:max-height .5s var(--ease),opacity .4s; opacity:0; margin-top:8px; }
.mg-geo-city:hover .mg-geo-desc { max-height:120px; opacity:1; }

/* CONTACT */
.mg-contact { padding:130px 0; background:var(--ch3); }
.mg-contact-grid { display:grid; grid-template-columns:1fr 1fr; min-height:700px; }
.mg-contact-left { position:relative; overflow:hidden; }
.mg-contact-left-photo { position:absolute; inset:0; }
.mg-contact-left-photo img { filter:brightness(0.3); }
.mg-contact-left-overlay { position:absolute; inset:0; background:linear-gradient(90deg,transparent 50%,var(--ch3) 100%); }
.mg-contact-left-content { position:absolute; bottom:60px; left:60px; right:60px; z-index:1; }
.mg-contact-left-h { font-family:var(--serif); font-size:2.8rem; font-weight:300; color:var(--text); line-height:1.1; margin-bottom:20px; }
.mg-contact-left-d { font-family:var(--body); font-size:0.95rem; color:var(--textD); line-height:1.8; margin-bottom:32px; }
.mg-contact-offices { display:flex; flex-direction:column; gap:16px; }
.mg-contact-office { display:flex; flex-direction:column; gap:3px; }
.mg-contact-office-label { font-family:var(--mono); font-size:0.56rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--brass); margin-bottom:4px; }
.mg-contact-office-addr { font-family:var(--body); font-size:0.88rem; color:var(--textD); line-height:1.5; }
.mg-contact-email { font-family:var(--serif); font-size:1rem; color:var(--brass3); margin-top:16px; }
.mg-contact-right { padding:60px 0 60px 72px; }
.mg-cform { display:flex; flex-direction:column; gap:16px; }
.mg-f-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.mg-f-field { display:flex; flex-direction:column; gap:7px; }
.mg-f-lbl { font-family:var(--mono); font-size:0.56rem; font-weight:500; letter-spacing:0.2em; text-transform:uppercase; color:var(--textF); }
.mg-f-in, .mg-f-sel, .mg-f-ta {
  background:transparent; border:1px solid rgba(200,191,176,0.1); padding:12px 15px;
  font-family:var(--body); font-size:0.9rem; color:var(--text); width:100%; transition:border-color .3s;
  -webkit-appearance:none; appearance:none;
}
.mg-f-in:focus, .mg-f-sel:focus, .mg-f-ta:focus { border-color:var(--brass-dim); }
.mg-f-in::placeholder, .mg-f-ta::placeholder { color:var(--textF); }
.mg-f-sel option { background:var(--ch3); color:var(--text); }
.mg-f-ta { resize:vertical; min-height:100px; }
.mg-f-btn {
  font-family:var(--mono); font-size:0.65rem; letter-spacing:0.2em; text-transform:uppercase;
  color:var(--ch); background:var(--brass2); border:none; padding:15px 36px;
  cursor:pointer; transition:background .3s; align-self:flex-start;
}
.mg-f-btn:hover { background:var(--brass3); }
.mg-f-note { font-family:var(--body); font-size:0.76rem; color:var(--textF); line-height:1.6; }

/* FOOTER */
.mg-footer { background:var(--ch2); border-top:1px solid rgba(200,191,176,0.06); padding:80px 0 0; }
.mg-footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:60px; padding-bottom:60px; border-bottom:1px solid rgba(200,191,176,0.06); }
.mg-footer-brand { font-family:var(--serif); font-size:1.1rem; font-weight:400; letter-spacing:0.14em; text-transform:uppercase; color:var(--textD); margin-bottom:14px; display:flex; align-items:center; gap:5px; }
.mg-footer-brand-dot { width:5px; height:5px; background:var(--brass2); border-radius:50%; }
.mg-footer-desc { font-family:var(--body); font-size:0.88rem; color:var(--textF); line-height:1.7; margin-bottom:16px; }
.mg-footer-col-h { font-family:var(--mono); font-size:0.56rem; font-weight:500; letter-spacing:0.22em; text-transform:uppercase; color:var(--brass); margin-bottom:18px; }
.mg-footer-links { list-style:none; display:flex; flex-direction:column; gap:10px; }
.mg-footer-links a { font-family:var(--body); font-size:0.88rem; color:var(--textF); transition:color .3s; cursor:pointer; }
.mg-footer-links a:hover { color:var(--brass2); }
.mg-footer-bottom { padding:24px 0; display:flex; align-items:flex-start; justify-content:space-between; gap:40px; }
.mg-footer-legal { font-family:var(--body); font-size:0.72rem; color:var(--textF); line-height:1.65; max-width:780px; }
.mg-footer-copy { font-family:var(--mono); font-size:0.56rem; letter-spacing:0.15em; color:var(--textF); white-space:nowrap; padding-top:4px; }

/* TILT */
.mg-tilt { transform-style:preserve-3d; }

/* RESPONSIVE */
@media(max-width:1100px) {
  .mg-container { padding-left:28px; padding-right:28px; }
  .mg-nav { padding:18px 28px; }
  .mg-nav.scrolled { padding:14px 28px; }
  .mg-nav-links { display:none; }
  .mg-nav-cta { display:none; }
  .mg-nav-burger { display:flex; }
  .mg-hero { grid-template-columns:1fr; }
  .mg-hero-right { display:none; }
  .mg-hero-left { padding:120px 28px 60px; }
  .mg-manifesto-grid, .mg-manifesto-cols, .mg-resolve-grid, .mg-contact-grid, .mg-approach-grid { grid-template-columns:1fr; }
  .mg-geo-grid { height:auto; grid-template-columns:1fr 1fr; }
  .mg-geo-city { height:250px; }
  .mg-pillars-grid, .mg-pillars-grid-row2, .mg-sectors-grid, .mg-serve-grid, .mg-intel-grid, .mg-gap-grid, .mg-footer-grid { grid-template-columns:1fr; }
  .mg-tabs-nav { flex-direction:column; }
  .mg-tabs-nav .mg-tab-btn { flex:none; }
  .mg-tab-panel.active { grid-template-columns:1fr; }
  .mg-manifesto-right { height:300px; position:relative; }
  .mg-resolve-photo { height:300px; position:relative; }
  .mg-resolve-right { padding:40px 28px; }
  .mg-contact-left { height:300px; position:relative; }
  .mg-contact-left-content { left:28px; right:28px; bottom:28px; }
  .mg-contact-right { padding:40px 28px; }
  .mg-footer-grid { grid-template-columns:1fr 1fr; }
  .mg-footer-bottom { flex-direction:column; }
  .mg-hero-stats { flex-wrap:wrap; }
  .mg-sectors-head, .mg-serve-head, .mg-intel-head, .mg-pillars-intro { grid-template-columns:1fr; }
  .mg-sectors-grid { grid-template-columns:repeat(2,1fr); }
}
`;

/* ─── DATA ─── */
const MARQUEE_ITEMS = ["Shield","Command","Capital","Intelligence","Resolve","Project Finance","Debt Restructuring","Special Situations","PPP","Infrastructure Advisory","Distressed M&A","Capital Structuring","GCC","Sub-Saharan Africa","Greenfield","Refinancing"];

// Main website component
function MainWebsite() {
  const [loaderOut, setLoaderOut] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouseRef = useRef({ x:0, y:0 });
  const ringPos = useRef({ x:0, y:0 });

  useScrollReveal();

  useEffect(() => {
    const id = "mg-styles";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = STYLES;
      document.head.appendChild(s);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoaderOut(true), 2600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const mm = (e) => { 
      mouseRef.current = { x: e.clientX, y: e.clientY }; 
      if (dotRef.current) { 
        dotRef.current.style.left = e.clientX+"px"; 
        dotRef.current.style.top = e.clientY+"px"; 
      } 
    };
    document.addEventListener("mousemove", mm);
    let id;
    const anim = () => {
      const { x, y } = mouseRef.current;
      ringPos.current.x += (x - ringPos.current.x) * 0.11;
      ringPos.current.y += (y - ringPos.current.y) * 0.11;
      if (ringRef.current) { 
        ringRef.current.style.left = ringPos.current.x+"px"; 
        ringRef.current.style.top = ringPos.current.y+"px"; 
      }
      id = requestAnimationFrame(anim);
    };
    anim();
    return () => { 
      document.removeEventListener("mousemove", mm); 
      cancelAnimationFrame(id); 
    };
  }, []);

  const scrollTo = useCallback((id) => {
    setMobileOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior:"smooth", block:"start" });
  }, []);

  const hoverProps = { 
    onMouseEnter: () => setHovering(true), 
    onMouseLeave: () => setHovering(false) 
  };

  return (
    <div className={`mg-noise ${hovering ? "mg-hovering" : ""}`} style={{position:"relative"}}>
      <div className="mg-cur-dot" ref={dotRef} />
      <div className="mg-cur-ring" ref={ringRef} />

      <div className={`mg-loader ${loaderOut ? "out" : ""}`}>
        <div className="mg-loader-photo"><img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80&fit=crop" alt="" /></div>
        <div className="mg-loader-overlay" />
        <div className="mg-loader-content">
          <div className="mg-loader-name"><span className="mg-loader-name-inner">Mayspear</span></div>
          <div className="mg-loader-sub">Infrastructure Advisory &nbsp;&middot;&nbsp; Capital Structuring &nbsp;&middot;&nbsp; Special Situations</div>
          <div className="mg-loader-bar-wrap"><div className="mg-loader-bar-fill" /></div>
        </div>
      </div>

      <Navigation 
        navScrolled={navScrolled} 
        mobileOpen={mobileOpen} 
        setMobileOpen={setMobileOpen}
        scrollTo={scrollTo}
        hoverProps={hoverProps}
      />

      <Hero scrollTo={scrollTo} hoverProps={hoverProps} />
      <NewsSection />
      <ServicesSection />
      <Marquee />
      <Manifesto />
      <Gap />
      <Pillars />
      <Sectors />
      <Capabilities hoverProps={hoverProps} />
      <Serve hoverProps={hoverProps} />
      <Approach />
      <ResolveDepth />
      <Intelligence />
      <Geography />
      <Contact />
      <Footer scrollTo={scrollTo} hoverProps={hoverProps} />
    </div>
  );
}

// Protected route wrapper for admin
function ProtectedRoute() {
  const isAuth = localStorage.getItem("adminAuth") === "true";
  return isAuth ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

// App with routing
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainWebsite />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="services" element={<AdminServices />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}