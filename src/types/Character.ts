export interface Character {
  id: number;
  name: string;
  image: string;
  gender: string;
  age: number | string;
  hairColor: string;
  nationality: string;
  birthYear: number | string;
  occupation: string;
  standType: string;
  firstAppearance: string;
}

export interface GuessResult {
  character: Character;
  matches: {
    name: boolean;
    gender: boolean;
    age: boolean;
    hairColor: boolean;
    nationality: boolean;
    birthYear: boolean;
    occupation: boolean;
    standType: boolean;
    firstAppearance: boolean;
  };
}

// Adicione esta interface para o modal
export interface VictoryModalProps {
  victory: boolean;
  targetCharacter: Character;
  onReset: () => void;
  attempts: number;
}