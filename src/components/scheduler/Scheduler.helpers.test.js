import { mapForScheduler } from './Scheduler.helpers';
import recommendation from '../../../fixtures/recomendation-mock.json';

describe('Scheduler helpers', () => {
  it('should transform the given recommendations in the shape accepted by the scheduler', () => {
    expect(mapForScheduler(recommendation)).toMatchSnapshot();
  });

  it('should throw an exception if no recommendations are provided', () => {
    expect(() => mapForScheduler(undefined)).toThrowError(
      'No recommendations provided.',
    );
  });
});
