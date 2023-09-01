import { useRef } from "react";
import HowToPlayDialog from "./HowToPlayDialog";
import WordleLogo from "./WordleLogo";

type HomeProps = {
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Home({ setIsPlaying }: HomeProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className='h-screen grid place-content-center gap-3 text-center bg-[#e3e3e3]'>
        <WordleLogo className='mx-auto' />
        <h1 className='text-4xl font-bold'>Wordle</h1>
        <h2 className='text-3xl mb-2'>
          Get 6 chances to guess a <br /> 5-letter  word.
        </h2>
        <div className="flex justify-between gap-4">
          <button
            className='flex-1 border-black border-[1px] py-2 text-md rounded-full'
            onClick={() => dialogRef.current?.showModal()}
          >
            How to play
          </button>
          <button
            className='flex-1 bg-black text-white py-2 text-md rounded-full'
            onClick={() => setIsPlaying(true)}
          >
            Play
          </button>
        </div>
      </div>
      <HowToPlayDialog dialogRef={dialogRef} />
    </>
  );
}