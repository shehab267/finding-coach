export default {
  async login(context, payload) {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBb4jsIgh9_iDeKHjVOnzXwJq_Bs-4jaX8',
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
      let msg = null;

      if (responseData.error.message === 'INVALID_PASSWORD') {
        msg = 'The password is invalid';
      } else if (responseData.error.message === 'EMAIL_NOT_FOUND') {
        msg = 'The Email is invalid';
      } else if (responseData.error.message === 'USER_DISABLED') {
        msg = 'The user account has been disabled by an administrator';
      }
      const error = new Error(`Faild to authenticate, ${msg}!`);
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
      let msg = null;
      // const error = new Error(response.message || 'Faild to authenticate!');
      if (responseData.error.message === 'EMAIL_EXISTS') {
        msg = 'The email address is already in use by another account';
      }
      if (responseData.error.message === 'OPERATION_NOT_ALLOWED') {
        msg = ' Password sign-in is disabled for this project';
      } else if (responseData.error.message === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
        msg =
          'We have blocked all requests from this device due to unusual activity. Try again later';
      }
      const error = new Error(`Faild to authenticate, ${msg}!`);
      // const error = new Error(response.message || 'Faild to authenticate!');
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
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};
