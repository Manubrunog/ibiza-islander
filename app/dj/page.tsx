"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Submit() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [name, setName] = useState("")
  const [trackName, setTrackName] = useState("")
  const [track, setTrack] = useState("")

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)
      setLoading(false)
    }

    checkUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const send = async () => {
    if (!user) return

    const { error } = await supabase.from("submissions").insert({
      name,
      email: user.email,
      track_name: trackName,
      track_url: track,
      status: "pending",
    })

    if (error) {
      alert("Error: " + error.message)
    } else {
      alert("Track submitted 🔥")
      setName("")
      setTrackName("")
      setTrack("")
    }
  }

const logout = async () => {
  await supabase.auth.signOut()
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
              </div>

            </div>

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
            <Link
              href="/radio"
              className="transition-opacity hover:opacity-50"
            >
              RADIO SHOWS
            </Link>

            <Link
              href="/"
              className="transition-opacity hover:opacity-50"
            >
              
            </Link>

            <Link
              href="/dj"
              className="transition-opacity hover:opacity-50"
            >
              DJ SPACE
            </Link>
{user && (
    




    <button
      type="button"
      onClick={logout}
      className="transition-opacity hover:opacity-50"
    >
      LOG OUT
    </button>
  )}
            
          </nav>


          <button
  type="button"
  aria-label={menuOpen ? "Close menu" : "Open menu"}
  onClick={() => setMenuOpen(!menuOpen)}
  className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
>
  <span
    className={`h-px w-5 bg-neutral-900 transition-transform duration-200 ${
      menuOpen ? "translate-y-[4px] rotate-45" : ""
    }`}
  />
  <span
    className={`h-px w-5 bg-neutral-900 transition-opacity duration-200 ${
      menuOpen ? "opacity-0" : ""
    }`}
  />
  <span
    className={`h-px w-5 bg-neutral-900 transition-transform duration-200 ${
      menuOpen ? "-translate-y-[4px] -rotate-45" : ""
    }`}
  />
</button>
        </div>
                  

        {/* MOBILE MENU */}
        {menuOpen && (
          <nav className="border-t border-neutral-200 bg-white px-6 py-6 md:hidden">
            <div className="flex flex-col gap-6 text-[11px] tracking-[0.2em]">
              <Link
                href="/radio"
                onClick={() => setMenuOpen(false)}
                className="transition-opacity hover:opacity-50"
              >
                RADIO SHOWS
              </Link>
              <Link
      href="/"
      onClick={() => setMenuOpen(false)}
      className="transition-opacity hover:opacity-50"
    >
      
    </Link>

              <Link
                href="/dj"
                onClick={() => setMenuOpen(false)}
                className="transition-opacity hover:opacity-50"
              >
                DJ SPACE
              </Link>

{user && (
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false)
            logout()
          }}
          className="text-left transition-opacity hover:opacity-50"
        >
          LOG OUT
        </button>
      )}

              
            </div>
          </nav>
        )}
      
      </header>


      {/* DJ SPACE */}

      <section className="px-6 pb-28 pt-[150px] md:px-10">

        <div className="mx-auto max-w-[620px]">

          {loading ? (

            <div className="py-20 text-center text-[10px] tracking-[0.3em] text-neutral-400">
              LOADING
            </div>

          ) : !user ? (

            /* NOT LOGGED */

            <div className="py-10 text-center">

              <p className="mb-4 text-[9px] tracking-[0.4em] text-neutral-400">
                IBIZA ISLANDER
              </p>

              <h1 className="text-[32px] font-light tracking-[0.15em] md:text-[40px]">
                DJ SPACE
              </h1>

              <p className="mx-auto mt-6 max-w-[430px] text-[11px] leading-7 text-neutral-500">
                Submit your music to Ibiza Islander.
                <br />
                Sign in or create an account to send your track.
              </p>


              <div className="mt-10 flex flex-col items-center gap-4">

                <Link
                  href="/login"
                  className="w-[190px] border border-neutral-900 px-8 py-4 text-center text-[9px] tracking-[0.3em] transition-all hover:bg-neutral-900 hover:text-white"
                >
                  SIGN IN
                </Link>

                <span className="text-[9px] tracking-[0.2em] text-neutral-300">
                  OR
                </span>

                <Link
                  href="/signup"
                  className="w-[190px] border border-neutral-300 px-8 py-4 text-center text-[9px] tracking-[0.3em] text-neutral-600 transition-all hover:border-neutral-900 hover:text-neutral-900"
                >
                  CREATE ACCOUNT
                </Link>

              </div>

            </div>

          ) : (

            /* LOGGED IN */

            <div>

              <div className="mb-14 text-center">

                <p className="mb-4 text-[9px] tracking-[0.4em] text-neutral-400">
                  DJ SPACE
                </p>

                <h1 className="text-[32px] font-light tracking-[0.15em] md:text-[40px]">
                  SUBMIT YOUR NEW RELEASE 
                </h1>

                <p className="mx-auto mt-5 max-w-[450px] text-[16px] leading-7 text-neutral-500">
                  Share your music and spread the world.
                  <br />
                  
                  Send us your new track and be part of the next sessions
                  <br />
                  We listen to every submission  <br />
                  Deep / Afro / House / Balearic
                </p>

              </div>


              {/* FORM */}

              <div className="space-y-8">

                <div>

                  <label className="mb-2 block text-[9px] tracking-[0.3em] text-neutral-400">
                    ARTIST NAME
                  </label>

                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-b border-neutral-300 bg-transparent py-3 text-[13px] outline-none transition-colors focus:border-neutral-900"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-[9px] tracking-[0.3em] text-neutral-400">
                    TRACK NAME
                  </label>

                  <input
                    value={trackName}
                    onChange={(e) => setTrackName(e.target.value)}
                    className="w-full border-b border-neutral-300 bg-transparent py-3 text-[13px] outline-none transition-colors focus:border-neutral-900"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-[9px] tracking-[0.3em] text-neutral-400">
                    EMAIL
                  </label>

                  <div className="border-b border-neutral-200 py-3 text-[13px] text-neutral-400">
                    {user.email}
                  </div>

                </div>


                <div>

                  <label className="mb-2 block text-[9px] tracking-[0.3em] text-neutral-400">
                    TRACK URL
                  </label>

                  <input
                    value={track}
                    onChange={(e) => setTrack(e.target.value)}
                    placeholder="SoundCloud / YouTube / Spotify / ..."
                    className="w-full border-b border-neutral-300 bg-transparent py-3 text-[13px] outline-none placeholder:text-neutral-300 focus:border-neutral-900"
                  />

                </div>


                <div className="pt-5 text-center">

                  <button
                    type="button"
                    onClick={send}
                    className="border border-neutral-900 px-10 py-4 text-[9px] tracking-[0.3em] transition-all hover:bg-neutral-900 hover:text-white"
                  >
                    SUBMIT TRACK
                  </button>

                </div>

              </div>

            </div>

          )}

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
              </div>

            </div>

            <div className="mt-2 text-[8px] tracking-[0.38em] text-neutral-500">
              Music & Lifestyle
            </div>

          </Link>


          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-[9px] tracking-[0.18em] text-neutral-600">

            <Link href="/">ABOUT</Link>
            <Link href="mailto:hola@ibizaislander.com?subject=Hello from web ">CONTACT</Link>
            <Link href="/privacy">LEGAL & PRIVACY</Link>

          </nav>


          <div className="flex gap-5 text-[10px] tracking-[0.15em]">

            {/* INSTAGRAM */}

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
                <circle
                  cx="17.4"
                  cy="6.7"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>


            {/* FACEBOOK */}

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


            {/* YOUTUBE */}

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
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.376.55A3.016 3.016 0 0 0 .502 6.186 31.24 31.24 0 0 0 .502 17.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505-.55 9.376-2.136A31.24 31.24 0 0 0 24 12a31.24 31.24 0 0 0-.502-5.814Z" />
              </svg>
            </a>

          </div>

        </div>

      </footer>

    </main>
  )
}