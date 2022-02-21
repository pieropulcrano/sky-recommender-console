import axios from 'axios';
import { createUrlQuery } from '../../utils/url';

/**
 * Retrieve all recommendations within the given dates.
 * @param {Objects} params - Object contains startDate end endDate values.
 * @returns {Array} The recommendations within the given dates.
 */

export async function getRec(params) {
  const query = createUrlQuery(params);
  const url = `${process.env.REACT_APP_API_RECOMMENDATIONS_URL}?${query}`;
  const res = await axios.get(url);
  return res.data;
}
