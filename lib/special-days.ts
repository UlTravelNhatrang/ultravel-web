import { pad } from './format';

// Days the header strip names next to today's date. Editable: fixed-date days are keyed "dd.mm"
// (every year); lunar holidays move, so they are keyed by the full "dd.mm.yyyy".

const EVERY_YEAR: Record<string, string> = {
  '01.01': 'Tết Dương lịch',
  '14.02': 'Lễ Tình nhân',
  '08.03': 'Quốc tế Phụ nữ',
  '30.04': 'Ngày Giải phóng miền Nam',
  '01.05': 'Quốc tế Lao động',
  '01.06': 'Quốc tế Thiếu nhi',
  '02.09': 'Quốc khánh',
  '27.09': 'Ngày Du lịch Thế giới',
  '20.10': 'Ngày Phụ nữ Việt Nam',
  '20.11': 'Ngày Nhà giáo Việt Nam',
  '24.11': 'Ngày Văn hóa Việt Nam',
  '24.12': 'Đêm Giáng sinh',
  '25.12': 'Lễ Giáng sinh',
  '31.12': 'Đêm Giao thừa Dương lịch',
};

const THIS_YEAR_ONLY: Record<string, string> = {
  '05.02.2027': 'Giao thừa Tết Đinh Mùi',
  '06.02.2027': 'Mùng 1 Tết Đinh Mùi',
  '07.02.2027': 'Mùng 2 Tết',
  '08.02.2027': 'Mùng 3 Tết',
};

/** "25.11.2026" for a date. */
export const dayLabel = (d: Date) => `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;

/** The special day falling on this date, if any. */
export function specialDay(d: Date): string | undefined {
  const full = dayLabel(d);
  return THIS_YEAR_ONLY[full] ?? EVERY_YEAR[full.slice(0, 5)];
}
