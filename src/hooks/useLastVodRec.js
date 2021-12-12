import useSWR from 'swr';
import { getLastVodRec } from '../providers/vod-rec-provider/VodRecProvider';

export default function useLastVodRec(recVodId) {
  return useSWR(
    recVodId ? null : `http://localhost:3001/last-vod-recommendation`,
    (url) => getLastVodRec(url),
    {
      shouldRetryOnError: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
}
