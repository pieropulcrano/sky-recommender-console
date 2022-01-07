import useSWR from 'swr';
import { getLinRec } from '../providers/lin-rec-provider/LinRecProvider';

export default function useLinRec(recLinId) {
  return useSWR(recLinId ? `lin-vod/${recLinId}` : null, () =>
    getLinRec(recLinId),
  );
}
