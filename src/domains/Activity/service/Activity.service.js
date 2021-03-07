import BaseProvider from '@/common/providers/Base.provider';
import parseResponse from '@/utils/parseResponse';
import pipe from '@/utils/pipe';

import ActivityEntity from './Activity.entity';
import ActivityRepository from './Activity.repository';

const activityProvider = new BaseProvider(ActivityEntity);

export default {
  async getVenueActivities(venueId, query) {
    const result = await pipe(
      ActivityRepository.getActivitiesByVenueId,
      parseResponse,
      async data => activityProvider.transform(await data),
    )(venueId, query);

    return result;
  },
};
