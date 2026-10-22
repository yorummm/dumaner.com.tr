// Builds dumaner.com.tr into the repository root (GitHub Pages serves it as is).
//
//   node src/build.mjs
//
// Pages: / (Turkish), /en/ (English), and Ünsiyet's privacy, support and data deletion pages
// under /unsiyet/, each of those in all seven app languages.

import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const src = dirname(fileURLToPath(import.meta.url));
const root = join(src, '..');
const EMAIL = 'dumanerahmet@gmail.com';
const SITE = 'https://dumaner.com.tr';
const FONTS =
  'https://fonts.googleapis.com/css2?family=Amiri&family=Inter:wght@400;500;600&family=Playfair+Display:wght@500;600&display=swap';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const write = (path, html) => {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), html);
};

const APPLE = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9s-2-.9-3.3-.9C6.1 7 4.5 8 3.6 9.6c-1.9 3.2-.5 8 1.3 10.6.9 1.3 2 2.7 3.3 2.7 1.3-.1 1.8-.9 3.4-.9s2 .9 3.4.8c1.4 0 2.3-1.3 3.2-2.6 1-1.5 1.4-2.9 1.4-3-.1 0-2.7-1-2.7-4.6zM13.9 5.2c.7-.9 1.2-2 1.1-3.2-1 0-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.1 1.1.1 2.3-.6 3-1.5z"/></svg>`;
const PLAY = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.6 2.3c-.3.3-.4.7-.4 1.2v17c0 .5.1.9.4 1.2l9.6-9.7-9.6-9.7zm10.6 10.7 2.9 2.9-11 6.3 8.1-9.2zm0-2L6.1 1.8l11 6.3-2.9 2.9zm6.5-.4c.7.4.7 1.4 0 1.8l-2.5 1.4-3.2-3.2 3.2-3.2 2.5 1.2z"/></svg>`;

