type ColProps = {
  guess: string;
  isCorrect: boolean;
  noOfCols: number;
  wordToGuess: string;
}

export default function Col({ wordToGuess, guess, isCorrect, noOfCols }: ColProps) {
  const boxes = [];

  for (let i = 0; i < noOfCols; i++) {
    const char = guess[i];
    let className = "";

    if (isCorrect) {
      if (char === wordToGuess[i]) {
        className = "bg-green-600 text-white";
      } else if (wordToGuess.includes(char)) {
        className = "bg-yellow-500 text-white";
      } else {
        className = "bg-gray-500 text-white";
      }
    }

    boxes.push(
      <li
        key={i}
        className={`${className} flex items-center justify-center border-2 border-gray-400 w-[52px] h-[52px]`}
      >
        {char}
      </li>
    );
  }

  return boxes;
}