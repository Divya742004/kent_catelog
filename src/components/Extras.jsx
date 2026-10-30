import { asset } from '../lib.js';
export const CAT_INFO = {"iot": ["IoT Smart RO", "Smart RO purifiers with app monitoring", "kent-grand-iot"], "ro": ["RO + UV Purifiers", "RO + UV + UF + TDS Control with Mineral RO™", "kent-crown-plus-ro-water-purifier"], "maxx": ["Maxx Series", "Compact purifiers for everyday use", "kent-maxx-plus"], "softener": ["Water Softeners", "Automatic softeners for hard water", "kent-automatic-water-softener-8l"], "filters": ["Iron & Sand Filters", "Filters for borewell and tank water", "kent-sand-filter"]};
export function CatTiles({ cats, jump }) {
  return <div className="bk-cg">{cats.map(c => <button key={c.id} className="bk-cg-i" onClick={() => jump(c.i)}>
    <img src={asset('/img/kent/' + CAT_INFO[c.id][2] + '.webp')} alt={CAT_INFO[c.id][0]} draggable={false} loading="lazy" />
    <span><b>{CAT_INFO[c.id][0]}</b><small>{CAT_INFO[c.id][1]}</small><em>{c.c} {c.c === 1 ? 'product' : 'products'} · page {c.i + 1}</em></span></button>)}</div>;
}
