import useSWR from 'swr';
import { getVodRec } from '../providers/vod-rec-provider/VodRecProvider';

/**
 * Hook to retrieve a vod recommendation by id.
 * @param {String} recVodId - The id of the vod recommendation.
 * @returns {Object} - The requested vod recommendation.
 */

export default function useVodRec(recVodId) {
  return useSWR(recVodId ? `rec-vod/${recVodId}` : null, () =>
    getVodRec(recVodId),
  );
}