const T = {
  tr: {
    htmlLang: 'tr',
    title: 'Ünsiyet — Kur’an, namaz vakitleri, dua ve zikir',
    description:
      'Ünsiyet; namaz vakitleri, kıble, Kur’an-ı Kerim, hadis, dua ve zikri bir araya getiren, ruh hâline göre öneriler sunan İslami yaşam uygulaması.',
    nav: { how: 'Nasıl çalışır', features: 'Özellikler', sources: 'Kaynaklar', apps: 'Uygulamalar', about: 'Hakkımda' },
    other: { label: 'EN', href: '/en/' },
    verse: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    headline: 'Daima daha yakın.',
    lead:
      'Namaz vakitleri, Kur’an-ı Kerim, hadis ve dualar tek bir sakin uygulamada. <strong>Ünsiyet sohbeti</strong> ruh hâlini dinler ve doğrulanmış kaynaklardan sana uygun ayet, hadis ve dua önerir.',
    soon: 'Yakında',
    appStore: 'App Store’da',
    googlePlay: 'Google Play’de',
    seeHow: 'Nasıl çalıştığını gör',
    facts: ['Reklam yok', 'Üyelik gerekmez', 'Yedi dil'],
    chips: [
      ['☾', 'Yatsıya 1 sa 12 dk', 'Bulunduğun yere göre'],
      ['✦', '4 öneri bulundu', 'Ayet, hadis ve dua'],
      ['۞', 'Günün ayeti', 'Her sabah bildirim'],
    ],
    howTitle: 'İçinden geçeni anlat, Ünsiyet dinlesin.',
    howIntro:
      'Sohbette yapay zekâ ayet ya da hadis metni yazmaz. Sadece uygulamadaki doğrulanmış meal, hadis ve dua derlemelerinde arar ve hangisinin neden sana uygun olduğunu söyler.',
    steps: [
      ['Nasıl hissettiğini seç', 'Huzurlu, kaygılı, üzgün, yorgun… Birine dokun ya da kendi cümlelerinle yaz.'],
      ['Derdini anlat', 'Ünsiyet seni dinler. Yazmak istemezsen mikrofona dokunup sesle anlatabilirsin.'],
      ['Doğrulanmış kaynaklarda arar', 'Kur’an meali, hadis ve dua derlemeleri taranır. Uydurma kaynak gösterilmez.'],
      ['Sana uygun öneriler', 'Ayet, hadis, dua ve zikir; her birinin yanında neden önerildiği yazar. Dokununca tamamı açılır.'],
    ],
    mock: {
      online: 'Çevrimiçi',
      moods: ['Huzurlu', 'Şükür dolu', 'Üzgün', 'Kaygılı', 'Yorgun'],
      greeting: 'Selâmün aleyküm! Bugün kendini nasıl hissediyorsun?',
      message: 'Son zamanlarda geleceğimle ilgili çok kaygılıyım, içim daralıyor.',
      typing: 'Ünsiyet yazıyor…',
      searching: [
        ['Kur’an meali', 'kaygı, huzur'],
        ['Hadisler', 'sıkıntı, tasa'],
        ['Dualar', 'darlık anı'],
      ],
    },
    featuresTitle: 'Günün her vaktinde yanında.',
    featuresIntro: 'Uygulamanın gerçek ekranları. Hepsi ücretsiz; sohbet sınırsız olsun istersen Premium var.',
    tiles: [
      ['3-prayer', 'Namaz vakitleri ve kıble', 'Bulunduğun yerde kullanılan yöntemle cihazında hesaplanır; Türkiye’de Diyanet yöntemiyle. Vakit hatırlatmaları ve kıble pusulası.'],
      ['4-quran', 'Kur’an-ı Kerim', '114 surenin Arapça metni, meali ve tefsiri. 12 kâriden ayet ayet ya da sure boyunca dinleme.'],
      ['5-guide', 'Namaz Rehberi', 'Abdest ve namaz adım adım, resimli. Dört mezhebe göre, kadın ve erkek için ayrı ayrı.'],
      ['6-dhikr', 'Zikirmatik', 'Tesbih sayacı; hedef, günlük hedef ve titreşimle.'],
    ],
    more: [
      ['Hadis ve dua', 'Konularına göre hadisler, rivayet ve sıhhat bilgisiyle; günlük dualar.'],
      ['Mesnevi', 'Mevlânâ’nın Mesnevî’si, altı defterin tamamı.'],
      ['Günün ayeti ve hadisi', 'Her gün yenisi; istersen sabah ve akşam bildirim olarak.'],
      ['Notlar ve favoriler', 'Ayetlere, hadislere ve dualara kendi notunu ekle.'],
      ['Uygulama kilidi', 'Face ID ya da parmak iziyle aç; açık ve koyu tema.'],
      ['Yedi dil', 'Türkçe, İngilizce, Arapça, Endonezce, Urduca, Malayca ve Bengalce.'],
    ],
    sourcesTitle: 'Metinler nereden geliyor?',
    sourcesIntro: 'Dini metinler yalnızca güvenilir yayınlardan alınır ve değiştirilmeden gösterilir.',
    sources: [
      ['Kur’an-ı Kerim, Arapça metin', 'Tanzil Project, Osmanî hat, sürüm 1.1'],
      ['Mealler ve tefsir', 'QuranEnc.com; Türkçe meal: Dr. Ali Özek ve diğerleri; Muhtasar Tefsir'],
      ['Hadisler', 'HadeethEnc.com; metin, açıklama ve sıhhat derecesiyle'],
      ['Tilavet', 'Quran.Foundation; 12 kâri, internetten dinlenir'],
      ['Mesnevi', 'Türkiye Yazma Eserler Kurumu çevirisi, izinle'],
      ['Namaz vakitleri', 'Cihazda hesaplanır; Türkiye’de Diyanet yöntemi'],
    ],
    appsTitle: 'Uygulamalar',
    appsIntro: 'Biri yolda, yenileri arkasından gelecek.',
    appDesc:
      'Namaz vakitleri, Kur’an, hadis, dua, Namaz Rehberi, Zikirmatik ve Mesnevi; ruh hâline göre öneriler sunan sohbetle birlikte.',
    appStatus: 'App Store ve Google Play’de yakında',
    links: { support: 'Destek', privacy: 'Gizlilik', deleteData: 'Veri silme' },
    nextTitle: 'Sıradaki uygulama',
    nextText: 'Üzerinde çalışıyorum. Hazır olduğunda ilk burada duyacaksın.',
    aboutTitle: 'Hakkımda',
    aboutQuote: 'Uygulamalarımda reklam yok, üyelik yok; yalnızca işini gören, insanı yoran değil dinlendiren araçlar var.',
    aboutBy: 'Ahmet Dumaner',
    values: [
      ['Reklam yok', 'Ekran sana ait; araya kimse girmez.'],
      ['Verilerin sende', 'Favorilerin, notların ve sohbet geçmişin yalnızca telefonunda saklanır.'],
      ['Kaynağı belli metinler', 'Yapay zekâ metin uydurmaz; gösterilen her ayet ve hadisin kaynağı bellidir.'],
    ],
    closing: 'Gününe biraz huzur kat.',
    contactQ: 'Bir fikrin ya da sorun mu var?',
    rights: '© 2026 Ahmet Dumaner',
  },
  en: {
    htmlLang: 'en',
    title: 'Ünsiyet — Quran, prayer times, dua and dhikr',
    description:
      'Ünsiyet is an Islamic lifestyle app with prayer times, qibla, the Holy Quran, hadiths, duas and dhikr, and a chat that suggests verses for how you feel.',
    nav: { how: 'How it works', features: 'Features', sources: 'Sources', apps: 'Apps', about: 'About' },
    other: { label: 'TR', href: '/' },
    verse: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    headline: 'Always closer.',
    lead:
      'Prayer times, the Holy Quran, hadiths and duas in one calm app. <strong>The Ünsiyet chat</strong> listens to how you feel and suggests verses, hadiths and duas from verified sources.',
    soon: 'Coming soon',
    appStore: 'on the App Store',
    googlePlay: 'on Google Play',
    seeHow: 'See how it works',
    facts: ['No ads', 'No account needed', 'Seven languages'],
    chips: [
      ['☾', 'Isha in 1 h 12 min', 'For where you are'],
      ['✦', '4 suggestions found', 'Verses, hadiths and duas'],
      ['۞', 'Verse of the day', 'A notification every morning'],
    ],
    howTitle: 'Say what is on your heart. Ünsiyet listens.',
    howIntro:
      'The AI in the chat never writes verses or hadiths itself. It searches the app’s verified translations, hadith and dua collections and tells you why each one fits.',
    steps: [
      ['Pick how you feel', 'Peaceful, anxious, sad, tired… Tap one or write in your own words.'],
      ['Share what is on your mind', 'Ünsiyet listens. If you would rather not type, tap the microphone and speak.'],
      ['It searches verified sources', 'Quran translations, hadith and dua collections are searched. No made-up references.'],
      ['Suggestions that fit you', 'Verses, hadiths, duas and dhikr, each with the reason it was chosen. Tap one to read it in full.'],
    ],
    mock: {
      online: 'Online',
      moods: ['Peaceful', 'Grateful', 'Sad', 'Anxious', 'Tired'],
      greeting: 'Assalamu alaikum! How are you feeling today?',
      message: 'Lately I feel very anxious about my future and my heart feels tight.',
      typing: 'Ünsiyet is typing…',
      searching: [
        ['Quran translation', 'anxiety, peace'],
        ['Hadiths', 'distress, sorrow'],
        ['Duas', 'times of hardship'],
      ],
    },
    featuresTitle: 'With you at every prayer time.',
    featuresIntro: 'Real screens from the app. Everything is free; Premium makes the chat unlimited.',
    tiles: [
      ['3-prayer', 'Prayer times and qibla', 'Calculated on your device with the method used where you are. Prayer reminders and a qibla compass.'],
      ['4-quran', 'The Holy Quran', 'All 114 surahs with Arabic text, translation and tafsir. Listen verse by verse from 12 reciters.'],
      ['5-guide', 'Prayer Guide', 'Illustrated wudu and prayer, step by step. For the four schools, for men and women.'],
      ['6-dhikr', 'Dhikr Counter', 'A tasbih counter with targets, a daily goal and vibration.'],
    ],
    more: [
      ['Hadith and dua', 'Hadiths by topic with narrator and grading; duas for daily life.'],
      ['Verse and hadith of the day', 'A new one every day, as a morning and evening notification if you like.'],
      ['Notes and favorites', 'Add your own notes to verses, hadiths and duas.'],
      ['App lock', 'Open with Face ID or fingerprint; light and dark theme.'],
      ['Private by design', 'No account. Your data stays on your phone.'],
      ['Seven languages', 'English, Arabic, Indonesian, Urdu, Malay, Bengali and Turkish.'],
    ],
    sourcesTitle: 'Where do the texts come from?',
    sourcesIntro: 'Religious texts come only from trusted publications and are shown unchanged.',
    sources: [
      ['The Holy Quran, Arabic text', 'Tanzil Project, Uthmani script, version 1.1'],
      ['Translations and tafsir', 'QuranEnc.com; English: Saheeh International; Al-Mukhtasar tafsir'],
      ['Hadiths', 'HadeethEnc.com; with explanation and grading'],
      ['Recitation', 'Quran.Foundation; 12 reciters, streamed'],
      ['Masnavi (Turkish)', 'Türkiye Manuscripts Institution translation, with permission'],
      ['Prayer times', 'Calculated on the device with your region’s method'],
    ],
    appsTitle: 'Apps',
    appsIntro: 'One is on its way, more will follow.',
    appDesc: 'Prayer times, Quran, hadith, dua, a Prayer Guide and a Dhikr Counter, with a chat that suggests verses for how you feel.',
    appStatus: 'Coming soon to the App Store and Google Play',
    links: { support: 'Support', privacy: 'Privacy', deleteData: 'Data deletion' },
    nextTitle: 'The next app',
    nextText: 'I am working on it. You will hear about it here first.',
    aboutTitle: 'About',
    aboutQuote: 'My apps have no ads and no accounts: just tools that do their job and leave you calmer, not more tired.',
    aboutBy: 'Ahmet Dumaner',
    values: [
      ['No ads', 'The screen is yours; nothing gets in between.'],
      ['Your data stays with you', 'Favorites, notes and chat history are kept only on your phone.'],
      ['Texts with known sources', 'The AI never invents texts; every verse and hadith shown has a known source.'],
    ],
    closing: 'Bring a little calm to your day.',
    contactQ: 'An idea or a problem?',
    rights: '© 2026 Ahmet Dumaner',
  },
};

