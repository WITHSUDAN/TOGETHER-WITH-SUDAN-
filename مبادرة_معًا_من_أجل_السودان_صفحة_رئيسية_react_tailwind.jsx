// Project: Together for Sudan — React + Tailwind
// Single-file React module (fixed):
// - Ensures React is imported only once to avoid "Identifier 'React' has already been declared" errors
// - Contains DonationForm (as an internal component), LandingPage, logoSvg and README exports

import React, { useState } from 'react';

/* ===========================
   Internal component: DonationForm
   (kept local to this module to avoid duplicate imports)
   =========================== */
function DonationForm({ lang = 'ar' }) {
  const isAR = lang === 'ar';
  const [shares, setShares] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const amount = shares * 1; // $1 per share

  const handleDonate = () => {
    // Mock behaviour: in a real deployment wire to payment gateway (Stripe/PayPal/local)
    alert(isAR ? 'شكرًا! سيتم توجيهك لصفحة الدفع الوهمية.' : 'Thank you! You will be redirected to a mock payment page.');
    // For production: call backend to create payment session
    window.location.href = '/donation-success?name=' + encodeURIComponent(name);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm max-w-md">
      <h4 className="font-bold mb-2">{isAR ? 'سهم الرحمة — تبرع' : 'Sahm Al‑Rahma — Donate'}</h4>

      <label className="block text-sm mt-2">{isAR ? 'اسمك' : 'Your name'}</label>
      <input value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded w-full" />

      <label className="block text-sm mt-2">Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded w-full" />

      <label className="block text-sm mt-3">{isAR ? 'عدد الأسهم (1$ لكل سهم)' : 'Number of shares ($1 per share)'}</label>
      <div className="flex items-center gap-2 mt-1">
        <button type="button" onClick={() => setShares((s) => Math.max(1, s - 1))} className="px-3 py-1 border rounded">-</button>
        <div className="px-3">{shares}</div>
        <button type="button" onClick={() => setShares((s) => s + 1)} className="px-3 py-1 border rounded">+</button>
      </div>

      <div className="mt-3 text-sm">{isAR ? `المبلغ الإجمالي: $${amount}` : `Total amount: $${amount}`}</div>

      <div className="mt-4 flex gap-2">
        <button onClick={handleDonate} className="bg-red-600 text-white px-4 py-2 rounded">{isAR ? 'تبرع الآن' : 'Donate now'}</button>
        <a href="#" onClick={(e) => { e.preventDefault(); navigator.clipboard && navigator.clipboard.writeText('bank-account-placeholder'); alert(isAR ? 'تم نسخ بيانات الحساب البنكي' : 'Bank account copied to clipboard'); }} className="px-4 py-2 border rounded">{isAR ? 'تفاصيل التحويل البنكي' : 'Bank transfer details'}</a>
      </div>

      <p className="text-xs text-gray-500 mt-3">{isAR ? 'ملاحظة: هذه واجهة نموذجية — لربط دفع حقيقي استخدم Stripe أو PayPal أو بوابة محلية.' : 'Note: this is a mock UI — connect a real gateway like Stripe/PayPal or local processor for production.'}</p>
    </div>
  );
}

/* ===========================
   LandingPage (default export)
   =========================== */
