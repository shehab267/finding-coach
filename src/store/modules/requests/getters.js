export default {
  // Here we need to output onlu requests which linked to the Registerd Coach

  requests(state, _, _2, rootGetters) {
    const coachId = rootGetters.userId;
    // console.log(state.requests);
    return state.requests.filter((req) => coachId === req.coachId);
  },
  //  now We access filterd Requests => getters NOT store
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  },
};
