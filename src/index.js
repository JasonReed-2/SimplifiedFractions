import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css'

ReactDOM.render(<Main />,
  document.getElementById('root')
);

function Main() {
  const [result, setResult] = useState(undefined)

  const compute = (numerator, denominator) => {
    if (denominator === "" || numerator === "") {
      alert("Please Enter Numbers For Both!");
      return;
    }
    // eslint-disable-next-line
    if (denominator == 0) {
      alert("Denominator cannot be zero!");
      return;
    }
    let sign = isPositive(numerator, denominator) ? '' : '-'

    let realNum = Math.abs(numerator);
    let realDen = Math.abs(denominator);

    let gc = gcd(realNum, realDen)
    console.log(gc)

    let newNum = realNum / gc
    let newDen = realDen / gc
    let result = newDen === 1 ? sign + newNum : sign + newNum + '/' + newDen
    setResult(result)
  }

  const isPositive = (num1, num2) => {
    let isPos = true;
    let isPosCount = 0;

    if (num1 < 0) isPosCount++;
    if (num2 < 0) isPosCount++;
    if (isPosCount === 1) isPos = false;
    return isPos;
  }

  const gcd = (a, b) => {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  }

  return(
    <div id="big">
    <div id="title">
      <h1>Simplified Fractions Calculator</h1>
    </div>
    <div id="results">
      <table>
        <tbody>
        <Input compute={compute}/>
        {
          result ? 
          <tr>
            <td>Result</td>
            <td>{result}</td>
          </tr> 
        : <></>
        }
        </tbody>
      </table>
    </div>
    </div>
  )
}

function Input(props) {
  const [numerator, setNumerator] = useState(0);
  const [denominator, setDenominator] = useState(1);

  const setNum = (e) => {
    setNumerator(e.target.value)
  }

  const setDen = (e) => {
    setDenominator(e.target.value)
  }

  const send = (e) => {
    if (e.key === 'Enter') {
      props.compute(numerator, denominator)
    }
  }

  return (
    <>
    <tr>
      <td>Numerator</td>
      <td><input type="text" value={numerator} onChange={setNum} onKeyDown={send}/></td>
    </tr>
    <tr>
      <td>Denominator</td>
      <td><input type="text" value={denominator} onChange={setDen} onKeyDown={send}/></td>
    </tr>
    </>
  )
}