import { format, utcToZonedTime } from 'date-fns-tz';

const timeZone = 'Europe/Rome';
const pattern = 'd.M.yyyy HH:mm';

export function isExpired(date) {
  if (!date) return;
  const now = new Date();
  const zoned = utcToZonedTime(date, timeZone);
  return now >= zoned;
}

export function formatToHumanReadable(date) {
  if (!date) return;
  const zonedDate = utcToZonedTime(date, timeZone);
  const formatted = format(zonedDate, pattern, { timeZone });
  return formatted;
}

export function resetSecondsToZero(date) {
  let resetSeconds = new Date(date);
  return new Date(resetSeconds.setSeconds(0));
}

export function nowIsBetweenTwoDates(startDate, endDate) {
  const now = new Date();
  const startDateTime = utcToZonedTime(startDate, timeZone);
  const endDateTime = utcToZonedTime(endDate, timeZone);

  return now >= startDateTime && now < endDateTime;
}
