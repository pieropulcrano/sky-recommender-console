import useSWR from 'swr';
import { getLinRec } from '../providers/lin-rec-provider/LinRecProvider';

/**
 * Hook to retrieve a linear recommendation by id.
 * @param {String} recLinId - The id of the linear recommendation.
 * @returns {Object} - The requested linear recommendation.
 */

export default function useLinRec(recLinId) {
  return useSWR(recLinId ? `lin-vod/${recLinId}` : null, () =>
    getLinRec(recLinId),
  );
}
