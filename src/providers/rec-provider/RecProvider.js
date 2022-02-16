import axios from 'axios';
import { createUrlQuery } from '../../utils/url';

export async function getRec(params) {
  const query = createUrlQuery(params);
  const url = `${process.env.REACT_APP_API_RECOMMENDATIONS_URL}?${query}`;
  const res = await axios.get(url);
  return res.data;
}
