export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      // copy existing payload
      ...payload,
      mode: 'login',
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },

  async auth(context, payload) {
    //  mode = (login | signup)
    const mode = payload.mode;
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBb4jsIgh9_iDeKHjVOnzXwJq_Bs-4jaX8';
    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBb4jsIgh9_iDeKHjVOnzXwJq_Bs-4jaX8';
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      let msg = null;
      // SignUp Errors
      if (responseData.error.message === 'EMAIL_EXISTS') {
        msg = 'The email address is already in use by another account';
      } else if (responseData.error.message === 'OPERATION_NOT_ALLOWED') {
        msg = ' Password sign-in is disabled for this project';
      } else if (responseData.error.message === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
        msg =
          'We have blocked all requests from this device due to unusual activity. Try again later';
      } // Login Errors
      else if (responseData.error.message === 'INVALID_PASSWORD') {
        msg = 'The password is invalid';
      } else if (responseData.error.message === 'EMAIL_NOT_FOUND') {
        msg = 'The Email is invalid';
      } else if (responseData.error.message === 'USER_DISABLED') {
        msg = 'The user account has been disabled by an administrator';
      }

      const error = new Error(`Faild to authenticate, ${msg}!`);
      // const error = new Error(response.message || 'Faild to authenticate!');
      throw error;
    }

    // Save the data in local storage for auto login
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);

    // Commit the response at mutations and pass appropriate payload obj
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
  // Auto login 'triggered in the app.vue' start creating the application
  tryLogin(context) {
    const token = localStorage.token;
    const userId = localStorage.userId;

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId,
        tokenExpiration: null,
      });
    }
  },
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};