function head(t, path, extra = '') {
  return `<!doctype html>
<html lang="${t.htmlLang}" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title>
<meta name="description" content="${esc(t.description)}">
<meta name="theme-color" content="#071a15">
<link rel="canonical" href="${SITE}${path}">
<link rel="alternate" hreflang="tr" href="${SITE}/">
<link rel="alternate" hreflang="en" href="${SITE}/en/">
<meta property="og:title" content="${esc(t.title)}">
<meta property="og:description" content="${esc(t.description)}">
<meta property="og:image" content="${SITE}/assets/og.png">
<meta property="og:url" content="${SITE}${path}">
<link rel="icon" href="/assets/icon-192.png">
<link rel="apple-touch-icon" href="/assets/icon-192.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="/assets/styles.css">
${extra}</head>`;
}

function topBar(t, home) {
  const nav = home
    ? `<nav aria-label="Sayfa">${Object.entries(t.nav)
        .map(([id, label]) => `<a href="#${id}">${esc(label)}</a>`)
        .join('')}</nav>`
    : '';
  return `<header class="top"><div class="wrap">
<a class="brand" href="${t.htmlLang === 'en' ? '/en/' : '/'}"><img src="/assets/icon-192.png" alt=""><span>Ünsiyet</span></a>
${nav}<a class="lang" href="${t.other.href}" hreflang="${t.other.label.toLowerCase()}">${t.other.label}</a>
</div></header>`;
}

