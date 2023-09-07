import { useEffect, useState } from "react";
import words from "./wordsList.json";
import Col from "./Col"
import Keyboard from "./Keyboard";

export default function Game() {
  const [wordToGuess] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessedWords, setGuessedWords] = useState<string[]>(Array(6).fill(null));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isLoser = selectedIndex > 5;

  const addGuessedWords = (e: string) => {
    if (e === "Backspace") {
      setCurrentGuess(currentGuess.slice(0, -1));
      return;
    }

    if (wordToGuess === guessedWords[selectedIndex - 1]) return;

    if (e === "Enter" && currentGuess.length > 4) {
      if (selectedIndex > 5) return;

      setSelectedIndex(i => ++i);
      setCurrentGuess("");
      setGuessedWords(guessedWords.map((guess, i) =>
        i === selectedIndex ? currentGuess : guess
      ));
      return;
    }

    if (currentGuess.length > 4 || e === "Enter") {
      return;
    }

    setCurrentGuess(currentGuess + e);
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]|Backspace|Enter$/)) return;

      addGuessedWords(key);
    }

    document.addEventListener("keyup", handler);

    return () => {
      document.removeEventListener("keyup", handler);
    }
  }, [guessedWords, currentGuess, wordToGuess]);

  return (
    <main className="h-screen grid gap-4 place-content-center">
      {isLoser && wordToGuess !== guessedWords[selectedIndex - 1] && (
        <div className="text-red-600 text-center text-2xl font-medium">
          You lost! Correct word was: {wordToGuess}
        </div>
      )}

      <h1 className="text-2xl font-bold uppercase text-center">
        Start typing
      </h1>

      {/* Grid */}
      <div className="space-y-2">
        {guessedWords.map((word, i) => {
          const isCurrentGuess = i === selectedIndex;

          return (
            <ul
              // Yes, I am using index as key because each element is static
              key={i}
              className="flex justify-center gap-2 text-3xl font-bold uppercase"
              role="group"
              aria-label={`Row ${i + 1}`}
            >
              <Col
                noOfCols={5}
                wordToGuess={wordToGuess}
                guess={isCurrentGuess ? currentGuess : word ?? ""}
                isCorrect={currentGuess != null && word != null}
              />
            </ul>
          )
        })}
      </div>

      <Keyboard addGuessedWords={addGuessedWords} />
    </main>
  );
}