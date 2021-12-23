function getResourceId(cluster, type) {
  if (cluster === 'C1' && type === 'VOD') return 'vod-1';
  if (cluster === 'C1' && type === 'LIN') return 'lin-1';
  if (cluster === 'C2' && type === 'VOD') return 'vod-2';
  if (cluster === 'C2' && type === 'LIN') return 'lin-2';
}

export function mapForScheduler(recommendations) {
  return recommendations.map((rec) => {
    return {
      id: rec.id,
      title: rec.type,
      resourceId: getResourceId(rec.cluster, rec.type),
      start: rec.validFrom,
      end: rec.validTo,
      extraProps: rec,
    };
  });
}
