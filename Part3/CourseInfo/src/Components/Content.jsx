import Part from "./Part"
const Content = ({ course }) => {
  const total = course.parts.reduce((s, p) => {
    return s + p.exercises
  }, 0)
  console.log("total is", total)
  return (
    <>
      {" "}
      <ul>
        {" "}
        {course.parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}{" "}
      </ul>
      <p>Total of {total} exercises</p>{" "}

    </>
  )
}
export default Content
