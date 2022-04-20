import axios from 'axios';

/**
 * Retrieve a linear recommendation by the provided id.
 * @param {String} id - The id of the linear recommendation
 * @returns {Object} The requested linear recommendation.
 */

export async function getLinRec(id, token) {
  id = encodeURIComponent(id);
  const url = `${process.env.REACT_APP_API_RECOMMENDATION_URL}/${id}`;
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

/**
 * Create a new linear recommendation from the given Object.
 * @param {Object} recLin - The given linear recommendation to create.
 * @returns {Object} The created recommendation.
 */

export async function createLinRec(recLin, token) {
  const res = await axios.post(
    process.env.REACT_APP_API_RECOMMENDATION_URL,
    recLin,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
}

export async function updateLinRec(id, recLin, token) {
  id = encodeURIComponent(id);
  const res = await axios.put(
    `${process.env.REACT_APP_API_RECOMMENDATION_URL}/${id}`,
    recLin,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
}

/**
 * Delete the linear recommendation with the given id.
 * @param {String} id - The id of the linear recommendation.
 * @returns {String} The id of deleted recommendation.
 */

export async function deleteLinRec(id, token) {
  id = encodeURIComponent(id);
  const url = `${process.env.REACT_APP_API_RECOMMENDATION_URL}/${id}`;
  const res = await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
