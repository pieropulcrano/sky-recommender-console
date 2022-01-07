import axios from 'axios';
import { createUrlQuery } from '../../utils/url';

export async function getLinRec(id) {
  const url = `http://localhost:3001/recommendations?id=${id}`;
  const res = await axios.get(url);
  return res.data;
}

export async function createLinRec(recVod) {
  const res = await axios.post('http://localhost:3001/recommendations', recVod);
  return res.data;
}

export async function updateLinRec(id, recVod) {
  const res = await axios.put(
    `http://localhost:3001/recommendations/${id}`,
    recVod,
  );
  return res.data;
}

export async function deleteLinRec(id) {
  const url = `http://localhost:3001/recommendations/${id}`;
  const res = await axios.delete(url);
  return res.data;
}

export async function searchLinRec(params) {
  const query = createUrlQuery(params);
  const url = encodeURI(`http://localhost:3001/event?${query}`);

  const res = await axios.get(url);
  return res.data;
}
