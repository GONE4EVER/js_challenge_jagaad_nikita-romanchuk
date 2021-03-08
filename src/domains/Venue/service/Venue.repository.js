import axiosInstance from '@/utils/axios';

export default {
  getById: async id => {
    try {
      const requestURI = `venues/${id}`;

      const response = await axiosInstance.get(requestURI);

      return response;
    } catch (err) {
      throw new Error(err);
    }
  },
};
