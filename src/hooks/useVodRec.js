import useSWR from 'swr';
import { getVodRec } from '../providers/vod-rec-provider/VodRecProvider';

export default function useVodRec(recVodId) {
  return useSWR(recVodId ? `rec-vod/${recVodId}` : null, () =>
    getVodRec(recVodId),
  );
}
