import type { Character } from '../types/Character';

export const characters: Character[] = [
  {
    id: 1,
    name: "Jotaro Kujo",
    image: "/images/jotaro.jpg", // Você vai adicionar essas imagens depois
    gender: "Male",
    age: 17,
    hairColor: "Black",
    nationality: "Japanese",
    birthYear: 1970,
    occupation: "Student",
    standType: "Close-range Power",
    firstAppearance: "Part 3: Stardust Crusaders"
  },
  {
    id: 2,
    name: "Dio Brando",
    image: "/images/dio.jpg",
    gender: "Male",
    age: "Unknown (over 100)",
    hairColor: "Blonde",
    nationality: "British",
    birthYear: 1867,
    occupation: "Vampire",
    standType: "Long-range Remote",
    firstAppearance: "Part 1: Phantom Blood"
  },
  {
    id: 3,
    name: "Joseph Joestar",
    image: "/images/joseph.jpg",
    gender: "Male",
    age: 18,
    hairColor: "Brown",
    nationality: "British-American",
    birthYear: 1920,
    occupation: "Hamon User",
    standType: "Long-range Reconnaissance",
    firstAppearance: "Part 2: Battle Tendency"
  }
];