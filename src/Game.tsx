import { useState } from "react";

const keyBoard = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
]

export default function Game() {
  const [input, setInput] = useState("");

  const answers = [
    ["h", "e", "l", "l", "o"],
    ["w", "o", "r", "l", "d"],
    ["b", "r", "e", "a", "k"],
    ["l", "i", "m", "i", "t"],
    ["l", "a", "t", "e", "r"],
    ["p", "e", "a", "c", "e"],
  ];

  const handelInputValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    setInput((e.target as HTMLButtonElement).textContent!);
  }

  return (
    <main className="h-screen grid gap-4 place-content-center">
      <h1 className="text-2xl font-bold uppercase text-center">
        Start typing
      </h1>

      <div className="space-y-2">
        {answers.map((answer, i) =>
          <ul
            key={i}
            className="flex justify-center gap-2 text-3xl font-bold uppercase"
            role="group"
            aria-label={`Row ${i + 1}`}
          >
            {answer.map((a, i) =>
              // Yes, I am using index as key because each element is static
              <li
                key={i}
                className="flex items-center justify-center border-2 border-gray-400 w-[52px] h-[52px]"
              >
                {input}
              </li>
            )}
          </ul>
        )}
      </div>

      <div role="group" className="mt-4 space-y-2">
        {keyBoard.map((key, i) =>
          <div key={i} className="flex gap-2 font-bold text-xl">
            {key.map(k =>
              <button
                key={k}
                className="w-11 h-14 bg-gray-300 uppercase rounded-md"
                onClick={handelInputValue}
              >
                {k}
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}