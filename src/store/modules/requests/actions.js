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

    // convert the fireBase's id to name
    newRequest.id = responseData.name;
    //  Get CoachId for using locally
    newRequest.coachId = payload.coachId;

    if (!response.ok) {
      // Throw error
      const error = new Error(responseData.message || 'Faild to fetch data!');
      throw error;
    }

    context.commit('addRequests', newRequest);
  },

  async fetchRequests(context) {
    const token = context.rootGetters.token;

    // Load Requests for ONLY currently active users
    // Getting UserId from our global state -> getters
    const coachId = context.rootGetters.userId;
    const response = await fetch(
      `https://vue-demo-coaching-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch the requests!'
      );
      throw error;
    }

    //  Converting Object Json Data to array => easy to push data
    const requests = [];
    //  Loop throw all Coach's requests and load them
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
