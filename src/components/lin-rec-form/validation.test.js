import { validationSchema } from './validation';

describe('Rec lin form validation', () => {
  it('should warn the user if the end date of the recommendation is not later than the start date', async () => {
    const formData = {
      cluster: 'Cluster 1',
      startDateTime: '2999-12-28T08:00:00Z',
      endDateTime: '2999-12-28T08:00:00Z',
      recommendation: {
        1: { sd: { title: 'test-event', position: 'test-position' }, hd: {} },
        2: { sd: {}, hd: {} },
        3: { sd: {}, hd: {} },
        4: { sd: {}, hd: {} },
        5: { sd: {}, hd: {} },
      },
    };

    try {
      await validationSchema.validate(formData);
    } catch (error) {
      expect(error.message).toEqual('End date should be after initial date');
    }
  });

  it('should warn the user if at least one event Hd or Sd is not provided at position 1', async () => {
    const formData = {
      cluster: 'Cluster 1',
      startDateTime: '2999-12-28T08:00:00Z',
      endDateTime: '2999-12-28T08:00:00Z',
      recommendation: {
        1: { sd: {}, hd: {} },
        2: { sd: {}, hd: {} },
        3: { sd: {}, hd: {} },
        4: { sd: {}, hd: {} },
        5: { sd: {}, hd: {} },
      },
    };

    try {
      await validationSchema.validate(formData);
    } catch (error) {
      expect(error.message).toEqual('End date should be after initial date');
    }
  });

  it('should warn the user if he has not filled all previous slots (before the last filled) with at least one hd / sd event', async () => {
    const formData = {
      cluster: 'Cluster 1',
      startDateTime: '2999-12-28T08:00:00Z',
      endDateTime: '2999-12-31T08:00:00Z',
      recommendation: {
        1: { sd: {}, hd: {} },
        2: { sd: {}, hd: {} },
        3: { sd: {}, hd: {} },
        4: { sd: {}, hd: {} },
        5: { sd: { title: 'test-event', position: 'test-position' }, hd: {} },
      },
    };

    try {
      await validationSchema.validate(formData);
    } catch (error) {
      expect(error.message).toEqual(
        'recommendation.4.sd.title is a required field',
      );
    }
  });
});
