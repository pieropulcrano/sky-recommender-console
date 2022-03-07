export const recTypes = {
  vod: 'VOD',
  lin: 'LIN',
};

export const translateRecTypes = {
  VOD: 'VOD',
  LIN: 'Lienar',
};
/**
 * Configuration for the rows dysplayed by the scheduler.
 * Children are the sub-row of each scheduler row.
 */

export const resources = [
  {
    cluster: 'Cinema',
    id: 'vod-1',
    title: 'VOD',
    eventColor: 'orange',
  },
  {
    cluster: 'Cinema',
    id: 'lin-1',
    title: 'LIN',
    eventColor: 'blue',
  },

  {
    cluster: 'No Cinema',
    id: 'vod-2',
    title: 'VOD',
    eventColor: 'orange',
  },
  {
    cluster: 'No Cinema',
    id: 'lin-2',
    title: 'LIN',
    eventColor: 'blue',
  },
];

export const resourceAreaColumns=[
  {
    group: true,
    field: 'cluster',
    headerContent: 'Clusters',
  },
  {
    field: 'title',
    headerContent: 'Type',
  },
]
