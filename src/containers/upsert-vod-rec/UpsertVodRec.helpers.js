import { resetSecondsToZero, formatToISO8601 } from '../../utils/date';

export const prepareVodRec = (
  id,
  { cluster, startDateTime, recommendation },
) => {
  let randomId = id ?? Math.floor(Math.random() * 10001); //TODO togliere
  return {
    id: randomId.toString(), //TODO togliere
    status: '', //TODO togliere
    message: '', //TODO togliere
    item: [
      {
        id: randomId.toString(),
        cluster,
        type: 'VOD',
        validFrom: formatToISO8601(resetSecondsToZero(startDateTime)),
        validTo: '',
        recommendation: Object.values(recommendation),
      },
    ],
  };
};

export const normalizeVodRec = (vodRec) => {
  const sorted = vodRec.sort((prev, next) => prev.position - next.position);
  const normalized = sorted.reduce(
    (acc, curr, index) => ({ ...acc, [index + 1]: curr }),
    {},
  );
  return normalized;
};
