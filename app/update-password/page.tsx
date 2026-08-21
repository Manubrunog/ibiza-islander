"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function UpdatePassword() {
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleUpdatePassword() {
    setError("")
    setMessage("")

    if (!password || !confirmPassword) {
      setError("Please enter your new password.")
      return
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setMessage("Your password has been updated successfully.")

    setTimeout(() => {
      router.push("/login")
    }, 2000)
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
              href="/dj"
              className="transition-opacity hover:opacity-50"
            >
              DJ SPACE
            </Link>

          </nav>

        </div>

      </header>


      {/* UPDATE PASSWORD */}

      <section className="px-6 pb-28 pt-[150px] md:px-10">

        <div className="mx-auto max-w-[620px]">

          <div className="py-10">

            <div className="mb-14 text-center">

              <p className="mb-4 text-[9px] tracking-[0.4em] text-neutral-400">
                DJ SPACE
              </p>

              <h1 className="text-[32px] font-light tracking-[0.15em] md:text-[40px]">
                NEW PASSWORD
              </h1>

              <p className="mx-auto mt-5 max-w-[430px] text-[11px] leading-7 text-neutral-500">
                Enter your new password below.
              </p>

            </div>


            <div className="mx-auto max-w-[460px] space-y-8">

              {/* PASSWORD */}

              <div>

                <label className="mb-2 block text-[9px] tracking-[0.3em] text-neutral-400">
                  NEW PASSWORD
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b border-neutral-300 bg-transparent py-3 text-[13px] outline-none transition-colors focus:border-neutral-900"
                />

              </div>


              {/* CONFIRM */}

              <div>

                <label className="mb-2 block text-[9px] tracking-[0.3em] text-neutral-400">
                  CONFIRM PASSWORD
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border-b border-neutral-300 bg-transparent py-3 text-[13px] outline-none transition-colors focus:border-neutral-900"
                />

              </div>


              {/* ERROR */}

              {error && (
                <p className="pt-1 text-center text-[10px] tracking-[0.05em] text-red-500">
                  {error}
                </p>
              )}


              {/* SUCCESS */}

              {message && (
                <p className="pt-1 text-center text-[10px] leading-6 tracking-[0.05em] text-neutral-500">
                  {message}
                </p>
              )}


              {/* BUTTON */}

              <div className="pt-5 text-center">

                <button
                  type="button"
                  onClick={handleUpdatePassword}
                  disabled={loading}
                  className="border border-neutral-900 px-10 py-4 text-[9px] tracking-[0.3em] transition-all hover:bg-neutral-900 hover:text-white disabled:opacity-40"
                >
                  {loading ? "UPDATING..." : "UPDATE PASSWORD"}
                </button>

              </div>


              {/* BACK */}

              <div className="pt-6 text-center">

                <Link
                  href="/login"
                  className="text-[9px] tracking-[0.3em] text-neutral-400 transition-colors hover:text-neutral-900"
                >
                  ← BACK TO SIGN IN
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
              </div>

            </div>

            <div className="mt-2 text-[8px] tracking-[0.38em] text-neutral-500">
              Music & Lifestyle
            </div>

          </Link>

        </div>

      </footer>

    </main>
  )
}