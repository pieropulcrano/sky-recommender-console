/**
 * When invoked, transform an object contains all query params in a query string url.
 * @param {Object} params - Url query params.
 * @returns {String} The url query string.
 */

export function createUrlQuery(params) {
  const query = Object.keys(params)
    .map((key) => key + '=' + encodeURIComponent(params[key]))
    .join('&');

  return query;
}
