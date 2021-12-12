import useSWR from 'swr';
import { getFallbackVodRec } from '../providers/vod-rec-provider/VodRecProvider';

export default function useFallbackVodRec() {
  return useSWR('http://localhost:3001/fallback-vod-recommendation', (url) =>
    getFallbackVodRec(url),
  );
}
