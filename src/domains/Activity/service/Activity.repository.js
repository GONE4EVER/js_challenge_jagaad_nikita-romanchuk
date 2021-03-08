import axiosInstance from '@/utils/axios';

export default {
  getActivitiesByVenueId: async (venueId, query) => {
    const {
      limit,
      offset,
      sortBy,
    } = query;
    const requestURI = `venues/${venueId}/activities`;

    const response = await axiosInstance
      .get(requestURI, {
        params: { limit, offset, sort_by: sortBy },
      });

    return response;
  },
};
