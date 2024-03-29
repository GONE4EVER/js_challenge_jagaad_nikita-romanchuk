import BaseProvider from '@/common/providers/Base.provider';
import parseResponse from '@/utils/parseResponse';
import pipe from '@/utils/pipe';

import VenueEntity from './Venue.enitity';
import VenueRepository from './Venue.repository';


const venueProvider = new BaseProvider(VenueEntity);

export default {
  async getVenueById(venueId) {
    try {
      const result = await pipe(
        VenueRepository.getById,
        parseResponse,
        async data => venueProvider.transform(await data),
      )(venueId);

      return result;
    } catch (err) {
      return {
        error: true,
        payload: err.message,
      };
    }
  },
};
