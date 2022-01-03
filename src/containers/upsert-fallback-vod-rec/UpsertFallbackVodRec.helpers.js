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

export const normalizeFallbackVodRec = (fallbackVodRec) =>
  fallbackVodRec.reduce(
    (acc, curr, index) => ({ ...acc, [index + 1]: curr }),
    {},
  );
