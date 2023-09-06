type KeyboardProps = {
  addGuessedWords: (e: string) => void
}

const KEYS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

export default function Keyboard({ addGuessedWords }: KeyboardProps) {
  return (
    <div role="group" className="mt-4 space-y-2">
      {KEYS.map((key, i) =>
        <div key={i} className="flex gap-2 font-bold text-xl">
          {key.map(k =>
            <button
              key={k}
              className={`${k === "Enter" ? 'text-sm px-2 font-semibold' : ""} min-w-[2.75rem] h-14 bg-gray-300 uppercase rounded-md`}
              onClick={() => addGuessedWords(k)}
            >
              {k === "Backspace" ? "⌫" : k}
            </button>
          )}
        </div>
      )}
    </div>
  )
}