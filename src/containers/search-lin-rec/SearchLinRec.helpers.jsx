import { formatToHumanReadable } from '../../utils/date';

export const mapSearchResultForDataTable = (data) =>
  data.map((event) => {
    let formatted = { ...event };
    if (event.startProgram)
      formatted.startProgram = formatToHumanReadable(event.startProgram);
    if (event.endProgram)
      formatted.endProgram = formatToHumanReadable(event.endProgram);

    return formatted;
  });
