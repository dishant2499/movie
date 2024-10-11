import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Converter from "./Component/Converter";
import MovieList from "./Component/MovieList";
import MovieDetail from "./Component/MovieDetail";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Converter />} />{" "}
                <Route path="/movie" element={<MovieList />} />{" "}
                <Route path="/movie/:id" element={<MovieDetail />} />{" "}
                {/* 👈 Renders at /app/ */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
