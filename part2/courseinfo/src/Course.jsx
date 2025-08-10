const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
    {props.parts.map((part) => 
        <Part key={part.id} part={part} />)}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => {
  return (
    <p><b>Number of exercises {props.total}</b></p>
  )
}

const Course = ({ course }) => {
  const total = course.parts.reduce(
    (a,v) => a + v.exercises, 0
  )

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </>
  )
}

export default Course