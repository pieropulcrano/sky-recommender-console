export const prepareFallbackVodRec = (id, { recommendation }) => {
  const noPositionIndexes = Object.values(recommendation).map((rec) => {
    delete rec.position;
    return rec;
  });
  return {
    type: 'FALLBACK',
    validFrom: '1970-10-01T00:00:00Z',
    validTo: '2099-12-31T23:59:59Z',
    recommendation: noPositionIndexes,
  };
};

export const normalizeFallbackVodRec = (fallbackVodRec) =>
  fallbackVodRec.reduce(
    (acc, curr, index) => ({ ...acc, [index + 1]: curr }),
    {},
  );
