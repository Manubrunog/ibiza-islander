"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function Shop() {
  const [products, setProducts] = useState<any[]>([])
  const [supports, setSupports] = useState<any[]>([])
  const [patches, setPatches] = useState<any[]>([])
  const [fragrances, setFragrances] = useState<any[]>([])
  const [accessories, setAccessories] = useState<any[]>([])

  const [selectedSupport, setSelectedSupport] = useState<any>(null)
  const [selectedPatch, setSelectedPatch] = useState<any>(null)
  const [selectedSize, setSelectedSize] = useState("")

  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const [openCart, setOpenCart] = useState(false)

  // SHIPPING
  const [fullName, setFullName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("")
  const [phone, setPhone] = useState("")

  // CART
  const [cart, setCart] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart")
      return saved ? JSON.parse(saved) : []
    }

    return []
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.log(error)
      return
    }

    const allProducts = data || []

    setProducts(allProducts)

    setSupports(
      allProducts.filter((p) => p.type === "support")
    )

    setPatches(
      allProducts.filter((p) => p.type === "patch")
    )

    setFragrances(
      allProducts.filter(
        (p) =>
          p.type === "fragrance" ||
          p.type === "perfume"
      )
    )

    setAccessories(
      allProducts.filter(
        (p) => p.type === "accessory"
      )
    )
  }

  // --------------------------------------------------
  // CUSTOM CLOTHING
  // --------------------------------------------------

  const addToCart = () => {
    if (!selectedSupport) {
      alert("Choose a support first")
      return
    }

    if (
      selectedSupport?.sizes &&
      selectedSupport.sizes.length > 0 &&
      !selectedSize
    ) {
      alert("Choose a size")
      return
    }

    const customProduct = {
      id: Date.now(),

      size: selectedSize,

      name:
        selectedSupport.name +
        (selectedPatch
          ? ` + ${selectedPatch.name}`
          : ""),

      price:
        Number(selectedSupport.price) +
        Number(selectedPatch?.price || 0),

      image_url:
        selectedSupport.image_url,

      support: selectedSupport,
      patch: selectedPatch,

      cartType: "custom",
    }

    setCart((prev) => [
      ...prev,
      customProduct,
    ])

    setSelectedSupport(null)
    setSelectedPatch(null)
    setSelectedSize("")
  }

  // --------------------------------------------------
  // STANDARD PRODUCTS
  // --------------------------------------------------

  const addProductToCart = (
    product: any
  ) => {
    if (product.quantity === 0) {
      return
    }

    const cartProduct = {
      id: Date.now(),

      name: product.name,
      price: Number(product.price),

      image_url:
        product.image_url,

      product,

      cartType:
        product.type ||
        "product",
    }

    setCart((prev) => [
      ...prev,
      cartProduct,
    ])

    setSelectedProduct(null)
  }

  // --------------------------------------------------
  // CART
  // --------------------------------------------------

  const removeFromCart = (
    index: number
  ) => {
    setCart((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    )
  }

  const getTotal = () => {
    return cart.reduce(
      (sum, item) =>
        sum + Number(item.price),
      0
    )
  }

  // --------------------------------------------------
  // CHECKOUT
  // --------------------------------------------------

  const checkout = async () => {
    if (cart.length === 0) {
      alert("Cart is empty")
      return
    }

    if (
      !fullName ||
      !address ||
      !city ||
      !postalCode ||
      !country
    ) {
      alert(
        "Please complete shipping information"
      )

      return
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert("You must be logged in")
      return
    }

    const total = cart.reduce(
      (sum, item) =>
        sum + Number(item.price),
      0
    )

    // CREATE ORDER
    const {
      data: order,
      error: orderError,
    } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        email: user.email,
        full_name: fullName,
        address,
        city,
        postal_code: postalCode,
        country,
        phone,
        total,
        status: "pending",
      })
      .select()
      .single()

    if (orderError) {
      console.log(orderError)
      alert("Error creating order")
      return
    }

    // CREATE ITEMS
    const items = cart.map(
      (item) => ({
        order_id: order.id,

        product_id:
          item.support?.id
            ? String(
                item.support.id
              )
            : item.product?.id
            ? String(
                item.product.id
              )
            : null,

        product_name:
          item.name,

        size:
          item.size || null,

        quantity: 1,

        price: item.price,
      })
    )

    const {
      error: itemsError,
    } = await supabase
      .from("order_items")
      .insert(items)

    if (itemsError) {
      console.log(itemsError)
      alert(
        "Error saving items"
      )
      return
    }

    // EDGE FUNCTION
    const response =
      await supabase.functions.invoke(
        "create-checkout",
        {
          body: {
            items: cart,
            order_id: order.id,
          },
        }
      )

    console.log(
      "FUNCTION RESPONSE:",
      response
    )

    const data =
      response?.data

    const error =
      response?.error

    if (error) {
      console.log(
        "FUNCTION ERROR:",
        error
      )

      alert(
        error.message ||
          "Checkout error"
      )

      return
    }

    if (!data) {
      alert(
        "No response from checkout"
      )

      return
    }

    if (data.url) {
      window.location.href =
        data.url

      return
    }

    alert(
      "Checkout OK (function working)"
    )

    localStorage.removeItem(
      "cart"
    )

    setCart([])
    setOpenCart(false)

    setFullName("")
    setAddress("")
    setCity("")
    setPostalCode("")
    setCountry("")
    setPhone("")
  }

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

            <button
              onClick={() =>
                setOpenCart(true)
              }
              className="ml-3 transition-opacity hover:opacity-50"
            >
              CART ({cart.length})
            </button>

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

