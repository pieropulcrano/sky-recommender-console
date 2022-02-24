/**
 * Return an error message, if come from server we have a data to show, else
 * we can get the standard message.
 * @param {Error} error) - The date as UTC String.
 * @returns {String} description of error.
 */

export default function getMessageError(error) {
  return error?.response?.data.hasOwnProperty('message')
    ? error.response.data.message
    : error.message;
}
