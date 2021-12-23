import { format, utcToZonedTime } from 'date-fns-tz';

const timeZone = 'Europe/Rome';
const pattern = 'd.M.yyyy HH:mm';

export function isExpired(date) {
  const todayDate = new Date();
  const otherDate = utcToZonedTime(date, timeZone);
  return otherDate <= todayDate;
}

export function formatToHumanReadable(date) {
  if (!date) return;
  const zonedDate = utcToZonedTime(date, timeZone);
  const formatted = format(zonedDate, pattern, { timeZone });
  return formatted;
}

export function resetSecondsToZero(date) {
  let resetSeconds = date.setSeconds(0);
  return new Date(resetSeconds);
}
