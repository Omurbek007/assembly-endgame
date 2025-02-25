import { useState } from 'react'
import { languages } from './languages'
import { getFarewellText, randomWord } from './utils'
import Confetti from "react-confetti"
import clsx from 'clsx'
import './App.css'

function App() {

      const [currentWord, setCurrentWord] = useState(() => randomWord())
      const [guessedLetters, setGuessedLetters] = useState([])
      console.log(guessedLetters)
      const numGuessesLeft = languages.length - 1;
      const wrongGuessedCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
      const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
      const isGameLost = wrongGuessedCount >= numGuessesLeft
      const isGameOver = isGameWon || isGameLost
      const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
      const lastGuessedIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

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
        const revealedLetters = isGameLost || guessedLetters.includes(letter)
        const revealStyle = clsx(isGameLost && !guessedLetters.includes(letter) && "missing-letters")
        return (
          <span key={index} className={revealStyle}>
            {(revealedLetters ? letter.toLocaleUpperCase() : "🔑")}
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

  function renderGameStatus() {
    if (!isGameOver && lastGuessedIncorrect) {
      return (
        <><p className='farwell-message'>{getFarewellText(languages[wrongGuessedCount - 1].name)}</p>
        </>
      )
  } 
  if (isGameWon) {
    return (
      <> 
          <h2>You win!</h2>
          <p>Well done! 🏆</p>
        </>
    )
  } else if (isGameLost) {
    return (
      <>
      <h2>Game over!</h2>
      <p>You lose! Better start learning Assembly 😭</p>
    </>
    )
  } else {
    return null
  }
}

function resetGame() {
  setGuessedLetters([])
  setCurrentWord(randomWord())
}
  return (
    <>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className={clsx("status-section",{
        won: isGameWon,
        lose: isGameLost,
        farewell: !isGameOver && lastGuessedIncorrect
      })}>
        {renderGameStatus()}
      </section> 
      <section className='lang-section'>
        {isGameWon && <Confetti
          recycle={true}
          numberOfPieces={100}
          gravity={0.04}
        />}
        {languageElement}
      </section>
      <section className='word-section'>
        {wordElement}
      </section>

{/* Visual hidden region for aria-level */}
      <section  
               className="sr-only" 
               aria-live="polite" 
               role="status"
           >
               <p>
                   {currentWord.includes(lastGuessedLetter) ? 
                       `Correct! The letter ${lastGuessedLetter} is in the word.` : 
                       `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                   }
                   You have {numGuessesLeft} attempts left.
               </p>
               <p>Current word: {currentWord.split("").map(letter => 
               guessedLetters.includes(letter) ? letter + "." : "blank.")
               .join(" ")}</p>
            </section>

      <section className={clsx('keyboard-section', {keysDisable: isGameOver})}>
        {keyboardElement}
      </section>
      {isGameOver && <button onClick={() => resetGame()} className='new-game'>New Game</button>}
    </>
  )
}

export default App
