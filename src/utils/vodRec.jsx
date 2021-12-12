import { formatToISOString } from './date';

export const prepareVodRec = ({ cluster, startDateTime, recommendation }) => {
  return {
    id: Math.floor(Math.random() * 101),
    cluster,
    type: 'VOD',
    validFrom: formatToISOString(startDateTime),
    validTo: '',
    recommendation: Object.values(recommendation),
  };
};

export const prepareFallbackVodRec = (id, { recommendation }) => {
  const noPositionIndexes = Object.values(recommendation).map((rec) => {
    delete rec.position;
    return rec;
  });
  return {
    id,
    type: 'FALLBACK',
    recommendation: noPositionIndexes,
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

export const normalizeFallbackVodRec = (fallbackVodRec) =>
  fallbackVodRec.reduce(
    (acc, curr, index) => ({ ...acc, [index + 1]: curr }),
    {},
  );
