import { BrowserRouter, Routes, Route } from "react-router-dom";
import FoodPage from "./pages/FoodPage";
import ElectronicsPage from "./pages/ElectronicsPage";
import InsightsPage from "./pages/InsightsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FoodPage />} />
        <Route path="/electronics" element={<ElectronicsPage />} />
        <Route path="/insights" element={<InsightsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
