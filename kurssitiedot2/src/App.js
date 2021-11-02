import React from 'react'
import Course from './components/Course'

const App = ({courses}) => {

  /*
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
*/

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((courses) => (
        <Course courses = {courses} key={courses.id} />
      ))}
    </div>
  );
};

export default App;