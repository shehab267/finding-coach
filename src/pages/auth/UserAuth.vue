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
      <base-button>Login</base-button>
      <base-button type="button" mode="flat">Signup instead</base-button>
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
  methods: {
    submitForm() {
      this.formIsValid = true;
      //  there is strong validation liberary, this is a weak  validation, but it does the work for now
      if (
        this.email === '' ||
        // !this.email.includes('@') ||
        !this.email === /\w+@\w+.\w+$/gi ||
        this.password === ''
      ) {
        this.formIsValid = false;
        return;
      }
      console.log(this.email, this.password);
    },
    switchAuthMode() {},
  },
};
</script>

<style scoped>