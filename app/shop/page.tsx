"use client"

import Link from "next/link"

export default function Shop() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="relative z-50 border-b border-neutral-100 bg-white/95 backdrop-blur-sm">

        <div className="mx-auto flex h-[86px] max-w-[1440px] items-center justify-between px-6 md:px-10">

          {/* LEFT BRAND */}

          <Link
            href="/"
            className="leading-none"
          >
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


          {/* CENTER LOGO */}

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


          {/* NAV */}

          <nav className="hidden items-center gap-10 text-[10px] tracking-[0.2em] md:flex">

            <Link
              href="/radio"
              className="transition-opacity hover:opacity-50"
            >
              RADIO SHOWS
            </Link>

            <Link
              href="/shop"
              className="transition-opacity hover:opacity-50"
            >
              SHOP
            </Link>

            <Link
              href="/dj"
              className="transition-opacity hover:opacity-50"
            >
              DJ SPACE
            </Link>

          </nav>


          {/* MOBILE */}

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

      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <section className="border-t border-neutral-100 px-6 py-14 md:px-10 md:py-16">

        <div className="mx-auto max-w-[1250px]">

          <div className="grid items-center gap-8 md:grid-cols-[300px_minmax(0,1fr)_300px] md:gap-10 lg:grid-cols-[320px_minmax(0,620px)_320px] lg:gap-14">

            {/* T-SHIRT */}

            <div className="group text-center">

              <div className="flex h-[260px] items-center justify-center overflow-hidden bg-neutral-50 md:h-[300px]">

                <img
                  src="/images/shop-tshirt.jpg"
                  alt="Ibiza Islander T-shirt"
                  className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                />

              </div>

              <p className="mt-4 text-[10px] tracking-[0.3em] text-neutral-500">
                T-SHIRT
              </p>

            </div>


            {/* CENTRAL TEXT */}

            <div className="text-center text-[11px] leading-7 text-neutral-600 md:text-[12px] md:leading-8">

              <p className="text-[17px] font-medium tracking-[0.08em] text-neutral-900 md:text-[17px]">
                IBIZA ISLANDER IS NOT ANOTHER VIRTUAL BRAND YOU CAN ORDER ONLINE.
              </p>

              <p className="mx-auto mt-7 max-w-[570px]">
                We believe some things are meant to be discovered,
                experienced. <br/> That´s why, Ibiza Islander is available exclusively for sell on the island.
              </p>


              <div className="mt-5">
                

                <p className="text-[18px] font-light tracking-[0.12em] text-neutral-900 md:text-[21px]">
                  VINE. VI. VENCÍ.*
                </p>

                <p className="mt-1 italic text-[10px] text-neutral-500">
                  A collection for the Ibiza Happy Few.
                </p>

              </div>


              <p className="mx-auto mt-5 max-w-[570px]">
                
                Every piece is unique,
                with eco-friendly dyes and fibers.
                
                Made one by one, by hand with care <br/>
                without mass production and 
                unnecessary transport. 
              </p>


              <div className="mt-5">

                <p className="text-[15px] font-medium tracking-[0.08em] text-neutral-900 md:text-[17px]">
                  TAKE HOME A MEMORY. NOT MERCHANDISE.
                </p>

                <p className="mt-5 text-[10px] leading-6 text-neutral-500">
                  Available exclusively through selected retailers** in Ibiza.
                </p>

              </div>

              <div className="mx-auto mt-5 max-w-[560px] text-[9px] leading-6 text-neutral-400">

                <p>
                  * I came. I saw. I conquered.
                </p>

                <p className="mt-2">
                  ** Your favourite retailer doesn’t have it yet?{" "}
                  <strong className="font-medium text-neutral-600">
                    Ask them why.
                  </strong>
                </p>

              </div>

            </div>


            {/* TOTE BAG */}

            <div className="group text-center">

              <div className="flex h-[260px] items-center justify-center overflow-hidden bg-neutral-50 md:h-[300px]">

                <img
                  src="/images/shop-totebag.jpg"
                  alt="Ibiza Islander Tote Bag"
                  className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                />

              </div>

              <p className="mt-4 text-[10px] tracking-[0.3em] text-neutral-500">
                TOTE BAG
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BACK HOME
      ===================================================== */}

      

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-neutral-100">

        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-8 py-10 md:flex-row md:items-end md:justify-between md:px-10">

          <Link
            href="/"
            className="leading-none"
          >

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

            <Link href="/">
              ABOUT
            </Link>

            <Link href="mailto:hola@ibizaislander.com?subject=Hello from web">
              CONTACT
            </Link>

            <Link href="/privacy">
              LEGAL & PRIVACY
            </Link>

          </nav>


          <div className="flex gap-5">

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

                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                />

                <circle
                  cx="12"
                  cy="12"
                  r="4.2"
                />

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

                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.02 10.125 11.92v-8.432H7.078v-3.488h3.047V9.413c0-3.022 1.792-4.692 4.533-4.692 1.312 0 2.686.236 2.686 2.973h-1.514c-1.491 0-1.955.929-1.955 1.882v2.258h3.328l-.532 3.488h-2.796v8.432C19.612 23.093 24 18.092 24 12.073Z" />

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

                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.376.55A3.016 3.016 0 0 0 .502 6.186 31.24 31.24 0 0 0 0 12a31.24 31.24 0 0 0 .502 5.814 3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.376-.55a3.016 3.016 0 0 0 2.122-2.136A31.24 31.24 0 0 0 24 12a31.24 31.24 0 0 0-.502-5.814ZM9.545 15.568V8.432L15.818 12l6.273-3.568Z" />

              </svg>

            </a>

          </div>

        </div>

      </footer>

    </main>
  )
}