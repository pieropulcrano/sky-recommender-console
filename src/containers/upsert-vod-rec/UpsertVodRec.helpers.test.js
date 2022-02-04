import { prepareVodRec, normalizeVodRec } from './UpsertVodRec.helpers';

describe('UpsertVodRec component helpers', () => {
  const recommendationEvents = {
    1: { position: '1', type: 'VOD', title: 'test-title' },
    2: { position: '2', type: 'VOD', title: 'test-title' },
    3: { position: '3', type: 'VOD', title: 'test-title' },
    4: { position: '4', type: 'VOD', title: 'test-title' },
    5: { position: '5', type: 'VOD', title: 'test-title' },
  };

  const arrayOfExtractedEvents = [
    { position: '1', type: 'VOD', title: 'test-title' },
    { position: '2', type: 'VOD', title: 'test-title' },
    { position: '3', type: 'VOD', title: 'test-title' },
    { position: '4', type: 'VOD', title: 'test-title' },
    { position: '5', type: 'VOD', title: 'test-title' },
  ];

  describe('prepareVodRec', () => {
    it('should transform data collected from the form in to the required shape', () => {
      const id = '1';
      const collectedData = {
        cluster: 'C1',
        startDateTime: '2021-12-27T15:00:00Z',
        recommendation: recommendationEvents,
      };

      expect(prepareVodRec(id, collectedData)).toEqual({
        id,
        cluster: 'C1',
        type: 'VOD',
        validFrom: new Date(collectedData.startDateTime),
        validTo: '',
        recommendation: arrayOfExtractedEvents,
      });
    });
  });

  describe('normalizeVodRec', () => {
    it('should transform recommendation event in the shape accepted by the form', () => {
      expect(normalizeVodRec(arrayOfExtractedEvents)).toEqual(
        recommendationEvents,
      );
    });
  });
});
