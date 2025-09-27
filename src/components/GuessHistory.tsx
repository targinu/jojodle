import type { GuessResult } from '../types/Character';

interface GuessHistoryProps {
  guesses: GuessResult[];
}

const GuessHistory = ({ guesses }: GuessHistoryProps) => {
  if (guesses.length === 0) {
    return (
      <div className="guess-history">
        <h2>Histórico de Palpites</h2>
        <p>Nenhum palpite ainda. Faça seu primeiro palpite!</p>
      </div>
    );
  }

  return (
    <div className="guess-history">
      <h2>Seus Palpites</h2>
      <div className="guesses-grid">
        {guesses.map((guess, index) => (
          <div key={index} className="guess-card">
            <h3>{guess.character.name}</h3>
            <div className="attributes">
              <div className={`attribute ${guess.matches.gender ? 'correct' : 'incorrect'}`}>
                <span>Gênero:</span> {guess.character.gender}
              </div>
              <div className={`attribute ${guess.matches.age ? 'correct' : 'incorrect'}`}>
                <span>Idade:</span> {guess.character.age}
              </div>
              <div className={`attribute ${guess.matches.hairColor ? 'correct' : 'incorrect'}`}>
                <span>Cabelo:</span> {guess.character.hairColor}
              </div>
              <div className={`attribute ${guess.matches.nationality ? 'correct' : 'incorrect'}`}>
                <span>Nacionalidade:</span> {guess.character.nationality}
              </div>
              <div className={`attribute ${guess.matches.birthYear ? 'correct' : 'incorrect'}`}>
                <span>Nascimento:</span> {guess.character.birthYear}
              </div>
              <div className={`attribute ${guess.matches.occupation ? 'correct' : 'incorrect'}`}>
                <span>Ocupação:</span> {guess.character.occupation}
              </div>
              <div className={`attribute ${guess.matches.standType ? 'correct' : 'incorrect'}`}>
                <span>Stand:</span> {guess.character.standType}
              </div>
              <div className={`attribute ${guess.matches.firstAppearance ? 'correct' : 'incorrect'}`}>
                <span>Aparição:</span> {guess.character.firstAppearance}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuessHistory;