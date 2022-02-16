import { createUrlQuery } from './url';

describe('url utils', () => {
  describe('createUrlQuery', () => {
    it('should return query', () => {
      expect(
        createUrlQuery({
          validFrom: '2022-02-02T23:00:00Z',
          validTo: '2022-03-03T23:00:00Z',
        }),
      ).toEqual(
        'validFrom=2022-02-02T23%3A00%3A00Z&validTo=2022-03-03T23%3A00%3A00Z',
      );
    });
  });
});
