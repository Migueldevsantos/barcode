import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Imprimir from "../pages/Imprimir";

export default function Navigator () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/codes" Component={Imprimir} />
            </Routes>
        </BrowserRouter>
    )
}