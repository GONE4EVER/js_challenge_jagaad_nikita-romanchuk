import axiosInstance from 'utils/axios';

export default {
  getById: async id => {
    const requestURI = `venues/${id}`;

    const response = await axiosInstance.get(requestURI);

    return response;
  },
  getActivitiesById: async params => {
    const {
      id,
      limit,
      offset,
      sortBy,
    } = params;
    const requestURI = `venues/${id}/activities`;

    const response = await axiosInstance
      .get(requestURI, { limit, offset, sortBy });

    return response;
  },
};
