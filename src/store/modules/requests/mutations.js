export default {
  addRequests(state, payload) {
    state.requests.push(payload);
  },
  loadRequests(state, payload) {
    state.requests = payload;
  },
};
