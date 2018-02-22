const regex1 = /[A-z]+/g
const regex2 = /\d+/g

const LABELS = {
  courseNumber: 'Course Number',
  department: 'Department',
  semester: 'Semester',
  year: 'Year'
}
// define
const app = new Vue({
  el: '#app',
  data: {
    parts: [],
    message: ''
  },
  methods: {
    clear: function() {
      this.message = ''
    },
    normalizeDepartment: function(input) {
      return input.toUpperCase()
    },
    normalizeYear: function(input) {
      const value = parseInt(input)
      return value > 2000 ? value : 2000 + value
    },
    labelFor: function(key) {
      return LABELS[key]
    },
    normalizeSemester: function(input) {
      const value = input.toLowerCase().slice(0, 2)
      switch (value) {
        case 'f':
        case 'fa':
          return 'Fall'
        case 'w':
        case 'wi':
          return 'Winter'
        case 's':
        case 'sp':
          return 'Spring'
        case 'su':
          return 'Summer'
        default:
          return null
      }
    }
  },
  watch: {
    message: function(input) {
      if (input.length > 0) {
        const names = input.match(regex1)
        const numbers = input.match(regex2)
        const list = []
        if (names && names.length > 0) {
          list.push({
            prop: 'department',
            value: this.normalizeDepartment(names[0])
          })
        }
        if (numbers && numbers.length > 0) {
          list.push({
            prop: 'courseNumber',
            value: numbers[0]
          })
        }
        if (names && names.length > 1) {
          list.push({
            prop: 'semester',
            value: this.normalizeSemester(names[1])
          })
        }
        if (numbers && numbers.length > 1) {
          list.push({
            prop: 'year',
            value: this.normalizeYear(numbers[1])
          })
        } else {
          list.push({
            prop: 'year',
            value: moment().format('YYYY')
          })
        }
        this.parts = list
      } else {
        this.parts = []
      }
    }
  }
})
