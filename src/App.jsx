import { useState } from 'react'
import { languages } from './languages'
import './App.css'

function App() {

  const languageElement = languages.map((language) => {
    const style = {
      backgroundColor: language.backgroundColor,
      color: language.color,
    }
    return (
      <span key={language.name} className='lang' style={style}>
        {language.name}
      </span>
    )
  })

  return (
    <>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className='status-section'>
          <h2>You win!</h2>
          <p>Well done! 🏆</p>
      </section>
      <section className='lang-section'>
        {languageElement}
      </section>
    </>
  )
}

export default App
