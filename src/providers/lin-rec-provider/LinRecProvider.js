import axios from 'axios';
import { createUrlQuery } from '../../utils/url';

export async function getLinRec(id) {
  const url = `${process.env.REACT_APP_API_RECOMMENDATIONS_URL}?id=${id}`;
  const res = await axios.get(url);
  return res.data;
}

export async function createLinRec(recVod) {
  const res = await axios.post(
    process.env.REACT_APP_API_RECOMMENDATIONS_URL,
    recVod,
  );
  return res.data;
}

export async function updateLinRec(id, recVod) {
  const res = await axios.put(
    `${process.env.REACT_APP_API_RECOMMENDATIONS_URL}/${id}`,
    recVod,
  );
  return res.data;
}

export async function deleteLinRec(id) {
  const url = `${process.env.REACT_APP_API_RECOMMENDATIONS_URL}/${id}`;
  const res = await axios.delete(url);
  return res.data;
}

export async function searchLinRec(params) {
  const query = createUrlQuery(params);
  const url = encodeURI(`${process.env.REACT_APP_API_EVENT_URL}?${query}`);

  const res = await axios.get(url);
  return res.data;
}
