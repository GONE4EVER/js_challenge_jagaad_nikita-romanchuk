import BaseProvider from '@/common/providers/Base.provider';
import pipe from '@/utils/pipe';

import VenueEntity from '../entities/Venue.enitity';
import VenueRepository from '../repositories/Venue.repository';


const venueProvider = new BaseProvider(VenueEntity);

export default {
  async getVenueById(venueId) {
    const result = await pipe(VenueRepository.getById, async res => {
      const { data, error } = await res;

      if (error) {
        throw new Error(error.message);
      }

      return venueProvider.mapStructureToEntity(data);
    })(venueId);

    return result;
  },
};
