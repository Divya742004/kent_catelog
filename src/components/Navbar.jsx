// import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
// import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
// import { Menu, X, Search, ChevronDown, Sparkles, MessageCircle } from 'lucide-react';
// import { enquiry, asset } from '../lib.js';

// export default function Navbar({ data }) {
//   const [open, setOpen] = useState(false), [dd, setDd] = useState(null), [q, setQ] = useState(''), nav = useNavigate(), loc = useLocation();
//   const cats = (data?.categories || []).slice().sort((a, b) => a.order - b.order);
//   /* When the categories no longer fit in one row (e.g. after adding more in the admin) the menu folds into the burger menu automatically */
//   const linksRef = useRef(null), [cmp, setCmp] = useState(false), breakW = useRef(0), sig = cats.map(c => c.name + c.subs.length).join('|');
//   const fit = useCallback(() => {
//     const el = linksRef.current; if (!el) return;
//     if (!cmp) { if (window.innerWidth > 960 && el.scrollWidth > el.clientWidth + 1) { breakW.current = window.innerWidth; setCmp(true) } }
//     else if (window.innerWidth > breakW.current + 60) setCmp(false);
//   }, [cmp]);
//   useLayoutEffect(fit);
//   useEffect(() => { setCmp(false) }, [sig]);
//   useEffect(() => { addEventListener('resize', fit); document.fonts?.ready.then(fit); return () => removeEventListener('resize', fit) }, [fit]);
//   useEffect(() => { setOpen(false); setDd(null) }, [loc.pathname]);
//   useEffect(() => { const k = e => e.key === 'Escape' && (setOpen(false), setDd(null)); addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, []);
//   const search = e => { e.preventDefault(); if (q.trim()) { nav('/search?q=' + encodeURIComponent(q.trim())); setOpen(false) } };
//   return <header className={'nv' + (cmp ? ' nv-fold' : '')}>
//     <div className="nv-in">
//       <Link to="/" className="nv-logo" aria-label="Aakash Aqua Tech home"><img src={asset("/logo.webp")} alt="Aakash Aqua Tech" width="43" height="44" /></Link>
//       <nav ref={linksRef} className={'nv-links' + (open ? ' open' : '')} aria-label="Catalog categories" onMouseLeave={() => setDd(null)}>
//         <NavLink to="/" end className="nv-a nv-new"><Sparkles size={15} />Latest</NavLink>
//         {cats.map(c => c.subs.length
//           ? <div key={c.id} className={'nv-dd' + (dd === c.id ? ' on' : '')} onMouseEnter={() => setDd(c.id)}>
//             <div className="nv-row">
//               <NavLink to={'/c/' + c.id} end className="nv-a">{c.name}</NavLink>
//               <button className="nv-chev" aria-label={'Show ' + c.name + ' subcategories'} aria-expanded={dd === c.id} onClick={() => setDd(dd === c.id ? null : c.id)}><ChevronDown size={15} /></button>
//             </div>
//             <div className="nv-menu">
//               <Link to={'/c/' + c.id}>All {c.name}</Link>
//               {c.subs.slice().sort((a, b) => a.order - b.order).map(s => <Link key={s.id} to={`/c/${c.id}/${s.id}`}>{s.name}</Link>)}
//             </div>
//           </div>
//           : <NavLink key={c.id} to={'/c/' + c.id} className="nv-a">{c.name}</NavLink>)}
//         <form className="nv-s sm" onSubmit={search}><Search size={15} /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products" aria-label="Search products" /></form>
//       </nav>
//       <form className="nv-s lg" onSubmit={search} onClick={e => e.currentTarget.querySelector("input").focus()}><Search size={15} /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search" aria-label="Search products" /></form>
//       <a className="nv-wa" href={enquiry()} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /><span>Enquire</span></a>
//       <button className="nv-burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
//     </div>
//   </header>;
// }
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search, ChevronDown, Sparkles } from 'lucide-react';
import { enquiry, asset } from '../lib.js';

