import axiosInstance from 'utils/axios';

export default {
  getById: async id => {
    const requestURI = `venues/${id}`;

    const response = await axiosInstance.get(requestURI);

    return response;
  },
};
