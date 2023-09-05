import { useEffect, useState } from "react";
import words from "./wordsList.json";

const KEYS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
]

const GRID = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export default function Game() {
  const [wordToGuess] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const addGuessedLetters = (e: string) => {
    if (e === "Backspace") {
      guessedLetters.pop();
      setGuessedLetters([...guessedLetters]);
      return;
    }

    if (guessedLetters.length >= 4 || e === "Enter") {
      return;
    }

    setGuessedLetters([...guessedLetters, e]);
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]|Backspace|Enter$/)) return;

      addGuessedLetters(key);
    }

    document.addEventListener("keyup", handler);

    return () => {
      document.removeEventListener("keyup", handler);
    }
  }, [guessedLetters]);

  return (
    <main className="h-screen grid gap-4 place-content-center">
      <h1 className="text-2xl font-bold uppercase text-center">
        Start typing
      </h1>

      {/* Grid */}
      <div className="space-y-2">
        {GRID.map((g, i) =>
          <ul
            // Yes, I am using index as key because each element is static
            key={i}
            className="flex justify-center gap-2 text-3xl font-bold uppercase"
            role="group"
            aria-label={`Row ${i + 1}`}
          >
            {g.map((_, i) =>
              <li
                key={i}
                className="flex items-center justify-center border-2 border-gray-400 w-[52px] h-[52px]"
              >
                {guessedLetters}
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Keyboard */}
      <div role="group" className="mt-4 space-y-2">
        {KEYS.map((key, i) =>
          <div key={i} className="flex gap-2 font-bold text-xl">
            {key.map(k =>
              <button
                key={k}
                className={`${k === "Enter" ? 'text-sm px-2 font-semibold' : ""} min-w-[2.75rem] h-14 bg-gray-300 uppercase rounded-md`}
                onClick={() => addGuessedLetters(k)}
              >
                {k === "Backspace" ? "⌫" : k}
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}