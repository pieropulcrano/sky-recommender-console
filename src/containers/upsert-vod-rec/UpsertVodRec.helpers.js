import { resetSecondsToZero } from '../../utils/date';

export const prepareVodRec = (
  id,
  { cluster, startDateTime, recommendation },
) => {
  return {
    id: id ?? Math.floor(Math.random() * 10001),
    cluster,
    type: 'VOD',
    validFrom: resetSecondsToZero(startDateTime),
    validTo: '',
    recommendation: Object.values(recommendation),
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
