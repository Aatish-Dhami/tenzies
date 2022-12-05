import './App.css';
import React from 'react';
import Die from './components/Die';

export default function App() {
  
  const [dice, setDice] = React.useState(allNewDice)

  function allNewDice() { 
    const arr = []
    for(let i = 0; i < 10; i++){
        arr.push(Math.floor(Math.random() * (6 - 1 + 1) + 1))            
    }
    return arr
  } 

  function rollDice() {
    setDice(allNewDice)
  }


  const diceElement = dice.map((die) => {
    return (
      <Die value={die}/>
    )
  })
  
  return (
    <main className='main'>
      <div className='dice-container'>
        {diceElement}
      </div>
      <button className='roll-btn' onClick={rollDice}>Roll</button>
    </main>
  );
}