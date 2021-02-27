import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import state from './state';

const venuesModuleName = 'venues';

export { venuesModuleName };

export default {
  namespaced: true,

  state,

  actions,
  getters,
  mutations,
};
