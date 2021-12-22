import { format } from 'date-fns';

export function isExpired(date) {
  const todaysDate = new Date();
  const pickedDate = new Date(date);
  return pickedDate <= todaysDate;
}

export function formatToISOString(date) {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
}

export function formatToHumanReadable(date) {
  return date.replace('T', ' ').replace('Z', '');
}
