import useSWR from 'swr';
import { getFallbackVodRec } from '../providers/vod-rec-provider/VodRecProvider';

/**
 * Hook to retrieve the fallback vod recommendation.
 * @returns {Object} - The requested fallback recommendation.
 */

export default function useFallbackVodRec(token) {
  return useSWR(process.env.REACT_APP_API_FALLBACK_RECOMMENDATION_URL, (url) =>
    getFallbackVodRec(url, token),
  );
}
