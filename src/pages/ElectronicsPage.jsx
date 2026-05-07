import { useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { electronicsData } from "../data/mockData";
import { trackEvent } from "../utils/ruiTracker";

export default function ElectronicsPage() {
  // 🔥 STATE
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 🔥 CATEGORY BUTTONS
  const categories = ["All", "Mobiles", "Laptops", "Accessories", "Wearables"];

  // 🔍 FILTER LOGIC
  const filteredItems = electronicsData.filter((item) => {
    const matchCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <>
      {/* 🔥 REUSED NAVBAR */}
      <Navbar
        search={search}
        setSearch={setSearch}
        placeholder="Search electronic products..."
      />

      {/* 🔥 HERO SECTION */}
      <div
        style={{
          background: "#111",
          color: "#fff",
          padding: "40px",
          textAlign: "center",
          width: "100%",
        }}
      >
        <h1>Latest Electronics & Gadgets</h1>

        <p>Upgrade your lifestyle with smart devices</p>
      </div>

      {/* 🔥 CATEGORY FILTERS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          margin: "20px",
          flexWrap: "wrap",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              background: selectedCategory === cat ? "green" : "#eee",

              color: selectedCategory === cat ? "#fff" : "#000",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🔥 PRODUCT GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",

          gap: "16px",
          padding: "20px",
        }}
      >
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            item={item}
            onClick={() => trackEvent(item.id, "electronics", "click")}
          />
        ))}
      </div>
    </>
  );
}
