import type { Character } from '../types/Character';

interface VictoryModalProps {
  victory: boolean;
  targetCharacter: Character;
  onReset: () => void;
}

const VictoryModal = ({ victory, targetCharacter, onReset }: VictoryModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{victory ? '🎉 Yare Yare Daze! Você acertou! 🎉' : '💀 Muda Muda! Fim de Jogo! 💀'}</h2>
        
        <div className="character-reveal">
          <h3>O personagem era: {targetCharacter.name}</h3>
          <div className="character-info">
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