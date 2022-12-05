import './App.css';
import React from 'react';
import Die from './components/Die';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {
  
  const [dice, setDice] = React.useState(allNewDice)
  const [tenzies, setTenzies] = React.useState(false)
  const btnText = tenzies ? "New Game" : "Roll"

  React.useEffect(() => {
    console.log("Dice State Changed")
    for(let i = 1; i < 10; i++) {
      if(!dice[i].isHeld || !dice[i-1].isHeld || dice[i].value !== dice[i-1].value) {
        return;
      }
    }
    setTenzies(true)
    console.log("You Won")
  }, [dice])

  function newGame() {
    setDice(allNewDice)
    setTenzies(false)
  }

  function allNewDice() { 
    const arr = []
    for(let i = 0; i < 10; i++){
        const newObj = {
          value: 0,
          isHeld: false,
          id: nanoid()
        }
        newObj.value = Math.floor(Math.random() * (6 - 1 + 1) + 1) 
        arr.push(newObj)
    }
    return arr
  } 

  function rollDice() {
    setDice(prevSetDice => prevSetDice.map((die) => {
      return {
        ...die,
        value: die.isHeld ? die.value : Math.floor(Math.random() * (6 - 1 + 1) + 1)
      }
    }))
  }

  function holdDice(id) {
    setDice(prevSetDice => prevSetDice.map((die) => {
      return {
        ...die,
        isHeld: die.id === id ? !die.isHeld : die.isHeld
      }
    }))
  }

  const diceElement = dice.map((die) => {
    return (
      <Die 
        key={die.id}
        id={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={holdDice}
      />
    )
  })
  
  return (
    <main className='main'>
    <h1 className="title">Tenzies</h1>
    <p className="instructions">Roll until all dice are the same. 
     Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElement}
      </div>
      <button 
        className='roll-dice' 
        onClick={tenzies ? newGame : rollDice}>
          {btnText}
      </button>
      {tenzies && <Confetti />}
    </main>
  );
}