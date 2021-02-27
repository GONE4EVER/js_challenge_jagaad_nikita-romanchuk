import axiosInstance from '@/utils/axios';

export default {
  getById: async id => {
    const response = await axiosInstance.get(`/venues/${id}`);

    return response;
  },
};
