export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  // return TRUE, when find new coach has the userId
  // isCoach(state, getters, rootState, rootGetters)
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    // SOME is a build in method return Boolean if found at least one element
    return coaches.some((coach) => coach.id === userId);
  },
  shouldUpdate(state) {
    // Update the list every minute
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTime = new Date().getTime();
    return (currentTime - lastFetch) / 1000 > 60;
  },
};
