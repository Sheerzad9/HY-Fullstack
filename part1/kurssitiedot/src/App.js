const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.part.part} {props.part.exercises}
      </p>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      <Part part={props.data[0]} />
      <Part part={props.data[1]} />
      <Part part={props.data[2]} />
    </>
  );
};

const Total = (props) => {
  let total = 0;
  props.data.forEach((element) => {
    total += element.exercises;
  });

  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { part: "Fundamentals of React", exercises: 10 },
      { part: "Using props to pass data", exercises: 7 },
      { part: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content data={course.parts} />
      <Total data={course.parts} />
    </div>
  );
};

export default App;
