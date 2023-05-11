import Login from "./components/Login";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import SignUp from "./components/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyBl44kIRD6WkCCVCuw31YWiMqZ3GKlHXqo",
    authDomain: "gersigol-contabeis.firebaseapp.com",
    projectId: "gersigol-contabeis",
    storageBucket: "gersigol-contabeis.appspot.com",
    messagingSenderId: "299062437165",
    appId: "1:299062437165:web:936b73bc3d5ce01cd71fa4"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login auth={auth} />} />
              <Route path="/signup" element={<SignUp auth={auth} />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;