

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AudioPlayer } from "@/lib/audioPlayer";

const IMG = {
  hero: "/images/ibiza-hero.jpg",
  about: "/images/ibiza-about.jpg",
  cam: "/images/ibiza-live-cam.jpg",
  shop: "/images/ibiza-shop.jpg",
  dj: "/images/ibiza-dj.jpg",
};

const instagramImages = [
  "/images/instagram-01.jpg",
  "/images/instagram-02.jpg",
  "/images/instagram-03.jpg",
  "/images/instagram-04.jpg",
  "/images/instagram-05.jpg",
  "/images/instagram-06.jpg",
  "/images/instagram-07.jpg",
    "/images/instagram-08.jpg",
      "/images/instagram-09.jpg",
      "/images/instagram-10.jpg",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const unsubscribe = AudioPlayer.subscribe(() => {
      setCurrentTime(AudioPlayer.getCurrentTime());
      setDuration(AudioPlayer.getDuration());
      setIsPlaying(AudioPlayer.isPlaying());
    });

    return unsubscribe;
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);

    AudioPlayer.seek(time);
    setCurrentTime(time);
  };

  const formatTime = (seconds: number) => {
    if (!seconds || !Number.isFinite(seconds)) {
      return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

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
            <Link href="/radio" className="transition-opacity hover:opacity-50">RADIO SHOWS</Link>
            <Link href="/" className="transition-opacity hover:opacity-50"></Link>
            <Link href="/dj" className="transition-opacity hover:opacity-50">DJ SPACE</Link>
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
            </div>
          </nav>
        )}
      
      </header>

      {/* HERO + RADIO PLAYER */}
      <section id="radio" className="relative pt-[86px]">
        <div
          className="relative min-h-[500px] overflow-hidden bg-neutral-200 bg-cover bg-center md:min-h-[590px]"
          style={{ backgroundImage: `url(${IMG.hero})` }}
        >
          <div className="absolute inset-0 bg-black/15" />

          <div className="relative z-10 flex min-h-[500px] flex-col items-center justify-center px-6 pb-20 text-center text-white md:min-h-[590px]">
            <div className="mb-5 flex justify-center">
  
</div>

            <h1 className="text-4xl font-light tracking-[0.18em] md:text-6xl">
              
            </h1>

            <p className="mt-5 text-sm tracking-[0.4em] md:text-lg">
              
            </p>

            {/* Real audio player: replace the src with your file/stream */}
            <div className="mt-10 w-full max-w-2xl border border-white/50 bg-black/20 p-4 backdrop-blur-md md:p-5">
              <div className="flex items-center gap-4 md:gap-6">
                <button
                  type="button"
                  aria-label="Play Ibiza Islander Session"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-neutral-900 transition-transform hover:scale-105"
                  onClick={() => {
  if (isPlaying) {
    AudioPlayer.pause();
  } else {
    AudioPlayer.play("/audio/Ibiza Islander Sessions 275 By Manu.mp3");
  }
}}
                >
                  <span className="ml-1 text-lg">
  {isPlaying ? "Ⅱ" : "▶"}
</span>
                </button>

                <div className="min-w-0 flex-1 text-left">
                  <div className="truncate text-[11px] tracking-[0.18em] md:text-xs">
                    IBIZA ISLANDER SESSIONS by Manu
                  </div>
                  <div className="mt-1 text-[9px] tracking-[0.2em] opacity-70">
                    NOW PLAYING
                  </div>
                </div>

                {/* Decorative waveform — replace with a real visualizer later if wanted */}
                <div className="hidden h-10 items-center gap-[2px] sm:flex">
                  {Array.from({ length: 42 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-px bg-white/80"
                      style={{ height: `${8 + ((i * 17) % 28)}px` }}
                    />
                  ))}
                </div>

                <span className="hidden text-[10px] opacity-70 sm:block">
  {formatTime(currentTime)}
</span>
              </div>
              {/* PROGRESS BAR */}
<div className="mt-5">
  <input
    type="range"
    min="0"
    max={duration || 0}
    step="0.1"
    value={Math.min(currentTime, duration || 0)}
    onChange={handleSeek}
    disabled={!duration}
    className="w-full cursor-pointer accent-white"
    aria-label="Audio progress"
  />

  <div className="mt-2 flex justify-between text-[9px] tracking-[0.15em] text-white/60">
    <span>{formatTime(currentTime)}</span>
    <span>{formatTime(duration)}</span>
  </div>
