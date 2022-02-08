import { recTypes } from './config';

/**
 * Associate a recommendation to one of the scheduler rows.
 * @param {String} cluster - The cluster that the recommendation is associated with.
 * @param {String} type - The type of recommendation
 * @returns {String} - The id of the scheduler row to which the recommendation is associated.
 */

function getResourceId(cluster, type) {
  if (cluster === 'C1' && type === recTypes.vod) return 'vod-1';
  if (cluster === 'C1' && type === recTypes.lin) return 'lin-1';
  if (cluster === 'C2' && type === recTypes.vod) return 'vod-2';
  if (cluster === 'C2' && type === recTypes.lin) return 'lin-2';
}

/**
 * Map the recommendations data in the shape required by the scheduler component.
 * @param {Array} recommendations - The array containing the recommendations.
 * @returns {Array} - The array containing the recommendations in the required shape.
 */

export function mapForScheduler(recommendations) {
  if (!recommendations) throw new Error('No recommendations provided.');
  return recommendations.map((rec) => ({
    id: rec.id,
    title: rec.type,
    resourceId: getResourceId(rec.cluster, rec.type),
    start: rec.validFrom,
    end: rec.validTo,
    extraProps: rec,
  }));
}
