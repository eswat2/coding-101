// NOTE:  upper case the name just to make it consistent
//
const normalizeDepartment = (input) => {
  return input.toUpperCase()
}

// NOTE:  this one is tricky, lots of potential abbreviations.
//        to minimize this we just clip the first 2 characters
//        and determine the semester from those
//
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

// NOTE:  assume we are only selecting courses in this millennium...
//
const normalizeYear = (input) => {
  const value = parseInt(input)
  return value > 2000 ? value : 2000 + value
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
  const names = input.match(/[A-z]+/g)
  const numbers = input.match(/\d+/g)
  const result = {}
  const course = {}

  course.department = names.length > 0 ? normalizeDepartment(names[0]) : null
  course.courseNumber = numbers.length > 0 ? numbers[0] : null
  course.semester = names.length > 1 ? normalizeSemester(names[1]) : null
  course.year = numbers.length > 1 ? normalizeYear(numbers[1]) : null

  // NOTE:  providing input for debugging...
  result.input = input
  result.output = course

  return course
}

// NOTE:  provide a sample set of inputs to demonstrate functionality
//
const inputs = [
  'CS111 2016 Fall',
  'CS-111 Fall 2016',
  'CS 111 F2016',
  '111:cs f16',
  'aa34 16 F',
  'cs007 f20',
  'cs007,su20',
  'cs107s20',
  'cs,007'
]

// NOTE:  for each input, compute and display the resulting course
//
inputs.forEach((item) => {
  const obj = parseCourse(item)
  // console.log(obj)
})

// NOTE:  for a UI built around this same idea, see this CodePen
//        https://codepen.io/eswat2/pen/ZrvWyd
//

const student = (name) => {
  return {
    name,
    courses: []
  }
}

const enroll = (student, course) => {
  const newCourse = course.department + course.courseNumber
  const existing = student.courses.map((item) => {
    return item.department + item.courseNumber
  })
  // console.log(existing)
  // console.log(newCourse)
  if (existing.includes(newCourse)) {
    console.log('-- WARNING:  existing course')
  } else {
    student.courses.push(course)
  }
}

const joe = student('Joe')
const cs101 = parseCourse('cs101 f20')
const cs111 = parseCourse('cs111 w20')
const cs101a = parseCourse('cs101 su21')
const bio111 = parseCourse('BIO111 su21')
const bio101 = parseCourse('BIO101 f19')

// console.log(cs101, cs111, cs101a)

enroll(joe, cs101)
enroll(joe, cs111)
enroll(joe, cs101a)
enroll(joe, bio111)
enroll(joe, bio101)

console.log(joe)

const courseReport = (student) => {

}
