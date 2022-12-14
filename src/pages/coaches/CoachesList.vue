<template>
  <div>
    <!-- error -> String, convert to Boolean with '!' return true | false  -->
    <base-dialog :show="!!error" title="Loading Error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilter"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button v-if="!isCoach && !isLoading" link to="/register"
            >Become a Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches && !isLoading">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else>No Coaches Found!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilter: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  created() {
    // Excuted this component's method with vue life cycle methods
    this.loadCoaches();
  },
  computed: {
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    filteredCoaches() {
      // Return the Coaches who matches our filters
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        // Cheack if =>  frontend "Cheacked" && Coach's skill "frontend"
        if (this.activeFilter.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilter.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilter.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
  },
  methods: {
    // trigger setfilter from emit the event change-filter with 'updatedFilter' as an argument
    setFilter(updatedFilter) {
      this.activeFilter = updatedFilter;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
