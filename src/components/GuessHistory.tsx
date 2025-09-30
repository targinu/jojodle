import type { GuessResult } from "../types/Character";
import ImageWithFallback from "./ImageWithFallback";
import "../styles/components/GuessHistory.css";

interface GuessHistoryProps {
  guesses: GuessResult[];
}

const GuessHistory = ({ guesses }: GuessHistoryProps) => {
  /*
  // Labels para os atributos
  const attributeLabels = {
    gender: "Gênero",
    age: "Idade", 
    hairColor: "Cor do Cabelo",
    nationality: "Nacionalidade",
    birthYear: "Ano de Nasc.",
    occupation: "Ocupação",
    standType: "Stand",
    firstAppearance: "1ª Aparição"
  };
  */

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

      {/* Header - apenas desktop */}
      <div className="guess-row header">
        <span>Pers.</span>
        <span>Gênero</span>
        <span>Idade</span>
        <span>Cabelo</span>
        <span>Nacionalidade</span>
        <span>Ano Nasc.</span>
        <span>Ocupação</span>
        <span>Stand</span>
        <span>1ª Aparição</span>
      </div>

      <div className="guesses-container">
        {/* Palpites */}
        {guesses.map((guess, index) => (
          <div key={index} className="guess-row">
            {/* DESKTOP: Layout grid */}
            <div className="guess-image-wrapper" data-name={guess.character.name}>
              <ImageWithFallback
                src={guess.character.image}
                alt={guess.character.name}
                className="guess-image"
              />
            </div>

            <span className={guess.matches.gender ? "correct" : "incorrect"}>
              {guess.character.gender}
            </span>
            <span className={guess.matches.age ? "correct" : "incorrect"}>
              {guess.character.age}
            </span>
            <span className={guess.matches.hairColor ? "correct" : "incorrect"}>
              {guess.character.hairColor}
            </span>
            <span className={guess.matches.nationality ? "correct" : "incorrect"}>
              {guess.character.nationality}
            </span>
            <span className={guess.matches.birthYear ? "correct" : "incorrect"}>
              {guess.character.birthYear}
            </span>
            <span className={guess.matches.occupation ? "correct" : "incorrect"}>
              {guess.character.occupation}
            </span>
            <span className={guess.matches.standType ? "correct" : "incorrect"}>
              {guess.character.standType}
            </span>
            <span className={guess.matches.firstAppearance ? "correct" : "incorrect"}>
              {guess.character.firstAppearance}
            </span>

            {/* MOBILE: Layout card */}
            <div className="guess-header-mobile">
              <ImageWithFallback
                src={guess.character.image}
                alt={guess.character.name}
                className="guess-image-mobile"
              />
              <div className="guess-name-mobile">{guess.character.name}</div>
            </div>

            <div className="guess-attributes-grid">
              {/* Gênero */}
              <div className={`attribute-row ${guess.matches.gender ? "correct" : "incorrect"}`}>
                <span className="attribute-label">Gênero:</span>
                <span className={`attribute-value ${guess.matches.gender ? "correct" : "incorrect"}`}>
                  {guess.character.gender}
                </span>
              </div>

              {/* Idade */}
              <div className={`attribute-row ${guess.matches.age ? "correct" : "incorrect"}`}>
                <span className="attribute-label">Idade:</span>
                <span className={`attribute-value ${guess.matches.age ? "correct" : "incorrect"}`}>
                  {guess.character.age}
                </span>
              </div>

              {/* Cor do Cabelo */}
              <div className={`attribute-row ${guess.matches.hairColor ? "correct" : "incorrect"}`}>
                <span className="attribute-label">Cor do Cabelo:</span>
                <span className={`attribute-value ${guess.matches.hairColor ? "correct" : "incorrect"}`}>
                  {guess.character.hairColor}
                </span>
              </div>

              {/* Nacionalidade */}
              <div className={`attribute-row ${guess.matches.nationality ? "correct" : "incorrect"}`}>
                <span className="attribute-label">Nacionalidade:</span>
                <span className={`attribute-value ${guess.matches.nationality ? "correct" : "incorrect"}`}>
                  {guess.character.nationality}
                </span>
              </div>

              {/* Ano de Nascimento */}
              <div className={`attribute-row ${guess.matches.birthYear ? "correct" : "incorrect"}`}>
                <span className="attribute-label">Ano de Nasc.:</span>
                <span className={`attribute-value ${guess.matches.birthYear ? "correct" : "incorrect"}`}>
                  {guess.character.birthYear}
                </span>
              </div>

              {/* Ocupação */}
              <div className={`attribute-row ${guess.matches.occupation ? "correct" : "incorrect"}`}>
                <span className="attribute-label">Ocupação:</span>
                <span className={`attribute-value ${guess.matches.occupation ? "correct" : "incorrect"}`}>
                  {guess.character.occupation}
                </span>
              </div>

              {/* Stand */}
              <div className={`attribute-row ${guess.matches.standType ? "correct" : "incorrect"}`}>
                <span className="attribute-label">Stand:</span>
                <span className={`attribute-value ${guess.matches.standType ? "correct" : "incorrect"}`}>
                  {guess.character.standType}
                </span>
              </div>

              {/* 1ª Aparição */}
              <div className={`attribute-row ${guess.matches.firstAppearance ? "correct" : "incorrect"}`}>
                <span className="attribute-label">1ª Aparição:</span>
                <span className={`attribute-value ${guess.matches.firstAppearance ? "correct" : "incorrect"}`}>
                  {guess.character.firstAppearance}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuessHistory;