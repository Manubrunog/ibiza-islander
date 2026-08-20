"use client"
import Link from "next/link";

import { AudioPlayer } from "@/lib/audioPlayer"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
export default function Radio() {
  


  const [tracks, setTracks] = useState<any[]>([])
  const [currentSession, setCurrentSession] = useState(275)
const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    fetchTracks()
  }, [])

  const fetchTracks = async () => {
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false })

    if (error) {
      console.log(error)
      return
    }

    setTracks(data || [])
  }
  const sessions = Array.from({ length: 8 }, (_, i) => 275 - i)

const playSession = (number: number) => {
  const url = `/audio/Ibiza Islander Sessions by Manu ${number}.mp3`

  AudioPlayer.play(url)
  setCurrentSession(number)
  setIsPlaying(true)
}

const togglePlay = () => {
  if (isPlaying) {
    AudioPlayer.pause()
    setIsPlaying(false)
  } else {
    playSession(currentSession)
  }
}

  return (
    <main className="min-h-screen bg-white text-neutral-900">

      {/* HEADER */}
      <header className="absolute left-0 right-0 top-0 z-50 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex h-[86px] max-w-[1440px] items-center justify-between px-6 md:px-10">
          <Link href="/" className="leading-none">
            <div className="w-[105px]">
  <div className="flex justify-between text-[18px] font-light">
    <span>I</span>
    <span>B</span>
    <span>I</span>
    <span>Z</span>
    <span>A</span>
  </div>

  <div className="mt-1 flex justify-between text-[18px] font-light">
    <span>I</span>
    <span>S</span>
    <span>L</span>
    <span>A</span>
    <span>N</span>
    <span>D</span>
    <span>E</span>
    <span>R</span>
  </div></div>
            <div className="mt-2 text-[8px] tracking-[0.38em] text-neutral-500">
              Music & Lifestyle 
            </div>
          </Link>
          {/* PETIT LOGO CENTRÉ */}
    <Link
      href="/"
      className="absolute left-1/2 -translate-x-1/2"
    >
      <img
        src="/images/logo-ibiza-islander.png"
        alt="Ibiza Islander"
        className="h-auto w-[75px] md:w-[90px]"
      />
    </Link>

          <nav className="hidden items-center gap-12 text-[11px] tracking-[0.2em] md:flex">
            <Link href="#radio" className="transition-opacity hover:opacity-50">RADIO SHOWS</Link>
            <Link href="#shop" className="transition-opacity hover:opacity-50">SHOP</Link>
            <Link href="#dj-space" className="transition-opacity hover:opacity-50">DJ SPACE</Link>
          </nav>

          <button
            type="button"
            aria-label="Open menu"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className="h-px w-5 bg-neutral-900" />
            <span className="h-px w-5 bg-neutral-900" />
            <span className="h-px w-5 bg-neutral-900" />
          </button>
        </div>
      </header>

      {/* RADIO HERO */}

<section className="border-b border-neutral-200 px-6 pb-20 pt-[130px] md:px-10 md:pb-28">

  <div className="mx-auto max-w-[1100px]">

    {/* INTRO */}

    <div className="mb-12 text-center">
      <p className="mb-4 text-[9px] tracking-[0.4em] text-neutral-400">
        IBIZA ISLANDER
      </p>

      <h1 className="text-[30px] font-light tracking-[0.18em] md:text-[42px]">
        RADIO SHOWS
      </h1>

      <p className="mt-4 text-[11px] tracking-[0.18em] text-neutral-400">
        CURATED BY MANU
      </p>
    </div>


    {/* PLAYER */}

    <div className="mx-auto max-w-[720px] border border-neutral-200 bg-neutral-50 px-6 py-8 md:px-10 md:py-10">

      <div className="flex items-center gap-6">

        {/* PLAY BUTTON */}

        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white transition-opacity hover:opacity-70"
        >
          {isPlaying ? (
            <span className="flex gap-1">
              <span className="h-4 w-[2px] bg-white" />
              <span className="h-4 w-[2px] bg-white" />
            </span>
          ) : (
            <span className="ml-1 text-[18px]">▶</span>
          )}
        </button>


        {/* CURRENT SESSION */}

        <div className="min-w-0 flex-1">

          <div className="mb-2 text-[8px] tracking-[0.3em] text-neutral-400">
            {isPlaying ? "NOW PLAYING" : "SELECTED SESSION"}
          </div>

          <div className="truncate text-[12px] tracking-[0.12em]">
            Ibiza Islander Sessions by Manu {currentSession}
          </div>

          {/* SIMPLE WAVEFORM */}

          <div className="mt-5 flex h-5 items-center gap-[3px] overflow-hidden opacity-30">
            {Array.from({ length: 55 }).map((_, i) => (
              <span
                key={i}
                className="w-[2px] shrink-0 bg-neutral-900"
                style={{
                  height: `${6 + ((i * 17) % 15)}px`,
                }}
              />
            ))}
          </div>

        </div>

      </div>

    </div>


    {/* SESSION LIST */}

    <div className="mx-auto mt-12 max-w-[720px]">

      <div className="mb-5 flex items-center justify-between border-b border-neutral-200 pb-4">
        <span className="text-[9px] tracking-[0.3em] text-neutral-400">
          RADIO SESSIONS
        </span>

        <span className="text-[9px] tracking-[0.2em] text-neutral-400">
          268 — 275
        </span>
      </div>


      <div>

        {sessions.map((number) => (
          <button
            key={number}
            type="button"
            onClick={() => playSession(number)}
            className={`group flex w-full items-center border-b border-neutral-100 py-5 text-left transition-colors hover:bg-neutral-50 ${
              currentSession === number
                ? "bg-neutral-50"
                : ""
            }`}
          >

            <span className="w-14 text-[10px] tracking-[0.15em] text-neutral-400">
              {number}
            </span>

            <span className="flex-1 text-[11px] tracking-[0.12em]">
              Ibiza Islander Sessions by Manu
            </span>

            <span className="ml-4 text-[10px] opacity-40 transition-opacity group-hover:opacity-100">
              {currentSession === number && isPlaying ? "❚❚" : "▶"}
            </span>

          </button>
        ))}

      </div>

    </div>

  </div>

</section>

      
      {/* FOOTER */}
      <footer>
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-8 py-10 md:flex-row md:items-end md:justify-between md:px-10">
          <Link href="/" className="leading-none">
            <div className="w-[105px]">
  <div className="flex justify-between text-[18px] font-light">
    <span>I</span>
    <span>B</span>
    <span>I</span>
    <span>Z</span>
    <span>A</span>
  </div>

  <div className="mt-1 flex justify-between text-[18px] font-light">
    <span>I</span>
    <span>S</span>
    <span>L</span>
    <span>A</span>
    <span>N</span>
    <span>D</span>
    <span>E</span>
    <span>R</span>
  </div></div>
            <div className="mt-2 text-[8px] tracking-[0.38em] text-neutral-500">
              Music & Lifestyle
            </div>
          </Link>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-[9px] tracking-[0.18em] text-neutral-600">
            <Link href="#about">ABOUT</Link>
            <Link href="#">CONTACT</Link>
            <Link href="#">LEGAL</Link>
            <Link href="#">PRIVACY</Link>
          </nav>

          <div className="flex gap-5 text-[10px] tracking-[0.15em]">
            <a
  href="https://www.instagram.com/ibiza_islander/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Instagram"
  className="transition-opacity hover:opacity-50"
>
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" />
  </svg>
</a>
            <a
  href="https://www.youtube.com/@ibizaislandersessions1462"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Facebook"
  className="transition-opacity hover:opacity-50"
>
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="currentColor"
  >
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.02 10.125 11.92v-8.432H7.078v-3.488h3.047V9.413c0-3.022 1.792-4.692 4.533-4.692 1.312 0 2.686.236 2.686.236v2.973h-1.514c-1.491 0-1.955.929-1.955 1.882v2.258h3.328l-.532 3.488h-2.796v8.432C19.612 23.093 24 18.092 24 12.073Z" />
  </svg>
</a>
            <a
  href="https://www.youtube.com/@ibizaislandersessions1462"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="YouTube"
  className="transition-opacity hover:opacity-50"
>
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="currentColor"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.376.55A3.016 3.016 0 0 0 .502 6.186 31.24 31.24 0 0 0 0 12a31.24 31.24 0 0 0 .502 5.814 3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.376-.55a3.016 3.016 0 0 0 2.122-2.136A31.24 31.24 0 0 0 24 12a31.24 31.24 0 0 0-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
  </svg>
</a>
          </div>
        </div>
      </footer>

    </main>
  )
}

