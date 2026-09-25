/* ============================================================
   SYDACM website — app code.
   You should not need to edit this file. All words, dates and
   contact details live in the content/ folder (see README.md).
   ============================================================ */
(function () {
'use strict';

const LEAFLET = 'assets/vendor/leaflet/';
const CROSS = 'M6.4 1H9.6V6H14.5V9.2H9.6V19H6.4V9.2H1.5V6H6.4Z';
const CATS = ['congregation', 'translation', 'groups', 'unknown'];
const LANGS = ['Mandarin', 'Cantonese', 'Bilingual', 'Chinese'];

/* Interface words (buttons, labels). Page text lives in content/. */
const UI = {
  zh: {
    langBtn: 'EN', langLabel: 'Switch to English',
    notFound: '找不到此页', notFoundText: '此页不存在或已移除。', backHome: '返回主页',
    findChurch: '寻找教会', seeAll: '查看全部教会',
    sChurches: '间教会', sSites: '个聚会点', sCong: '间设华语崇拜', sTrans: '间提供翻译',
    ctaText: n => `悉尼教区共有 ${n} 间教会设有华文事工。按地区、语言或名称查找离你最近的一间。`,
    upcoming: '近期活动', allEvents: '全部活动', noEvents: '目前没有已排定的活动，请稍后再来查看。',
    pastEvents: '过往活动', moreInfo: '详情及报名',
    search: '搜索教会、地区或聚会时间', anyRegion: '所有地区', anyLang: '所有语言',
    shown: n => `显示 ${n} 间`, showOnMap: '在地图上显示', directions: '路线', details: '查看详情',
    update: '资料有误？', legendHint: '点击类别只显示该类教会，再点一次恢复全部。',
    fullData: '按语言及覆盖范围查看更多地图', dataNote1: '资料由各教会亲自核对。如贵教会资料有误，请按该教会下方的「资料有误？」提交更正。',
    dataNote2: '本页不刊登牧者私人电话，请联络堂区办公室。',
    mapFail: '地图无法载入，完整名单见下方。', dataFail: '教会资料暂时无法载入，请稍后再试。',
    docsEmpty: '文件即将上载，敬请期待。', allScripts: '全部', sc: '简体', tc: '繁體',
    person: '联络人', address: '地址', email: '电邮', phone: '电话', wechat: '微信',
    writeUs: '给我们留言', name: '姓名', yourEmail: '你的电邮', message: '留言内容', send: '发送',
    sending: '发送中…', sent: '谢谢！我们已收到你的留言，会尽快回复。', sendFail: '发送失败，请直接电邮：',
    emailUs: '电邮联络我们', emailText: '请电邮给我们，我们会尽快回复。',
    watch: '观看视频', comingSoon: '内容即将推出。',
    contact: '联络', links: '链接', updated: '最后更新', admin: '网站管理', dataSite: '华文教会资料库',
    cat: { congregation: '华语崇拜', translation: '翻译崇拜', groups: '华语小组', unknown: '待确认' },
    catLong: {
      congregation: '设有华语崇拜（包括双语崇拜）',
      translation: '英语崇拜，设有即时或AI翻译',
      groups: '设有华语查经或团契，但无华语崇拜',
      unknown: '历史记录，教会尚未确认'
    },
    lang: { Mandarin: '国语', Cantonese: '粤语', Bilingual: '双语', Chinese: '中文' },
    region: { 'City': '市中心', 'East': '东区', 'Inner West': '内西区', 'North': '北区',
      'North-West': '西北区', 'South': '南区', 'South-West': '西南区', 'West': '西区' },
    months: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    days: ['周日','周一','周二','周三','周四','周五','周六']
  },
  en: {
    langBtn: '中文', langLabel: '切换到中文',
    notFound: 'Page not found', notFoundText: 'This page does not exist or has moved.', backHome: 'Back to home',
    findChurch: 'Find a church', seeAll: 'See all churches',
    sChurches: 'churches', sSites: 'locations', sCong: 'with Chinese services', sTrans: 'with translation',
    ctaText: n => `${n} churches across the Diocese of Sydney have Chinese-language ministry. Search by region, language or name to find one near you.`,
    upcoming: 'Upcoming events', allEvents: 'All events', noEvents: 'No events are scheduled at the moment — please check back soon.',
    pastEvents: 'Past events', moreInfo: 'Details and registration',
    search: 'Search church, suburb or service time', anyRegion: 'All regions', anyLang: 'All languages',
    shown: n => `${n} shown`, showOnMap: 'Show on map', directions: 'Directions', details: 'See details',
    update: 'Is this wrong?', legendHint: 'Tap a category to show only those churches. Tap again to show all.',
    fullData: 'More maps — by language and by coverage', dataNote1: 'Checked with each church. If your church’s entry is wrong, use “Is this wrong?” under it.',
    dataNote2: 'Ministers’ personal numbers are not published here — please contact the parish office.',
    mapFail: 'The map could not load. The full list is below.', dataFail: 'The church list could not load. Please try again shortly.',
    docsEmpty: 'Documents are being uploaded — please check back soon.', allScripts: 'All', sc: 'Simplified', tc: 'Traditional',
    person: 'Contact', address: 'Address', email: 'Email', phone: 'Phone', wechat: 'WeChat',
    writeUs: 'Send us a message', name: 'Name', yourEmail: 'Your email', message: 'Message', send: 'Send',
    sending: 'Sending…', sent: 'Thank you — your message has arrived. We will reply soon.', sendFail: 'That did not send. Please email us at ',
    emailUs: 'Email us', emailText: 'Email us and we will reply as soon as we can.',
    watch: 'Watch the video', comingSoon: 'Content coming soon.',
    contact: 'Contact', links: 'Links', updated: 'Updated', admin: 'Site admin', dataSite: 'Chinese churches dataset',
    cat: { congregation: 'Chinese service', translation: 'With translation', groups: 'Chinese groups', unknown: 'Unconfirmed' },
    catLong: {
      congregation: 'Holds a service in Chinese, including bilingual services',
      translation: 'English service with live or AI translation',
      groups: 'Chinese Bible study or fellowship, no Chinese service',
      unknown: 'Listed historically, not yet confirmed by the church'
    },
    lang: { Mandarin: 'Mandarin', Cantonese: 'Cantonese', Bilingual: 'Bilingual', Chinese: 'Chinese (unspecified)' },
    region: {},
    months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  }
};

/* ── small helpers ─────────────────────────────────────── */
const S = { lang: 'zh', c: null, map: null, cf: { cat: null, region: '', lang: '', q: '' }, script: '' };
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, ch =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
const u = () => UI[S.lang];
const isZh = () => S.lang === 'zh';
/* the value in the current language, falling back to the other one */
const tr = (o, k) => !o ? '' : (isZh() ? (o[k + '_zh'] || o[k]) : (o[k] || o[k + '_zh'])) || '';
/* the value in the other language, if it differs (used for subtitles) */
const alt = (o, k) => { if (!o) return ''; const v = isZh() ? o[k] : o[k + '_zh']; return v && v !== tr(o, k) ? v : ''; };
const bodyOf = o => (isZh() ? (o.body_zh || o.body) : (o.body || o.body_zh)) || '';
const cssVar = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const href = url => /^(https?:|mailto:|tel:|#|\/|[\w.-]+\/|[\w.-]+\.\w+)/i.test(url) && !/^javascript:/i.test(url) ? url : '#';
const web = w => /^https?:/i.test(w) ? w : 'https://' + w;
const webLabel = w => w.replace(/^https?:\/\//i, '').replace(/\/$/, '');
const tel = p => { const d = String(p).replace(/[^\d+]/g, ''); return d.startsWith('0') ? '+61' + d.slice(1) : d; };
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
const todayISO = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

function fmtDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number), wd = new Date(y, m - 1, d).getDay();
  return isZh() ? `${y}年${m}月${d}日（${u().days[wd]}）`
    : `${u().days[wd]} ${d} ${['January','February','March','April','May','June','July','August','September','October','November','December'][m - 1]} ${y}`;
}

/* ── a small, safe Markdown renderer for the text in content/ ── */
function inline(s) {
  return s
    .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (m, a, src) => `<img src="${href(src)}" alt="${a}" loading="lazy">`)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, url) =>
      `<a href="${href(url)}"${/^https?:/i.test(url) ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*\w])\*(?!\s)([^*]+?)\*(?!\w)/g, '$1<em>$2</em>');
}
function md(src) {
  if (!src) return '';
  let out = '', para = [], quote = [], list = null;
  const flushP = () => { if (para.length) { out += `<p>${inline(para.join('<br>'))}</p>`; para = []; } };
  const flushQ = () => { if (quote.length) { out += `<blockquote><p>${inline(quote.join('<br>'))}</p></blockquote>`; quote = []; } };
  const flushL = () => { if (list) { out += `<${list.t}>${list.items.map(i => `<li>${inline(i)}</li>`).join('')}</${list.t}>`; list = null; } };
  const flush = () => { flushP(); flushQ(); flushL(); };
  for (const raw of esc(src).split('\n')) {
    const l = raw.trim(); let m;
    if (!l) { flush(); continue; }
    if ((m = l.match(/^(#{1,4})\s+(.*)$/))) { flush(); const n = Math.min(m[1].length + 1, 5); out += `<h${n}>${inline(m[2])}</h${n}>`; continue; }
    if ((m = l.match(/^&gt;\s?(.*)$/))) { flushP(); flushL(); quote.push(m[1]); continue; }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(l)) { flush(); out += '<hr>'; continue; }
    if ((m = l.match(/^[-*•]\s+(.*)$/))) { flushP(); flushQ(); if (!list || list.t !== 'ul') { flushL(); list = { t: 'ul', items: [] }; } list.items.push(m[1]); continue; }
    if ((m = l.match(/^\d+[.)、]\s*(.*)$/))) { flushP(); flushQ(); if (!list || list.t !== 'ol') { flushL(); list = { t: 'ol', items: [] }; } list.items.push(m[1]); continue; }
    flushQ(); flushL(); para.push(l);
  }
  flush();
  return out;
}

/* ── data loading ──────────────────────────────────────── */
let churchesP = null;
function loadChurches() {
  if (churchesP) return churchesP;
  const get = url => fetch(url, { cache: 'no-cache' }).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); });
  const live = S.c.site.churches_data;
  churchesP = (live ? get(live) : Promise.reject())
    .catch(() => get('data/churches.geojson'))       // saved copy, used if the live list can't be reached
    .then(gj => (gj.features || []).filter(f => f && f.geometry && f.properties))
    .catch(e => { churchesP = null; throw e; });
  return churchesP;
}
function groupChurches(F) {
  const byName = new Map();
  F.forEach((f, k) => {
    const p = f.properties;
    if (!byName.has(p.name)) byName.set(p.name, { i: byName.size, p, sites: [], feats: [] });
    const g = byName.get(p.name);
    g.sites.push(p); g.feats.push(k);
  });
  return Array.from(byName.values());
}
function churchStats(F) {
  const G = groupChurches(F);
  return { churches: G.length, sites: F.length,
    cong: G.filter(g => g.p.category === 'congregation').length,
    trans: G.filter(g => g.p.category === 'translation').length };
}
let leafletP = null;
function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L);
  if (leafletP) return leafletP;
  leafletP = new Promise((res, rej) => {
    const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = LEAFLET + 'leaflet.css';
    document.head.appendChild(css);
    const s = document.createElement('script'); s.src = LEAFLET + 'leaflet.js';
    s.onload = () => window.L ? res(window.L) : rej(); s.onerror = () => { leafletP = null; rej(); };
    document.head.appendChild(s);
  });
  return leafletP;
}

/* ── page pieces ───────────────────────────────────────── */
function pageHead(p, withLede) {
  const sub = alt(p, 'title');
  return `<section class="page-head"><div class="wrap">
    ${sub ? `<p class="eyebrow">${esc(sub)}</p>` : ''}
    <h1>${esc(tr(p, 'title'))}</h1>
    ${withLede && bodyOf(p) ? `<div class="lede">${md(bodyOf(p))}</div>` : ''}
  </div></section>`;
}
function videoEmbed(url, title) {
  if (!url) return '';
  const yt = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  const src = yt ? `https://www.youtube-nocookie.com/embed/${yt[1]}` : vm ? `https://player.vimeo.com/video/${vm[1]}` : '';
  if (src) return `<div class="video"><iframe src="${src}" title="${esc(title)}" loading="lazy"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`;
  return `<p><a class="btn btn-primary" href="${esc(href(url))}" target="_blank" rel="noopener">${u().watch} →</a></p>`;
}
function statsHTML(st) {
  const cell = (n, l) => `<div class="stat"><b>${n}</b><span>${l}</span></div>`;
  return st ? cell(st.churches, u().sChurches) + cell(st.sites, u().sSites) + cell(st.cong, u().sCong) + cell(st.trans, u().sTrans)
            : cell('—', u().sChurches) + cell('—', u().sSites) + cell('—', u().sCong) + cell('—', u().sTrans);
}
function eventCard(e) {
  const [, m, d] = e.date.split('-').map(Number);
  const wd = new Date(e.date + 'T00:00').getDay();
  const when = fmtDate(e.date) + (e.end_date ? ' – ' + fmtDate(e.end_date) : '') + (tr(e, 'time') ? ' · ' + esc(tr(e, 'time')) : '');
  return `<article class="event">
    <div class="datebox" aria-hidden="true"><span class="m">${u().months[m - 1]}</span><span class="d">${d}</span><span class="w">${u().days[wd]}</span></div>
    <div>
      <h3>${esc(tr(e, 'title'))}</h3>
      <p class="meta">${when}${tr(e, 'location') ? `<br>${esc(tr(e, 'location'))}` : ''}</p>
      ${e.image ? `<img class="event-img" src="${esc(href(e.image))}" alt="" loading="lazy">` : ''}
      <div class="prose small">${md(bodyOf(e))}</div>
      ${e.link ? `<p><a href="${esc(href(e.link))}" target="_blank" rel="noopener">${u().moreInfo} →</a></p>` : ''}
    </div></article>`;
}
function splitEvents() {
  const t = todayISO(), ev = S.c.events || [];
  return { up: ev.filter(e => (e.end_date || e.date) >= t), past: ev.filter(e => (e.end_date || e.date) < t).reverse() };
}
const crossSVG = (c, w = 11) => `<svg width="${w}" height="${Math.round(w * 1.25)}" viewBox="0 0 16 20" aria-hidden="true"><path d="${CROSS}" fill="${c}"/></svg>`;

