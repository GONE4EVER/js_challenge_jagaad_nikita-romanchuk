import BaseProvider from 'common/providers/Base.provider';
import pipe from 'utils/pipe';

import ActivityEntity from '../entities/Activity.entity';
import VenueEntity from '../entities/Venue.enitity';
import VenueRepository from '../repositories/Venue.repository';


const venueProvider = new BaseProvider(VenueEntity);
const activityProvider = new BaseProvider(ActivityEntity);

export default {
  async getVenueById(venueId) {
    const result = await pipe(
      VenueRepository.getById,
      async res => {
        const { data, error } = await res;

        if (error) {
          throw new Error(error.message);
        }

        return venueProvider.mapStructureToEntity(data);
      },
    )(venueId);

    return result;
  },
  async getVenueActivities() {
    const result = await pipe(
      VenueRepository.getActivitiesById,
      async res => {
        const { data, error } = await res;

        if (error) {
          throw new Error(error.message);
        }

        return activityProvider.mapStructureToEntity(data);
      },
    );

    return result;
  },
};
