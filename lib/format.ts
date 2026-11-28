/** 7 -> "07" */
export const pad = (n: number) => String(n).padStart(2, '0');

/** "12.11.2026" -> "2026-11-12" for <time dateTime>. */
export const isoDate = (ddmmyyyy: string) => ddmmyyyy.split('.').reverse().join('-');

/** Today in Nha Trang (Vietnam time, whatever the visitor's clock zone) as dd.mm.yyyy. Call only in the browser. */
export const todayLabel = (now = new Date()) => {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Ho_Chi_Minh', day: '2-digit', month: '2-digit', year: 'numeric' }).formatToParts(now).map(x => [x.type, x.value]));
  return `${p.day}.${p.month}.${p.year}`;
};

/** Milliseconds until the next midnight in Vietnam (UTC+7, no daylight saving). */
export const msToVietnamMidnight = (now = Date.now()) => {
  const day = 86_400_000, offset = 7 * 3_600_000;
  return day - ((now + offset) % day) + 1000;
};

/** Open now? Handles places that close after midnight (e.g. 16h to 1h). */
export const isOpenAt = (hour: number, opensAt: number, closesAt: number) =>
  opensAt < closesAt ? hour >= opensAt && hour < closesAt : hour >= opensAt || hour < closesAt;
