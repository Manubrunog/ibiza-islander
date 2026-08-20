"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function Admin() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [sizes, setSizes] = useState("")
  const [quantity, setQuantity] = useState("")
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
      sizes: sizes.split(","),
      quantity: Number(quantity),
      image_url,
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
    setSizes(p.sizes.join(","))
    setQuantity(p.quantity || 0)
  }

  // 💾 UPDATE
  const updateProduct = async () => {
    const { error } = await supabase
      .from("products")
      .update({
        name,
        description,
        price: Number(price),
        sizes: sizes.split(","),
        quantity: Number(quantity),
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

    await supabase.from("products").delete().eq("id", id)
    fetchProducts()
  }

  const resetForm = () => {
    setEditingId(null)
    setName("")
    setDescription("")
    setPrice("")
    setSizes("")
    setQuantity("")
    setFile(null)
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>🛠️ Admin - Products</h1>

      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />

      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />

      <input
        placeholder="Sizes (S,M,L or TU)"
        value={sizes}
        onChange={(e) => setSizes(e.target.value)}
      />
      <br />

      <input
        placeholder="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <br />

      {!editingId && (
        <>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <br /><br />
        </>
      )}

      {editingId ? (
        <button onClick={updateProduct}>Update product</button>
      ) : (
        <button onClick={upload}>Add product</button>
      )}

      {/* STOCK */}
      <hr style={{ margin: "40px 0" }} />

      <h2>📦 Stock</h2>

      {products.map((p) => (
        <div key={p.id} style={styles.item}>

          <img src={p.image_url} style={styles.thumb} />

          <div style={{ flex: 1 }}>
            <p><b>{p.name}</b></p>
            <p>{p.price} €</p>
            <p style={{ fontSize: 12 }}>
              {p.sizes?.join(" / ")}
            </p>
            <p style={{ color: "#aaa" }}>
              Stock: {p.quantity}
            </p>
          </div>
          

          <button style={styles.edit} onClick={() => editProduct(p)}>
            Edit
          </button>

          <button style={styles.delete} onClick={() => deleteProduct(p.id)}>
            Delete
          </button>

        </div>
      ))}
    </div>
  )
}

const styles: any = {
  item: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    borderBottom: "1px solid #222",
    padding: "10px 0",
  },

  thumb: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
    background: "#111",
    padding: "5px",
    border: "1px solid #222",
  },

  edit: {
    background: "#444",
    color: "white",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
  },

  delete: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
  },
}