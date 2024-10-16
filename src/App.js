import "./App.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Converter from "./Component/Converter";
import MovieComponent from "./Component/MovieComponent";
import Login from "./Component/Login";
import UserAuth from "./Component/UserAuth";
import StepperForm from "./Component/StepperForm";
import MultipleForm from "./Component/MultipleForm";

function App() {
    const { id } = useParams();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />{" "}
                <Route element={<UserAuth />}>
                    <Route path="/" element={<Converter />} />{" "}
                    <Route path="/movie/:id?" element={<MovieComponent />} />{" "}
                    <Route path="/form" element={<StepperForm />} />{" "}
                    <Route path="/multiform" element={<MultipleForm />} />{" "}
                    {/* 👈 Renders at /app/ */}
                </Route>
                <Route
                    path="*"
                    element={
                        <div className="w-full h-screen flex justify-center items-center text-3xl text-red-500">
                            Page Not Found
                        </div>
                    }
                />{" "}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
