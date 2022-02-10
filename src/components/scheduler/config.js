export const recTypes = {
  vod: 'VOD',
  lin: 'LIN',
};

/**
 * Configuration for the rows dysplayed by the scheduler.
 * Children are the sub-row of each row.
 */

export const resources = [
  {
    id: 'cluster-1',
    title: 'CINEMA',
    children: [
      {
        id: 'vod-1',
        title: 'VOD',
        eventColor: 'orange',
      },
      {
        id: 'lin-1',
        title: 'LIN',
        eventColor: 'blue',
      },
    ],
  },
  {
    id: 'cluster-2',
    title: 'NO CINEMA',
    children: [
      {
        id: 'vod-2',
        title: 'VOD',
        eventColor: 'orange',
      },
      {
        id: 'lin-2',
        title: 'LIN',
        eventColor: 'blue',
      },
    ],
  },
];
