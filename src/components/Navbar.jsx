import { Link, useLocation } from "react-router-dom";

export default function Navbar({ search, setSearch, placeholder }) {
  const location = useLocation();

  // 🔥 ACTIVE LINK STYLE
  const activeStyle = {
    color: "limegreen",
    fontWeight: "bold",
    textDecoration: "none",
  };

  const normalStyle = {
    color: "#fff",
    textDecoration: "none",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        background: "#222",
        color: "#fff",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      {/* 🔥 LEFT */}
      <h2 style={{ color: "green" }}>SmartMart</h2>

      {/* 🔥 SEARCH BAR */}
      {setSearch && (
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "40%",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "none",
            outline: "none",
          }}
        />
      )}

      {/* 🔥 NAV LINKS */}
      <div
        style={{
          display: "flex",
          gap: "15px",
        }}
      >
        <Link
          to="/"
          style={location.pathname === "/" ? activeStyle : normalStyle}
        >
          Food
        </Link>

        <Link
          to="/electronics"
          style={
            location.pathname === "/electronics" ? activeStyle : normalStyle
          }
        >
          Electronics
        </Link>

        <Link
          to="/insights"
          style={location.pathname === "/insights" ? activeStyle : normalStyle}
        >
          Insights
        </Link>
      </div>
    </div>
  );
}
