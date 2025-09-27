import type { Character } from '../types/Character';
import '../styles/components/VictoryModal.css';

interface VictoryModalProps {
  victory: boolean;
  targetCharacter: Character;
  onReset: () => void;
  attempts: number;
}

const VictoryModal = ({ victory, targetCharacter, onReset, attempts }: VictoryModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">
          {victory ? '🎉 Yare Yare Daze! Você acertou! 🎉' : '💀 Muda Muda! Fim de Jogo! 💀'}
        </h2>
        
        {victory && (
          <div className="victory-stats">
            <p className="attempts-count">Você acertou em <strong>{attempts}</strong> tentativa{attempts > 1 ? 's' : ''}!</p>
            {attempts === 1 && <p className="perfect-score">🌟 PERFEITO! Primeira tentativa! 🌟</p>}
            {attempts <= 3 && attempts > 1 && <p className="great-score">🔥 Excelente! Muito bom! 🔥</p>}
          </div>
        )}
        
        <div className="character-reveal">
          <h3 className="reveal-name">O personagem era: {targetCharacter.name}</h3>
          <div className="character-details">
            <p><strong>Gênero:</strong> {targetCharacter.gender}</p>
            <p><strong>Idade:</strong> {targetCharacter.age}</p>
            <p><strong>Cor do Cabelo:</strong> {targetCharacter.hairColor}</p>
            <p><strong>Nacionalidade:</strong> {targetCharacter.nationality}</p>
            <p><strong>Ano de Nascimento:</strong> {targetCharacter.birthYear}</p>
            <p><strong>Ocupação:</strong> {targetCharacter.occupation}</p>
            <p><strong>Tipo de Stand:</strong> {targetCharacter.standType}</p>
            <p><strong>Primeira Aparição:</strong> {targetCharacter.firstAppearance}</p>
          </div>
        </div>
        
        <button onClick={onReset} className="reset-button">
          {victory ? 'Jogar Novamente' : 'Tentar Outra Vez'}
        </button>
      </div>
    </div>
  );
};

export default VictoryModal;