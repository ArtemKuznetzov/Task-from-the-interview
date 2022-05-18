import { useState } from "react";
import "./App.scss";

interface ICourses {
  name: string;
  prices: [number, number] | [number, null] | [null, number] | [null, null];
}

function App() {
  const [firstInputState, setFirstInputState] = useState("");
  const [secondInputState, setSecondInputState] = useState("");
  const [isEnterPressed, setIsEnterPressed] = useState(false);

  let courses: ICourses[] = [
    { name: "Courses in England", prices: [0, 100] },
    { name: "Courses in Germany", prices: [500, null] },
    { name: "Courses in Italy", prices: [100, 200] },
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
    { name: "Courses in France", prices: [null, null] },
  ];

  function checkFunc(firstPrice: string, secondPrice: string) {
    const result: ICourses[] = courses.filter((item) => {
      // First type and Second type
      if (
        (item.prices[0] <= Number(firstPrice) ||
          item.prices[1] >= Number(firstPrice)) &&
        (item.prices[1] <= Number(secondPrice) ||
          item.prices[0] <= Number(secondPrice)) &&
        firstPrice.length &&
        secondPrice.length &&
        item.prices[0] !== null &&
        item.prices[1] !== null
      ) {
        console.log("first");
        return item;
      }
      // Fourth type
      if (
        !firstPrice.length &&
        item.prices[0] === null &&
        secondPrice.length &&
        Number(secondPrice) >= item.prices[1]
      ) {
        return item;
      }
      // Third type
      if (
        !secondPrice.length &&
        item.prices[1] === null &&
        firstPrice.length &&
        Number(firstPrice) >= item.prices[1]
      ) {
        return item;
      }
      // Fifth type
      if (
        !firstPrice.length &&
        !secondPrice.length &&
        item.prices[0] === null &&
        item.prices[1] === null
      ) {
        return item;
      }
      return false;
    });
    if (!result.length) {
      return <span>Sorry, but we don't have courses with such prices</span>;
    }
    return <span>{`Buy ${result.map((item) => item.name).join(", ")}`}</span>;
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Welcome!</h1>
        <h2>Сhoose the desired course cost</h2>
      </div>
      <div className="body">
        <div className="first-input">
          <span>From</span>
          <input
            type="number"
            onChange={(e) => setFirstInputState(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setIsEnterPressed(true);
              }
            }}
            value={firstInputState}
          />
        </div>
        <div className="second-input">
          <span>To</span>
          <input
            type="number"
            onChange={(e) => setSecondInputState(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setIsEnterPressed(true);
              }
            }}
            value={secondInputState}
          />
        </div>
        <button
          onClick={() => {
            setIsEnterPressed(true);
          }}
        >
          Find
        </button>
        <button
          onClick={() => {
            setIsEnterPressed(false);
            setFirstInputState("");
            setSecondInputState("");
          }}
        >
          Reset
        </button>
      </div>
      <div className="result">
        {isEnterPressed ? (
          checkFunc(firstInputState, secondInputState)
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default App;
