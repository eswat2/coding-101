// NOTE:  normalize the department input...
const normalizeDepartment = (input) => {
  return input.toUpperCase()
}
// NOTE:  normalize the year input...
const normalizeYear = (input) => {
  const value = parseInt(input)
  return value > 2000 ? value : 2000 + value
}
// NOTE:  normalize the semester input...
const normalizeSemester = (input) => {
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
//
// NOTE:  parse a string input into a course object using simple
//        matches based on 4 facts
//
//        1. we know there should be 2 words (department & semester)
//        2. we know there should be 2 numbers (course number & year)
//        3. there can be white space and non-alpha character seperators
//        4. the semester and year may be abbreviated
//
const parseCourse = (input) => {
  const regex1 = /[A-z]+/g
  const regex2 = /\d+/g
  const names = input.match(regex1)
  const numbers = input.match(regex2)
  const result = {}
  const course = {}

  course.department = names.length > 0 ? normalizeDepartment(names[0]) : null
  course.courseNumber = numbers.length > 0 ? numbers[0] : null
  course.semester = names.length > 1 ? normalizeSemester(names[1]) : null
  course.year = numbers.length > 1 ? normalizeYear(numbers[1]) : null
  // NOTE:  providing input for debugging...
  result.input = input
  result.output = course

  return result
}
// NOTE:  provide a sample set of inputs
const inputs = [
  'aa34 16 F',
  'CS111 2016 Fall',
  'CS-111 Fall 2016',
  'CS 111 F2016',
  'cs007 su20',
  'cs107 s20'
]
// NOTE:  for each input, compute and display the resulting course
inputs.forEach((item) => {
  const obj = parseCourse(item)
  console.log(obj)
})
