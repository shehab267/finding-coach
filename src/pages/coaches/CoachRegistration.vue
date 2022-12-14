<template>
  <!-- error -> String, convert to Boolean with '!' return true | false  -->
  <base-dialog :show="!!error" title="Uploading Error" @close="handelError">
    <p>{{ error }}</p></base-dialog
  >

  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async saveData(data) {
      try {
        this.isLoading = true;
        await this.$store.dispatch('coaches/registerCoach', data);
      } catch (error) {
        this.error = error.message || "Couldn't Save data, Please try again";
      }
      // move to home page after supmitting
      // router.push() => can go backword from history
      // router.replace() => can NOT go back "More proper for forms"
      if (!this.error) {
        this.$router.replace('/coaches');
      }
    },
    handelError() {
      this.error = null;
      this.isLoading = false;
    },
  },
};
</script>
