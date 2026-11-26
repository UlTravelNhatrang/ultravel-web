/** 7 -> "07" */
export const pad = (n: number) => String(n).padStart(2, '0');

/** "12.11.2026" -> "2026-11-12" for <time dateTime>. */
export const isoDate = (ddmmyyyy: string) => ddmmyyyy.split('.').reverse().join('-');

/** Open now? Handles places that close after midnight (e.g. 16h to 1h). */
export const isOpenAt = (hour: number, opensAt: number, closesAt: number) =>
  opensAt < closesAt ? hour >= opensAt && hour < closesAt : hour >= opensAt || hour < closesAt;
