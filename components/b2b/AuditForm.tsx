'use client';

import { useState, type FormEvent, type InputHTMLAttributes } from 'react';
import { BUDGETS, SERVICE_LABEL, type ServiceKey } from '@/content/b2b';

type Field = 'name' | 'phone' | 'business';
const MESSAGES: Record<Field, string> = {
  name: 'Vui lòng nhập họ tên.',
  phone: 'Cần ít nhất 9 chữ số.',
  business: 'Nhập tên cơ sở hoặc link Google Maps.',
};
const SERVICE_KEYS = Object.keys(SERVICE_LABEL) as ServiceKey[];

const check = (data: FormData): Record<Field, boolean> => ({
  name: !String(data.get('name') ?? '').trim(),
  phone: String(data.get('phone') ?? '').replace(/\D/g, '').length < 9,
  business: !String(data.get('business') ?? '').trim(),
});

/**
 * Free audit request. Quiet, hotel-booking style on deep sea glass: hairline fields with small
 * tracked labels, fine checkboxes and radios, one solid button.
 * Validation only for now: wire `onSubmit` to the real endpoint (CRM, Zalo OA) before launch.
 */
export function AuditForm() {
  const [errors, setErrors] = useState<Record<Field, boolean>>({ name: false, phone: false, business: false });
  const [sentTo, setSentTo] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next = check(data);
    setErrors(next);
    // Focus the first field to fix (by name: aria-invalid isn't rendered yet at this point).
    const first = (Object.keys(next) as Field[]).find(f => next[f]);
    if (first) {
      (e.currentTarget.elements.namedItem(first) as HTMLInputElement | null)?.focus();
      return;
    }
    setSentTo(String(data.get('name')).trim());
  };

  const clear = (f: Field) => { if (errors[f]) setErrors(prev => ({ ...prev, [f]: false })); };

  if (sentTo) {
    return (
      <div className="hz hz-sent" role="status">
        <p className="hz-label">Đã nhận yêu cầu</p>
        <p className="font-display font-bold text-[1.6rem] leading-tight tracking-[-0.02em] mt-3">Cảm ơn {sentTo}.</p>
        <p className="text-paper/70 mt-3 leading-relaxed max-w-[44ch]">Đội Ultravel sẽ nhắn Zalo cho bạn trong giờ hành chính để hẹn buổi audit.</p>
        <button type="button" onClick={() => setSentTo(null)} className="hz-link mt-8">Gửi yêu cầu khác</button>
      </div>
    );
  }

  const field = (f: Field, label: string, props: InputHTMLAttributes<HTMLInputElement>) => (
    <div className="hz-field">
      <label htmlFor={`hz-${f}`} className="hz-label">{label}</label>
      <div className="hz-input">
        <input
          id={`hz-${f}`}
          name={f}
          aria-invalid={errors[f]}
          aria-describedby={errors[f] ? `hz-${f}-err` : undefined}
          onInput={() => clear(f)}
          {...props}
        />
        <span className="hz-line" aria-hidden="true" />
      </div>
      {errors[f] && <p id={`hz-${f}-err`} className="hz-err">{MESSAGES[f]}</p>}
    </div>
  );

  return (
    <form className="hz" noValidate onSubmit={onSubmit} aria-label="Đăng ký audit miễn phí">
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
        {field('name', 'Họ tên', { autoComplete: 'name', placeholder: 'Nguyễn Văn A' })}
        {field('phone', 'Điện thoại / Zalo', { type: 'tel', inputMode: 'tel', autoComplete: 'tel', placeholder: '09xx xxx xxx' })}
        <div className="sm:col-span-2">{field('business', 'Cơ sở hoặc link Google Maps', { placeholder: 'Nhà hàng Biển Xanh, Trần Phú' })}</div>
      </div>

      <fieldset className="mt-10">
        <legend className="hz-label">Mảng quan tâm</legend>
        <div className="hz-opts grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 mt-4">
          {SERVICE_KEYS.map(k => (
            <label key={k} className="hz-opt"><input type="checkbox" name="services" value={k} /><i aria-hidden="true" />{SERVICE_LABEL[k]}</label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-9">
        <legend className="hz-label">Ngân sách mỗi tháng</legend>
        <div className="hz-opts grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 mt-4">
          {BUDGETS.map((b, i) => (
            <label key={b} className="hz-opt is-radio"><input type="radio" name="budget" value={b} defaultChecked={i === BUDGETS.length - 1} /><i aria-hidden="true" />{b}</label>
          ))}
        </div>
      </fieldset>

      <div className="hz-foot">
        <button type="submit" className="hz-send">Gửi yêu cầu audit <span aria-hidden="true">→</span></button>
        <p className="text-[13px] leading-relaxed text-paper/50">Miễn phí, không ràng buộc. Phản hồi trong 24 giờ làm việc; số điện thoại chỉ dùng để hẹn buổi audit.</p>
      </div>
    </form>
  );
}
