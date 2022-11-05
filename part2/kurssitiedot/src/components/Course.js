const Header = ({ courseName }) => {
  return <h2>{courseName}</h2>;
};

const Part = ({ part }) => {
  return <li>{`${part.name} ${part.exercises}`}</li>;
};

const Content = ({ parts }) => {
  let total = parts.reduce((prev, cur, i) => {
    return i === 1 ? prev.exercises + cur.exercises : prev + cur.exercises;
  });
  return (
    <ul>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <li>
        <b>{`total of ${total} exercises`}</b>
      </li>
    </ul>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

export default Course;
