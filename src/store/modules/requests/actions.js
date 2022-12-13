export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `https://vue-demo-coaching-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );
    const responseData = await response.json();

    // Catching errors
    if (!response.ok) {
      // throw error
      const error = new Error(responseData.message || 'Failed to send data!');
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;
    context.commit('addRequests', newRequest);
  },
  async fetchRequests(context) {
    // Load Requests for ONLY currently active users
    // Getting UserId from our global state -> getters
    const coachId = context.rootGetters.userId;
    const response = await fetch(
      `https://vue-demo-coaching-default-rtdb.firebaseio.com/requests/${coachId}.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch the requests!'
      );
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(request);
    }
    context.commit('loadRequests', requests);
  },
};
