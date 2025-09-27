import { useState, useEffect } from 'react';
import type { Character, GuessResult } from '../types/Character';
import { characters } from '../data/characters';
import GuessForm from './GuessForm';
import GuessHistory from './GuessHistory';
import VictoryModal from './VictoryModal';

const Game = () => {
  const [targetCharacter, setTargetCharacter] = useState<Character | null>(null);
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);

  useEffect(() => {
    // Seleciona personagem aleatório
    const randomIndex = Math.floor(Math.random() * characters.length);
    setTargetCharacter(characters[randomIndex]);
  }, []);

  const handleGuess = (characterName: string) => {
    if (!targetCharacter) return;

    const guessedCharacter = characters.find(char => 
      char.name.toLowerCase() === characterName.toLowerCase()
    );

    if (!guessedCharacter) {
      alert("Personagem não encontrado! Tente outro nome.");
      return;
    }

    const matches = {
      name: guessedCharacter.name === targetCharacter.name,
      gender: guessedCharacter.gender === targetCharacter.gender,
      age: guessedCharacter.age === targetCharacter.age,
      hairColor: guessedCharacter.hairColor === targetCharacter.hairColor,
      nationality: guessedCharacter.nationality === targetCharacter.nationality,
      birthYear: guessedCharacter.birthYear === targetCharacter.birthYear,
      occupation: guessedCharacter.occupation === targetCharacter.occupation,
      standType: guessedCharacter.standType === targetCharacter.standType,
      firstAppearance: guessedCharacter.firstAppearance === targetCharacter.firstAppearance,
    };

    const guessResult: GuessResult = {
      character: guessedCharacter,
      matches
    };

    const newGuesses = [...guesses, guessResult];
    setGuesses(newGuesses);

    // Verifica vitória ou derrota
    if (guessedCharacter.name === targetCharacter.name) {
      setVictory(true);
      setGameOver(true);
    } else if (newGuesses.length >= 6) {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    setTargetCharacter(characters[randomIndex]);
    setGuesses([]);
    setGameOver(false);
    setVictory(false);
  };

  if (!targetCharacter) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="game-container">
      <h1>JOJODLE</h1>
      <p>Adivinhe o personagem de JoJo's Bizarre Adventure!</p>
      <p>Tentativas restantes: {6 - guesses.length}</p>
      
      <GuessForm onGuess={handleGuess} disabled={gameOver} />
      <GuessHistory guesses={guesses} />
      
      {gameOver && (
        <VictoryModal 
          victory={victory} 
          targetCharacter={targetCharacter}
          onReset={resetGame}
        />
      )}
    </div>
  );
};

export default Game;