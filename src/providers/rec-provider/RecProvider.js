import axios from 'axios';
import { createUrlQuery } from '../../utils/url';

/**
 * Retrieve all recommendations within the given dates.
 * @param {Objects} params - Object contains startDate end endDate values.
 *  @param {Number} token - The token to validate the request.
 * @returns {Array} The recommendations within the given dates.
 */

export async function getRec(params, token) {
  const query = createUrlQuery(params);
  const url = `${process.env.REACT_APP_API_RECOMMENDATIONS_URL}?${query}`;
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
