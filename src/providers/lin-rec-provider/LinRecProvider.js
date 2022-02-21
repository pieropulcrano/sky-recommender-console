import axios from 'axios';
import { createUrlQuery } from '../../utils/url';

/**
 * Retrieve a linear recommendation by the provided id.
 * @param {String} id - The id of the linear recommendation
 * @returns {Object} The requested linear recommendation.
 */

export async function getLinRec(id) {
  id = encodeURIComponent(id);
  const url = `${process.env.REACT_APP_API_RECOMMENDATION_URL}/${id}`;
  const res = await axios.get(url);
  return res.data;
}

/**
 * Create a new linear recommendation from the given Object.
 * @param {Object} recLin - The given linear recommendation to create.
 * @returns {Object} The created recommendation.
 */

export async function createLinRec(recLin) {
  const res = await axios.post(
    process.env.REACT_APP_API_RECOMMENDATION_URL,
    recLin,
  );
  return res.data;
}

export async function updateLinRec(id, recLin) {
  id = encodeURIComponent(id);
  const res = await axios.put(
    `${process.env.REACT_APP_API_RECOMMENDATION_URL}/${id}`,
    recLin,
  );
  return res.data;
}

/**
 * Delete the linear recommendation with the given id.
 * @param {String} id - The id of the linear recommendation.
 * @returns {String} The id of deleted recommendation.
 */

export async function deleteLinRec(id) {
  id = encodeURIComponent(id);
  const url = `${process.env.REACT_APP_API_RECOMMENDATION_URL}/${id}`;
  const res = await axios.delete(url);
  return res.data;
}

/**
 * Search a linear event using the provided search keys.
 * @param {Object} params - Object contains the search keys.
 * @returns {Array} The result of the search.
 */

export async function searchLinRec(params) {
  const query = createUrlQuery(params);
  const url = `${process.env.REACT_APP_API_EVENT_URL}?${query}`;

  const res = await axios.get(url);
  return res.data;
}