const WhatsApp = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default function Navbar({ data }) {
  const [open, setOpen] = useState(false), [dd, setDd] = useState(null), [q, setQ] = useState(''), nav = useNavigate(), loc = useLocation();
  const cats = (data?.categories || []).slice().sort((a, b) => a.order - b.order);
  /* When the categories no longer fit in one row (e.g. after adding more in the admin) the menu folds into the burger menu automatically */
  const linksRef = useRef(null), [cmp, setCmp] = useState(false), breakW = useRef(0), sig = cats.map(c => c.name + c.subs.length).join('|');
  const fit = useCallback(() => {
    const el = linksRef.current; if (!el) return;
    /* measure only the category links themselves: an open dropdown sticks out past the bar and must not count as "no room" */
    const kids = [...el.children].filter(k => k.offsetWidth > 0), last = kids[kids.length - 1];
    const over = last && last.getBoundingClientRect().right > el.getBoundingClientRect().right + 1;
    if (!cmp) { if (window.innerWidth > 960 && over) { breakW.current = window.innerWidth; setCmp(true) } }
    else if (window.innerWidth > breakW.current + 60) setCmp(false);
  }, [cmp]);
  useLayoutEffect(fit);
  useEffect(() => { setCmp(false) }, [sig]);
  useEffect(() => { addEventListener('resize', fit); document.fonts?.ready.then(fit); return () => removeEventListener('resize', fit) }, [fit]);
  useEffect(() => { setOpen(false); setDd(null) }, [loc.pathname]);
  useEffect(() => { const k = e => e.key === 'Escape' && (setOpen(false), setDd(null)); addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, []);
  const search = e => { e.preventDefault(); if (q.trim()) { nav('/search?q=' + encodeURIComponent(q.trim())); setOpen(false) } };
  return <header className={'nv' + (cmp ? ' nv-fold' : '')}>
    <div className="nv-in">
      <Link to="/" className="nv-logo" aria-label="Aakash Aqua Tech home"><img src={asset("/logo.webp")} alt="Aakash Aqua Tech" width="43" height="44" /></Link>
      <nav ref={linksRef} className={'nv-links' + (open ? ' open' : '')} aria-label="Catalog categories" onMouseLeave={() => setDd(null)}>
        <NavLink to="/" end className="nv-a nv-new"><Sparkles size={15} />Latest</NavLink>
        {cats.map(c => c.subs.length
          ? <div key={c.id} className={'nv-dd' + (dd === c.id ? ' on' : '')} onMouseEnter={() => setDd(c.id)}>
            <div className="nv-row">
              <NavLink to={'/c/' + c.id} end className="nv-a">{c.name}</NavLink>
              <button className="nv-chev" aria-label={'Show ' + c.name + ' subcategories'} aria-expanded={dd === c.id} onClick={() => setDd(dd === c.id ? null : c.id)}><ChevronDown size={15} /></button>
            </div>
            <div className="nv-menu">
              <Link to={'/c/' + c.id}>All {c.name}</Link>
              {c.subs.slice().sort((a, b) => a.order - b.order).map(s => <Link key={s.id} to={`/c/${c.id}/${s.id}`}>{s.name}</Link>)}
            </div>
          </div>
          : <NavLink key={c.id} to={'/c/' + c.id} className="nv-a">{c.name}</NavLink>)}
        <form className="nv-s sm" onSubmit={search}><Search size={15} /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products" aria-label="Search products" /></form>
      </nav>
      <form className="nv-s lg" onSubmit={search} onClick={e => e.currentTarget.querySelector("input").focus()}><Search size={15} /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search" aria-label="Search products" /></form>
      <a className="nv-wa" href={enquiry()} target="_blank" rel="noopener noreferrer"><WhatsApp size={18} /><span>Enquire</span></a>
      <button className="nv-burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
    </div>
  </header>;
}