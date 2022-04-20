/**
 * Search an event using the provided search keys.
 * @param {Object} params - Object contains the search keys.
 * @returns {Array} The result of the search.
 */

import axios from 'axios';
import { createUrlQuery } from '../../utils/url';

export async function searchEvent(params, token) {
  const query = createUrlQuery(params);
  const url = `${process.env.REACT_APP_API_EVENT_URL}?${query}`;

  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.items;
}
