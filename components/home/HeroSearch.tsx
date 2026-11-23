'use client';

const POPULAR = ['#Ăn gì Nha Trang', '#Lịch trình 3N2Đ', '#Vé VinWonders', '#Đà Lạt', '#Phú Quốc', '#Tour 4 đảo'];
// Cell borders for the 2x3 / 3x2 suggestion grid (matches the original hairline layout).
const CELL = ['border-r border-b', 'border-r border-b', 'border-b', 'border-r', 'border-r', ''];

/** Hero search box. Popular searches open below it while the field has focus (pure CSS). */
export function HeroSearch() {
  return (
    <form className="hero-form hero-fade relative" role="search" onSubmit={e => e.preventDefault()}>
      <label htmlFor="q" className="mono block mb-2">Tra cứu</label>
      <div className="flex border-2 border-ink bg-paper">
        <input id="q" type="search" className="flex-1 min-w-0 px-4 py-3.5 bg-transparent outline-none text-base placeholder:text-ink2" placeholder="Bạn muốn đi đâu, ăn gì?" />
        <button className="bx-red px-5 md:px-7 mono text-[12px] font-semibold border-l-2 border-ink hover:bg-ink">Tìm</button>
      </div>
      <div className="suggest absolute left-0 right-0 top-full z-20 bg-paper border-2 border-t-0 border-ink">
        <p className="mono text-ink2 px-4 pt-3 pb-2">Tra cứu nhiều nhất / 7 ngày</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 mono text-[11px] border-t border-ink">
          {POPULAR.map((q, i) => (
            <a key={q} className={`px-4 py-2.5 ${CELL[i]} border-ink hover:bg-ink hover:text-paper`} href="#">{q}</a>
          ))}
        </div>
      </div>
    </form>
  );
}
