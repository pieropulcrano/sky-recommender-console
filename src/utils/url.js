export function createUrlQuery(params) {
  const query = Object.keys(params)
    .map((key) => key + '=' + encodeURIComponent(params[key]))
    .join('&');

  return query;
}
