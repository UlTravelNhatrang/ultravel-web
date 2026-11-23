'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle } from '@phosphor-icons/react';
import { BUDGETS, SERVICE_LABEL, type ServiceKey } from '@/content/b2b';

type Field = 'name' | 'phone' | 'business';
const MESSAGES: Record<Field, string> = {
  name: 'Vui lòng nhập họ tên.',
  phone: 'Nhập số điện thoại hoặc Zalo (ít nhất 9 chữ số).',
  business: 'Cho chúng tôi biết tên cơ sở hoặc link Google Maps.',
};

const check = (data: FormData): Record<Field, boolean> => ({
  name: !String(data.get('name') ?? '').trim(),
  phone: String(data.get('phone') ?? '').replace(/\D/g, '').length < 9,
  business: !String(data.get('business') ?? '').trim(),
});

/**
 * Free audit request. Validation only for now: wire `onSubmit` to the real endpoint (CRM, Zalo OA)
 * before launch; the thank-you text promises a reply in office hours.
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
      <div className="b2b-form b2b-sent" role="status">
        <CheckCircle size={44} weight="fill" className="text-[#0f7a5a]" aria-hidden="true" />
        <p className="font-display font-extrabold text-2xl tracking-[-0.02em] mt-4">Đã nhận yêu cầu, {sentTo}.</p>
        <p className="text-ink/75 mt-2 leading-relaxed">Đội Ultravel sẽ nhắn Zalo cho bạn trong giờ hành chính để hẹn buổi audit.</p>
        <button type="button" onClick={() => setSentTo(null)} className="mono font-semibold mt-6 hover:text-red-t">Gửi yêu cầu khác <span className="arr">→</span></button>
      </div>
    );
  }

  const input = (f: Field, label: string, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="b2b-field">
      <label htmlFor={`au-${f}`}>{label}</label>
      <input
        id={`au-${f}`}
        name={f}
        aria-invalid={errors[f]}
        aria-describedby={errors[f] ? `au-${f}-err` : undefined}
        onInput={() => clear(f)}
        {...props}
      />
      {errors[f] && <p id={`au-${f}-err`} className="b2b-err">{MESSAGES[f]}</p>}
    </div>
  );

  return (
    <form className="b2b-form" noValidate onSubmit={onSubmit} aria-label="Đăng ký audit miễn phí">
      <div className="grid sm:grid-cols-2 gap-4">
        {input('name', 'Họ tên', { autoComplete: 'name', placeholder: 'Nguyễn Văn A' })}
        {input('phone', 'Số điện thoại / Zalo', { type: 'tel', inputMode: 'tel', autoComplete: 'tel', placeholder: '09xx xxx xxx' })}
      </div>
      <div className="mt-4">{input('business', 'Tên cơ sở hoặc link Google Maps', { placeholder: 'Ví dụ: Nhà hàng Biển Xanh, Trần Phú' })}</div>

      <fieldset className="mt-5">
        <legend className="b2b-legend">Bạn quan tâm (chọn nhiều)</legend>
        <div className="flex flex-wrap gap-2 mt-2">
          {(Object.keys(SERVICE_LABEL) as ServiceKey[]).map(k => (
            <label key={k} className="b2b-chip"><input type="checkbox" name="services" value={k} /><span>{SERVICE_LABEL[k]}</span></label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="b2b-legend">Ngân sách mỗi tháng</legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
          {BUDGETS.map((b, i) => (
            <label key={b} className="b2b-chip is-radio"><input type="radio" name="budget" value={b} defaultChecked={i === BUDGETS.length - 1} /><span>{b}</span></label>
          ))}
        </div>
      </fieldset>

      <button type="submit" className="ct-primary w-full mt-7">
        <span className="flex-1 text-center pl-9">Gửi yêu cầu audit</span>
        <span className="ct-primary-arr" aria-hidden="true"><ArrowRight size={14} weight="bold" /></span>
      </button>
      <p className="mono text-ink2 mt-3 text-center">Miễn phí, không ràng buộc. Chúng tôi chỉ dùng số này để liên hệ về buổi audit.</p>
    </form>
  );
}