const stores = (t) => `<div class="actions">
<a class="store" aria-disabled="true">${APPLE}<span><small>${esc(t.soon)}</small><b>${esc(t.appStore)}</b></span></a>
<a class="store ghost" aria-disabled="true">${PLAY}<span><small>${esc(t.soon)}</small><b>${esc(t.googlePlay)}</b></span></a>
</div>`;

const shot = (lang, name, alt) => `<img src="/assets/shots/${lang}/${name}.webp" alt="${esc(alt)}" loading="lazy" width="430" height="932">`;

function home(lang) {
  const t = T[lang];
  const base = lang === 'en' ? '/en/' : '/';
  const links = (prefix = '/unsiyet') =>
    `<a href="${prefix}/support.html#${lang}">${esc(t.links.support)}</a><a href="${prefix}/privacy.html#${lang}">${esc(t.links.privacy)}</a><a href="${prefix}/delete-data.html#${lang}">${esc(t.links.deleteData)}</a>`;
  const m = t.mock;
  const bar = `<div class="bar"><img src="/assets/icon-192.png" alt=""><div><b>Ünsiyet</b><span>● ${esc(m.online)}</span></div></div>`;
  return `${head(t, base)}
<body>
${topBar(t, true)}
<main>
<section class="hero" id="top"><div class="wrap">
<div>
<h1><span class="arabic" lang="ar" dir="rtl">${t.verse}</span>${esc(t.headline)}</h1>
<p class="lead">${t.lead}</p>
${stores(t)}
<ul class="facts">${t.facts.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
</div>
<div class="stage">
<div class="halo"></div>
<div class="phone"><div class="screen">${shot(lang, '1-home', t.headline).replace(' loading="lazy"', ' fetchpriority="high"')}</div></div>
${t.chips.map(([icon, title, sub], i) => `<div class="chip c${i + 1}" aria-hidden="true"><i>${icon}</i><div><b>${esc(title)}</b><span>${esc(sub)}</span></div></div>`).join('\n')}
</div>
</div></section>

<section class="block" id="how"><div class="wrap">
<h2>${esc(t.howTitle)}</h2>
<p class="intro">${esc(t.howIntro)}</p>
<div class="how">
<ol class="steps">${t.steps.map(([h, p]) => `<li><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join('')}</ol>
<div class="sticky" aria-hidden="true"><div class="phone"><div class="screen">
<div class="mock">${bar}<div class="moods">${m.moods.map((x, i) => `<span${i === 3 ? ' class="sel"' : ''}>${esc(x)}</span>`).join('')}</div><div class="bubble">${esc(m.greeting)}</div></div>
<div class="mock">${bar}<div class="bubble">${esc(m.greeting)}</div><div class="bubble me">${esc(m.message)}</div><div class="typing">${esc(m.typing)}</div></div>
<div class="mock">${bar}<div class="bubble me">${esc(m.message)}</div><div class="sources">${m.searching.map(([a, b]) => `<div><span>${esc(a)}</span><em>${esc(b)}</em></div>`).join('')}</div><div class="typing">${esc(m.typing)}</div></div>
${shot(lang, '2-chat', t.steps[3][0])}
</div></div></div>
</div>
</div></section>

