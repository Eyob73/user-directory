import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { ThemeProvider } from "./context/ThemeProvider";
import { FavoritesProvider } from "./context/FavoritesProvider";
import { useFavorites } from "./hooks/useFavorites";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";

function AppContent() {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen">
      <Header
        favoriteCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesFilter={() => setShowFavoritesOnly((prev) => !prev)}
      />
      <Routes>
        <Route
          path="/"
          element={<Home showFavoritesOnly={showFavoritesOnly} />}
        />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
