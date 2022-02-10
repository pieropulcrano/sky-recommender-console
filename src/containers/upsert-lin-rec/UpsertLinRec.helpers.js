import { resetSecondsToZero } from '../../utils/date';

const positions = ['1', '2', '3', '4', '5'];

export const extractEventsToArray = (recommendation) => {
  if (!recommendation) throw new Error('No recommendation provided');
  const eventsObj = Object.values(recommendation);
  const reduced = eventsObj.reduce((acc, curr) => {
    // remove empty objects
    const events = Object.values(curr).filter(
      (value) => Object.keys(value).length !== 0,
    );
    return [...acc, ...events];
  }, []);
  const ordered = reduced.sort((prev, next) => prev.position - next.position);
  return ordered;
};

export const prepareLinRec = (
  id,
  { cluster, startDateTime, endDateTime, recommendation },
) => {
  return {
    id: id ?? Math.floor(Math.random() * 10001),
    cluster,
    type: 'LIN',
    validFrom: resetSecondsToZero(startDateTime),
    validTo: resetSecondsToZero(endDateTime),
    recommendation: extractEventsToArray(recommendation),
  };
};

export const normalizeLinRec = (linRec) => {
  const reduced = positions.reduce((acc, curr) => {
    const currentSlotEvents = linRec.filter((event) => event.position === curr);

    const hdEvent = currentSlotEvents.filter(
      (event) => event.resolution === 'HD',
    );

    const sdEvent = currentSlotEvents.filter(
      (event) => event.resolution === 'SD',
    );

    if (hdEvent.length > 0 || sdEvent.length > 0)
      return {
        ...acc,
        [curr]: {
          hd: { ...hdEvent[0] },
          sd: { ...sdEvent[0] },
        },
      };

    return acc;
  }, {});

  return reduced;
};