export default function LandingPage() {
  const [lang, setLang] = useState('ar');
  const t = {
    ar: {
      name: 'مبادرة معا من اجل السودان',
      slogan: 'بسواعدنا نبني وطننا',
      heroLead: 'انضم إلى مبادرة وطنية تطوعية توحد السودانيين في الداخل والخارج لدعم الإغاثة، الاستقرار، والتعافي طويل الأمد.',
      aboutTitle: 'الفكرة',
      aboutText: 'هي مبادرة وطنية تطوعية تهدف إلى توحيد الجهود السودانية الرسمية والشعبية داخل السودان وخارجه، لدعم الاستقرار، الإغاثة، والتنمية، وتعزيز روح التضامن الوطني في مواجهة العدوان، والانقسام، والدمار الناتج عن الحرب.',
      axes: [
        { title: 'المحور الإنساني والإغاثي', text: 'حملات تبرع وإغاثة عاجلة تحت اسم سهم الرحمة؛ إنشاء صندوق دعم؛ توزيع سلال غذاء وأدوية ومأوى.' },
        { title: 'المحور الاجتماعي والإعلامي', text: 'حملات توعية ونبذ خطاب الكراهية؛ مؤتمرات ومنتديات.' },
        { title: 'المحور التنموي', text: 'دعم مشروعات إنتاجية صغيرة وتدريب في ريادة الأعمال.' },
        { title: 'المحور الأكاديمي والشبابي', text: 'ربط جامعات، منح طلابية، ودعم البحوث التنموية.' }
      ],
      executionText: 'تكوين لجنة عليا، فتح فروع، إطلاق منصة إلكترونية، توقيع شراكات.'
    },
    en: {
      name: 'Together for Sudan',
      slogan: 'With our hands we build our country',
      heroLead: 'Join a national volunteer initiative uniting Sudanese inside and outside the country to support relief, stability and long‑term recovery.',
      aboutTitle: 'Idea',
      aboutText: 'A volunteer national initiative aiming to unify Sudanese official and popular efforts at home and abroad to support stability, relief and development, and to strengthen national solidarity in the face of aggression, division and destruction caused by war.',
      axes: [
        { title: 'Humanitarian & Relief', text: 'Donation campaigns under "Sahm Al‑Rahma"; establish a fund; distribute food, medicine and shelter.' },
        { title: 'Social & Media', text: 'Awareness campaigns to reject hate speech; conferences and forums.' },
        { title: 'Developmental', text: 'Support small productive projects; entrepreneurship training.' },
        { title: 'Academic & Youth', text: 'University partnerships, scholarships and research projects.' }
      ],
      executionText: 'Form a high committee, open field branches, launch an online platform, sign partnerships.'
    }
  }[lang];

  const isRTL = lang === 'ar';

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.svg" alt="logo" className="h-12 w-12" />
            <div>
              <h1 className="text-lg font-semibold">{t.name}</h1>
              <p className="text-xs text-gray-500">{t.slogan}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="px-3 py-1 border rounded">{lang === 'ar' ? 'EN' : 'العربية'}</button>
            <nav className="hidden md:flex items-center gap-4 text-sm">
              <a href="#about" className="hover:underline">{t.aboutTitle}</a>
              <a href="#axes" className="hover:underline">{isRTL ? 'محاور العمل' : 'Work axes'}</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-extrabold">{t.name}</h2>
            <p className="mt-4 text-lg text-gray-700">{t.heroLead}</p>
            <div className="mt-6 flex gap-3">
              <a href="#donate" className="bg-green-600 text-white px-6 py-3 rounded">{lang === 'ar' ? 'تبرّع' : 'Donate'}</a>
              <a href="#about" className="border px-6 py-3 rounded">{lang === 'ar' ? 'من نحن' : 'About'}</a>
            </div>
          </div>

          <div>
            <img src="https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1000&q=60" alt="community" className="w-full h-80 object-cover rounded-lg shadow-lg" />
          </div>
        </section>

        <section id="about" className="mt-12 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-2xl font-bold">{t.aboutTitle}</h3>
          <p className="mt-3 text-gray-700">{t.aboutText}</p>
        </section>

        <section id="axes" className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.axes.map((a, i) => (
            <div key={i} className="p-6 bg-white rounded-lg shadow-sm">
              <h4 className="font-semibold">{a.title}</h4>
              <p className="mt-2 text-gray-700">{a.text}</p>
            </div>
          ))}
        </section>

        <section id="donate" className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div>
            <h3 className="text-xl font-bold mb-4">{lang === 'ar' ? 'تبرع لدعم المبادرة' : 'Donate to support the initiative'}</h3>
            <p className="text-gray-700 mb-4">{t.executionText}</p>
            <DonationForm lang={lang} />
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold">{lang === 'ar' ? 'معلومات للمساهمين' : 'Info for supporters'}</h4>
            <ul className="mt-3 text-gray-700 list-disc list-inside">
              <li>{lang === 'ar' ? 'الحد الأدنى للسهم: 1$' : 'Minimum per share: $1'}</li>
              <li>{lang === 'ar' ? 'الهدف المبدئي: 5,000,000 سهم' : 'Initial target: 5,000,000 shares'}</li>
              <li>{lang === 'ar' ? 'ستستخدم الأموال في الإغاثة المباشرة وإعادة الإعمار' : 'Funds will be used for direct relief and reconstruction'}</li>
            </ul>

            <div className="mt-4">
              <h5 className="font-semibold">{lang === 'ar' ? 'تواصل' : 'Contact'}</h5>
              <p className="text-sm text-gray-600 mt-1">{lang === 'ar' ? 'البريد:' : 'Email:'} hello@togetherforsudan.org</p>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">© مبادرة معا من اجل السودان</p>
          <div className="flex gap-3 text-sm">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ===========================
   public/logo.svg
   Simple, symbolic logo using Sudan colours and hands motif
   =========================== */

const logoSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" rx="20" fill="#ffffff"/>
  <!-- stylized hands forming a heart / shield -->
  <g transform="translate(20,20)">
    <path d="M60 20 C 40 20, 20 40, 20 60 C 20 90, 60 110, 80 130 C 100 110, 140 90, 140 60 C 140 40, 120 20, 100 20 C 90 20, 80 25, 80 35 C 80 25, 70 20, 60 20 Z" fill="#00853f" />
    <circle cx="60" cy="60" r="8" fill="#d52b1e" />
    <circle cx="100" cy="60" r="8" fill="#000000" />
    <text x="20" y="160" font-size="18" font-family="sans-serif" fill="#333">معًا من أجل السودان</text>
  </g>
</svg>`;

/* ===========================
   README (run & deploy instructions, sample credentials)
   =========================== */

const README = `
Together for Sudan — Quick Start (React + Tailwind)

Included files:
- src/components/LandingPage.jsx
- src/components/DonationForm.jsx
- public/logo.svg

Local run (recommended):
1. Ensure Node.js 18+ installed.
2. Create a new Vite React app or use Create React App.
   Example (Vite): npm create vite@latest together-for-sudan -- --template react
3. Copy the components into src/components and the logo into public/
4. Install Tailwind (official docs), then run:
   npm install
   npm run dev

Payment integration (recommended for production):
- Use Stripe (recommended) or PayPal.
- Implement server-side endpoint to create payment sessions and webhooks.
- For local testing use Stripe test mode keys.

Deployment (Vercel / Netlify):
- Push project to GitHub.
- Connect repo to Vercel or Netlify and follow deploy steps.
- Set environment variables for payment keys and admin credentials.

Suggested placeholders (change ASAP after deploy):
- Admin email: hello@togetherforsudan.org
- Temporary admin password: TFS@2025!Sudan
- Suggested domain (purchase & configure DNS): togetherforsudan.org

Note: The site in this repository is a front-end prototype. For a secure production site you must:
- Add a backend for donations and beneficiary data (avoid storing PII in frontend)
- Use HTTPS and secure cookies
- Enforce strong password reset flows and 2FA for admin
- Comply with local financial regulations for fundraising

If you want, I can:
- Prepare a zipped project you can run locally
- Add example server endpoints (Node/Express) to accept donation requests and create Stripe sessions
- Create a polished SVG/PNG logo files in multiple sizes
`;

export { logoSvg, README };

/* ========== END OF DOCUMENT ========== */
