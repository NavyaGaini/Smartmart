export default function Card({
  item,
  onClick,
  showRating = true,
  showCategory = false,
  showPrice = true,
}) {
  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        cursor: "pointer",
      }}
    >
      {/* IMAGE */}
      <img
        src={item.image}
        alt={item.name}
        style={{
          width: "100%",
          height: "160px",
          objectFit: "cover",
        }}
      />

      {/* CONTENT */}
      <div style={{ padding: "10px" }}>
        {/* NAME */}
        <h4 style={{ margin: "5px 0" }}>{item.name}</h4>

        {/* CATEGORY */}
        {showCategory === true && (
          <p
            style={{
              color: "green",
              fontWeight: "bold",
              margin: "5px 0",
            }}
          >
            {["Pizza", "Burgers", "Biryani", "Desserts", "Drinks"].includes(
              item.category,
            )
              ? "Food"
              : "Electronics"}
          </p>
        )}

        {/* ⭐ RATING */}
        {showRating === true && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              margin: "5px 0",
            }}
          >
            <div
              style={{
                color: "#f4c430",
                fontSize: "18px",
              }}
            >
              {(() => {
                const rating = item.rating || 0;

                const roundedRating = Math.round(rating * 2) / 2;
                const fullStars = Math.floor(roundedRating);
                const hasHalfStar = roundedRating - fullStars === 0.5;
                const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

                return (
                  "★".repeat(fullStars) +
                  (hasHalfStar ? "⯨" : "") +
                  "☆".repeat(emptyStars)
                );
              })()}
            </div>

            <span>{item.rating}</span>
          </div>
        )}

        {/* 💰 PRICE (CONTROLLED) */}
        {showPrice === true && (
          <p
            style={{
              margin: "5px 0",
              fontWeight: "bold",
              color: "green",
            }}
          >
            ₹{item.price}
          </p>
        )}
      </div>
    </div>
  );
}
