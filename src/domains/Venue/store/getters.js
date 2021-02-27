/* eslint import/prefer-default-export: 0 */
export const GET_CURRENT_VENUE = state => {
  const { list, currentId } = state;

  return list.find(({ id }) => currentId === id);
};
