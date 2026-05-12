import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { allItems } from "../data/mockData";

export default function InsightsPage() {
  // =========================
  // CLEAR HISTORY ON REFRESH
  // =========================
  useEffect(() => {
    const clearHistory = () => {
      localStorage.removeItem("smartmart_history");
    };

    window.addEventListener("beforeunload", clearHistory);

    return () => {
      window.removeEventListener("beforeunload", clearHistory);
    };
  }, []);

  const history = JSON.parse(localStorage.getItem("smartmart_history") || "[]");

  const now = Date.now();

  // =========================
  // EMPTY STATE
  // =========================
  if (!history.length) {
    return (
      <>
        <Navbar />

        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: "gray",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          No activity yet
        </div>
      </>
    );
  }

  // =========================
  // TIME AGO FUNCTION
  // =========================
  function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) {
      return `${seconds}s ago`;
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);

    return `${days}d ago`;
  }

  // =========================
  // SCORE MAP (FREQUENCY + RECENCY)
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
  // RECOMMENDED ITEMS
  // =========================
  const recommendedItems = Object.entries(scoreMap)
    .sort((a, b) => b[1] - a[1])
    .map(([itemId]) => allItems.find((item) => item.id === itemId))
    .filter(Boolean)
    .slice(0, 6);

  // =========================
  // RECENTLY VIEWED (UNIQUE)
  // =========================
  const uniqueRecentMap = new Map();

  history
    .slice()
    .sort((a, b) => b.timestamp - a.timestamp)
    .forEach((event) => {
      if (!uniqueRecentMap.has(event.itemId)) {
        const matchedItem = allItems.find((item) => item.id === event.itemId);

        if (matchedItem) {
          uniqueRecentMap.set(event.itemId, {
            item: matchedItem,
            timestamp: event.timestamp,
          });
        }
      }
    });

  const recentItems = Array.from(uniqueRecentMap.values()).slice(0, 6);

  // =========================
  // COMBINED ITEMS
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
            RECOMMENDED SECTION
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
            RECENTLY VIEWED
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
              {recentItems.map((recent) => (
                <div key={recent.item.id}>
                  <Card
                    item={recent.item}
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
                    Viewed {getTimeAgo(recent.timestamp)}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* =========================
            ALL ITEMS SECTION
        ========================= */}
        {combinedItems.length > 0 && (
          <>
            <h2
              style={{
                marginTop: "40px",
                marginBottom: "20px",
              }}
            >
              All Items — Sorted by Usage Score
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
