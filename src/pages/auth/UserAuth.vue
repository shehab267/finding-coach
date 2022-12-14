<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">E-Mail</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <p v-if="!formIsValid">
        Please input a valid email and password (must be at least 6 characters
        long)
      </p>
      <base-button>{{ submitBtnCaption }}</base-button>
      <base-button type="button" mode="flat" @click="switchAuthMode">{{
        switchBtnCaption
      }}</base-button>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
    };
  },
  computed: {
    submitBtnCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchBtnCaption() {
      if (this.mode === 'login') {
        return 'Signup insted';
      } else {
        return 'Login insted';
      }
    },
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      //  there is strong validation liberary, this is a weak  validation, but it does the work for now
      if (
        this.email === '' ||
        // !this.email.includes('@') ||
        !this.email === /^\w+((\.|-)?\w+)*@\w+((\.|-)?\w+)*(\.\w{2,9})+$/gi ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      if (this.mode === 'login') {
        // ...
      }
      //  Signup pass the email and password as expicted from the payload
      else
        this.$store.dispatch('signup', {
          email: this.email,
          password: this.password,
        });
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'singup';
      } else {
        this.mode = 'login';
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
