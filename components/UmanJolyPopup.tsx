"use client"

import { useEffect, useState } from "react"

export default function UmanJolyPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 px-5 backdrop-blur-[2px]">

      <div className="relative w-full max-w-[760px] bg-white shadow-2xl">

        {/* CLOSE */}

        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 text-[18px] font-light leading-none text-neutral-500 transition-opacity hover:opacity-40"
        >
          ×
        </button>


        <div className="grid md:grid-cols-2">


          {/* COVER */}

          <div className="flex items-center justify-center bg-neutral-50 p-5 md:p-7">

            <img
              src="/images/uman-joly-close-your-eyes.jpg"
              alt="Uman Joly — Close Your Eyes"
              className="h-auto max-h-[420px] w-full object-contain"
            />

          </div>


          {/* CONTENT */}

          <div className="flex flex-col items-center justify-center px-8 py-10 text-center md:px-10">

            <p className="text-[8px] tracking-[0.42em] text-neutral-400">
              UMAN JOLY
            </p>

            <h2 className="mt-4 text-[25px] font-light tracking-[0.08em] text-neutral-900 md:text-[29px]">
              CLOSE YOUR EYES
            </h2>

            <p className="mt-3 text-[9px] tracking-[0.28em] text-neutral-400">
              NEW SINGLE
            </p>


            {/* PACKSHOT */}

            <div className="mt-7 flex h-[125px] w-[125px] items-center justify-center">

              <img
                src="/images/uman-joly-packshot.png"
                alt="Uman Joly"
                className="max-h-full max-w-full object-contain"
              />

            </div>


            {/* LINKS */}

            <div className="mt-7 flex gap-3">

              <a
                href="https://open.spotify.com/intl-fr/album/1wqm37dsLWrjOT8DnxEYBn"
                className="border border-neutral-900 px-6 py-3 text-[8px] tracking-[0.28em] transition-colors hover:bg-neutral-900 hover:text-white"
              >
                SPOTIFY
              </a>

              <a
                href="https://www.youtube.com/watch?v=afNCTLSmaKk"
                className="border border-neutral-900 px-6 py-3 text-[8px] tracking-[0.28em] transition-colors hover:bg-neutral-900 hover:text-white"
              >
                YOUTUBE
              </a>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}