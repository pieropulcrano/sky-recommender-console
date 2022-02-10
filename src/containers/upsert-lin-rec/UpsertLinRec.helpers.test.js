import {
  extractEventsToArray,
  prepareLinRec,
  normalizeLinRec,
} from './UpsertLinRec.helpers';

describe('UpsertLinRec component helpers', () => {
  const recommendationEvents = {
    1: {
      hd: { position: '1', title: 'test-title-hd', resolution: 'HD' },
      sd: { position: '1', title: 'test-title-sd', resolution: 'SD' },
    },
    2: {
      hd: { position: '2', title: 'test-title-hd', resolution: 'HD' },
      sd: { position: '2', title: 'test-title-sd', resolution: 'SD' },
    },
    3: {
      hd: { position: '3', title: 'test-title-hd', resolution: 'HD' },
      sd: { position: '3', title: 'test-title-sd', resolution: 'SD' },
    },
    4: {
      hd: { position: '4', title: 'test-title-hd', resolution: 'HD' },
      sd: { position: '4', title: 'test-title-sd', resolution: 'SD' },
    },
    5: {
      hd: { position: '5', title: 'test-title-hd', resolution: 'HD' },
      sd: { position: '5', title: 'test-title-sd', resolution: 'SD' },
    },
  };

  const arrayOfExtractedEvents = [
    { position: '1', title: 'test-title-hd', resolution: 'HD' },
    { position: '1', title: 'test-title-sd', resolution: 'SD' },
    { position: '2', title: 'test-title-hd', resolution: 'HD' },
    { position: '2', title: 'test-title-sd', resolution: 'SD' },
    { position: '3', title: 'test-title-hd', resolution: 'HD' },
    { position: '3', title: 'test-title-sd', resolution: 'SD' },
    { position: '4', title: 'test-title-hd', resolution: 'HD' },
    { position: '4', title: 'test-title-sd', resolution: 'SD' },
    { position: '5', title: 'test-title-hd', resolution: 'HD' },
    { position: '5', title: 'test-title-sd', resolution: 'SD' },
  ];

  describe('extractEventsToArray', () => {
    it('should extract correctly recommendation events in the given form shape to array contains event objects', () => {
      expect(extractEventsToArray(recommendationEvents)).toEqual(
        arrayOfExtractedEvents,
      );
    });
  });

  describe('prepareLinRec', () => {
    it('should transform data collected from the form in to the required shape', () => {
      const id = '1';
      const collectedData = {
        cluster: 'C1',
        startDateTime: '2021-12-27T15:00:00Z',
        endDateTime: '2021-12-28T15:00:00Z',
        recommendation: recommendationEvents,
      };

      expect(prepareLinRec(id, collectedData)).toEqual({
        id,
        cluster: 'C1',
        type: 'LIN',
        validFrom: new Date(collectedData.startDateTime),
        validTo: new Date(collectedData.endDateTime),
        recommendation: arrayOfExtractedEvents,
      });
    });
  });

  describe('normalizeLinRec', () => {
    it('should transform recommendation event in the shape accepted by the form', () => {
      expect(normalizeLinRec(arrayOfExtractedEvents)).toEqual(
        recommendationEvents,
      );
    });
  });
});
