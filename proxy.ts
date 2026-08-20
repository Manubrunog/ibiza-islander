import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const ADMIN_EMAIL = "emmanuel.joly@gmx.com"

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })

          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })

          cookiesToSet.forEach(
            ({ name, value, options }) => {
              response.cookies.set(
                name,
                value,
                options
              )
            }
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log("PROXY COOKIES:", request.cookies.getAll())
console.log("PROXY USER:", user?.email)

  const isAdminRoute =
    request.nextUrl.pathname.startsWith("/admin") ||
    request.nextUrl.pathname.startsWith("/curator")

  if (isAdminRoute) {
  console.log("ADMIN ROUTE:", request.nextUrl.pathname)
  console.log("USER:", user?.email)
  console.log("ROLE:", user?.app_metadata?.role)

  if (!user) {
    console.log("→ NOT LOGGED IN")
    return NextResponse.redirect(
      new URL("/login", request.url)
    )
  }

  if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    console.log("→ NOT ADMIN")
    return NextResponse.redirect(
      new URL("/dj", request.url)
    )
  }

  console.log("→ ADMIN ALLOWED")
}

  return response
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/curator/:path*",
  ],
}