<section class="block" id="features"><div class="wrap">
<h2>${esc(t.featuresTitle)}</h2>
<p class="intro">${esc(t.featuresIntro)}</p>
<div class="tiles">${t.tiles
    .map(([name, h, p]) => `<article class="tile"><div><h3>${esc(h)}</h3><p>${esc(p)}</p></div><div class="shot">${shot(lang, name, h)}</div></article>`)
    .join('')}</div>
<ul class="more">${t.more.map(([b, s]) => `<li><b>${esc(b)}</b><span>${esc(s)}</span></li>`).join('')}</ul>
</div></section>

<section class="block" id="sources"><div class="wrap">
<h2>${esc(t.sourcesTitle)}</h2>
<p class="intro intro-last">${esc(t.sourcesIntro)}</p>
</div></section>

<section class="block" id="apps"><div class="wrap">
<h2>${esc(t.appsTitle)}</h2>
<p class="intro">${esc(t.appsIntro)}</p>
<div class="apps">
<article class="app-card"><header><img src="/assets/icon-192.png" alt=""><div><h3>Ünsiyet</h3><span class="status">${esc(t.appStatus)}</span></div></header>
<p>${esc(t.appDesc)}</p>${stores(t)}<div class="links">${links()}</div></article>
<article class="app-card next"><h3>${esc(t.nextTitle)}</h3><p>${esc(t.nextText)}</p></article>
</div>
</div></section>

