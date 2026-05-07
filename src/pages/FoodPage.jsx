import { useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { foodData } from "../data/mockData";
import { trackEvent } from "../utils/ruiTracker";

export default function FoodPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = [
    "All",
    "Pizza",
    "Burgers",
    "Biryani",
    "Desserts",
    "Drinks",
  ];

  // 🔍 COMBINED FILTER (Category + Search)
  const filteredItems = foodData.filter((item) => {
    const matchCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <>
      {/* 🔥 PASS SEARCH TO NAVBAR */}
      <Navbar
        search={search}
        setSearch={setSearch}
        placeholder="Search food items..."
      />

      {/* HERO */}
      <div
        style={{
          background: "#111",
          color: "#fff",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h1>Explore Delicious Foods</h1>
        <p>Find your favorite meals instantly</p>
      </div>

      {/* CATEGORY FILTER */}
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
              padding: "10px",
              background: selectedCategory === cat ? "green" : "#eee",
              color: selectedCategory === cat ? "#fff" : "#000",
              border: "none",
              borderRadius: "5px",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
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
            onClick={() => trackEvent(item.id, item.category, "click")}
          />
        ))}
      </div>
    </>
  );
}
