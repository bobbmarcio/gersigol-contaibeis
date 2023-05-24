import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import FirebaseConfig from "./FirebaseConfig";
import Declaration from "./components/Declaration"

export default function AppRouter() {

    const auth = FirebaseConfig()

    function whenSubmitForm(dados) {
        console.log(dados)
    }

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login auth={auth} />} />
                <Route path="/signup" element={<SignUp auth={auth} />} />
                <Route path="createDeclaration" element={<Declaration whenSubmit={whenSubmitForm} />} />
            </Routes>
        </BrowserRouter>
    )
}