<section class="block" id="about"><div class="wrap about">
<div><h2>${esc(t.aboutTitle)}</h2><blockquote><p>${esc(t.aboutQuote)}</p><footer>${esc(t.aboutBy)}</footer></blockquote></div>
<ul class="values">${t.values.map(([b, s]) => `<li><b>${esc(b)}</b><span>${esc(s)}</span></li>`).join('')}</ul>
</div></section>

<section class="closing" id="contact"><div class="wrap">
<h2>${esc(t.closing)}</h2>
${stores(t)}
<p>${esc(t.contactQ)} <a href="mailto:${EMAIL}">${EMAIL}</a></p>
</div></section>
</main>
<footer class="site"><div class="wrap"><span>${esc(t.rights)}</span><nav>${links()}<a href="mailto:${EMAIL}">${EMAIL}</a></nav></div></footer>
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

/* ---- Ünsiyet document pages, in all seven app languages ---- */

const LANGS = [
  ['tr', 'Türkçe', false],
  ['en', 'English', false],
  ['ar', 'العربية', true],
  ['id', 'Bahasa Indonesia', false],
  ['ur', 'اردو', true],
  ['ms', 'Bahasa Melayu', false],
  ['bn', 'বাংলা', false],
];
const DATA = Object.fromEntries(LANGS.map(([l]) => [l, JSON.parse(readFileSync(join(src, 'content', `site-${l}.json`), 'utf8'))]));
const UI = JSON.parse(readFileSync(join(src, 'content', 'doc-ui.json'), 'utf8'));
const SOURCES = [
  'Quran, Arabic text: Tanzil Project (tanzil.net), Uthmani text v1.1. Used without changes. Copyright (C) 2007-2026 Tanzil Project, Creative Commons Attribution 3.0.',
  'Quran translations and tafsir: QuranEnc.com, used without changes. Turkish: Dr. Ali Özek et al.; English: Saheeh International (Noor International Center); Indonesian: Ministry of Religious Affairs; Urdu: Muhammad Junagarhi; Malay: Abdullah Muhammad Basmeih; Bengali: Abu Bakr Zakaria; Arabic: al-Tafsir al-Muyassar; Al-Mukhtasar fi Tafsir al-Quran al-Karim (Turkish, English, Arabic, Indonesian, Bengali).',
  'Hadiths, explanations and gradings: HadeethEnc.com, used without changes.',
  'Recitation audio: Quran.Foundation (quran.com) API, streamed.',
  'Masnavi (Turkish): Mesnevî-i Ma‘nevî, translated by Prof. Dr. Derya Örs and Prof. Dr. Hicabi Kırlangıç, Türkiye Yazma Eserler Kurumu Başkanlığı Yayınları, 2015. Used with permission.',
  'Prayer times: calculated on the device with the adhan library, using the method common in the user’s region (Diyanet in Türkiye).',
];