</div>

             
            </div>
          </div>
        </div>
      </section>

       {/* SHOP + DJ SPACE */}
      <section id="shop" className="border-b border-neutral-200">
        <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
          <div className="grid grid-cols-2 border-b border-neutral-200 md:border-b-0 md:border-r">
            <div
              className="min-h-[300px] bg-cover bg-center"
              style={{ backgroundImage: `url(${IMG.shop})` }}
            />
            <div className="flex flex-col justify-center bg-[#f8f7f4] px-7 py-10 md:px-10">
              <p className="text-2xl font-light tracking-[0.2em]">SHOP</p>
              <div className="my-5 h-px w-8 bg-neutral-900" />
              <p className="text-[10px] leading-6 tracking-[0.12em] text-neutral-600">
                CLOTHING, CAPS, FRAGRANCES

                <br />
                AND ACCESSORIES
                <br />
                INSPIRED BY IBIZA.
              </p>
              <Link
                href="#"
                className="mt-7 inline-flex w-fit border border-neutral-400 px-5 py-3 text-[9px] tracking-[0.18em]"
              >
                IN PROGRESS
              </Link>
            </div>
          </div>

          <div id="dj-space" className="grid grid-cols-2">
            <div className="flex flex-col justify-center bg-[#f8f7f4] px-7 py-10 md:px-10">
              <p className="text-2xl font-light tracking-[0.2em]">DJ SPACE</p>
              <div className="my-5 h-px w-8 bg-neutral-900" />
              <p className="text-[10px] leading-6 tracking-[0.12em] text-neutral-600">
                SUBMIT YOUR NEW RELEASE
                <br />
                SHARE YOUR SOUND WITH IBIZA ISLANDER
                <br />
                AND SPREAD THE WORLD
              </p>
              <Link
                href="/dj"
                className="mt-7 inline-flex w-fit border border-neutral-400 px-5 py-3 text-[9px] tracking-[0.18em]"
              >
                ENTER DJ SPACE
              </Link>
            </div>
            <div
              className="min-h-[300px] bg-cover bg-center"
              style={{ backgroundImage: `url(${IMG.dj})` }}
            />
          </div>
        </div>
      </section>


      {/* ABOUT */}    
      <section id="about"  className="border-b border-neutral-200">
        <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
          <div className="flex items-center px-8 py-16 md:px-16 lg:px-24 lg:py-24">
            <div className="max-w-md">
              <p className="mb-5 text-[10px] tracking-[0.3em] text-neutral-500">ABOUT</p>
              <h2 className="text-3xl font-light leading-tight tracking-[0.14em] md:text-4xl">
               Trend & Spirit.
              </h2>
              <div className="my-7 h-px w-10 bg-neutral-900" />
              <p className="text-[11px] leading-7 tracking-[0.12em] text-neutral-600">
                IBIZA ISLANDER is a lifestyle brand deeply rooted in the spirit of Ibiza. <br />
                For over 10 years, IBIZA ISLANDER has been spreading its diverse creations 
and broadcasting a weekly deep house radio show <br />on Ibiza Live Radio (103.7 FM), 
                every Thursday at 11 AM, <br /> Curating sounds and experiences.<br />

               Capture the timeless vibe of Ibiza, 
                from sunrise to sunset.<br /> In addition to music production, the brand offers limited-edition fashion,
                a signature fragrance,the refined essence of Ibiza’s boho chic spirit, NFT collectibles and more... <br />
                IBIZA ISLANDER is a lifestyle brand lived through sound, style and soul.
               
              </p>
         {/*    <Link
                href="#"
                className="mt-8 inline-flex border border-neutral-400 px-6 py-3 text-[9px] tracking-[0.2em] transition-colors hover:bg-neutral-900 hover:text-white"
              >
                DISCOVER THE BRAND
              </Link> 

         */} 
            </div>
          </div>

          <div
            className="min-h-[360px] bg-cover bg-center"
            style={{ backgroundImage: `url(${IMG.about})` }}
          />
        </div>
      </section>

      {/* INSTAGRAM + LIVE CAM */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
          <div className="border-b border-neutral-200 p-8 md:border-b-0 md:border-r md:p-10">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="text-[11px] tracking-[0.25em]">INSTAGRAM</p>
                <p className="mt-2 text-[9px] tracking-[0.18em] text-neutral-500">
                  @ibiza_islander
                </p>
              </div>
              <a
  href="https://www.instagram.com/ibiza_islander/"
  target="_blank"
  rel="noopener noreferrer"
  className="text-[9px] tracking-[0.18em] transition-opacity hover:opacity-50"
>
  FOLLOW US
</a>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {instagramImages.map((src, i) => (
                <div
                  key={src}
                  className="aspect-square bg-neutral-100 bg-cover bg-center"
                  style={{ backgroundImage: `url(${src})` }}
                  aria-label={`Instagram image ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-[11px] tracking-[0.25em]">LIVE CAM</p>
                <p className="mt-2 text-[9px] tracking-[0.18em] text-neutral-500">
                  IBIZA — LIVE
                </p>
              </div>
              <span className="flex items-center gap-2 text-[9px] tracking-[0.15em]">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                LIVE
              </span>
            </div>

            <div className="relative aspect-[16/8] overflow-hidden bg-neutral-100">
  <iframe
    src="https://player.earthtv.com?token=EAIYzgM429HzIEgG.CgtpYml6YXN0eWxlcxILSDFkelE0T0FCNU0aC0gxZDBIV1NBQk1J.vCP_BK_jTkNhCSAyuBohmJEiDKAKyD_SwrZb4knSpv9B-v4_lLNfm8jDK1sE0I2rXwFc-Yby0vj5M6REQM-WUw"
    title="Ibiza Live Cam"
    className="absolute inset-0 h-full w-full border-0"
    allow="autoplay; fullscreen"
    allowFullScreen
  />

  <div className="absolute bottom-0 left-0 z-10 bg-white px-6 py-3 text-[9px] tracking-[0.2em]">
    WATCH LIVE
  </div>
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
            <Link href="mailto:hola@ibizaislander.com?subject=Hello from web ">CONTACT</Link>
            <Link href="/privacy">LEGAL & PRIVACY</Link>
            
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
  href="https://www.facebook.com/Ibizaislander"
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
  );
}
