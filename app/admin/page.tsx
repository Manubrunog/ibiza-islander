"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function Admin() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [sizes, setSizes] = useState("")
  const [quantity, setQuantity] = useState("")
  const [type, setType] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const [products, setProducts] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    setProducts(data || [])
  }

  // ➕ ADD
  const upload = async () => {
    if (!file) return alert("Select image")

    if (!type) return alert("Select product type")

    // ✅ NEW SIZE LOGIC
    let parsedSizes: string[] = []

    if (sizes.trim() === "") {
      parsedSizes = ["S", "M", "L", "XL"]
    } else {
      parsedSizes = sizes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    }

    // ✅ STOCK CALCULATION
    const totalQuantity =
      parsedSizes.includes("TU")
        ? Number(quantity)
        : Number(quantity) *
          parsedSizes.length

    const fileName = Date.now() + "-" + file.name

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, file)

    if (uploadError) return alert(uploadError.message)

    const image_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${fileName}`

    const { error } = await supabase.from("products").insert({
      name,
      description,
      price: Number(price),

      // ✅ AUTO SIZES
      sizes: parsedSizes,

      // ✅ TOTAL STOCK
      quantity: totalQuantity,

      image_url,
      type,
    })

    if (error) {
      alert(error.message)
    } else {
      resetForm()
      fetchProducts()
    }
  }

  // ✏️ LOAD INTO FORM
  const editProduct = (p: any) => {
    setEditingId(p.id)

    setName(p.name)
    setDescription(p.description)
    setPrice(p.price)

    // ✅ HIDE AUTO DEFAULT SIZES
    const autoSizes = ["S", "M", "L", "XL"]

    const isAutoDefault =
      JSON.stringify(p.sizes) ===
      JSON.stringify(autoSizes)

    setSizes(
      isAutoDefault
        ? ""
        : p.sizes?.join(",") || ""
    )

    // ✅ REVERSE STOCK CALCULATION
    if (
      p.sizes?.includes("TU")
    ) {
      setQuantity(p.quantity || 0)
    } else {
      setQuantity(
  String(
    Math.floor(
      (p.quantity || 0) /
        (p.sizes?.length || 1)
    )
  )
)
    }

    setType(p.type || "")
  }

  // 💾 UPDATE
  const updateProduct = async () => {

    // ✅ SAME LOGIC
    let parsedSizes: string[] = []

    if (sizes.trim() === "") {
      parsedSizes = ["S", "M", "L", "XL"]
    } else {
      parsedSizes = sizes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    }

    const totalQuantity =
      parsedSizes.includes("TU")
        ? Number(quantity)
        : Number(quantity) *
          parsedSizes.length

    const { error } = await supabase
      .from("products")
      .update({
        name,
        description,
        price: Number(price),

        sizes: parsedSizes,

        quantity: totalQuantity,

        type,
      })
      .eq("id", editingId)

    if (error) {
      alert(error.message)
    } else {
      resetForm()
      fetchProducts()
    }
  }

  // ❌ DELETE
  const deleteProduct = async (id: string) => {
    if (!confirm("Delete product?")) return

    await supabase
      .from("products")
      .delete()
      .eq("id", id)

    fetchProducts()
  }

  const resetForm = () => {
    setEditingId(null)
    setName("")
    setDescription("")
    setPrice("")
    setSizes("")
    setQuantity("")
    setType("")
    setFile(null)
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>
        🛠️ Admin - Products
      </h1>

      <div style={styles.form}>

        <input
          style={styles.input}
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <textarea
          style={styles.textarea}
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <input
          style={styles.input}
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <input
          style={styles.input}
          placeholder="TU or leave empty for S,M,L,XL"
          value={sizes}
          onChange={(e) =>
            setSizes(e.target.value)
          }
        />

        <div style={styles.info}>
          Leave empty =
          automatic S / M / L / XL
        </div>

        <input
          style={styles.input}
          placeholder="Quantity per size"
          type="number"
          value={quantity}
          onChange={(e) =>
            setQuantity(e.target.value)
          }
        />

        {/* PRODUCT TYPE */}
        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
          style={styles.select}
        >
          <option value="">
            Select product type
          </option>

          <option value="support">
            Support (T-shirt / Hoodie / Cap)
          </option>

          <option value="patch">
            Patch / Scratch badge
          </option>
        </select>

        {!editingId && (
          <>
            <input
              type="file"
              onChange={(e) =>
                setFile(
                  e.target.files?.[0] || null
                )
              }
              style={styles.file}
            />
          </>
        )}

        {editingId ? (
          <button
            style={styles.button}
            onClick={updateProduct}
          >
            Update product
          </button>
        ) : (
          <button
            style={styles.button}
            onClick={upload}
          >
            Add product
          </button>
        )}

      </div>

      {/* STOCK */}
      <hr
        style={{
          margin: "40px 0",
          borderColor: "#222",
        }}
      />

      <h2 style={styles.stockTitle}>
        📦 Stock
      </h2>

      {products.map((p) => (
        <div
          key={p.id}
          style={styles.item}
        >

          <img
            src={p.image_url}
            style={styles.thumb}
          />

          <div style={{ flex: 1 }}>

            <p>
              <b>{p.name}</b>
            </p>

            <p>{p.price} €</p>

            <p
              style={{
                fontSize: 12,
                opacity: 0.7,
              }}
            >
              {p.sizes?.join(" / ")}
            </p>

            <p style={{ color: "#aaa" }}>
              Stock: {p.quantity}
            </p>

            {/* TYPE LABEL */}
            <p style={styles.type}>
              Type:{" "}
              {p.type || "undefined"}
            </p>

          </div>

          <button
            style={styles.edit}
            onClick={() =>
              editProduct(p)
            }
          >
            Edit
          </button>

          <button
            style={styles.delete}
            onClick={() =>
              deleteProduct(p.id)
            }
          >
            Delete
          </button>

        </div>
      ))}
    </div>
  )
}

const styles: any = {
  page: {
    padding: "40px",
    background: "black",
    minHeight: "100vh",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },

  title: {
    marginBottom: "30px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "500px",
  },

  input: {
    padding: "12px",
    background: "#111",
    color: "white",
    border: "1px solid #333",
  },

  textarea: {
    padding: "12px",
    background: "#111",
    color: "white",
    border: "1px solid #333",
    minHeight: "120px",
  },

  select: {
    padding: "12px",
    background: "#111",
    color: "white",
    border: "1px solid #333",
  },

  info: {
    fontSize: "12px",
    opacity: 0.6,
    marginTop: "-8px",
  },

  file: {
    color: "white",
  },

  button: {
    padding: "14px",
    background: "white",
    color: "black",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },

  stockTitle: {
    marginBottom: "20px",
  },

  item: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    borderBottom: "1px solid #222",
    padding: "15px 0",
  },

  thumb: {
    width: "70px",
    height: "70px",
    objectFit: "contain",
    background: "#111",
    padding: "5px",
    border: "1px solid #222",
  },

  type: {
    marginTop: "5px",
    fontSize: "12px",
    opacity: 0.6,
    textTransform: "uppercase",
    letterSpacing: "1px",
  },

  edit: {
    background: "#444",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
  },

  delete: {
    background: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
  },
}