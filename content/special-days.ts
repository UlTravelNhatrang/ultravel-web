/**
 * Special days shown after the date in the header strip ("Ngày 24.11.2026 · Ngày Văn hóa Việt Nam").
 * Solar holidays repeat every year (key "dd.mm"); lunar ones move, so they are listed per year (key "dd.mm.yyyy").
 */
export const SOLAR_DAYS: Record<string, string> = {
  '01.01': 'Tết Dương lịch',
  '03.02': 'Ngày thành lập Đảng Cộng sản Việt Nam',
  '27.02': 'Ngày Thầy thuốc Việt Nam',
  '08.03': 'Ngày Quốc tế Phụ nữ',
  '26.03': 'Ngày thành lập Đoàn TNCS Hồ Chí Minh',
  '30.04': 'Ngày Giải phóng miền Nam, thống nhất đất nước',
  '01.05': 'Ngày Quốc tế Lao động',
  '19.05': 'Ngày sinh Chủ tịch Hồ Chí Minh',
  '01.06': 'Ngày Quốc tế Thiếu nhi',
  '28.06': 'Ngày Gia đình Việt Nam',
  '27.07': 'Ngày Thương binh Liệt sĩ',
  '19.08': 'Ngày Cách mạng tháng Tám',
  '02.09': 'Quốc khánh',
  '10.10': 'Ngày Giải phóng Thủ đô',
  '20.10': 'Ngày Phụ nữ Việt Nam',
  '20.11': 'Ngày Nhà giáo Việt Nam',
  '24.11': 'Ngày Văn hóa Việt Nam',
  '22.12': 'Ngày thành lập Quân đội nhân dân Việt Nam',
  '24.12': 'Đêm Giáng sinh',
  '25.12': 'Lễ Giáng sinh',
};

/** Lunar-calendar days, converted to the solar date for each year. Add the next year here when it comes. */
export const LUNAR_DAYS: Record<string, string> = {
  '16.02.2026': 'Giao thừa Tết Bính Ngọ',
  '17.02.2026': 'Mùng 1 Tết Bính Ngọ',
  '18.02.2026': 'Mùng 2 Tết',
  '19.02.2026': 'Mùng 3 Tết',
  '03.03.2026': 'Tết Nguyên tiêu (Rằm tháng Giêng)',
  '26.04.2026': 'Giỗ Tổ Hùng Vương',
  '25.09.2026': 'Tết Trung thu',
  '05.02.2027': 'Giao thừa Tết Đinh Mùi',
  '06.02.2027': 'Mùng 1 Tết Đinh Mùi',
  '07.02.2027': 'Mùng 2 Tết',
  '08.02.2027': 'Mùng 3 Tết',
  '20.02.2027': 'Tết Nguyên tiêu (Rằm tháng Giêng)',
  '16.04.2027': 'Giỗ Tổ Hùng Vương',
  '15.09.2027': 'Tết Trung thu',
};

/** The special day for a "dd.mm.yyyy" date, if any. */
export const specialDay = (date: string) => LUNAR_DAYS[date] ?? SOLAR_DAYS[date.slice(0, 5)];
