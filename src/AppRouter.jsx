import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import FirebaseConfig from "./FirebaseConfig";

export default function AppRouter() {

    const auth = FirebaseConfig()
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login auth={auth} />} />
                <Route path="/signup" element={<SignUp auth={auth} />} />
            </Routes>
        </BrowserRouter>
    )
}
