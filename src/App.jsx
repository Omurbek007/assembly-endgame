import { useState } from 'react'
import { languages } from './languages'
import clsx from 'clsx'
import './App.css'

function App() {

      const [currentWord, setCurrentWord] = useState('react')
      const [guessedLetters, setGuessedLetters] = useState([])

      const wrongGuessedCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
      const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
      const isGameLost = wrongGuessedCount >= languages.length - 1
      const isGameOver = isGameWon || isGameLost

      const alphabet = 'abcdefghijklmnopqrstuvwxyz'
      

    function addGuesedLetter(letter) {
      setGuessedLetters(prevLetters => {
        const letterSet = new Set(guessedLetters)
        letterSet.add(letter)
        return [...letterSet]
      }
      )}


      const keyboardElement = alphabet.split('').map((letter, index) => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
    
        return (
          <button onClick={() => addGuesedLetter(letter)} key={index} 
          className={clsx('key', { enabled: isCorrect, disabled: isWrong })}>
            {letter.toLocaleUpperCase()}
          </button>
        )
      }
      )

      const wordElement = currentWord.split('').map((letter, index) => {
        return (
          <span key={index} >
            {guessedLetters.includes(letter) ? letter.toLocaleUpperCase() : ""}
          </span>
        )
      }
      )

  const languageElement = languages.map((language, index) => {
      const isLost = index < wrongGuessedCount
    const styles = {
      backgroundColor: language.backgroundColor,
      color: language.color,
    }
    return (
      <span key={language.name} className={clsx("lang",{lost: isLost})} style={styles}>
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
      <section className={clsx("status-section",{
        won: isGameWon,
        lose: isGameLost
      })}>

    {isGameOver ? (
      isGameWon ? (
        <>
          <h2>You win!</h2>
          <p>Well done! 🏆</p>
        </>
      ) :
      (
    <>
      <h2>Game over!</h2>
      <p>You lose! Better start learning Assembly 😭</p>
    </>
      )
    ) :
    (
      null
    )
    }
      </section> 
      <section className='lang-section'>
        {languageElement}
      </section>
      <section className='word-section'>
        {wordElement}
      </section>
      <section className={clsx('keyboard-section', {keysDisable: isGameOver})}>
        {keyboardElement}
      </section>
      {isGameOver && <button className='new-game'>New Game</button>}
    </>
  )
}

export default App
