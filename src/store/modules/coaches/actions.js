export default {
  async registerCoach(context, data) {
    // Transforming the incomming data to proper Data

    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      description: data.desc,
      hourlyRate: data.rate,
    };

    const token = context.rootGetters.token;

    // Fetch data with Vuex using 'fireBase'
    const response = await fetch(
      `https://vue-demo-coaching-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      {
        // 'PUT' request => overWritten data if existed, or created if not
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );
    const responseData = await response.json();

    // Catching errors
    if (!response.ok) {
      // Throw error
      const error = new Error(responseData.message || 'Something went wrong!');
      throw error;
    }

    //  adding the fixed data to the action
    context.commit('registerCoach', {
      //  Merge the coach data with userId
      //  **I didn't send userId to the server, Because it would be doplicated with in the fetch request, So I will merge it here for the locally using sake
      ...coachData,
      id: userId,
    });
  },
  async loadCoaches(context, payload) {
    // Cheack should upload the data
    // ForceRefresh logic:
    // "we don't need to refresh when loadCoaches is Called from Created Life Cycle, but onClick refresh inside the page"
    //  - pass Boolean to paylod to loadCoaches action on click Refresh

    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://vue-demo-coaching-default-rtdb.firebaseio.com/coaches.json`
    );
    const responseData = await response.json();
    // Catching Errors
    if (!response.ok) {
      const error = new Error(responseData.message || 'Faild to fetch!');
      throw error;
    }

    //  Converting Object Json Data to array => easy to push data
    const coaches = [];
    //  Define new coaches
    // Go through entire responseData "Object full of Coaches" => get each id as 'KEY' => constract newCoach with the same format as CoachData
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
    // Store time with every fetching
    context.commit('setFetchTimeStamp');
  },
};
