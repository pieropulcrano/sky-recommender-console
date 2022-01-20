import useSWR from 'swr';
import { getFallbackVodRec } from '../providers/vod-rec-provider/VodRecProvider';

export default function useFallbackVodRec() {
  return useSWR(process.env.REACT_APP_API_FALLBACK_RECOMMENDATION_URL, (url) =>
    getFallbackVodRec(url),
  );
}
