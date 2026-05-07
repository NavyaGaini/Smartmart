import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { allItems } from "../data/mockData";

export default function InsightsPage() {
  const history = JSON.parse(localStorage.getItem("smartmart_history") || "[]");

  const now = Date.now();

  // =========================
  // ⭐ EMPTY CHECK (GLOBAL)
  // =========================
  if (!history.length) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <h2>No activity yet</h2>
        </div>
      </>
    );
  }

  // =========================
  // ⭐ SCORE MAP (FREQUENCY + RECENCY)
  // =========================
  const scoreMap = {};

  history.forEach((event) => {
    if (!event?.itemId || !event?.timestamp) return;

    const hoursAgo = (now - event.timestamp) / (1000 * 60 * 60);

    const recencyBoost = Math.max(0, 24 - hoursAgo);

    const score = 1 + recencyBoost * 0.5;

    scoreMap[event.itemId] = (scoreMap[event.itemId] || 0) + score;
  });

  // =========================
  // ⭐ RECOMMENDED ITEMS
  // =========================
  const recommendedItems = Object.entries(scoreMap)
    .sort((a, b) => b[1] - a[1])
    .map(([itemId]) => allItems.find((item) => item.id === itemId))
    .filter(Boolean)
    .slice(0, 6);

  // =========================
  // 🕒 RECENTLY VIEWED (TIME BASED)
  // =========================
  const recentItems = history
    .slice()
    .sort((a, b) => b.timestamp - a.timestamp)
    .map((event) => allItems.find((item) => item.id === event.itemId))
    .filter(Boolean)
    .slice(0, 6);

  // =========================
  // 📊 COMBINED ITEMS (SCORE BASED FULL LIST)
  // =========================
  const combinedItems = Object.entries(scoreMap)
    .sort((a, b) => b[1] - a[1])
    .map(([itemId]) => allItems.find((item) => item.id === itemId))
    .filter(Boolean);

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        {/* =========================
            ⭐ RECOMMENDED SECTION
        ========================= */}
        {recommendedItems.length > 0 && (
          <>
            <h2 style={{ marginBottom: "20px" }}>⭐ Recommended for You</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "16px",
                marginBottom: "40px",
              }}
            >
              {recommendedItems.map((item) => (
                <Card
                  key={item.id}
                  item={item}
                  showRating={false}
                  showCategory={true}
                  showPrice={true}
                />
              ))}
            </div>
          </>
        )}

        {/* =========================
            🕒 RECENTLY VIEWED
        ========================= */}
        {recentItems.length > 0 && (
          <>
            <h2 style={{ marginBottom: "20px" }}>🕒 Recently Viewed</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "16px",
                marginBottom: "40px",
              }}
            >
              {recentItems.map((item) => (
                <div key={item.id}>
                  <Card
                    item={item}
                    showRating={false}
                    showCategory={false}
                    showPrice={false}
                  />

                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "12px",
                      color: "gray",
                      marginTop: "6px",
                    }}
                  >
                    Viewed recently
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* =========================
            📊 COMBINED ITEMS SECTION
        ========================= */}
        {combinedItems.length > 0 && (
          <>
            <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>
              📊 All Items — Sorted by Usage Score
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "16px",
              }}
            >
              {combinedItems.map((item) => (
                <Card
                  key={item.id}
                  item={item}
                  showRating={false}
                  showCategory={true}
                  showPrice={false}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
