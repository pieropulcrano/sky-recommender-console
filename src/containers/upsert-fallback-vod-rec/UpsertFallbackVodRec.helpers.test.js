import {
  prepareFallbackVodRec,
  normalizeFallbackVodRec,
} from './UpsertFallbackVodRec.helpers';

describe('UpsertFallbackVodRec component helpers', () => {
  const recommendationEvents = {
    1: { type: 'VOD', title: 'test-title' },
    2: { type: 'VOD', title: 'test-title' },
    3: { type: 'VOD', title: 'test-title' },
    4: { type: 'VOD', title: 'test-title' },
    5: { type: 'VOD', title: 'test-title' },
  };

  const arrayOfExtractedEvents = [
    { type: 'VOD', title: 'test-title' },
    { type: 'VOD', title: 'test-title' },
    { type: 'VOD', title: 'test-title' },
    { type: 'VOD', title: 'test-title' },
    { type: 'VOD', title: 'test-title' },
  ];

  describe('prepareFallbackVodRec', () => {
    it('should transform data collected from the form in to the required shape', () => {
      const id = '1';
      const collectedData = {
        recommendation: recommendationEvents,
      };

      expect(prepareFallbackVodRec(id, collectedData)).toEqual({
        id,
        type: 'FALLBACK',
        recommendation: arrayOfExtractedEvents,
      });
    });
  });

  describe('normalizeFallbackVodRec', () => {
    it('should transform recommendation event in the shape accepted by the form', () => {
      expect(normalizeFallbackVodRec(arrayOfExtractedEvents)).toEqual(
        recommendationEvents,
      );
    });
  });
});
