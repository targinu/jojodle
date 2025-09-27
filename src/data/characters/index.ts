import type { Character } from '../../types/Character';
import { part3Characters } from './part3';

// Export individual por parte
export { part3Characters };

// Export combinado de todos os personagens
export const allCharacters: Character[] = [
  ...part3Characters
];

// Helper para buscar por parte
export const getCharactersByPart = (partNumber: number): Character[] => {
  const parts = {
    3: part3Characters,
  };
  return parts[partNumber as keyof typeof parts] || [];
};

// Helper para buscar por nome
export const findCharacterByName = (name: string): Character | undefined => {
  return allCharacters.find(char => 
    char.name.toLowerCase().includes(name.toLowerCase())
  );
};