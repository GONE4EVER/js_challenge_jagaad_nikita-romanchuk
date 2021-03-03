const DEFAULT_LIMIT = Number(process.env.VUE_APP_DEFAULT_ACTIVITIES_LIMIT);
const DEFAULT_SORTING = 'relevance';

const activitiesState = {
  list: [],
  order: [],

  error: null,
  meta: {
    fetching: false,

    limit: DEFAULT_LIMIT,
    offset: null,
    total: null,

    sortBy: DEFAULT_SORTING,
  },

  cart: {
    list: [],
  },

  wishlist: {
    list: [],
  },
};

export default activitiesState;
