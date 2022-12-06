<template>
  <div>
    <section>FILTER</section>
    <div class="control">
      <button>Refresh</button>
      <router-link to="/register">Become a Coach</router-link>
    </div>
    <section>
      <ul v-if="hasCoaches">
        <li v-for="coach in filteredCoaches" :key="coach.id">
          {{ coach.firstName }}
        </li>
      </ul>
      <h3 v-else>No Coaches Found, try later</h3>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    filteredCoaches() {
      return this.$store.getters['coaches/coaches'];
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
  },
};
</script>
