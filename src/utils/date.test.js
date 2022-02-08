import {
  isExpired,
  formatToHumanReadable,
  resetSecondsToZero,
  nowIsBetweenTwoDates,
} from './date';

describe('date utils', () => {
  const isExpiredData = {
    expiredDate: '1970-02-25T16:47:00.000Z',
    notExpiredDate: '2999-02-25T16:47:00.000Z',
  };
  const formatToHumanReadableData = {
    dateToFormat: '2021-12-26T15:00:00.000Z',
    dateFormatted: '26.12.2021 16:00',
  };
  const resetSecondsToZeroData = {
    dateToResetSeconds: '2022-02-07T12:00:01Z',
    dateResettedSecons: new Date('2022-02-07T12:00:00.000Z'),
  };
  const nowIsBetweenTwoDatesoData = {
    startDateInRange: '1970-02-25T16:47:00.000Z',
    endDateInRange: '2999-02-25T16:47:00.000Z',
    startDateNotInRange: '2999-02-25T16:47:00.000Z',
    endDateNotInRange: '3000-02-25T16:47:00.000Z',
  };

  describe('isExpired', () => {
    it('should return true if a date is expired', () => {
      expect(isExpired(isExpiredData.expiredDate)).toEqual(true);
    });
    it('should return false if a date is not expired', () => {
      expect(isExpired(isExpiredData.notExpiredDate)).toEqual(false);
    });
  });
  describe('formatToHumanReadable', () => {
    it('should return a date formatted', () => {
      expect(
        formatToHumanReadable(formatToHumanReadableData.dateToFormat),
      ).toEqual(formatToHumanReadableData.dateFormatted);
    });
  });
  describe('resetSecondsToZero', () => {
    it('should a date second setted to 0', () => {
      expect(
        resetSecondsToZero(resetSecondsToZeroData.dateToResetSeconds),
      ).toEqual(resetSecondsToZeroData.dateResettedSecons);
    });
  });
  describe('nowIsBetweenTwoDates', () => {
    it('should return true if today is in range', () => {
      expect(
        nowIsBetweenTwoDates(
          nowIsBetweenTwoDatesoData.startDateInRange,
          nowIsBetweenTwoDatesoData.endDateInRange,
        ),
      ).toEqual(true);
    });
    it('should return false if today is not in range', () => {
      expect(
        nowIsBetweenTwoDates(
          nowIsBetweenTwoDatesoData.startDateNotInRange,
          nowIsBetweenTwoDatesoData.endDateNotInRange,
        ),
      ).toEqual(false);
    });
  });
});
