import { format, utcToZonedTime } from 'date-fns-tz';

const timeZone = 'Europe/Rome';
const pattern = 'd.M.yyyy HH:mm';

/**
 * Check if date (in UTC format) is Expired.
 * @param {String} date - The date as UTC String.
 * @returns {Boolean} True if the date is expired, false otherwise.
 */

export function isExpired(date) {
  const now = new Date();
  const zoned = utcToZonedTime(date, timeZone);
  return now >= zoned;
}

/**
 * Format a date string (in UTC format) in the format d.M.yyyy HH:mm.
 * @param {String} date - The date as UTC String.
 * @returns {String} The string formatted in the format d.M.yyyy HH:mm.
 */

export function formatToHumanReadable(date) {
  const zonedDate = utcToZonedTime(date, timeZone);
  const formatted = format(zonedDate, pattern, { timeZone });
  return formatted;
}

/**
 * Given a date (in UTC format), reset the seconds to 0.
 * @param {String} date - The date as UTC String.
 * @returns {Date} The Date with the seconds resetted to 0.
 */

export function resetSecondsToZero(date) {
  let resetSeconds = new Date(date);
  return new Date(resetSeconds.setSeconds(0));
}

/**
 * Check if now is between a given startDateTime and endDateTime (both in UTC format).
 * @param {String} startDateTime - The start date time in UTC
 * @param {String} endDateTime - The date as UTC String.
 * @returns {Boolean}
 */

export function nowIsBetweenTwoDates(startDateTime, endDateTime) {
  const now = new Date();
  const zonedStartDateTime = utcToZonedTime(startDateTime, timeZone);
  const zonedEndDateTime = utcToZonedTime(endDateTime, timeZone);
  return now >= zonedStartDateTime && now < zonedEndDateTime;
}
