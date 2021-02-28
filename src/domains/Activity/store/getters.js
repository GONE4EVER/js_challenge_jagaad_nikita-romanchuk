/* eslint import/prefer-default-export: 0 */
export const GET_ALL_ITEMS_FETCHED_FLAG = ({ meta }) => meta.total === meta.offset;

export const GET_ITEMS_PAGING_LENGTH = ({ meta }) => meta.total / meta.limit;
