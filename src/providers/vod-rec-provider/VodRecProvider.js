import axios from 'axios';
import { createUrlQuery } from '../../utils/url';

export async function getVodRec(id) {
  const url = `http://localhost:3001/recommendations?id=${id}`;
  const res = await axios.get(url);
  return res.data;
}

export async function getPrevVodRec(params) {
  const query = createUrlQuery(params);
  const url = `http://localhost:3001/recommendations?${query}`;
  const res = await axios.get(url);
  return res.data;
}

export async function getLastVodRec(url) {
  const res = await axios.get(url);
  return res.data;
}

export async function createVodRec(recVod) {
  const res = await axios.post('http://localhost:3001/recommendations', recVod);
  return res.data;
}

export async function updateVodRec(id, recVod) {
  const res = await axios.put(
    `http://localhost:3001/recommendations/${id}`,
    recVod,
  );
  return res.data;
}

export async function deleteVodRec(id) {
  const url = `http://localhost:3001/recommendations/${id}`;
  const res = await axios.delete(url);
  return res.data;
}

export async function searchVodRec(params) {
  const query = createUrlQuery(params);
  const url = encodeURI(`http://localhost:3001/event?${query}`);

  const res = await axios.get(url);
  return res.data;
}

export async function getFallbackVodRec(url) {
  const res = await axios.get(url);
  return res.data;
}

export async function updateFallbackVodRec(fallbackVodRec) {
  const res = await axios.put(
    'http://localhost:3001/fallback-vod-recommendation/1',
    fallbackVodRec,
  );
  return res.data;
}
