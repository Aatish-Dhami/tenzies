import './App.css';
import React from 'react';
import Die from './components/Die';
import {nanoid} from 'nanoid';

export default function App() {
  
  const [dice, setDice] = React.useState(allNewDice)

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
      <div className='dice-container'>
        {diceElement}
      </div>
      <button className='roll-dice' onClick={rollDice}>Roll</button>
    </main>
  );
}