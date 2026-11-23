/** 7 -> "07" */
export const pad = (n: number) => String(n).padStart(2, '0');

/** "12.11.2026" -> "2026-11-12" for <time dateTime>. */
export const isoDate = (ddmmyyyy: string) => ddmmyyyy.split('.').reverse().join('-');

/** Today as dd.mm.yyyy. Call only in the browser (it reads the clock). */
export const todayLabel = () => {
  const d = new Date();
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
};

/** Open now? Handles places that close after midnight (e.g. 16h to 1h). */
export const isOpenAt = (hour: number, opensAt: number, closesAt: number) =>
  opensAt < closesAt ? hour >= opensAt && hour < closesAt : hour >= opensAt || hour < closesAt;
