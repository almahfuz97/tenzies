import logo from './logo.svg';
import './App.css';
import Dice from './Components/Dice';
import React from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {

  const [diceNum, setDiceNum] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = diceNum.every(die => die.isHeld);
    const diceOne = diceNum[0].value;
    const isSame = diceNum.every(die => die.value === diceOne);

    if (isSame && allHeld)
      setTenzies(true);

  }, [diceNum])

  function allNewDice() {

    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(setNewDice());
    }
    return arr;
  }

  function setNewDice(i) {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }

  }
  function handleClick(e, id) {

    setDiceNum(prev =>

      prev.map(element => {
        if (element.id === id) {

          return { ...element, isHeld: !element.isHeld }

        }
        else
          return element;
      })
    )
  }
  const diceElements = diceNum.map(die => <Dice onClick={handleClick} id={die.id} isHeld={die.isHeld} key={die.id} value={die.value} />);

  // onclick  button handler
  function rollDice() {

    if (!tenzies) {
      setDiceNum(oldDice => oldDice.map(element => {

        return element.isHeld ? element :
          setNewDice()
      }));
    }
    else {
      setTenzies(false);
      setDiceNum(allNewDice())
    }
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <div className='parent-div'>
        <div className='top-info'>
          <h1>
            Tenzies
          </h1>
          <p>Roll until all dice are the same. Click each dice to freeze it at its current value between rolls.</p>
        </div>
        <div>
          <div className='dice-div'>
            {diceElements}
          </div>
        </div>
        <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </div>
    </main>
  );
}

export default App;
