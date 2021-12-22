import { formatToHumanReadable } from './date';

export function formatVodEvent(event) {
  if (event.startDate) event.startDate = formatToHumanReadable(event.startDate);
  if (event.endDate) event.endDate = formatToHumanReadable(event.endDate);

  return event;
}