function docPage(kind) {
  const titles = { privacy: 'Ünsiyet — Privacy Policy', support: 'Ünsiyet — Support', 'delete-data': 'Ünsiyet — Data deletion' };
  const sections = LANGS.map(([l, , rtl]) => {
    const d = DATA[l];
    const u = UI[l];
    const contact = `<h3>${esc(u.contact)}</h3><p>${esc(u.contactText)} <a href="mailto:${EMAIL}">${EMAIL}</a></p>`;
    let body;
    if (kind === 'privacy') {
      body =
        `<h2>${esc(u.privacy)}</h2><p class="muted">${esc(u.updated)}</p><p>${esc(d.appText)}</p>` +
        d.privacyItems.map((it) => `<h3>${esc(it.title)}</h3><p>${esc(it.text)}</p>`).join('') +
        `<h3>${esc(d.aiHeading)}</h3><p>${esc(d.aiText)}</p><p><a href="https://openai.com/policies/privacy-policy">${esc(d.aiPolicy)}</a></p>` +
        contact;
    } else if (kind === 'support') {
      body =
        `<h2>${esc(u.support)}</h2><p class="muted">${esc(u.updated)}</p>` +
        contact +
        `<h3>${esc(u.about)}</h3><p>${esc(d.appText)}</p>` +
        `<h3>${esc(u.delete)}</h3><p>${esc(d.dataNote)}</p><p>${esc(d.privacyItems[5].text)}</p>` +
        `<h3>${esc(u.note)}</h3><p>${esc(d.disclaimer)}</p>` +
        `<h3>${esc(u.sources)}</h3><ul dir="ltr">${SOURCES.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>`;
    } else {
      body =
        `<h2>${esc(u.delete)}</h2><p class="muted">${esc(u.updated)}</p><p>${esc(d.dataNote)}</p>` +
        `<h3>${esc(u.inApp)}</h3><ol><li>${[d.profile, d.settings, d.dataTitle].map(esc).join(rtl ? ' ← ' : ' → ')}</li><li>${esc(d.deleteLabel)}</li></ol><p>${esc(d.deleteText)}</p>` +
        `<h3>${esc(u.server)}</h3><p>${esc(u.serverText)}</p>` +
        contact;
    }
    return `<section id="${l}" lang="${l}" dir="${rtl ? 'rtl' : 'ltr'}">${body}</section>`;
  }).join('\n');
  const t = T.en;
  return `${head({ ...t, title: titles[kind] }, `/unsiyet/${kind}.html`)}
<body>
${topBar({ ...t, other: { label: 'TR', href: '/' } }, false)}
<main class="doc"><div class="wrap">
<h1>${esc(titles[kind].replace('Ünsiyet — ', ''))}</h1>
<nav class="langs" aria-label="Language">${LANGS.map(([l, n]) => `<a href="#${l}" hreflang="${l}">${n}</a>`).join('')}</nav>
${sections}
</div></main>
<footer class="site"><div class="wrap"><span>© 2026 Ahmet Dumaner</span><nav><a href="/unsiyet/support.html">Support</a><a href="/unsiyet/privacy.html">Privacy</a><a href="/unsiyet/delete-data.html">Data deletion</a><a href="mailto:${EMAIL}">${EMAIL}</a></nav></div></footer>
</body>
</html>
`;
}

write('index.html', home('tr'));
write('en/index.html', home('en'));
for (const kind of ['privacy', 'support', 'delete-data']) write(`unsiyet/${kind}.html`, docPage(kind));
mkdirSync(join(root, 'assets'), { recursive: true });
copyFileSync(join(src, 'styles.css'), join(root, 'assets', 'styles.css'));
copyFileSync(join(src, 'site.js'), join(root, 'assets', 'site.js'));
console.log('built');
