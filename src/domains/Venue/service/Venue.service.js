import BaseProvider from 'common/providers/Base.provider';
import parseResponse from 'utils/parseResponse';
import pipe from 'utils/pipe';

import VenueEntity from '../entities/Venue.enitity';

import VenueRepository from './Venue.repository';


const venueProvider = new BaseProvider(VenueEntity);

export default {
  async getVenueById(venueId) {
    const result = await pipe(
      VenueRepository.getById,
      parseResponse,
      async data => venueProvider.transform(await data),
    )(venueId);

    return result;
  },
};
