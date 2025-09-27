import { useState, useEffect } from 'react';
import type { Character, GuessResult } from '../types/Character';
import { allCharacters } from '../data/characters'; // Remova getCharactersByPart se não está usando
import GuessForm from './GuessForm';
import GuessHistory from './GuessHistory';
import VictoryModal from './VictoryModal';
import '../styles/components/Game.css';

const Game = () => {
  const [targetCharacter, setTargetCharacter] = useState<Character | null>(null);
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    setTargetCharacter(allCharacters[randomIndex]);
  }, []);

  const handleGuess = (characterName: string) => {
    if (!targetCharacter) return;

    // CORREÇÃO: Use allCharacters em vez de characters
    const guessedCharacter = allCharacters.find((char: Character) => 
      char.name.toLowerCase() === characterName.toLowerCase()
    );

    if (!guessedCharacter) {
      alert("Personagem não encontrado! Tente outro nome.");
      return;
    }

    // Verifica se o personagem já foi tentado antes
    const alreadyGuessed = guesses.some(guess => 
      guess.character.name.toLowerCase() === characterName.toLowerCase()
    );

    if (alreadyGuessed) {
      alert("Você já tentou este personagem! Tente outro.");
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

    // Apenas verifica vitória, sem limite de tentativas
    if (guessedCharacter.name === targetCharacter.name) {
      setVictory(true);
      setGameOver(true);
    }
  };

  const resetGame = () => {
    // CORREÇÃO: Use allCharacters em vez de characters
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    setTargetCharacter(allCharacters[randomIndex]);
    setGuesses([]);
    setGameOver(false);
    setVictory(false);
  };

  if (!targetCharacter) {
    return (
      <div className="game-container">
        <div className="empty-state">
          <p>Carregando personagem misterioso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <header className="game-header">
        <h1 className="game-title">JOJODLE</h1>
        <p className="game-subtitle">Adivinhe o personagem de JoJo's Bizarre Adventure!</p>
        <div className="attempts-counter">
          Tentativas: {guesses.length} {victory && "🎉"}
        </div>
        {guesses.length > 0 && !victory && (
          <div className="hint-message">
            💡 Continue tentando! Tentativas infinitas disponíveis.
          </div>
        )}
      </header>
      
      <div className="guess-form-container">
        <GuessForm onGuess={handleGuess} disabled={gameOver} />
      </div>
      
      <div className="guess-history-container">
        <GuessHistory guesses={guesses} />
      </div>
      
      {gameOver && (
        <VictoryModal 
          victory={victory} 
          targetCharacter={targetCharacter}
          onReset={resetGame}
          attempts={guesses.length}
        />
      )}
    </div>
  );
};

export default Game;