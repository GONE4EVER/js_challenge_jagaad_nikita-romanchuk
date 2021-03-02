export const GET_ALL_ITEMS_FETCHED_FLAG = ({ meta }) => meta.total === meta.offset;

export const IS_READY_FOR_FETCH = ({ meta }) => {
  const { offset, total } = meta;

  return Number.isInteger(offset) && Number.isInteger(total);
};
