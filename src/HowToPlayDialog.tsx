import { RefObject } from "react";

type DialogProps = {
  dialogRef: RefObject<HTMLDialogElement>
}

export default function HowToPlayDialog({ dialogRef }: DialogProps) {
  const closeModal = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      dialogRef.current.close();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="rounded-md animate-fade-up"
      onClick={closeModal}
    >
      <div className="max-w-lg p-8">
        <button
          className="absolute right-4 top-4"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>
        <h2 className="text-3xl font-bold">How To Play</h2>
        <h3 className="text-2xl">Guess the Wordle in 6 tries.</h3>
        <ul className="my-4 list-disc pl-5">
          <li>Each guess must be a valid 5-letter word.</li>
          <li>The color of the tiles will change to show how close your guess was to the word.</li>
        </ul>
        <div>
          <strong>Examples</strong>
          <div className="space-y-4">
            <div>
              <ul className="flex gap-2 text-2xl font-bold mt-2">
                <li className="bg-green-600 text-white px-2">W</li>
                <li className="border-gray-400 border-2 px-2.5">E</li>
                <li className="border-gray-400 border-2 px-2">A</li>
                <li className="border-gray-400 border-2 px-2">R</li>
                <li className="border-gray-400 border-2 px-2">Y</li>
              </ul>
              <p className="mt-2">
                <strong>W</strong> is in the word and in the correct spot.
              </p>
            </div>
            <div>
              <ul className="flex gap-2 text-2xl font-bold mt-2">
                <li className="border-gray-400 border-2 px-2">P</li>
                <li className="bg-yellow-500 text-white px-3.5">I</li>
                <li className="border-gray-400 border-2 px-2">L</li>
                <li className="border-gray-400 border-2 px-2">L</li>
                <li className="border-gray-400 border-2 px-2">S</li>
              </ul>
              <p className="mt-2">
                <strong>I</strong> is in the word but in the wrong spot.
              </p>
            </div>
            <div>
              <ul className="flex gap-2 text-2xl font-bold mt-2">
                <li className="border-gray-400 border-2 px-2">V</li>
                <li className="border-gray-400 border-2 px-2">A</li>
                <li className="border-gray-400 border-2 px-2">G</li>
                <li className="bg-gray-500 text-white px-2">U</li>
                <li className="border-gray-400 border-2 px-2">E</li>
              </ul>
              <p className="mt-2">
                <strong>U</strong> is not in the word in any spot.
              </p>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      data-testid="icon-close"
    >
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
    </svg>
  );
}