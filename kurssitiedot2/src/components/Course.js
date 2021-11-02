import React from 'react'

const Course = ({ courses }) => { 
  console.log(courses)
  return (
    <div>
      <Header courses={courses} />
      <Content parts={courses.parts} />
      <Total parts={courses.parts}></Total>
    </div>
  )
}

const Header = ({ courses }) => { 
  return (
    <div>
      <h1>{courses.name}</h1>
    </div>
  )
}

const Content = ({ parts }) => { 
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Part = ({ part }) => { 
  return (
    <div>
      {part.name} {part.exercises}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
 console.log('what is happening', sum, part)
 return sum + part.exercises
}, 0)
  return (
    <div>
     <p><b>Total of {total} exercises</b></p>
    </div>
  )
}

export default Course