<template>
  <base-card>
    <h3>Find Your Coach</h3>
    <section>
      <form>
        <span class="filter-option">
          <input type="checkbox" id="frontend" checked @change="setFilter" />
          <label for="frontend" class="prevent-select">Frontend</label>
        </span>
        <span class="filter-option">
          <input type="checkbox" id="backend" checked @change="setFilter" />
          <label for="backend" class="prevent-select">Backend</label></span
        >
        <span class="filter-option">
          <input type="checkbox" id="career" checked @change="setFilter" />
          <label for="career" class="prevent-select">Career</label></span
        >
      </form>
    </section>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      filter: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    //  setFilter should be bound to the inputs in case there is any changes
    //  used event => @change
    setFilter(event) {
      //  Extract tow important pieces ('id', 'active')
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilter = {
        //  ... for copying the old filter then dynamicly overWritting it using 'InputId' <= 'has the same value of filter's inputIds'
        ...this.filter,
        [inputId]: isActive,
      };
      // Updates the old Filter
      this.filter = updatedFilter;
      // Emits the new filter so it can be provided in other components
      //  pass the updatedFilter as a parameter
      this.$emit('change-filter', updatedFilter);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
.prevent-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
</style>
