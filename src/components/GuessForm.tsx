import { useState } from 'react';
import '../styles/components/GuessForm.css';
interface GuessFormProps {
  onGuess: (characterName: string) => void;
  disabled: boolean;
}

const GuessForm = ({ onGuess, disabled }: GuessFormProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onGuess(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="guess-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Digite o nome do personagem... (tentativas infinitas)"
        disabled={disabled}
        list="character-suggestions"
        className="guess-input"
      />
      <datalist id="character-suggestions">
        <option value="Jotaro Kujo" />
        <option value="Dio Brando" />
        <option value="Joseph Joestar" />
        <option value="Jonathan Joestar" />
        <option value="Giorno Giovanna" />
        <option value="Josuke Higashikata" />
        <option value="Jolyne Cujoh" />
        <option value="Johnny Joestar" />
      </datalist>
      <button type="submit" disabled={disabled} className="guess-button">
        {disabled ? 'Jogo Terminado - Jogar Novamente' : 'Adivinhar'}
      </button>
    </form>
  );
};

export default GuessForm;