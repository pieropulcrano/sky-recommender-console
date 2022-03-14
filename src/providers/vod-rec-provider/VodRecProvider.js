import axios from 'axios';
import { createUrlQuery } from '../../utils/url';

/**
 * Retrieve a vod recommendation by the provided id.
 * @param {String} id - The id of the vod recommendation
 * @returns {Object} The requested vod recommendation.
 */

export async function getVodRec(id) {
  id = encodeURIComponent(id);
  const url = `${process.env.REACT_APP_API_RECOMMENDATION_URL}/${id}`;
  const res = await axios.get(url);
  return res.data;
}

/**
 * Returns the vod recommendation immediately preceding the one to be created.
 * @param {String} id - The id of the vod recommendation
 * @returns {Object} The requested vod recommendation.
 */

export async function getPrevVodRec(params) {
  const query = createUrlQuery(params);
  const url = `${process.env.REACT_APP_API_RECOMMENDATION_URL}?${query}`;
  const res = await axios.get(url);
  return res.data;
}

/**
 * Create a new vod recommendation from the given Object.
 * @param {Object} recVod - The given vod recommendation to create.
 * @returns {Object} The created vod recommendation.
 */

export async function createVodRec(recVod) {
  const res = await axios.post(
    process.env.REACT_APP_API_RECOMMENDATION_URL,
    recVod,
  );
  return res.data;
}

/**
 * Update a vod recommendation by using the given Object.
 * @param {String} id - The id of the vod recommendation to update.
 * @param {Object} recLin - The given vod recommendation to update.
 * @returns {Object} The updated vod recommendation.
 */

export async function updateVodRec(id, recVod) {
  id = encodeURIComponent(id);
  const res = await axios.put(
    `${process.env.REACT_APP_API_RECOMMENDATION_URL}/${id}`,
    recVod,
  );
  return res.data;
}

/**
 * Delete the vod recommendation with the given id.
 * @param {String} id - The id of the vod recommendation.
 * @returns {String} The id of deleted recommendation.
 */

export async function deleteVodRec(id) {
  id = encodeURIComponent(id);
  const url = `${process.env.REACT_APP_API_RECOMMENDATION_URL}/${id}`;
  const res = await axios.delete(url);
  return res.data;
}

/**
 * Retrieve a fallback vod recommendation by using the provided id.
 * @param {String} id - The id of the vod recommendation
 * @returns {Object} The requested vod recommendation.
 */

export async function getFallbackVodRec(url) {
  const res = await axios.get(url);
  return res.data;
}

/**
 * Update a fallback vod recommendation by using the given Object.
 * @param {String} id - The id of the fallback vod recommendation to update.
 * @param {Object} recLin - The given fallback vod recommendation to update.
 * @returns {Object} The updated fallback vod recommendation.
 */

export async function updateFallbackVodRec(fallbackVodRec) {
  const res = await axios.put(
    `${process.env.REACT_APP_API_FALLBACK_RECOMMENDATION_URL}`,
    fallbackVodRec,
  );
  return res.data;
}
