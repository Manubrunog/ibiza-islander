"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignUp() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
 const [message, setMessage] = useState("")
  async function handleSignUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
  setError(error.message)
} else {
  setMessage("Check your email to confirm your account.")
}
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSignUp()
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
            <Link href="/radio" className="transition-opacity hover:opacity-50">RADIO SHOWS</Link>
            <Link href="/" className="transition-opacity hover:opacity-50"></Link>
            <Link href="/dj" className="transition-opacity hover:opacity-50">DJ SPACE</Link>
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


     {/* SIGN UP */}

<section className="px-6 pb-28 pt-[150px] md:px-10">

  <div className="mx-auto max-w-[620px]">

    <div className="py-10">

      {/* TITRE */}

      <div className="mb-14 text-center">

        <p className="mb-4 text-[9px] tracking-[0.4em] text-neutral-400">
          DJ SPACE
        </p>

        <h1 className="text-[32px] font-light tracking-[0.15em] md:text-[40px]">
          CREATE ACCOUNT
        </h1>

        <p className="mx-auto mt-5 max-w-[430px] text-[11px] leading-7 text-neutral-500">
          Join Ibiza Islander and submit your tracks 
        </p>

      </div>


      {/* FORM */}

      <div className="mx-auto max-w-[460px] space-y-8">

        {/* EMAIL */}

        <div>

          <label className="mb-2 block text-[9px] tracking-[0.3em] text-neutral-400">
            EMAIL
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full border-b border-neutral-300 bg-transparent py-3 text-[13px] outline-none transition-colors focus:border-neutral-900"
          />

        </div>


        {/* PASSWORD */}

        <div>

          <label className="mb-2 block text-[9px] tracking-[0.3em] text-neutral-400">
            PASSWORD
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full border-b border-neutral-300 bg-transparent py-3 text-[13px] outline-none transition-colors focus:border-neutral-900"
          />

        </div>


        {/* ERROR */}

        {error && (
          <p className="pt-1 text-center text-[10px] tracking-[0.05em] text-red-500">
            {error}
          </p>
        )}


        {/* BUTTON */}

        <div className="pt-5 text-center">

          <button
            type="button"
            onClick={handleSignUp}
            className="border border-neutral-900 px-10 py-4 text-[9px] tracking-[0.3em] transition-all hover:bg-neutral-900 hover:text-white"
          >
            CREATE ACCOUNT
          </button>

        </div>


        {/* CONFIRMATION MESSAGE */}

        {message && (
          <div className="border-t border-neutral-200 pt-6 text-center">

            <p className="text-[10px] leading-6 tracking-[0.05em] text-neutral-500">
              {message}
            </p>

          </div>
        )}


        {/* LOGIN */}

        <div className="pt-5 text-center">

          <p className="text-[10px] tracking-[0.05em] text-neutral-400">
            Already have an account?
          </p>

          <Link
            href="/login"
            className="mt-3 inline-block text-[9px] tracking-[0.3em] text-neutral-900 underline underline-offset-4 transition-opacity hover:opacity-50"
          >
            SIGN IN
          </Link>

        </div>


        {/* BACK */}

        <div className="pt-6 text-center">

          <Link
            href="/dj"
            className="text-[9px] tracking-[0.3em] text-neutral-400 transition-colors hover:text-neutral-900"
          >
            ← BACK TO DJ SPACE
          </Link>

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
            <Link href="/">ABOUT</Link>
           <Link href="mailto:hola@ibizaislander.com?subject=Hello from web ">CONTACT</Link>
            
            <Link href="/privacy">PRIVACY</Link>
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
  )
}

const styles: any = {
  container: {
    minHeight: "100vh",
    background: "black",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },

  backLink: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
    textDecoration: "none",
    fontSize: "22px",
    letterSpacing: "1px",
    opacity: 0.6,
    transition: "0.3s",
  },

  input: {
    padding: "10px",
    width: "250px",
  },

  button: {
    padding: "10px 20px",
    background: "white",
    color: "black",
    cursor: "pointer",
    marginTop: "10px",
  },

  heroLogoWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "0px",
  },

  heroLogo: {
    width: "300px",
    height: "300px",
    objectFit: "contain",
    filter: "drop-shadow(0 0 10px rgba(255,255,255,0.2))",
    marginBottom: "0px",
  },
  footer: {
    textAlign: "center",
    marginTop: "60px",
    opacity: 0.4,
    fontSize: "12px",
  },
}