<section className="px-6 pb-12 pt-12 md:px-10 md:pb-14 md:pt-14">

  <div className="mx-auto max-w-[1440px] text-center">

    <p className="mb-3 text-[8px] tracking-[0.45em] text-neutral-400">
      IBIZA ISLANDER
    </p>

    <h1 className="text-[30px] font-light tracking-[0.08em] md:text-[42px]">
      SHOP
    </h1>

    <p className="mx-auto mt-3 max-w-[520px] text-[10px] leading-6 text-neutral-500">
      Wear the sound. Create your style.
    </p>

    <p className="mt-2 text-[8px] tracking-[0.25em] text-neutral-400">
      FREE WORLDWIDE SHIPPING
    </p>

    {/* SHOP CATEGORIES */}

    <nav className="mt-10 flex justify-center gap-8 md:gap-14">

      <a
        href="#clothing"
        className="text-[9px] tracking-[0.25em] transition-opacity hover:opacity-40"
      >
        CLOTHING
      </a>

      <a
        href="#fragrance"
        className="text-[9px] tracking-[0.25em] transition-opacity hover:opacity-40"
      >
        FRAGRANCE
      </a>

      <a
        href="#accessories"
        className="text-[9px] tracking-[0.25em] transition-opacity hover:opacity-40"
      >
        ACCESSORIES
      </a>

    </nav>

  </div>

</section>


      {/* =====================================================
          01 — CREATE YOUR STYLE
      ===================================================== */}



      <section
  id="clothing"
  className="border-t border-neutral-100 px-6 py-8 md:px-10 md:py-10"
