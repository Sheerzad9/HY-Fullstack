import { useEffect, useState } from "react";

const StatisticLine = ({ title, value }) => {
  return (
    <tr>
      <th>{title}</th>
      <th>{value}</th>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, all }) => {
  function countAverage() {
    return (good - bad) / all;
  }

  function countPositiveRate() {
    return `${Math.round((good / all) * 100)}%`;
  }

  if (all === 0) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No Feedback given</p>
      </>
    );
  }
  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine title="good" value={good} />
          <StatisticLine title="neutral" value={neutral} />
          <StatisticLine title="bad" value={bad} />
          <StatisticLine title="all" value={all} />
          <StatisticLine title="average" value={countAverage()} />
          <StatisticLine title="positive" value={countPositiveRate()} />
        </tbody>
      </table>
    </>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  useEffect(() => {
    setAll(good + neutral + bad);
  });

  const voteGood = () => {
    setGood(good + 1);
  };
  const voteNeutral = () => {
    setNeutral(neutral + 1);
  };
  const voteBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h2>Feedback :-)</h2>
      <br />
      <Button handleClick={voteGood} text="Good"></Button>
      <Button handleClick={voteNeutral} text="Neutral"></Button>
      <Button handleClick={voteBad} text="Bad"></Button>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

export default App;
