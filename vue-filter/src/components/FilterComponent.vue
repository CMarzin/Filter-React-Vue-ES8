<template>
  <div class="filterComponent">
    <h1>{{ msg }}</h1>
    <button :key="index" v-for="(button, index) in this.buttons" @click="handleFilter(button.criteria)">
     {{button.text}}
    </button>
    <p :key="index" v-for="(data, index) in this.filteredData">
      {{data.text}}
    </p>
    <h2> 🕵️‍♂️ Actived filters 🔍:</h2>
    <span :key="index" v-for="(filters, key, index) in this.filters">
      {{ key }} | {{ filters[0] }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'filter',
  data () {
    return {
      msg: '',
      buttons: [
        {
          id: 0,
          text: 'Duration ⏲️',
          criteria: {
            duration: 4680
          }
        },
        {
          id: 1,
          text: 'Collaborateurs 🤝',
          criteria: {
            target: 'collaborateur'
          }
        },
        {
          id: 2,
          text: 'Manageurs ‍🕺',
          criteria: {
            target: 'manageur'
          }
        },
        {
          id: 3,
          text: 'Management 👨‍💻',
          criteria: {
            theme: 'management'
          }
        },
        {
          id: 4,
          text: 'Finance 💸',
          criteria: {
            theme: 'finance'
          }
        }
      ],
      data: [
        {
          id: 0,
          text: 'React : 4680 | Collab | Finance',
          duration: 4680,
          target: 'collaborateur',
          theme: 'finance'
        },
        {
          id: 1,
          text: 'Vue : 3600 | Collab | Management',
          duration: 3600,
          target: 'collaborateur',
          theme: 'management'
        },
        {
          id: 2,
          text: 'Reason : 4680 | Manageur | Finance',
          duration: 4680,
          target: 'manageur',
          theme: 'finance'
        },
        {
          id: 3,
          text: 'Cycle.JS : 5000 : Manageur | Management',
          duration: 5000,
          target: 'manageur',
          theme: 'management'
        },
        {
          id: 4,
          text: 'Happi : 5000 | Collab | Management',
          duration: 5000,
          target: 'collaborateur',
          theme: 'management'
        },
        {
          id: 5,
          text: 'Koa : 5000 | Manageur | Management',
          duration: 5000,
          target: 'manageur',
          theme: 'management'
        },
        {
          id: 6,
          text: 'Express : 5000 | Collab | Finance',
          duration: 5000,
          target: 'collaborateur',
          theme: 'finance'
        },
        {
          id: 7,
          text: 'React Sketch.app : 200 | Manageur | Finance',
          duration: 200,
          target: 'manageur',
          theme: 'finance'
        }
      ],
      filters: {},
      filteredData: []
    }
  },
  beforeMount () {
    this.filteredData = this.data
  },
  methods: {
    handleFilter (criteria) {
      const filter = Object.keys(criteria)[0]
      const filterValue = Object.values(criteria)[0]
      if (this.filters[filter] && this.filters[filter].length && this.filters[filter].includes(filterValue)) {
        // Check if the current selected filter as one property or more to remove
        if (this.filters[filter].length === 1) {
          // Rename the existing filter into removedFilter and put it aside
          // Take all the remaining filters, and put them back into this.filters
          /* eslint-disable  */ // only because we don't need to use removedFilter
          const { [filter]: removedFilter, ...remainingFilters } = this.filters  

          this.filters = { ...remainingFilters }
          this.filterData()
        } else if (this.filters[filter].length > 1) {
          // Here we go insed the current selected filter array to only remove the current selected value
          this.filters = {
            ...this.filters,
            [filter]: [
              ...this.filters[filter].slice(0, this.filters[filter].indexOf(filterValue)),
              ...this.filters[filter].slice(this.filters[filter].indexOf(filterValue) + 1)
            ]
          }
          this.filterData()
        }
      } else {
        // If the current selected filter doesn't exist, we simply add it to this.filters
        // If we don't define is as an array (empty or not), we won't be able to spread it below

        const existingFilters = this.filters[filter] || []

        this.filters = {
          ...this.filters,
          [filter]:
            (filter === 'theme' || filter === 'anotherSingleValueFilter' || filter === 'anotherFilter')
              ? [filterValue]
              : [...existingFilters, filterValue]
        }
        this.filterData()
      }
    },
    filterData () {
      let filteredData = this.data.slice()
      Object.keys(this.filters).map(filterKey =>
        this.filters[filterKey].map(filterValue =>
          this.data.map(data =>
            (filteredData = filteredData.filter(item =>
              (filterKey === 'duration' && item.duration && item.duration <= filterValue) ||
              item[filterKey] === filterValue,
          )))
        )
      )
      this.filteredData = filteredData
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
