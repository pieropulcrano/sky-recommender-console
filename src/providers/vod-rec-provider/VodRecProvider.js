import axios from 'axios';
import { createUrlQuery } from '../../utils/url';

export async function getVodRec(id) {
  id = encodeURIComponent(id);
  const url = `${process.env.REACT_APP_API_RECOMMENDATION_URL}/${id}`;
  const res = await axios.get(url);
  return res.data;
}

export async function getPrevVodRec(params) {
  const query = createUrlQuery(params);
  const url = `${process.env.REACT_APP_API_RECOMMENDATION_URL}?${query}`;
  const res = await axios.get(url);
  return res.data;
}

export async function getLastVodRec(url) {
  const res = await axios.get(url);
  return res.data;
}

export async function createVodRec(recVod) {
  const res = await axios.post(
    process.env.REACT_APP_API_RECOMMENDATION_URL,
    recVod,
  );
  return res.data;
}

export async function updateVodRec(id, recVod) {
  id = encodeURIComponent(id);
  const res = await axios.put(
    `${process.env.REACT_APP_API_RECOMMENDATION_URL}/${id}`,
    recVod,
  );
  return res.data;
}

export async function deleteVodRec(id) {
  id = encodeURIComponent(id);
  const url = `${process.env.REACT_APP_API_RECOMMENDATION_URL}/${id}`;
  const res = await axios.delete(url);
  return res.data;
}

export async function searchVodRec(params) {
  const query = createUrlQuery(params);
  const url = `${process.env.REACT_APP_API_EVENT_URL}?${query}`;

  const res = await axios.get(url);
  return res.data.items;
}

export async function getFallbackVodRec(url) {
  const res = await axios.get(url);
  return res.data;
}

export async function updateFallbackVodRec(fallbackVodRec) {
  const res = await axios.put(
    `${process.env.REACT_APP_API_FALLBACK_RECOMMENDATION_URL}`,
    fallbackVodRec,
  );
  return res.data;
}