/* ── views: one per page type ──────────────────────────── */
const VIEW = {
  home(p) {
    const P = S.c.pages, s = S.c.site, up = splitEvents().up.slice(0, 3);
    const heroStyle = p.hero_image ? ` style="--hero-img:url('${esc(href(p.hero_image))}')"` : '';
    return `
    <section class="hero${p.hero_image ? ' has-img' : ''}"${heroStyle}><div class="wrap hero-in">
      <p class="hero-eyebrow">${esc(tr(s, 'name'))}<span>${esc(alt(s, 'name'))}</span></p>
      <h1>${esc(tr(p, 'hero_title'))}</h1>
      <p class="hero-text">${esc(tr(p, 'hero_text'))}</p>
      <div class="hero-cta">
        ${P.churches ? `<a class="btn btn-light" href="#/churches">${u().findChurch} →</a>` : ''}
        ${P.about ? `<a class="btn btn-ghost" href="#/about">${esc(tr(P.about, 'title'))}</a>` : ''}
      </div>
    </div></section>
    ${P.churches ? `<div class="wrap"><div class="stats lift" id="stats" aria-live="polite">${statsHTML(null)}</div></div>` : ''}
    <section class="section"><div class="wrap split">
      <div class="prose">${md(bodyOf(p))}</div>
      ${tr(p, 'verse') ? `<aside class="verse"><blockquote><p>${esc(tr(p, 'verse'))}</p><cite>${esc(tr(p, 'verse_ref'))}</cite></blockquote>
        ${alt(p, 'verse') ? `<p class="alt">${esc(alt(p, 'verse'))}<br>${esc(alt(p, 'verse_ref'))}</p>` : ''}</aside>` : ''}
    </div></section>
    ${tr(p, 'pillars') ? `<section class="pillars"><div class="wrap">
      <p class="pillars-big">${esc(tr(p, 'pillars'))}</p><p>${esc(tr(p, 'pillars_text'))}</p></div></section>` : ''}
    ${up.length && P.events ? `<section class="section"><div class="wrap narrow">
      <div class="section-head"><h2 class="section-title">${u().upcoming}</h2><a href="#/events">${u().allEvents} →</a></div>
      <div class="event-list-home">${up.map(eventCard).join('')}</div></div></section>` : ''}
    ${P.churches ? `<section class="section${up.length ? ' tight' : ''}"><div class="wrap"><div class="cta-card">
      <div><h2>${esc(tr(s, 'tagline'))}</h2><p id="cta-text">${u().ctaText('20+')}</p></div>
      <a class="btn btn-primary" href="#/churches">${u().seeAll} →</a></div></div></section>` : ''}`;
  },

  page(p) {
    const body = bodyOf(p);
    return pageHead(p, false) + `<section class="section"><div class="wrap narrow">
      ${videoEmbed(p.video, tr(p, 'title'))}
      ${p.image ? `<img class="page-img" src="${esc(href(p.image))}" alt="">` : ''}
      ${body ? `<div class="prose">${md(body)}</div>` : (p.video ? '' : `<p class="empty">${u().comingSoon}</p>`)}
    </div></section>`;
  },

  events(p) {
    const { up, past } = splitEvents();
    return pageHead(p, true) + `<section class="section"><div class="wrap narrow">
      ${up.length ? up.map(eventCard).join('') : `<p class="empty">${u().noEvents}</p>`}
      ${past.length ? `<details class="past"><summary>${u().pastEvents} (${past.length})</summary>${past.slice(0, 12).map(eventCard).join('')}</details>` : ''}
    </div></section>`;
  },

  resources(p) {
    const cats = (S.c.resources || []).filter(c => c.files.length);
    const scripts = new Set(cats.flatMap(c => c.files.map(f => f.script)).filter(Boolean));
    const size = b => b > 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB';
    const chips = scripts.size > 1 ? `<div class="chips" role="group">${['', 'sc', 'tc'].map(k =>
      `<button type="button" class="chip" data-script="${k}" aria-pressed="${S.script === k}">${k ? u()[k] : u().allScripts}</button>`).join('')}</div>` : '';
    return pageHead(p, true) + `<section class="section"><div class="wrap">
      ${cats.length ? chips + cats.map(c => `<div class="doc-cat"><h2>${esc(c.name)}</h2><div class="doc-grid">
        ${c.files.map(f => `<a class="doc" href="${f.url}" download data-script="${f.script}">
          <span class="doc-ic">${esc(f.ext)}</span>
          <span class="doc-t">${esc(f.title)}${f.script ? `<span class="badge">${f.script === 'sc' ? '简体' : '繁體'}</span>` : ''}</span>
          <span class="doc-s">${size(f.size)}</span></a>`).join('')}
      </div></div>`).join('') : `<p class="empty">${u().docsEmpty}</p>`}
    </div></section>`;
  },

  contact(p) {
    const s = S.c.site, U = u();
    const row = (label, val) => val ? `<div><dt>${label}</dt><dd>${val}</dd></div>` : '';
    const right = s.formspree ? `<form class="card form" id="cform" action="${esc(s.formspree)}" method="POST">
        <h2>${U.writeUs}</h2>
        <label>${U.name}<input name="name" required autocomplete="name"></label>
        <label>${U.yourEmail}<input name="email" type="email" required autocomplete="email"></label>
        <label>${U.message}<textarea name="message" required></textarea></label>
        <input class="hp" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">
        <input type="hidden" name="_subject" value="SYDACM website message">
        <div><button class="btn btn-primary" type="submit">${U.send}</button></div>
        <p class="form-msg" id="cmsg" role="status"></p></form>`
      : `<div class="card"><h2>${U.writeUs}</h2><p class="muted">${U.emailText}</p>
        <p><a class="btn btn-primary" href="mailto:${esc(s.email)}">${U.emailUs} →</a></p></div>`;
    return pageHead(p, true) + `<section class="section"><div class="wrap split contact">
      <div class="card details"><dl>
        ${row(U.person, esc(tr(s, 'contact_person')) + (alt(s, 'contact_person') ? `<br><span class="muted">${esc(alt(s, 'contact_person'))}</span>` : ''))}
        ${row(U.address, s.address ? `${esc(tr(s, 'address'))}<br><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}" target="_blank" rel="noopener">${U.directions} →</a>` : '')}
        ${row(U.email, s.email ? `<a href="mailto:${esc(s.email)}">${esc(s.email)}</a>` : '')}
        ${row(U.phone, s.phone ? `<a href="tel:${esc(tel(s.phone))}">${esc(s.phone)}</a>` : '')}
        ${row(U.wechat, esc(s.wechat))}
      </dl></div>
      <div>${right}</div>
    </div></section>`;
  },

  churches(p) {
    const U = u();
    return pageHead(p, true) + `<section class="section tight"><div class="wrap">
      <div class="stats" id="stats" aria-live="polite">${statsHTML(null)}</div>
      <div id="map" class="map" role="region" aria-label="Map"></div>
      <div class="legend" id="legend">${CATS.map(k => `<button type="button" class="key" data-k="${k}"
        aria-pressed="${S.cf.cat === k}" style="--kc:var(--${k === 'congregation' ? 'cong' : k === 'translation' ? 'trans' : k === 'groups' ? 'group' : 'unk'})"
        title="${esc(U.catLong[k])}">${crossSVG(`var(--${k === 'congregation' ? 'cong' : k === 'translation' ? 'trans' : k === 'groups' ? 'group' : 'unk'})`)}
        ${U.cat[k]} <span class="n"></span></button>`).join('')}</div>
      <p class="legend-hint">${U.legendHint}</p>
      <div class="controls">
        <input id="q" type="search" placeholder="${U.search}" value="${esc(S.cf.q)}" autocomplete="off" aria-label="${U.search}">
        <select id="f-region" aria-label="${U.anyRegion}"><option value="">${U.anyRegion}</option></select>
        <select id="f-lang" aria-label="${U.anyLang}"><option value="">${U.anyLang}</option>
          ${LANGS.map(l => `<option value="${l}"${S.cf.lang === l ? ' selected' : ''}>${U.lang[l]}</option>`).join('')}</select>
        <span class="count" id="count"></span>
      </div>
      <div id="rows"><p class="muted" style="padding:24px 0">…</p></div>
      <div class="data-note"><p>${U.dataNote1}</p><p>${U.dataNote2}</p>
        ${S.c.site.churches_site ? `<p><a href="${esc(S.c.site.churches_site)}" target="_blank" rel="noopener">${U.fullData} →</a></p>` : ''}</div>
    </div></section>`;
  }
};

/* ── behaviour that runs after a page is drawn ─────────── */
const AFTER = {
  home() {
    if (!$('#stats')) return;
    loadChurches().then(F => {
      const st = churchStats(F); const el = $('#stats'); if (el) el.innerHTML = statsHTML(st);
      const ct = $('#cta-text'); if (ct) ct.textContent = u().ctaText(st.churches);
    }).catch(() => { const el = $('#stats'); if (el) el.hidden = true; });
  },

  resources() {
    const apply = () => {
      $$('.doc').forEach(a => { a.hidden = !!S.script && a.dataset.script !== S.script; });
      $$('.doc-cat').forEach(c => { c.hidden = !$$('.doc', c).some(a => !a.hidden); });
      $$('.chip[data-script]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.script === S.script)));
    };
    $$('.chip[data-script]').forEach(b => b.addEventListener('click', () => { S.script = b.dataset.script; apply(); }));
    apply();
  },

  contact() {
    const f = $('#cform'); if (!f) return;
    f.addEventListener('submit', ev => {
      ev.preventDefault();
      const msg = $('#cmsg'), btn = f.querySelector('button[type=submit]');
      msg.className = 'form-msg'; msg.textContent = u().sending; btn.disabled = true;
      fetch(f.action, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
        .then(r => { if (!r.ok) throw new Error(r.status); f.reset(); msg.className = 'form-msg ok'; msg.textContent = u().sent; })
        .catch(() => { msg.className = 'form-msg err'; msg.innerHTML = esc(u().sendFail) + `<a href="mailto:${esc(S.c.site.email)}">${esc(S.c.site.email)}</a>`; })
        .finally(() => { btn.disabled = false; });
    });
  },

  churches() {
    const U = u(), rowsEl = $('#rows');
    loadChurches().then(F => {
      if (!rowsEl.isConnected) return;
      const G = groupChurches(F);
      $('#stats').innerHTML = statsHTML(churchStats(F));

      // legend counts
      $$('#legend .key').forEach(b => {
        const n = G.filter(g => g.p.category === b.dataset.k).length;
        b.querySelector('.n').textContent = n; if (!n) b.hidden = true;
      });
      // region options
      const regions = Array.from(new Set(F.map(f => f.properties.region).filter(Boolean))).sort();
      $('#f-region').insertAdjacentHTML('beforeend', regions.map(r =>
        `<option value="${esc(r)}"${S.cf.region === r ? ' selected' : ''}>${esc(U.region[r] || r)}</option>`).join(''));

      // list — Chinese name first on the Chinese site
      const catVar = k => `var(--${k === 'congregation' ? 'cong' : k === 'translation' ? 'trans' : k === 'groups' ? 'group' : 'unk'})`;
      const upd = S.c.site.churches_update_form;
      rowsEl.innerHTML = G.map(g => {
        const p = g.p, first = isZh() && p.name_zh ? p.name_zh : p.name, second = isZh() && p.name_zh ? p.name : p.name_zh;
        const svc = String(p.services || '').split(';').map(x => x.trim()).filter(Boolean);
        const phones = String(p.phone || '').split(';').map(x => x.trim()).filter(Boolean);
        const emails = String(p.email || '').split(';').map(x => x.trim()).filter(Boolean);
        return `<article class="entry" id="c-${g.i}" data-i="${g.i}">
          <div>
            <h3 class="nm">${esc(first)}</h3>${second ? `<p class="nm2">${esc(second)}</p>` : ''}
            ${g.sites.map(s => `<p class="ad">${s.site ? `<b>${esc(s.site)}</b> — ` : ''}${esc(s.address)}</p>`).join('')}
            <p class="tags"><span class="tag" style="--kc:${catVar(p.category)}" title="${esc(U.catLong[p.category] || '')}">${esc(U.cat[p.category] || p.category)}</span>
              ${(p.languages || []).map(l => `<span class="tag lang">${esc(U.lang[l] || l)}</span>`).join('')}
              ${p.sunflower ? '<span class="tag lang">Sunflower AI</span>' : ''}</p>
          </div>
          <div>
            <ul class="sv">${svc.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
            <p class="ct">${phones.map(x => `<a href="tel:${esc(tel(x))}">${esc(x)}</a>`).join('')}
              ${emails.map(x => `<a href="mailto:${esc(x)}">${esc(x)}</a>`).join('')}
              ${p.website ? `<a href="${esc(web(p.website))}" target="_blank" rel="noopener">${esc(webLabel(p.website))}</a>` : ''}</p>
            <p class="acts"><button type="button" class="linkbtn" data-show="${g.i}">${U.showOnMap}</button>
              <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(g.sites[0].address)}" target="_blank" rel="noopener">${U.directions}</a>
              ${upd ? `<a href="${esc(upd + (upd.includes('?') ? '&' : '?') + 'church=' + encodeURIComponent(p.name))}" target="_blank" rel="noopener">${U.update}</a>` : ''}</p>
          </div></article>`;
      }).join('');
      G.forEach(g => { g.el = $('#c-' + g.i); g.hay = [g.p.name, g.p.name_zh, g.p.services, ...g.sites.map(s => s.address + ' ' + s.suburb + ' ' + s.site)].join(' ').toLowerCase(); });

      // filtering
      let markers = [], layer = null;
      const visible = g => (!S.cf.cat || g.p.category === S.cf.cat)
        && (!S.cf.region || g.sites.some(s => s.region === S.cf.region))
        && (!S.cf.lang || (g.p.languages || []).includes(S.cf.lang))
        && (!S.cf.q || S.cf.q.split(/\s+/).every(w => g.hay.includes(w)));
      const fit = debounce(() => {
        if (!S.map || !layer) return;
        const pts = markers.filter(m => layer.hasLayer(m)).map(m => m.getLatLng());
        if (pts.length) S.map.flyToBounds(window.L.latLngBounds(pts).pad(0.2), { maxZoom: 13, duration: 0.5 });
      }, 300);
      function apply() {
        let n = 0;
        G.forEach(g => { const ok = visible(g); g.el.hidden = !ok; g.on = ok; if (ok) n++; });
        $('#count').textContent = U.shown(n);
        $$('#legend .key').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.k === S.cf.cat)));
        if (layer) { markers.forEach(m => { const on = G[m._g].on; if (on && !layer.hasLayer(m)) layer.addLayer(m); if (!on && layer.hasLayer(m)) layer.removeLayer(m); }); fit(); }
      }
      $$('#legend .key').forEach(b => b.addEventListener('click', () => { S.cf.cat = S.cf.cat === b.dataset.k ? null : b.dataset.k; apply(); }));
      $('#f-region').addEventListener('change', e => { S.cf.region = e.target.value; apply(); });
      $('#f-lang').addEventListener('change', e => { S.cf.lang = e.target.value; apply(); });
      $('#q').addEventListener('input', debounce(e => { S.cf.q = e.target.value.trim().toLowerCase(); apply(); }, 150));
      apply();

      // map
      const mapEl = $('#map');
      loadLeaflet().then(L => {
        if (!mapEl.isConnected) return;
        const m = L.map(mapEl, { scrollWheelZoom: false }).setView([-33.86, 151.05], 10);
        S.map = m;
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(m);
        layer = L.layerGroup().addTo(m);
        const colour = k => cssVar('--' + (k === 'congregation' ? 'cong' : k === 'translation' ? 'trans' : k === 'groups' ? 'group' : 'unk'));
        const icon = (c, w = 24) => { const h = Math.round(w * 1.25); return L.divIcon({ className: 'cross-marker',
          html: `<svg width="${w}" height="${h}" viewBox="0 0 16 20"><path d="${CROSS}" fill="${c}" stroke="#fff" stroke-width="1.8" stroke-linejoin="round" paint-order="stroke"/></svg>`,
          iconSize: [w, h], iconAnchor: [w / 2, h / 2], popupAnchor: [0, -h / 2 + 2] }); };
        G.forEach(g => g.feats.forEach(k => {
          const f = F[k], p = f.properties, [lng, lat] = f.geometry.coordinates;
          const first = isZh() && p.name_zh ? p.name_zh : p.name, second = isZh() && p.name_zh ? p.name : p.name_zh;
          const mk = L.marker([lat, lng], { icon: icon(colour(p.category)), title: p.name, keyboard: true })
            .bindPopup(`<b>${esc(first)}</b>${p.site ? ' — ' + esc(p.site) : ''}${second ? `<div class="zh">${esc(second)}</div>` : ''}
              <div class="t">${esc(p.address)}</div>
              <div class="t">${String(p.services || '').split(';').slice(0, 3).map(esc).join('<br>')}</div>
              <button type="button" class="linkbtn" data-goto="${g.i}">${U.details} ↓</button>`);
          mk._g = g.i; markers.push(mk);
        }));
        apply();
      }).catch(() => { mapEl.classList.add('map-fail'); mapEl.textContent = U.mapFail; });

      // "show on map" and popup "see details"
      rowsEl.addEventListener('click', e => {
        const b = e.target.closest('[data-show]'); if (!b || !S.map) return;
        const mk = markers.find(m => m._g === +b.dataset.show); if (!mk) return;
        mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        S.map.flyTo(mk.getLatLng(), 14, { duration: 0.6 }); setTimeout(() => mk.openPopup(), 650);
      });
      mapEl.addEventListener('click', e => {
        const b = e.target.closest('[data-goto]'); if (!b) return;
        const el = $('#c-' + b.dataset.goto); if (!el) return;
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
      });
    }).catch(() => {
      if (rowsEl.isConnected) { rowsEl.innerHTML = `<p class="empty">${u().dataFail}</p>`; $('#map').hidden = true; $('#stats').hidden = true; }
    });
  }
};

/* ── chrome: header menu, language button, footer ──────── */
function chrome() {
  const c = S.c, s = c.site, U = u();
  document.documentElement.lang = isZh() ? 'zh-Hans' : 'en';
  $('#brand-name').textContent = tr(s, 'name');
  $('#brand-alt').textContent = alt(s, 'name');
  $('#menu').innerHTML = c.menu.map(k => `<li><a href="#/${k === 'home' ? '' : k}" data-slug="${k}">${esc(tr(c.pages[k], 'title'))}</a></li>`).join('');
  const lb = $('#lang'); lb.textContent = U.langBtn; lb.setAttribute('aria-label', U.langLabel); lb.lang = isZh() ? 'en' : 'zh-Hans';
  const social = [['facebook', 'Facebook'], ['youtube', 'YouTube']].filter(([k]) => s[k])
    .map(([k, l]) => `<li><a href="${esc(web(s[k]))}" target="_blank" rel="noopener">${l}</a></li>`).join('');
  $('#foot').innerHTML = `<div class="wrap foot-grid">
      <div><p class="foot-name">${esc(tr(s, 'name'))}</p><p class="foot-alt">${esc(alt(s, 'name'))}</p><p class="foot-tag">${esc(tr(s, 'tagline'))}</p></div>
      <div><p class="foot-h">${U.contact}</p>
        <p>${esc(tr(s, 'contact_person'))}</p>${s.address ? `<p>${esc(tr(s, 'address'))}</p>` : ''}
        ${s.email ? `<p><a href="mailto:${esc(s.email)}">${esc(s.email)}</a></p>` : ''}
        ${s.phone ? `<p><a href="tel:${esc(tel(s.phone))}">${esc(s.phone)}</a></p>` : ''}
        ${s.wechat ? `<p>${U.wechat}: ${esc(s.wechat)}</p>` : ''}</div>
      <div><p class="foot-h">${U.links}</p><ul>
        ${c.menu.filter(k => k !== 'home').map(k => `<li><a href="#/${k}">${esc(tr(c.pages[k], 'title'))}</a></li>`).join('')}
        ${s.churches_site ? `<li><a href="${esc(s.churches_site)}" target="_blank" rel="noopener">${U.dataSite}</a></li>` : ''}
        ${social}</ul></div>
    </div>
    <div class="wrap foot-base"><span>© ${new Date().getFullYear()} ${esc(s.short_name || tr(s, 'name'))}</span>
      <span>${U.updated} ${esc(c.built)}</span>
      ${s.repo ? `<a class="sp" href="https://github.com/${esc(s.repo)}" target="_blank" rel="noopener">${U.admin}</a>` : ''}</div>`;
  fitMenu();
}
/* Fold the menu behind ☰ when the labels don't fit on one line (English labels are longer) */
function fitMenu() {
  const top = $('.top'), bar = $('.bar'), menu = $('#menu');
  top.classList.remove('collapsed');
  const need = $('.brand > span').scrollWidth + 50 + menu.scrollWidth + $('#lang').offsetWidth + 40;
  top.classList.toggle('collapsed', need > bar.clientWidth - parseFloat(getComputedStyle(bar).paddingLeft) * 2 || window.innerWidth < 720);
  if (!top.classList.contains('collapsed')) $('#nav').classList.remove('open');
}
window.addEventListener('resize', debounce(() => S.c && fitMenu(), 120));
if (document.fonts) document.fonts.ready.then(() => S.c && fitMenu());

/* ── router: #/about, #/churches … ─────────────────────── */
function currentSlug() {
  const h = location.hash;
  if (!h || h === '#' || h === '#/') return 'home';
  if (!h.startsWith('#/')) return null;               // an ordinary in-page link
  return decodeURIComponent(h.slice(2).split(/[?#]/)[0]).replace(/\/+$/, '').toLowerCase() || 'home';
}
function render(scrollTop) {
  const slug = currentSlug(); if (slug === null) return;
  if (S.map) { S.map.remove(); S.map = null; }
  const c = S.c, p = c.pages[slug], main = $('#main');
  main.innerHTML = p ? (VIEW[p.type] || VIEW.page)(p) :
    `<section class="page-head"><div class="wrap"><h1>${u().notFound}</h1><p class="lede">${u().notFoundText}</p>
     <p><a class="btn btn-primary" href="#/">${u().backHome}</a></p></div></section>`;
  document.title = p && slug !== 'home' ? `${tr(p, 'title')} · ${tr(c.site, 'name')}` : `${tr(c.site, 'name')} · ${alt(c.site, 'name')}`;
  $$('#menu a').forEach(a => a.dataset.slug === slug ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
  $('#nav').classList.remove('open'); $('#menu-btn').setAttribute('aria-expanded', 'false');
  if (p && AFTER[p.type]) AFTER[p.type](p);
  if (scrollTop) { window.scrollTo(0, 0); main.focus({ preventScroll: true }); }
}

function setLang(l) {
  S.lang = l;
  try { localStorage.setItem('sydacm-lang', l); } catch (e) {}
  chrome(); render(false);
}

/* ── start ─────────────────────────────────────────────── */
fetch('content.json', { cache: 'no-cache' }).then(r => r.json()).then(c => {
  S.c = c;
  let saved = null; try { saved = localStorage.getItem('sydacm-lang'); } catch (e) {}
  S.lang = saved === 'en' || saved === 'zh' ? saved : (c.site.default_language === 'en' ? 'en' : 'zh');
  chrome(); render(false);
  window.addEventListener('hashchange', () => render(true));
  $('#lang').addEventListener('click', () => setLang(isZh() ? 'en' : 'zh'));
  $('#menu-btn').addEventListener('click', () => {
    const open = $('#nav').classList.toggle('open'); $('#menu-btn').setAttribute('aria-expanded', String(open));
  });
}).catch(() => {
  $('#main').innerHTML = '<div class="wrap loading">网站暂时无法载入 · The site could not load. Email <a href="mailto:sydacm@gmail.com">sydacm@gmail.com</a></div>';
});
})();
