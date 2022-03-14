import * as utc from 'dayjs/plugin/utc';
const dayjs = require('dayjs');

dayjs.extend(utc);
// const customParseFormat = require('dayjs/plugin/customParseFormat');

export const generateFutureDate = (plusDate, format) => {
  let tomorrow = dayjs().add(plusDate, 'day');
  if (!format) return dayjs(tomorrow).utc().format();
  return dayjs(tomorrow).format(format);
};

export const generatePastDate = (subDate, unit, format) => {
  let tomorrow = dayjs().subtract(subDate, unit);
  if (!format) return dayjs(tomorrow).utc().format();
  return dayjs(tomorrow).format(format);
};

export const setDay = (day) => {
  let date = dayjs().set('date', day);
  return dayjs(date).utc().format();
};