const styles: any = {
  page: {
    minHeight: "100vh",
    background: "black",
    color: "white",
    padding: "30px",
   
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #222",
    paddingBottom: "25px",
  },

  logo: {
    fontWeight: "bold",
    letterSpacing: "2px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    opacity: 0.7,
  },

  hero: {
    textAlign: "center",
    marginBottom: "0px",
  },
  live: {
  color: "red",
  fontSize: "12px",
  marginBottom: "10px",
},

playButton: {
  padding: "10px 18px",
  background: "white",
  color: "black",
  border: "none",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "13px",
  letterSpacing: "1px",
  transition: "all 0.2s ease",
},


  title: {
    fontSize: "42px",
    marginBottom: "10px",
  },

  subtitle: {
    opacity: 0.6,marginBottom: "20px",
  },

  playerBox: {
    border: "0px solid #222",
    padding: "5px",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
  },
  newsBand: {
  marginTop: "30px",
  borderTop: "0px solid #222",
  borderBottom: "1px solid #222",
  padding: "10px 0",
  overflow: "hidden",
},

newsTitle: {
  fontSize: "12px",
  opacity: 0.6,
  marginBottom: "8px",
  letterSpacing: "1px",
},

radioHeader: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "25px",
  fontSize: "11px",
  opacity: 0.7,
  letterSpacing: "2px",
  gap: "4px",
},

radioStatus: {
  color: "red",
  animation: "pulse 1.5s infinite",
},


newsScroll: {
  display: "flex",
  gap: "30px",
  whiteSpace: "nowrap",
  overflowX: "auto",
},
tickerWrapper: {
  marginTop: "30px",
  overflow: "hidden",
  borderTop: "1px solid #222",
  borderBottom: "1px solid #222",
  padding: "10px 0",
  whiteSpace: "nowrap",
},

tickerTrack: {
  display: "flex",
  width: "max-content",
  animation: "ticker 18s linear infinite",
  willChange: "transform",
},

tickerItem: {
  marginRight: "40px",
  fontSize: "13px",
  opacity: 0.8,
  whiteSpace: "nowrap",
},
heroLogoWrap: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "0px",
},

heroLogo: {
  width: "300x",
  height: "300px",
  objectFit: "contain",
  filter: "drop-shadow(0 0 10px rgba(255,255,255,0.2))",
  marginBottom: "0px",
},
newsItem: {
  fontSize: "13px",
  opacity: 0.8,
},

  audio: {
    width: "100%",
    marginTop: "15px",
  },

  nowPlaying: {
    opacity: 0.7,
    marginBottom: "10px",
  },

  footer: {
    textAlign: "center",
    marginTop: "60px",
    opacity: 0.4,
    fontSize: "12px",
  },
}