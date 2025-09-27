import { useState, useMemo } from "react";
import type { GuessResult } from "../types/Character";
import { allCharacters } from "../data/characters";
import ImageWithFallback from "./ImageWithFallback";
import "../styles/components/GuessForm.css";

interface GuessFormProps {
  onGuess: (characterName: string) => void;
  disabled: boolean;
  guesses: GuessResult[];
}

const GuessForm = ({ onGuess, disabled, guesses }: GuessFormProps) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Personagens que ainda não foram tentados
  const availableCharacters = useMemo(() => {
    const guessedNames = guesses.map((guess) =>
      guess.character.name.toLowerCase()
    );
    return allCharacters.filter(
      (character) => !guessedNames.includes(character.name.toLowerCase())
    );
  }, [guesses]);

  // Filtrar sugestões baseado no início das palavras ou segundos nomes
  const filteredSuggestions = useMemo(() => {
    if (!inputValue.trim()) {
      return availableCharacters;
    }

    const searchTerm = inputValue.toLowerCase().trim();

    return availableCharacters
      .filter((character) => {
        const name = character.name.toLowerCase();

        // Divide o nome em partes (ex: "Jotaro Kujo" → ["jotaro", "kujo"])
        const nameParts = name.split(" ");

        // Verifica se alguma parte começa com o termo de busca
        const startsWithSearch = nameParts.some((part) =>
          part.startsWith(searchTerm)
        );

        // Também busca por correspondência em qualquer parte do nome
        // mas com prioridade para os que começam com o termo
        const containsSearch = nameParts.some((part) =>
          part.includes(searchTerm)
        );

        // Prioriza os que começam com o termo, depois os que contém
        if (startsWithSearch) return true;
        if (containsSearch) return true;

        return false;
      })
      .sort((a, b) => {
        // Ordena: primeiro os que começam com o termo, depois os que contém
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        const aStarts = aName
          .split(" ")
          .some((part) => part.startsWith(searchTerm));
        const bStarts = bName
          .split(" ")
          .some((part) => part.startsWith(searchTerm));

        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return 0;
      });
  }, [inputValue, availableCharacters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();

    if (trimmedValue) {
      // Busca exata (case-insensitive)
      const exactMatch = availableCharacters.find(
        (char) => char.name.toLowerCase() === trimmedValue.toLowerCase()
      );

      if (exactMatch) {
        onGuess(exactMatch.name);
        setInputValue("");
        setShowSuggestions(false);
      } else {
        // Se não encontrou exato, tenta encontrar o mais próximo
        const closeMatch = availableCharacters.find((char) =>
          char.name.toLowerCase().includes(trimmedValue.toLowerCase())
        );

        if (closeMatch) {
          // Pergunta se quer usar a sugestão próxima
          if (confirm(`Você quis dizer "${closeMatch.name}"?`)) {
            onGuess(closeMatch.name);
            setInputValue("");
            setShowSuggestions(false);
            return;
          }
        }

        const characterExists = allCharacters.find(
          (char) => char.name.toLowerCase() === trimmedValue.toLowerCase()
        );

        if (characterExists) {
          alert("Você já tentou este personagem! Tente outro.");
        } else {
          alert("Personagem não encontrado! Use as sugestões abaixo.");
        }
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (characterName: string) => {
    setInputValue(characterName);
    setShowSuggestions(false);
    onGuess(characterName);
    setInputValue("");
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  // Destacar a parte correspondente no nome
  const highlightMatch = (name: string, searchTerm: string) => {
    if (!searchTerm) return name;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    return name.replace(regex, "<strong>$1</strong>");
  };

  return (
    <div className="guess-form-container">
      <form onSubmit={handleSubmit} className="guess-form">
        <div className="input-button-group">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={`Buscar por nome... (${availableCharacters.length} restantes)`}
            disabled={disabled || availableCharacters.length === 0}
            className="guess-input"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={
              disabled || availableCharacters.length === 0 || !inputValue.trim()
            }
            className="guess-button"
          >
            {disabled ? "✗" : availableCharacters.length === 0 ? "✓" : "➤"}
          </button>
        </div>

        {/* Sugestões filtradas */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="suggestions-dropdown">
            <div className="suggestions-header">
              <span>
                {inputValue.trim()
                  ? `Encontrados: ${filteredSuggestions.length}`
                  : `Disponíveis: ${filteredSuggestions.length}`}
                <span className="search-hint">
                  {" "}
                  (busca por início das palavras)
                </span>
              </span>
            </div>
            <div className="suggestions-list">
              {filteredSuggestions.map((character, index) => {
                const searchTerm = inputValue.toLowerCase().trim();
                const highlightedName = highlightMatch(
                  character.name,
                  searchTerm
                );

                return (
                  <div
                    key={index}
                    className="suggestion-item"
                    onMouseDown={() => handleSuggestionClick(character.name)}
                  >
                    <ImageWithFallback
                      src={character.image}
                      alt={character.name}
                      className="suggestion-image"
                    />
                    <span
                      className="suggestion-name"
                      dangerouslySetInnerHTML={{ __html: highlightedName }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Mensagem quando não encontra resultados */}
        {showSuggestions &&
          inputValue.trim() &&
          filteredSuggestions.length === 0 && (
            <div className="suggestions-dropdown">
              <div className="no-results">
                <span>Nenhum personagem encontrado para "{inputValue}"</span>
                <br />
                <small>Tente buscar pelo início do nome ou sobrenome</small>
              </div>
            </div>
          )}
      </form>

      {/* Contador compacto */}
      <div className="characters-counter-compact">
        {availableCharacters.length > 0 ? (
          <span>
            🔄 {availableCharacters.length}/{allCharacters.length} restantes
          </span>
        ) : guesses.length > 0 ? (
          <span className="all-guessed">🎉 Todos tentados!</span>
        ) : null}
      </div>
    </div>
  );
};

export default GuessForm;
