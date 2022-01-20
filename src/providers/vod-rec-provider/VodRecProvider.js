import axios from 'axios';
import { createUrlQuery } from '../../utils/url';

export async function getVodRec(id) {
  const url = `${process.env.REACT_APP_API_RECOMMENDATIONS_URL}?id=${id}`;
  const res = await axios.get(url);
  return res.data;
}

export async function getPrevVodRec(params) {
  const query = createUrlQuery(params);
  const url = `${process.env.REACT_APP_API_RECOMMENDATIONS_URL}?${query}`;
  const res = await axios.get(url);
  return res.data;
}

export async function getLastVodRec(url) {
  const res = await axios.get(url);
  return res.data;
}

export async function createVodRec(recVod) {
  const res = await axios.post(
    process.env.REACT_APP_API_RECOMMENDATIONS_URL,
    recVod,
  );
  return res.data;
}

export async function updateVodRec(id, recVod) {
  const res = await axios.put(
    `${process.env.REACT_APP_API_RECOMMENDATIONS_URL}/${id}`,
    recVod,
  );
  return res.data;
}

export async function deleteVodRec(id) {
  const url = `${process.env.REACT_APP_API_RECOMMENDATIONS_URL}/${id}`;
  const res = await axios.delete(url);
  return res.data;
}

export async function searchVodRec(params) {
  const query = createUrlQuery(params);
  const url = encodeURI(`${process.env.REACT_APP_API_EVENT_URL}?${query}`);

  const res = await axios.get(url);
  return res.data;
}

export async function getFallbackVodRec(url) {
  const res = await axios.get(url);
  return res.data;
}

export async function updateFallbackVodRec(fallbackVodRec) {
  const res = await axios.put(
    `${process.env.REACT_APP_API_FALLBACK_RECOMMENDATION_URL}/1`,
    fallbackVodRec,
  );
  return res.data;
}