>

        <div className="mx-auto max-w-[1440px]">

          <div className="mb-10">

            <p className="mb-3 text-[9px] tracking-[0.4em] text-neutral-400">
              01
            </p>

            <h2 className="text-[25px] font-light tracking-[0.08em] md:text-[32px]">
              CREATE YOUR STYLE
            </h2>

            <p className="mt-4 max-w-[520px] text-[11px] leading-7 text-neutral-500">
              Choose your support, add your patch and create your own Ibiza Islander piece.
            </p>

          </div>


          {/* SUPPORT */}

          <div className="mb-20">

            <div className="mb-8 flex items-end justify-between border-b border-neutral-200 pb-4">

              <div>

                <p className="text-[9px] tracking-[0.35em] text-neutral-400">
                  STEP 01
                </p>

                <h3 className="mt-2 text-[17px] font-light">
                  Choose your support
                </h3>

              </div>

            </div>


            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6 md:gap-y-10">

              {supports.map(
                (p) => (

                  <div
                    key={p.id}
                    onClick={() => {

                      if (
                        p.quantity > 0
                      ) {

                        setSelectedSupport(
                          p
                        )

                        setSelectedPatch(
                          null
                        )

                        setSelectedSize(
                          ""
                        )

                      }

                    }}
                    className={`group relative cursor-pointer ${
                      p.quantity === 0
                        ? "opacity-35"
                        : ""
                    }`}
                  >

                    {p.quantity ===
                      0 && (
                      <div className="absolute left-3 top-3 z-10 text-[8px] tracking-[0.2em]">
                        SOLD OUT
                      </div>
                    )}

                    <div
                      className={`relative aspect-square overflow-hidden bg-neutral-50 transition-all ${
                        selectedSupport?.id ===
                        p.id
                          ? "ring-1 ring-neutral-900"
                          : ""
                      }`}
                    >

                      <img
                        src={
                          p.image_url
                        }
                        alt={
                          p.name
                        }
                        className="h-full w-full object-contain p-8 transition-transform duration-500 group-hover:scale-[1.03]"
                      />

                    </div>

                   <div className="pt-3">

                      <h3 className="text-[12px]">
                        {p.name}
                      </h3>

                      {p.description && (
                        <p className="mt-2 line-clamp-2 text-[10px] leading-5 text-neutral-400">
                          {
                            p.description
                          }
                        </p>
                      )}

                      <p className="mt-3 text-[11px]">
                        {p.price} €
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>


          {/* PATCHES */}

          <div className="mb-14">

            <div className="mb-8 flex items-end justify-between border-b border-neutral-200 pb-4">

              <div>

                <p className="text-[9px] tracking-[0.35em] text-neutral-400">
                  STEP 02
                </p>

                <h3 className="mt-2 text-[17px] font-light">
                  Choose your patch
                </h3>

              </div>

              <span className="text-[9px] text-neutral-400">
                OPTIONAL
              </span>

            </div>


            <div className="grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4">

              {patches.map(
                (p) => (

                  <div
                    key={p.id}
                    onClick={() => {

                      if (
                        p.quantity > 0
                      ) {
                        setSelectedPatch(
                          p
                        )
                      }

                    }}
                    className={`group relative cursor-pointer ${
                      p.quantity === 0
                        ? "opacity-30"
                        : ""
                    }`}
                  >

                    {p.quantity ===
                      0 && (
                      <div className="absolute left-2 top-2 z-10 text-[7px] tracking-[0.15em]">
                        SOLD OUT
                      </div>
                    )}

                    <div
                      className={`aspect-square overflow-hidden bg-neutral-50 ${
                        selectedPatch?.id ===
                        p.id
                          ? "ring-1 ring-neutral-900"
                          : ""
                      }`}
                    >

                      <img
                        src={
                          p.image_url
                        }
                        alt={
                          p.name
                        }
                        className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      />

                    </div>

                    <p className="mt-3 text-center text-[9px]">
                      {p.name}
                    </p>

                    <p className="mt-1 text-center text-[9px] text-neutral-400">
                      + {p.price} €
                    </p>

                  </div>

                )
              )}

            </div>

          </div>


          {/* PREVIEW */}

          <div className="border-y border-neutral-200 py-14 md:py-20">

            <div className="grid items-center gap-14 md:grid-cols-[1fr_1fr]">

              {/* VISUAL */}

              <div className="flex justify-center">

                {!selectedSupport ? (

                  <div className="flex aspect-square w-full max-w-[360px] items-center justify-center bg-neutral-50">

                    <div className="text-center">

                      <p className="text-[9px] tracking-[0.35em] text-neutral-400">
                        YOUR STYLE
                      </p>

                      <p className="mt-3 text-[11px] text-neutral-400">
                        Select a support to begin
                      </p>

                    </div>

                  </div>

                ) : (

                  <div className="relative aspect-square w-full max-w-[360px] overflow-hidden bg-neutral-50">

                    <img
                      src={
                        selectedSupport.image_url
                      }
                      alt={
                        selectedSupport.name
                      }
                      className="h-full w-full object-contain p-6"
                    />

                    {selectedPatch && (
                      <img
                        src={
                          selectedPatch.image_url
                        }
                        alt={
                          selectedPatch.name
                        }
                        className="absolute left-1/2 top-[38%] h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 object-contain"
                      />
                    )}

                  </div>

                )}

              </div>


              {/* DETAILS */}

              <div>

                <p className="text-[9px] tracking-[0.35em] text-neutral-400">
                  YOUR SELECTION
                </p>

                {!selectedSupport ? (

                  <div className="mt-8">

                    <h3 className="text-[25px] font-light">
                      Create your piece
                    </h3>

                    <p className="mt-5 max-w-[400px] text-[11px] leading-7 text-neutral-500">
                      Select a support and customize it with one of our Ibiza Islander patches.
                    </p>

                  </div>

                ) : (

                  <div className="mt-8">

                    <h3 className="text-[24px] font-light">
                      {selectedSupport.name}
                    </h3>

                    {selectedPatch && (
                      <p className="mt-3 text-[11px] text-neutral-500">
                        +{" "}
                        {
                          selectedPatch.name
                        }
                      </p>
                    )}


                    {/* SIZE */}

                    {selectedSupport?.sizes?.length >
                      0 && (

                      <div className="mt-10">

                        <p className="mb-4 text-[9px] tracking-[0.25em] text-neutral-400">
                          SELECT SIZE
                        </p>

                        <div className="flex flex-wrap gap-2">

                          {selectedSupport.sizes.map(
                            (
                              size: string
                            ) => (

                              <button
                                key={size}
                                onClick={() =>
                                  setSelectedSize(
                                    size
                                  )
                                }
                                className={`min-w-[48px] border px-4 py-3 text-[9px] transition-all ${
                                  selectedSize ===
                                  size
                                    ? "border-neutral-900 bg-neutral-900 text-white"
                                    : "border-neutral-200 hover:border-neutral-900"
                                }`}
                              >
                                {size}
                              </button>

                            )
                          )}

                        </div>

                      </div>

                    )}


                    {/* PRICE */}

                    <div className="mt-10 border-t border-neutral-200 pt-6">

                      <div className="flex items-center justify-between">

                        <span className="text-[9px] tracking-[0.25em] text-neutral-400">
                          TOTAL
                        </span>

                        <span className="text-[18px] font-light">
                          {
                            Number(
                              selectedSupport.price
                            ) +
                            Number(
                              selectedPatch?.price ||
                                0
                            )
                          }{" "}
                          €
                        </span>

                      </div>

                    </div>


                    {/* ADD */}

                    <button
                      onClick={
                        addToCart
                      }
                      className="mt-8 w-full bg-neutral-900 px-6 py-4 text-[9px] tracking-[0.3em] text-white transition-opacity hover:opacity-80"
                    >
                      ADD TO CART
                    </button>

                  </div>

                )}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          02 — FRAGRANCE
      ===================================================== */}

    <section
  id="fragrance"
  className="border-t border-neutral-100 px-6 py-12 md:px-10 md:py-16"
>
  <div className="mx-auto max-w-[1440px]">

    <div className="mb-10">
      <p className="mb-3 text-[9px] tracking-[0.4em] text-neutral-400">
        02
      </p>

      <h2 className="text-[20px] font-light tracking-[0.08em] md:text-[26px]">
        FRAGRANCE
      </h2>

      <p className="mt-3 max-w-[520px] text-[10px] leading-6 text-neutral-500">
        Ibiza Islander fragrance. No gender. No seasons. No rules.
      </p>
    </div>

    {/* FRAGRANCE VISUAL */}

    <div className="flex justify-center">
      <div className="w-full max-w-[320px]">

        <div className="aspect-square overflow-hidden bg-neutral-50">
          <img
            src="/images/tod.jpg"
            alt="Ibiza Islander Fragrance"
            className="h-full w-full object-contain"
          />
        </div>

      </div>
    </div>

  </div>
</section>


      {/* =====================================================
          03 — ACCESSORIES
      ===================================================== */}

      <section
  id="accessories"
  className="border-t border-neutral-100 px-6 py-16 md:px-10 md:py-20"
>

        <div className="mx-auto max-w-[1440px]">

          <div className="mb-14">

            <p className="mb-3 text-[9px] tracking-[0.4em] text-neutral-400">
              03
            </p>

            <h2 className="text-[25px] font-light tracking-[0.08em] md:text-[32px]">
              ACCESSORIES
            </h2>

            <p className="mt-4 max-w-[520px] text-[11px] leading-7 text-neutral-500">
              Ibiza Islander essentials.
            </p>

          </div>


          {accessories.length ===
          0 ? (

            <div className="border-y border-neutral-100 py-16 text-center">

              <p className="text-[10px] tracking-[0.25em] text-neutral-400">
                COMING SOON
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">

              {accessories.map(
                (p) => (

                  <div
                    key={p.id}
                    className={`group ${
                      p.quantity === 0
                        ? "opacity-35"
                        : ""
                    }`}
                  >

                    <div className="relative aspect-square overflow-hidden bg-neutral-50">

                      {p.quantity ===
                        0 && (
                        <div className="absolute left-3 top-3 z-10 text-[8px] tracking-[0.2em]">
                          SOLD OUT
                        </div>
                      )}

                      <img
                        src={
                          p.image_url
                        }
                        alt={
                          p.name
                        }
                        className="h-full w-full object-contain p-8 transition-transform duration-500 group-hover:scale-[1.04]"
                      />

                    </div>

                    <div className="pt-4">

                      <h3 className="text-[12px]">
                        {p.name}
                      </h3>

                      {p.description && (
                        <p className="mt-2 text-[10px] leading-5 text-neutral-400">
                          {
                            p.description
                          }
                        </p>
                      )}

                      <div className="mt-4 flex items-center justify-between">

                        <span className="text-[11px]">
                          {p.price} €
                        </span>

                        <button
                          disabled={
                            p.quantity ===
                            0
                          }
                          onClick={() =>
                            addProductToCart(
                              p
                            )
                          }
                          className="text-[8px] tracking-[0.25em] underline underline-offset-4 transition-opacity hover:opacity-50 disabled:cursor-not-allowed"
                        >
                          ADD TO CART
                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </section>


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

            <Link href="mailto:hola@ibizaislander.com?subject=Hello from web ">CONTACT</Link>
            <Link href="/privacy">LEGAL & PRIVACY</Link>
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


      {/* =====================================================
          CART
      ===================================================== */}

      {openCart && (

        <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm">

          <div className="absolute right-0 top-0 flex h-full w-full max-w-[480px] flex-col bg-white shadow-2xl">

            {/* CART HEADER */}

            <div className="flex items-center justify-between border-b border-neutral-200 px-7 py-6">

              <div>

                <p className="text-[9px] tracking-[0.35em] text-neutral-400">
                  IBIZA ISLANDER
                </p>

                <h2 className="mt-2 text-[20px] font-light">
                  Your Cart
                </h2>

              </div>

              <button
                onClick={() =>
                  setOpenCart(false)
                }
                className="text-[20px] font-light transition-opacity hover:opacity-50"
              >
                ×
              </button>

            </div>


            {/* CART CONTENT */}

            <div className="flex-1 overflow-y-auto px-7 py-7">

              {cart.length ===
              0 ? (

                <div className="py-20 text-center">

                  <p className="text-[10px] tracking-[0.25em] text-neutral-400">
                    YOUR CART IS EMPTY
                  </p>

                </div>

              ) : (

                <>

                  {cart.map(
                    (item, i) => (

                      <div
                        key={i}
                        className="flex gap-4 border-b border-neutral-100 py-5"
                      >

                        <div className="h-20 w-20 shrink-0 bg-neutral-50">

                          {item.image_url && (
                            <img
                              src={
                                item.image_url
                              }
                              alt=""
                              className="h-full w-full object-contain p-2"
                            />
                          )}

                        </div>


                        <div className="min-w-0 flex-1">

                          <div className="flex justify-between gap-4">

                            <div>

                              <p className="text-[11px]">
                                {item.name}
                              </p>

                              {item.size && (
                                <p className="mt-1 text-[9px] text-neutral-400">
                                  Size:{" "}
                                  {
                                    item.size
                                  }
                                </p>
                              )}

                            </div>

                            <button
                              onClick={() =>
                                removeFromCart(
                                  i
                                )
                              }
                              className="text-[14px] text-neutral-400 hover:text-neutral-900"
                            >
                              ×
                            </button>

                          </div>

                          <p className="mt-3 text-[11px]">
                            {item.price} €
                          </p>

                        </div>

                      </div>

                    )
                  )}


                  {/* TOTAL */}

                  <div className="flex items-center justify-between border-b border-neutral-200 py-6">

                    <span className="text-[9px] tracking-[0.25em] text-neutral-400">
                      TOTAL
                    </span>

                    <span className="text-[18px] font-light">
                      {getTotal()} €
                    </span>

                  </div>


                  {/* SHIPPING */}

                  <div className="pt-7">

                    <p className="mb-2 text-[9px] tracking-[0.35em] text-neutral-400">
                      SHIPPING
                    </p>

                    <h3 className="mb-6 text-[17px] font-light">
                      Delivery information
                    </h3>


                    <div className="space-y-4">

                      <input
                        placeholder="Full name"
                        value={
                          fullName
                        }
                        onChange={(e) =>
                          setFullName(
                            e.target
                              .value
                          )
                        }
                        className="w-full border-b border-neutral-200 bg-transparent py-3 text-[11px] outline-none focus:border-neutral-900"
                      />

                      <input
                        placeholder="Address"
                        value={
                          address
                        }
                        onChange={(e) =>
                          setAddress(
                            e.target
                              .value
                          )
                        }
                        className="w-full border-b border-neutral-200 bg-transparent py-3 text-[11px] outline-none focus:border-neutral-900"
                      />

                      <div className="grid grid-cols-2 gap-5">

                        <input
                          placeholder="City"
                          value={
                            city
                          }
                          onChange={(e) =>
                            setCity(
                              e.target
                                .value
                            )
                          }
                          className="w-full border-b border-neutral-200 bg-transparent py-3 text-[11px] outline-none focus:border-neutral-900"
                        />

                        <input
                          placeholder="Postal code"
                          value={
                            postalCode
                          }
                          onChange={(e) =>
                            setPostalCode(
                              e.target
                                .value
                            )
                          }
                          className="w-full border-b border-neutral-200 bg-transparent py-3 text-[11px] outline-none focus:border-neutral-900"
                        />

                      </div>

                      <input
                        placeholder="Country"
                        value={
                          country
                        }
                        onChange={(e) =>
                          setCountry(
                            e.target
                              .value
                          )
                        }
                        className="w-full border-b border-neutral-200 bg-transparent py-3 text-[11px] outline-none focus:border-neutral-900"
                      />

                      <input
                        placeholder="Phone (optional)"
                        value={
                          phone
                        }
                        onChange={(e) =>
                          setPhone(
                            e.target
                              .value
                          )
                        }
                        className="w-full border-b border-neutral-200 bg-transparent py-3 text-[11px] outline-none focus:border-neutral-900"
                      />

                    </div>


                    <p className="mt-6 text-center text-[9px] tracking-[0.12em] text-neutral-400">
                      FREE WORLDWIDE SHIPPING INCLUDED
                    </p>

                  </div>

                </>

              )}

            </div>


            {/* CART FOOTER */}

            {cart.length >
              0 && (

              <div className="border-t border-neutral-200 bg-white px-7 py-6">

                <button
                  onClick={
                    checkout
                  }
                  className="w-full bg-neutral-900 py-4 text-[9px] tracking-[0.3em] text-white transition-opacity hover:opacity-80"
                >
                  CONFIRM ORDER
                </button>

                <button
                  onClick={() =>
                    setOpenCart(
                      false
                    )
                  }
                  className="mt-3 w-full border border-neutral-200 py-4 text-[9px] tracking-[0.3em] transition-colors hover:border-neutral-900"
                >
                  CONTINUE SHOPPING
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </main>
  )
}