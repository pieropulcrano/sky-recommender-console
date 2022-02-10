import { createUrlQuery } from './url';

describe('url utils', () => {
  describe('createUrlQuery', () => {
    it('should return query', () => {
      expect(
        createUrlQuery({
          validFrom_gte: '2022-02-01T00:00:00+01:00',
          validTo_lte: '2022-03-01T00:00:00+01:00',
        }),
      ).toEqual(
        'validFrom_gte=2022-02-01T00:00:00+01:00&validTo_lte=2022-03-01T00:00:00+01:00',
      );
    });
  });
});
