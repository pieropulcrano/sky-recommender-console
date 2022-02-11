import { resetSecondsToZero, formatToISO8601 } from '../../utils/date';

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
  let randomId = id ?? Math.floor(Math.random() * 10001); //TODO togliere
  return {
    id: randomId.toString(), //TODO togliere
    status: '', //TODO togliere
    message: '', //TODO togliere
    item: [
      {
        id: randomId.toString(), //TODO togliere
        cluster,
        type: 'LIN',
        validFrom: formatToISO8601(resetSecondsToZero(startDateTime)),
        validTo: formatToISO8601(resetSecondsToZero(endDateTime)),
        recommendation: extractEventsToArray(recommendation),
      },
    ],
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
