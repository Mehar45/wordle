import { useEffect, useState } from "react";
import words from "./wordsList.json";
import Keyboard from "./Keyboard";

export default function Game() {
  const [wordToGuess] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessedWords, setGuessedWords] = useState<string[]>(Array(6).fill(null));
  const [selectedIndex, setSelectedIndex] = useState(0);

  const addGuessedWords = (e: string) => {
    if (e === "Backspace") {
      setCurrentGuess(currentGuess.slice(0, -1));
      return;
    }

    if (e === "Enter" && currentGuess.length > 4) {
      setSelectedIndex(i => ++i);
      setCurrentGuess("");
      setGuessedWords(guess => guess.map((g, i) => {
        if (i === selectedIndex) {
          return currentGuess;
        } else {
          return g;
        }
      }))
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
  }, [guessedWords, currentGuess]);

  return (
    <main className="h-screen grid gap-4 place-content-center">
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
              <Col guess={isCurrentGuess ? currentGuess : word ?? ""} noOfCols={5} />
            </ul>
          )
        })}
      </div>

      <Keyboard addGuessedWords={addGuessedWords} />
    </main>
  );
}

function Col({ guess, noOfCols }: { guess: string; noOfCols: number }) {
  const boxes = [];

  for (let i = 0; i < noOfCols; i++) {
    const char = guess[i];
    boxes.push(
      <li key={i} className="flex items-center justify-center border-2 border-gray-400 w-[52px] h-[52px]">
        {char}
      </li>
    );
  }

  return boxes;
}