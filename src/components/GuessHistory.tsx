import type { GuessResult } from '../types/Character';
import ImageWithFallback from './ImageWithFallback';
import '../styles/components/GuessHistory.css';

interface GuessHistoryProps {
  guesses: GuessResult[];
}

const GuessHistory = ({ guesses }: GuessHistoryProps) => {
  if (guesses.length === 0) {
    return (
      <div className="guess-history">
        <h2 className="history-title">Histórico de Palpites</h2>
        <div className="empty-state">
          <p>Nenhum palpite ainda. Faça seu primeiro palpite!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="guess-history">
      <h2 className="history-title">Seus Palpites ({guesses.length})</h2>
      <div className="guesses-container">
        <div className="guesses-grid">
          {guesses.map((guess, index) => (
            <div key={index} className="guess-card">
              <div className="character-header">
                <ImageWithFallback
                  src={guess.character.image}
                  alt={guess.character.name}
                  className="character-image"
                />
                <h3 className="character-name">{guess.character.name}</h3>
              </div>
              
              <div className="attributes-grid">
                <div className={`attribute ${guess.matches.gender ? 'correct' : 'incorrect'}`}>
                  <span className="attribute-label">Gênero:</span>
                  <span className="attribute-value">{guess.character.gender}</span>
                </div>
                <div className={`attribute ${guess.matches.age ? 'correct' : 'incorrect'}`}>
                  <span className="attribute-label">Idade:</span>
                  <span className="attribute-value">{guess.character.age}</span>
                </div>
                <div className={`attribute ${guess.matches.hairColor ? 'correct' : 'incorrect'}`}>
                  <span className="attribute-label">Cabelo:</span>
                  <span className="attribute-value">{guess.character.hairColor}</span>
                </div>
                <div className={`attribute ${guess.matches.nationality ? 'correct' : 'incorrect'}`}>
                  <span className="attribute-label">Nacionalidade:</span>
                  <span className="attribute-value">{guess.character.nationality}</span>
                </div>
                <div className={`attribute ${guess.matches.birthYear ? 'correct' : 'incorrect'}`}>
                  <span className="attribute-label">Nascimento:</span>
                  <span className="attribute-value">{guess.character.birthYear}</span>
                </div>
                <div className={`attribute ${guess.matches.occupation ? 'correct' : 'incorrect'}`}>
                  <span className="attribute-label">Ocupação:</span>
                  <span className="attribute-value">{guess.character.occupation}</span>
                </div>
                <div className={`attribute ${guess.matches.standType ? 'correct' : 'incorrect'}`}>
                  <span className="attribute-label">Stand:</span>
                  <span className="attribute-value">{guess.character.standType}</span>
                </div>
                <div className={`attribute ${guess.matches.firstAppearance ? 'correct' : 'incorrect'}`}>
                  <span className="attribute-label">Aparição:</span>
                  <span className="attribute-value">{guess.character.firstAppearance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuessHistory;