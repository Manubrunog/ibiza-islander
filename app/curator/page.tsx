"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function Curator() {
  const router = useRouter()

  const [tracks, setTracks] = useState<any[]>([])
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [loadingTracks, setLoadingTracks] = useState(true)
  const [tracksError, setTracksError] = useState("")

  useEffect(() => {
    checkAdmin()
  }, [])

  const checkAdmin = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.replace("/login")
      return
    }

    if (user.app_metadata?.role !== "admin") {
      router.replace("/dj")
      return
    }

    setCheckingAuth(false)

    await fetchTracks()
  }

  const fetchTracks = async () => {
    setLoadingTracks(true)
    setTracksError("")

    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("CURATOR SUBMISSIONS ERROR:", error)
      setTracksError(error.message)
      setLoadingTracks(false)
      return
    }

    console.log("CURATOR SUBMISSIONS:", data)

    setTracks(data || [])
    setLoadingTracks(false)
  }

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    const { error } = await supabase
      .from("submissions")
      .update({ status })
      .eq("id", id)

    if (error) {
      alert("Error: " + error.message)
      return
    }

    await fetchTracks()
  }

  if (checkingAuth) {
    return (
      <main className="min-h-screen bg-white text-neutral-900 flex items-center justify-center">
        <p className="text-sm tracking-widest opacity-50">
          LOADING...
        </p>
      </main>
    )
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

      {/* TITLE */}
      <section style={styles.hero}>

        <h1 style={styles.title}>
          🎧 Curator Panel
        </h1>

        <p style={styles.subtitle}>
          Review submissions • Approve talent • Build the Ibiza sound
        </p>

      </section>

      {/* TRACK LIST */}
      <section style={styles.list}>

        {loadingTracks ? (

          <p style={{ textAlign: "center", opacity: 0.5 }}>
            Loading submissions...
          </p>

        ) : tracksError ? (

          <div
            style={{
              textAlign: "center",
              padding: "20px",
              border: "1px solid #ddd",
            }}
          >
            <p style={{ marginBottom: "8px" }}>
              Error loading submissions
            </p>

            <p
              style={{
                fontSize: "13px",
                opacity: 0.6,
              }}
            >
              {tracksError}
            </p>
          </div>

        ) : tracks.length === 0 ? (

          <p style={{ textAlign: "center", opacity: 0.5 }}>
            No submissions yet.
          </p>

        ) : (

          tracks.map((t: any) => (

            <div
              key={t.id}
              style={styles.card}
            >

              <div>

                <h3 style={styles.name}>
                  {t.name}
                </h3>

                <p style={styles.email}>
                  {t.email}
                </p>

                {t.track_name && (
                  <p style={{ marginTop: "5px" }}>
                    {t.track_name}
                  </p>
                )}

              </div>

              <a
                href={t.track_url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.linkTrack}
              >
                ▶ Listen
              </a>

              <p style={styles.status}>
                Status: {t.status}
              </p>

              <div style={styles.actions}>

                <button
                  onClick={() =>
                    updateStatus(
                      t.id,
                      "approved"
                    )
                  }
                  style={styles.approve}
                >
                  ✅ Accept
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      t.id,
                      "rejected"
                    )
                  }
                  style={styles.reject}
                >
                  ❌ Reject
                </button>

              </div>

            </div>

          ))

        )}

      </section>

    </main>
  )
}

const styles: any = {

  page: {
    minHeight: "100vh",
    background: "black",
    color: "white",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #222",
    paddingBottom: "20px",
    marginBottom: "40px",
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
    marginBottom: "40px",
    paddingTop: "130px",
  },

  title: {
    fontSize: "34px",
    marginBottom: "10px",
  },

  subtitle: {
    opacity: 0.6,
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "800px",
    margin: "0 auto",
    paddingBottom: "60px",
  },

  card: {
    border: "1px solid #222",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  name: {
    margin: 0,
  },

  email: {
    opacity: 0.6,
    fontSize: "14px",
  },

  linkTrack: {
    color: "black",
    textDecoration: "none",
    opacity: 0.8,
  },

  status: {
    opacity: 0.6,
    fontSize: "13px",
  },

  actions: {
    display: "flex",
    gap: "10px",
  },

  approve: {
    padding: "8px 12px",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
  },

  reject: {
    padding: "8px 12px",
    background: "transparent",
    color: "black",
    border: "1px solid #444",
    cursor: "pointer",
  },
}