"use client"

import { createContext, useContext, useRef, useState } from "react"

const AudioContext = createContext<any>(null)

export function AudioProvider({ children }: { children: React.ReactNode }) {

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [playing, setPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<string | null>(null)

  const play = (url: string) => {

    // 🔥 CRÉATION UNIQUE
    if (!audioRef.current) {
      audioRef.current = new Audio(url)

      // important: garder état même si page change
      audioRef.current.addEventListener("ended", () => {
        setPlaying(false)
      })
    } else {
      audioRef.current.src = url
    }

    audioRef.current.play()
    setPlaying(true)
    setCurrentTrack(url)
  }

  const pause = () => {
    audioRef.current?.pause()
    setPlaying(false)
  }

  return (
    <AudioContext.Provider value={{
      play,
      pause,
      playing,
      currentTrack
    }}>
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => useContext(AudioContext)