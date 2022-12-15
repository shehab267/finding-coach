export default {
  login() {},
  async signup(context, payload) {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBb4jsIgh9_iDeKHjVOnzXwJq_Bs-4jaX8',
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      // const error = new Error(response.message || 'Faild to authenticate!');
            const error = new Error(
              `Faild to authenticate, ${responseData.error.message.toLowerCase()}!`
            );
      throw error;
    }
    console.log(responseData);
    // Commit the response at mutations and pass appropriate payload obj
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
};
