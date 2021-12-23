import axios from 'axios';
import { createUrlQuery } from '../../utils/url';

export async function getRec(params) {
  const query = createUrlQuery(params);
  const url = encodeURI(`http://localhost:3001/recommendations?${query}`);
  const res = await axios.get(url);
  return res.data;
}
