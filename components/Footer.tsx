"use client";

const cols = [
  {
    title: "Mağaza",
    links: ["Nemlendirici", "Yüz Spreyi", "SPF 50", "Dudak Balmı", "Hediye Setleri"],
  },
  {
    title: "Hakkında",
    links: ["Hikayemiz", "İçerikler", "Sürdürülebilirlik", "Basın"],
  },
  {
    title: "Yardım",
    links: ["Kargo", "İadeler", "Cilt Testi", "İletişim"],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-milk px-5 pb-10 pt-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 border-b border-cream-200 pb-14 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center">
              <span className="font-serif text-2xl font-bold lowercase tracking-tight">
                cream co.
              </span>
            </div>
            <p className="mt-4 text-ink/60">
              Nem, ama lüks dokunuşuyla. İlk alışverişinde %10 indirim için
              listeye katıl.
            </p>
            <form
              className="mt-5 flex max-w-sm overflow-hidden rounded-full border border-cream-200 bg-white p-1"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="sen@eposta.com"
                className="flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-ink/40"
              />
              <button className="btn-gloss rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-milk transition-colors hover:bg-cream-700">
                Katıl
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {cols.map((c) => (
              <div key={c.title}>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream-500">
                  {c.title}
                </h4>
                <ul className="space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-ink/60 transition-colors hover:text-cream-700"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-sm text-ink/50 md:flex-row">
          <p>© {2026} Cream Co. Tüm hakları saklıdır.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-cream-700">
              Instagram
            </a>
            <a href="#" className="hover:text-cream-700">
              TikTok
            </a>
            <a href="#" className="hover:text-cream-700">
              Gizlilik
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
