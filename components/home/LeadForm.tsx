'use client';

import { useState, type FormEvent } from 'react';

type Field = 'name' | 'contact';
const FIELDS: { id: Field; label: string; error: string; autoComplete?: string }[] = [
  { id: 'name', label: 'Họ tên', error: 'Vui lòng nhập họ tên.', autoComplete: 'name' },
  { id: 'contact', label: 'Email hoặc số Zalo', error: 'Nhập email hoặc số Zalo để chúng tôi liên hệ.' },
];
const DESTINATIONS = ['Nha Trang', 'Đà Lạt', 'Phú Quốc'];

/**
 * Sidebar lead form. Validation only for now: wire `onSubmit` to the real endpoint (Zalo OA, CRM)
 * once it exists.
 */
export function LeadForm() {
  const [errors, setErrors] = useState<Record<Field, boolean>>({ name: false, contact: false });
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next = {
      name: !String(data.get('name') ?? '').trim(),
      contact: !String(data.get('contact') ?? '').trim(),
    };
    setErrors(next);
    setSent(!next.name && !next.contact);
  };

  // Errors clear as soon as the visitor fixes the field.
  const onInput = (field: Field, value: string) => {
    if (value.trim() && errors[field]) setErrors(prev => ({ ...prev, [field]: false }));
  };

  return (
    <form id="leadForm" className="lead" noValidate onSubmit={onSubmit}>
      <div className="relative p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="lead-faces" aria-hidden="true"><i>H</i><i>M</i><i>L</i></span>
            <span className="caption text-cloud/75 text-[12px] inline-flex items-center gap-1.5"><i className="live text-[#FF8A00]" />Thổ địa đang trực</span>
          </div>
          <span className="lead-free caption">Miễn phí</span>
        </div>
        <h3 className="hd text-[1.85rem] leading-[1.05] mt-5">Nhận lịch trình <span className="lead-hl">riêng</span> từ&nbsp;thổ&nbsp;địa</h3>
        <ul className="lead-ul mt-4 space-y-2 text-[14px] text-cloud/80">
          <li>Theo ngân sách và số ngày của bạn</li>
          <li>Quán ăn, giá vé vừa kiểm tra tuần này</li>
          <li>Nhắn qua Zalo, không gọi làm phiền</li>
        </ul>
        <div className="lead-wave my-5" aria-hidden="true" />

        <div className="space-y-3">
          {FIELDS.map(f => (
            // Order matters: the floating label sits after the input so `.lf:focus ~ label` can lift it.
            <div key={f.id} className="fl">
              <input
                id={`lf-${f.id}`}
                name={f.id}
                className="lf"
                placeholder=" "
                autoComplete={f.autoComplete}
                required
                aria-invalid={errors[f.id]}
                aria-describedby={`lf-${f.id}-err`}
                onInput={e => onInput(f.id, e.currentTarget.value)}
              />
              <p id={`lf-${f.id}-err`} className={`err ${errors[f.id] ? '' : 'hidden'}`}>{f.error}</p>
              <label htmlFor={`lf-${f.id}`}>{f.label}</label>
            </div>
          ))}
          <fieldset id="lf-dest">
            <legend className="caption text-cloud/75 text-[12px] mb-2">Bạn muốn đi đâu?</legend>
            <div className="flex flex-wrap gap-2">
              {DESTINATIONS.map((d, i) => (
                <label key={d} className="chip"><input type="radio" name="dest" value={d} defaultChecked={i === 0} /><span>{d}</span></label>
              ))}
            </div>
          </fieldset>
        </div>

        <button className="lead-cta mt-5"><span>Nhận lịch trình miễn phí</span><span className="arr" aria-hidden="true">→</span></button>
        <p className="caption text-cloud/75 text-[12px] mt-3 text-center">Không spam. Thông tin chỉ dùng để tư vấn chuyến đi.</p>
        <p id="lf-ok" className={`${sent ? '' : 'hidden'} lead-ok`} role="status">Đã nhận thông tin. Thổ địa sẽ nhắn bạn qua Zalo trong giờ hành chính.</p>
      </div>
    </form>
  );
}
