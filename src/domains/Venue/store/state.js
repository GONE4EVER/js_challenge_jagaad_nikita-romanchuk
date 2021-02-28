const DEFAULT_SORTING = 'relevance';

const venuesState = {
  venuesList: [],

  meta: {
    fetching: false,
    error: null,
  },

  current: {
    id: null,
    activitiesList: [], //

    meta: {
      error: null,
      fetching: false,

      limit: null, //
      offset: 0, //

      sortBy: DEFAULT_SORTING, //
    },
  },
};

export default venuesState;
