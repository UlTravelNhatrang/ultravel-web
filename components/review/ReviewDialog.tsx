'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Star, X } from '@phosphor-icons/react';
import type { TravellerType } from '@/types/review';

const TYPES: TravellerType[] = ['Cặp đôi', 'Gia đình', 'Nhóm bạn', 'Đi một mình'];
type Errors = { stars?: boolean; name?: boolean; text?: boolean };
const MIN_TEXT = 20;

/**
 * "Viết đánh giá" form in a native <dialog>. Any element with [data-open-review] opens it,
 * so the hero, the reviews section and the phone bar share one form.
 * Validation only for now: connect `onSubmit` to the reviews API when it exists.
 */
export function ReviewDialog({ placeName }: { placeName: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const open = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('[data-open-review]')) return;
      e.preventDefault();
      setSent(false);
      setErrors({});
      ref.current?.showModal();
    };
    document.addEventListener('click', open);
    return () => document.removeEventListener('click', open);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {
      stars: stars === 0,
      name: !String(data.get('name') ?? '').trim(),
      text: String(data.get('text') ?? '').trim().length < MIN_TEXT,
    };
    setErrors(next);
    if (!next.stars && !next.name && !next.text) { setSent(true); e.currentTarget.reset(); setStars(0); }
  };

  return (
    <dialog ref={ref} className="rv-dialog" aria-labelledby="rv-dialog-title" onClick={e => { if (e.target === ref.current) ref.current?.close(); }}>
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="caption text-ink/70">{placeName}</p>
            <h2 id="rv-dialog-title" className="hd text-h2 mt-1">Viết đánh giá<span className="text-orange">.</span></h2>
          </div>
          <button type="button" onClick={() => ref.current?.close()} className="lb-btn !bg-navy/5 !text-ink" aria-label="Đóng"><X size={18} /></button>
        </div>

        {sent ? (
          <div className="lead-ok !text-ink mt-6" role="status">
            Đã nhận đánh giá của bạn. Ultravel sẽ kiểm tra và đăng trong 24 giờ.
            <button type="button" onClick={() => ref.current?.close()} className="block mt-4 bx px-5 py-2.5 caption text-[12px] font-semibold">Đóng</button>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} className="grid gap-5 mt-6">
            <fieldset>
              <legend className="caption text-ink/70 mb-2">Bạn chấm mấy sao?</legend>
              <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} type="button" className="star-pick" aria-label={`${n} sao`} aria-pressed={stars === n} onMouseEnter={() => setHover(n)} onClick={() => { setStars(n); setErrors(x => ({ ...x, stars: false })); }}>
                    <Star size={30} weight={(hover || stars) >= n ? 'fill' : 'regular'} />
                  </button>
                ))}
              </div>
              {errors.stars && <p className="form-err">Chọn số sao trước khi gửi.</p>}
            </fieldset>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="grid gap-1.5">
                <span className="caption text-ink/70">Tên hiển thị</span>
                <input id="rv-name" name="name" className="field" autoComplete="name" aria-invalid={!!errors.name} />
                {errors.name && <span className="form-err">Nhập tên để hiển thị cùng đánh giá.</span>}
              </label>
              <label className="grid gap-1.5">
                <span className="caption text-ink/70">Bạn đi cùng</span>
                <select id="rv-type" name="type" className="field">{TYPES.map(t => <option key={t}>{t}</option>)}</select>
              </label>
            </div>
            <label className="grid gap-1.5">
              <span className="caption text-ink/70">Trải nghiệm của bạn</span>
              <textarea id="rv-text" name="text" rows={4} className="field resize-y" placeholder="Đồ uống, view, giá, phục vụ… càng cụ thể càng giúp người sau." aria-invalid={!!errors.text} />
              {errors.text && <span className="form-err">Viết ít nhất {MIN_TEXT} ký tự.</span>}
            </label>
            <button className="lead-cta"><span>Gửi đánh giá</span><span className="arr" aria-hidden="true">→</span></button>
          </form>
        )}
      </div>
    </dialog>
  );
}
