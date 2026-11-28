'use client';

import { useState, type FormEvent } from 'react';

/** Offers by email or Zalo. Validation only for now: wire to the mailing list / Zalo OA before launch. */
export function Newsletter() {
  const [state, setState] = useState<'idle' | 'error' | 'done'>('idle');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = String(new FormData(e.currentTarget).get('contact') ?? '').trim();
    const ok = /\S+@\S+\.\S+/.test(v) || v.replace(/\D/g, '').length >= 9;
    setState(ok ? 'done' : 'error');
  };

  return (
    <section className="wrap hsec pb-20" aria-labelledby="news-t">
      <div className="news">
        <div>
          <h2 id="news-t" className="news-t">Ưu đãi mới mỗi tuần, <em className="it">gửi thẳng cho bạn.</em></h2>
          <p className="mt-3 text-white/75 leading-relaxed max-w-[46ch]">Mã giảm giá khách sạn, tour và quán đối tác. Không spam, huỷ bất cứ lúc nào.</p>
        </div>
        <div>
          {state === 'done' ? (
            <p className="text-lg font-semibold" role="status">Đã đăng ký. Ưu đãi đầu tiên sẽ đến trong tuần này.</p>
          ) : (
            <form className="news-form" noValidate onSubmit={onSubmit}>
              <label htmlFor="news-contact" className="sr-only">Email hoặc số Zalo</label>
              <input id="news-contact" name="contact" placeholder="Email hoặc số Zalo" autoComplete="email" aria-invalid={state === 'error'} aria-describedby={state === 'error' ? 'news-err' : undefined} onInput={() => state === 'error' && setState('idle')} />
              <button type="submit">Đăng ký</button>
            </form>
          )}
          {state === 'error' && <p id="news-err" className="news-note !text-[#FF8A00]">Nhập email hoặc số Zalo hợp lệ.</p>}
          {state === 'idle' && <p className="news-note">Hoặc nhắn Zalo OA Ultravel để nhận ưu đãi nhanh hơn.</p>}
        </div>
      </div>
    </section>
  );
}
