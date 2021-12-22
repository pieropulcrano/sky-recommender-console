import axios from 'axios';

export async function getVodRec(id) {
  // todo use axios
}

export async function getLastVodRec(url) {
  const res = await axios.get(url);
  return res.data;
}

export async function createVodRec(recVod) {
  const res = await axios.post(
    'http://localhost:3001/create-vod-recommendation',
    recVod,
  );
  return res.data;
}

export async function updateVodRec(id, recVod) {
  const res = await axios.put(
    'http://localhost:3001/update-vod-recommendation',
    recVod,
  );
  return res.data;
}

export async function searchVodRec(params) {
  const query = Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&');

  const url = `http://localhost:3001/search-vod-recommendation?${query}`;

  const res = await axios.get(encodeURI(url));
  return res.data;
}

export async function getFallbackVodRec(url) {
  const res = await axios.get(url);
  return res.data;
}

export async function updateFallbackVodRec(fallbackVodRec) {
  const res = await axios.put(
    'http://localhost:3001/fallback-vod-recommendation/94',
    fallbackVodRec,
  );
  return res.data;
}
