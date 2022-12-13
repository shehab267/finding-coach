<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">E-mail</label>
      <input type="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="message">Message</label>
      <textarea id="message" rows="5" v-model.trim="message"></textarea>
    </div>
    <p class="errors" v-if="!formIsValid">
      Please input a valid email and not empty message
    </p>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  // Another way to pass the CoachId for the message
  // props: ['id'], // Used to pass the coach ID to the message
  data() {
    return {
      email: '',
      message: '',
      formIsValid: true,
    };
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      //  This is a weak  validation, but it does the work for now
      if (
        this.email === '' ||
        // !this.email.includes('@') ||
        !this.email === /^\w+((\.|-)?\w+)*@\w+((\.|-)?\w+)*(\.\w{2,9})+$/gi ||
        this.message === ''
      ) {
        this.formIsValid = false;
        return;
      }
      //  User Vuex to store the message
      this.$store.dispatch('requests/contactCoach', {
        coachId: this.$route.params.id,
        email: this.email,
        message: this.message,
      });

      this.$router.replace('/coaches');
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
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
.errors {
  font-weight: bold;
  color: red;
}
.actions {
  text-align: center;
}
</style>
