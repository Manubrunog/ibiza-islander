export default function ShopSuccess() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Thank you for your order</h1>

      <p>
        Payment received successfully.
      </p>

      <a
        href="/"
        style={{
          color: "white",
          marginTop: "20px",
        }}
      >
        Return to Ibiza Islander
      </a>
    </main>
  )
}