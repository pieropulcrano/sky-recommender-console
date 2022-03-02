import axios from 'axios';

/**
 * Create a new linear recommendation from the given Object.
 * @param {Object} recLin - The given linear recommendation to create.
 * @returns {Object} The created recommendation.
 */

export async function loginUser(credentials) {
  const res = await axios.post(
    process.env.REACT_APP_API_LOGIN_URL,
    credentials,
  );
  return res.data;
}
