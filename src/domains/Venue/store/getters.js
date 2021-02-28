export const GET_CURRENT_VENUE = state => {
  const { venuesList, current: { id: currentId } } = state;

  return venuesList.find(({ id }) => currentId === id) ?? null;
};

export const GET_ACTIVITIES_REQUEST_PARAMS = state => {
  const { id, meta } = state.current;
  const { limit, offset, sortBy } = meta;

  return {
    id,
    limit,
    offset,
    sortBy,
  };
};
